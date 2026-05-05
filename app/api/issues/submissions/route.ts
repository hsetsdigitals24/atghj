import { NextRequest, NextResponse } from 'next/server';
import { isOjsConfigured, ojsConfigErrorResponse, ojsFetch } from '@/app/lib/ojs';

interface Author {
  id: number;
  fullName: string;
}

interface Publication {
  id: number;
  title: string | { [locale: string]: string };
  abstract?: string | { [locale: string]: string };
  authors?: Author[];
  pages?: string;
  datePublished?: string;
  urlPublished?: string;
  doiObject?: {
    doi?: string;
  };
}

interface Submission {
  id: number;
  currentPublicationId: number;
  publications: Publication[];
  status: number;
  sectionId?: number;
  sectionTitle?: string;
}

interface IssueData {
  id: number;
  title: string | { [locale: string]: string };
  volume?: number;
  number?: string;
  year?: number;
  description?: string | { [locale: string]: string };
  coverImageUrl?: { en: string };
  datePublished?: string;
}

interface SubmissionsResponse {
  issue: IssueData | null;
  articles: Submission[];
  itemsMax: number;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const issueId = searchParams.get('issueId') || '1';

  if (!isOjsConfigured()) {
    return ojsConfigErrorResponse();
  }

  if (!issueId) {
    return NextResponse.json(
      { error: 'issueId is required' },
      { status: 400 }
    );
  }

  try {
    const [articlesResponse, issueResponse] = await Promise.all([
      ojsFetch('/submissions/', {
        params: {
          issueIds: issueId,
          status: '3',
          orderBy: 'sequence',
          orderDirection: 'ASC',
          count: '100',
        },
      }),
      ojsFetch(`/issues/${issueId}`),
    ]);

    if (!articlesResponse.ok) {
      throw new Error(`OJS API error: ${articlesResponse.status}`);
    }

    const articlesData = await articlesResponse.json();
    const articles = articlesData.items || [];

    let issue: IssueData | null = null;
    if (issueResponse.ok) {
      issue = await issueResponse.json();
    }

    const response: SubmissionsResponse = {
      issue,
      articles,
      itemsMax: articlesData.itemsMax || articles.length,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}
