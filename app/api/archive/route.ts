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

  // Get query parameters
  const searchParams = request.nextUrl.searchParams;
  const count = searchParams.get('count') || '100';
  const offset = searchParams.get('offset') || '0';
  const year = searchParams.get('year');
  const volume = searchParams.get('volume');

  try {
    const apiUrl = new URL(`${OJS_BASE_URL}/issues`);
    apiUrl.searchParams.append('apiToken', OJS_API_KEY);
    apiUrl.searchParams.append('isPublished', '1');
    apiUrl.searchParams.append('orderBy', 'datePublished');
    apiUrl.searchParams.append('orderDirection', 'DESC');
    apiUrl.searchParams.append('count', count);
    apiUrl.searchParams.append('offset', offset);
    
    // Add filters if provided
    if (year) {
      apiUrl.searchParams.append('years', year);
    }
    if (volume) {
      apiUrl.searchParams.append('volumes', volume);
    }

    const response = await fetch(apiUrl.toString(), {
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
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching archive from OJS:', error);
    return NextResponse.json(
      { error: 'Failed to fetch archive' },
      { status: 500 }
    );
  }
}
