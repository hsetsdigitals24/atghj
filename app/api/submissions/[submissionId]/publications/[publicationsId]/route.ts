import { NextRequest, NextResponse } from 'next/server';
import { isOjsConfigured, ojsConfigErrorResponse, ojsFetch } from '@/app/lib/ojs';

interface SubmissionFile {
  id: number;
  fileId: string;
  documentType: string;
  fileType: string;
  genreName?: string | { [locale: string]: string };
  mimetype: string;
  path: string;
  url: string;
  uploadedFileName: string;
}

interface Galley {
  id: number;
  label: string;
  submissionFileId: number;
  fileType?: string;
}

interface Publication {
  id: number;
  title?: string;
  abstract?: string;
  doi?: string;
  galleys?: Galley[];
  [key: string]: unknown;
}

interface GalleyDataResponse {
  galleyId: number;
  downloadPath: string;
  publication?: Publication;
  files?: SubmissionFile[];
}

async function getPublicationData(
  submissionId: string,
  publicationId: string
): Promise<Publication | null> {
  try {
    const response = await ojsFetch(
      `/submissions/${submissionId}/publications/${publicationId}`
    );

    if (!response.ok) {
      console.error(`OJS API error: ${response.status} ${response.statusText}`);
      return null;
    }

    return (await response.json()) as Publication;
  } catch (error) {
    console.error('Error fetching publication data:', error);
    return null;
  }
}

async function getSubmissionFiles(
  submissionId: string
): Promise<SubmissionFile[]> {
  try {
    const response = await ojsFetch(`/submissions/${submissionId}/files`);

    if (!response.ok) {
      console.error(`OJS API error fetching files: ${response.status}`);
      return [];
    }

    const data = await response.json();
    return (data.items || []) as SubmissionFile[];
  } catch (error) {
    console.error('Error fetching submission files:', error);
    return [];
  }
}

function buildGalleyData(
  submissionId: string,
  publication: Publication,
  files: SubmissionFile[]
): GalleyDataResponse {
  const pdfGalley = publication.galleys?.find((g) => g.label === 'PDF');

  if (!pdfGalley) {
    return { galleyId: 0, downloadPath: '', publication, files };
  }

  // Try to find matching file from the files list
  const matchingFile = files.find(f => f.id === pdfGalley.submissionFileId);
  
  // Use OJS file URL if available, otherwise fall back to constructed path
  const downloadPath = matchingFile?.url || `/$$$call$$$/api/file/file-api/download-file?submissionFileId=${pdfGalley.submissionFileId}&submissionId=${submissionId}&stageId=3`;

  return {
    galleyId: pdfGalley.id,
    downloadPath,
    publication,
    files,
  };
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ submissionId: string; publicationsId: string }> }
) {
  try {
    const { submissionId, publicationsId } = await params;

    if (!submissionId || !publicationsId) {
      return NextResponse.json(
        { error: 'Missing submissionId or publicationsId parameters' },
        { status: 400 }
      );
    }

    if (!isOjsConfigured()) {
      return ojsConfigErrorResponse();
    }

    // Fetch publication and files in parallel
    const [publication, files] = await Promise.all([
      getPublicationData(submissionId, publicationsId),
      getSubmissionFiles(submissionId),
    ]);

    if (!publication) {
      return NextResponse.json(
        { error: 'Publication not found' },
        { status: 404 }
      );
    }

    const galley = buildGalleyData(submissionId, publication, files);

    return NextResponse.json({ publication, galley }, { status: 200 });
  } catch (error) {
    console.error('GET /api/submissions/[submissionId]/publications/[publicationsId] error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
