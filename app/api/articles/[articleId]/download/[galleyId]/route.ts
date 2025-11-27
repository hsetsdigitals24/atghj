import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ articleId: string; fileId: string }> }
) {
  // ✅ Await params before destructuring
  const { articleId, fileId } = await params;

  const OJS_BASE_URL = process.env.NEXT_PUBLIC_OJS_API_URL;
  const OJS_API_KEY = process.env.NEXT_PUBLIC_OJS_API_KEY;

  if (!OJS_BASE_URL || !OJS_API_KEY) {
    return NextResponse.json(
      { error: 'OJS configuration missing' },
      { status: 500 }
    );
  }

  try {
    // Construct the file download URL
    const fileUrl = new URL(
      `${OJS_BASE_URL}/submissions/${articleId}/files/${fileId}`
    );
    fileUrl.searchParams.append('apiToken', OJS_API_KEY);

    console.log('📥 Downloading file from:', fileUrl.toString());

    const response = await fetch(fileUrl.toString());

    if (!response.ok) {
      console.error('❌ File download failed:', response.status);
      throw new Error(`Failed to download file: ${response.status}`);
    }

    // Get the file blob
    const fileBlob = await response.blob();
    const contentType = response.headers.get('content-type') || 'application/pdf';

    // Get filename from content-disposition header if available
    const contentDisposition = response.headers.get('content-disposition');
    let filename = `article-${articleId}-file-${fileId}.pdf`;

    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(
        /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
      );
      if (filenameMatch?.[1]) {
        filename = filenameMatch[1].replace(/['"]/g, '');
      }
    }

    // Convert blob to array buffer
    const arrayBuffer = await fileBlob.arrayBuffer();

    console.log('✅ File downloaded successfully:', filename);

    return new NextResponse(arrayBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('❌ Error downloading file:', error);
    return NextResponse.json(
      { error: 'Failed to download file' },
      { status: 500 }
    );
  }
}
