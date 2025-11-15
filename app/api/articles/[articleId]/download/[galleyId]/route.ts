
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
    // Construct the download URL
    // Format: /article/download/{submissionId}/{galleyId}
    const downloadUrl = `${OJS_BASE_URL}/article/download/${articleId}/${galleyId}`;

    // Fetch the file from OJS
    const response = await fetch(downloadUrl);

    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.status}`);
    }

    // Get the file as a blob
    const fileBlob = await response.blob();
    
    // Get content type from the response
    const contentType = response.headers.get('content-type') || 'application/pdf';
    
    // Get filename from content-disposition header if available
    const contentDisposition = response.headers.get('content-disposition');
    let filename = `article-${articleId}.pdf`;
    
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
      if (filenameMatch && filenameMatch[1]) {
        filename = filenameMatch[1].replace(/['"]/g, '');
      }
    }

    // Convert blob to array buffer
    const arrayBuffer = await fileBlob.arrayBuffer();
    
    // Return the file with appropriate headers
    return new NextResponse(arrayBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'public, max-age=86400', // Cache for 1 day
      },
    });
  } catch (error) {
    console.error('Error downloading article file:', error);
    return NextResponse.json(
      { error: 'Failed to download file' },
      { status: 500 }
    );
  }
}
