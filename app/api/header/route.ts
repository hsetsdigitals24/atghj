import { NextResponse } from 'next/server';
import { isOjsConfigured, ojsConfigErrorResponse, ojsFetch } from '@/app/lib/ojs';

interface CurrentIssueResponse {
  id: number;
  volume?: number;
  number?: string;
  year?: number;
  datePublished?: string;
  title?: string | { [locale: string]: string };
}

export async function GET() {
  if (!isOjsConfigured()) {
    return ojsConfigErrorResponse();
  }

  try {
    const response = await ojsFetch('/issues', {
      params: {
        isPublished: 'true',
        orderBy: 'datePublished',
        orderDirection: 'DESC',
        count: '1',
      },
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
        day: 'numeric',
      }),
    };

    return NextResponse.json(currentIssueData);
  } catch (error) {
    console.error('Error fetching current issue:', error);
    return NextResponse.json(
      { error: 'Failed to fetch current issue' },
      { status: 500 }
    );
  }
}
