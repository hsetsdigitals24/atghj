import { NextRequest, NextResponse } from 'next/server';

interface CurrentIssueResponse {
  id: number;
  volume?: number;
  number?: string;
  year?: number;
  datePublished?: string;
  title?: string | { [locale: string]: string };
}

export async function GET(request: NextRequest) {
  const OJS_BASE_URL = process.env.NEXT_PUBLIC_OJS_API_URL;
  const OJS_API_KEY = process.env.NEXT_PUBLIC_OJS_API_KEY;

  if (!OJS_BASE_URL || !OJS_API_KEY) {
    return NextResponse.json(
      { error: 'OJS configuration missing' },
      { status: 500 }
    );
  }

  try {
    // Fetch the latest published issue
    const issueUrl = new URL(`${OJS_BASE_URL}/issues`);
    issueUrl.searchParams.append('isPublished', '1');
    issueUrl.searchParams.append('orderBy', 'datePublished');
    issueUrl.searchParams.append('orderDirection', 'DESC');
    issueUrl.searchParams.append('count', '1');
    issueUrl.searchParams.append('apiToken', OJS_API_KEY);

    // console.log('📥 Fetching current issue from:', issueUrl.toString());

    const response = await fetch(issueUrl.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`OJS API error: ${response.status}`);
    }

    const data = await response.json();
    const currentIssue = data.items?.[0];

    if (!currentIssue) {
      return NextResponse.json(
        { error: 'No published issues found' },
        { status: 404 }
      );
    }

    // Format the response with year and month
    const datePublished = currentIssue.datePublished 
      ? new Date(currentIssue.datePublished)
      : null;

    const currentIssueData: CurrentIssueResponse & { month?: string; formattedDate?: string } = {
      id: currentIssue.id,
      volume: currentIssue.volume,
      number: currentIssue.number,
      year: currentIssue.year || datePublished?.getFullYear(),
      datePublished: currentIssue.datePublished,
      title: currentIssue.title,
      month: datePublished?.toLocaleString('en-US', { month: 'long' }),
      formattedDate: datePublished?.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };

    // console.log('✅ Current issue found:', currentIssueData); 

    return NextResponse.json(currentIssueData);
  } catch (error) {
    console.error('❌ Error fetching current issue:', error);
    return NextResponse.json(
      { error: 'Failed to fetch current issue' },
      { status: 500 }
    );
  }
}