import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ articleId: string }> }
) {
  const { articleId } = await params;
  
  const OJS_BASE_URL = process.env.NEXT_PUBLIC_OJS_API_URL;
  const OJS_API_KEY = process.env.NEXT_PUBLIC_OJS_API_KEY;
  
  if (!OJS_BASE_URL || !OJS_API_KEY) {
    return NextResponse.json(
      { error: 'OJS configuration missing' },
      { status: 500 }
    );
  }

  if (!articleId) {
    return NextResponse.json(
      { error: 'Article ID is required' },
      { status: 400 }
    );
  }

  try {
    // Get submission details
    const apiUrl = new URL(`${OJS_BASE_URL}/submissions/${articleId}/publications`); 
    apiUrl.searchParams.append('include', 'publications.galleys');
    apiUrl.searchParams.append('apiToken', OJS_API_KEY);

    // console.log('📤 Fetching article from:', apiUrl.toString());

    const response = await fetch(apiUrl.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 }
    });

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
    // console.log({"article fetched from OJS in route": article});

    return NextResponse.json(article);
  } catch (error) {
    console.error('❌ Error fetching article from OJS:', error);
    return NextResponse.json(
      { error: 'Failed to fetch article' },
      { status: 500 }
    );
  }
}
