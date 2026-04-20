import { NextResponse } from 'next/server';
import { isOjsConfigured, ojsConfigErrorResponse, ojsFetch } from '@/app/lib/ojs';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ articleId: string }> }
) {
  const { articleId } = await params;

  if (!isOjsConfigured()) {
    return ojsConfigErrorResponse();
  }

  if (!articleId) {
    return NextResponse.json(
      { error: 'Article ID is required' },
      { status: 400 }
    );
  }

  try {
    const response = await ojsFetch(`/submissions/${articleId}/publications`);

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Article not found' },
          { status: 404 }
        );
      }
      throw new Error(`OJS API error: ${response.status}`);
    }

    const article = await response.json();
    return NextResponse.json(article);
  } catch (error) {
    console.error('Error fetching article from OJS:', error);
    return NextResponse.json(
      { error: 'Failed to fetch article' },
      { status: 500 }
    );
  }
}
