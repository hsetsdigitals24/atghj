import { NextRequest, NextResponse } from 'next/server';

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
    // Construct the API URL to get issues with isPublished=1
    const apiUrl = new URL(`${OJS_BASE_URL}/issues`);
    apiUrl.searchParams.append('isPublished', '1');
    apiUrl.searchParams.append('orderBy', 'datePublished');
    apiUrl.searchParams.append('orderDirection', 'DESC');
    apiUrl.searchParams.append('count', '1');
    apiUrl.searchParams.append('apiToken', OJS_API_KEY);

    // console.log('Fetching current issue from:', apiUrl.toString());

    const response = await fetch(apiUrl.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      console.error('OJS API Error:', {
        status: response.status,
        statusText: response.statusText,
        url: apiUrl.toString()
      });
      throw new Error(`OJS API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const currentIssue = data.items?.[0] || null;

    if (!currentIssue) {
      return NextResponse.json(
        { error: 'No published issues found' },
        { status: 404 }
      );
    }

    return NextResponse.json(currentIssue);
  } catch (error) {
    console.error('Error fetching current issue:', error);
    return NextResponse.json(
      { error: `Failed to fetch current issue: ${error}` },
      { status: 500 }
    );
  }
}
