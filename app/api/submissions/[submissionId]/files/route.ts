import { NextRequest, NextResponse } from 'next/server';
import { isOjsConfigured, ojsConfigErrorResponse, ojsFetch } from '@/app/lib/ojs';

interface FileRevision {
  id: number;
  fileId: string;
  dateUploaded: string;
  documentType: string;
  fileType: string;
  genreName?: string | { [locale: string]: string };
  mimetype: string;
  path: string;
  url: string;
}

interface SubmissionFile {
  id: number;
  fileId: string;
  submissionId: number;
  submissionFileId?: number;
  documentType: string;
  fileType: string;
  genreName?: string | { [locale: string]: string };
  mimetype: string;
  path: string;
  url: string;
  uploadedFileName: string;
  createdAt?: string;
  updatedAt?: string;
  revisions?: FileRevision[];
}

interface FilesResponse {
  items?: SubmissionFile[];
  itemsMax?: number;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ submissionId: string }> }
) {
  try {
    const { submissionId } = await params;

    if (!submissionId) {
      return NextResponse.json(
        { error: 'Missing submissionId parameter' },
        { status: 400 }
      );
    }

    if (!isOjsConfigured()) {
      return ojsConfigErrorResponse();
    }

    // Fetch files from OJS API
    const response = await ojsFetch(`/submissions/${submissionId}/files`);

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Submission not found' },
          { status: 404 }
        );
      }
      console.error(
        `OJS API error fetching files: ${response.status} ${response.statusText}`
      );
      throw new Error(`OJS API error: ${response.status}`);
    }

    const data = (await response.json()) as FilesResponse;

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error(
      `GET /api/submissions/[submissionId]/files error: ${errorMessage}`,
      error
    );
    return NextResponse.json(
      { error: 'Failed to fetch submission files' },
      { status: 500 }
    );
  }
}
