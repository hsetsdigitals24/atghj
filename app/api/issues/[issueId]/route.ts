import { NextResponse } from 'next/server';
import { isOjsConfigured, ojsConfigErrorResponse, ojsFetch } from '@/app/lib/ojs';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ issueId: string }> }
) {
  const { issueId } = await params;

  if (!isOjsConfigured()) {
    return ojsConfigErrorResponse();
  }

  if (!issueId) {
    return NextResponse.json(
      { error: 'Issue ID is required' },
      { status: 400 }
    );
  }

  try {
    const response = await ojsFetch('/submissions', {
      params: {
        issueIds: issueId,
        status: '3',
        orderBy: 'sequence',
        orderDirection: 'ASC',
        count: '20',
      },
    });

    if (!response.ok) {
      throw new Error(`OJS API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching articles from OJS:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}
