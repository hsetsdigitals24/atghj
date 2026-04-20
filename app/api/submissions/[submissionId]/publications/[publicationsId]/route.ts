import { NextRequest, NextResponse } from 'next/server';
import { isOjsConfigured, ojsConfigErrorResponse, ojsFetch } from '@/app/lib/ojs';

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

function buildGalleyData(
  submissionId: string,
  publication: Publication
): GalleyDataResponse {
  const pdfGalley = publication.galleys?.find((g) => g.label === 'PDF');

  if (!pdfGalley) {
    return { galleyId: 0, downloadPath: '', publication };
  }

  const downloadPath = `/$$$call$$$/api/file/file-api/download-file?submissionFileId=${pdfGalley.submissionFileId}&submissionId=${submissionId}&stageId=3`;

  return {
    galleyId: pdfGalley.id,
    downloadPath,
    publication,
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

    const publication = await getPublicationData(submissionId, publicationsId);

    if (!publication) {
      return NextResponse.json(
        { error: 'Publication not found' },
        { status: 404 }
      );
    }

    const galley = buildGalleyData(submissionId, publication);

    return NextResponse.json({ publication, galley }, { status: 200 });
  } catch (error) {
    console.error('GET /api/submissions/[submissionId]/publications/[publicationsId] error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
