import { NextRequest, NextResponse } from 'next/server';
import { isOjsConfigured, ojsConfigErrorResponse, ojsFetch } from '@/app/lib/ojs';

export async function GET(request: NextRequest) {
  if (!isOjsConfigured()) {
    return ojsConfigErrorResponse();
  }

  const searchParams = request.nextUrl.searchParams;
  const count = searchParams.get('count') || '100';
  const offset = searchParams.get('offset') || '0';
  const year = searchParams.get('year');
  const volume = searchParams.get('volume');

  try {
    const response = await ojsFetch('/issues', {
      params: {
        isPublished: 'true',
        orderBy: 'datePublished',
        orderDirection: 'DESC',
        count,
        offset,
        ...(year ? { years: year } : {}),
        ...(volume ? { volumes: volume } : {}),
      },
    });

    if (!response.ok) {
      throw new Error(`OJS API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching archive from OJS:', error);
    return NextResponse.json(
      { error: 'Failed to fetch archive' },
      { status: 500 }
    );
  }
}
