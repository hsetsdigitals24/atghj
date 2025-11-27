import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ articleId: string; galleyId: string }> }
) {
  // ✅ Await params before destructuring
  const { articleId, galleyId } = await params;

  const OJS_BASE_URL = process.env.NEXT_PUBLIC_OJS_API_URL;
  const OJS_API_KEY = process.env.NEXT_PUBLIC_OJS_API_KEY;

  if (!OJS_BASE_URL || !OJS_API_KEY) {
    return NextResponse.json(
      { error: 'OJS configuration missing' },
      { status: 500 }
    );
  }

  try {
    // Fetch galley file from OJS
    const galleyUrl = new URL(
      `${OJS_BASE_URL}/submissions/${articleId}/galleys/${galleyId}`
    );
    galleyUrl.searchParams.append('apiToken', OJS_API_KEY);

    console.log('📥 Fetching galley metadata from:', galleyUrl.toString());

    const response = await fetch(galleyUrl.toString(), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      console.error('❌ Galley fetch failed:', response.status);
      throw new Error(`Failed to fetch galley: ${response.status}`);
    }

    const galleyData = await response.json();
    console.log('✅ Galley data retrieved:', galleyData);

    return NextResponse.json(galleyData);
  } catch (error) {
    console.error('❌ Error fetching galley:', error);
    return NextResponse.json(
      { error: 'Failed to fetch galley' },
      { status: 500 }
    );
  }
}
