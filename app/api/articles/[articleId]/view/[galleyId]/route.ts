import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { articleId: string; galleyId: string } }
) {
  const { articleId, galleyId } = params;
  
  const OJS_BASE_URL = process.env.NEXT_PUBLIC_OJS_API_URL;
  
  if (!OJS_BASE_URL) {
    return NextResponse.json(
      { error: 'OJS configuration missing' },
      { status: 500 }
    );
  }

  try {
    // Construct the view URL (inline display)
    const viewUrl = `${OJS_BASE_URL}/article/view/${articleId}/${galleyId}`;

    const response = await fetch(viewUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.status}`);
    }

    const fileBlob = await response.blob();
    const contentType = response.headers.get('content-type') || 'application/pdf';
    const arrayBuffer = await fileBlob.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': 'inline', // Display inline instead of download
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('Error viewing article file:', error);
    return NextResponse.json(
      { error: 'Failed to view file' },
      { status: 500 }
    );
  }
}
