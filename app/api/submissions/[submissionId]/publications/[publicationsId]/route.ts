import { NextRequest, NextResponse } from 'next/server';

const OJS_API_BASE = process.env.NEXT_PUBLIC_OJS_API_URL;
const OJS_API_TOKEN = process.env.NEXT_PUBLIC_OJS_API_KEY;

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
  [key: string]: any;
}

interface GalleyDataResponse {
  galleyId: number;
  downloadUrl: string;
  publication?: Publication;
}

async function getPublicationData(
  submissionId: string | number,
  publicationId: string | number
): Promise<Publication | null> {
  try {
    // Ensure correct query parameter separator for apiToken 
    const url = `${OJS_API_BASE}/issues/${submissionId}/publications/${publicationId}?apiToken=${OJS_API_TOKEN}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const response = await fetch(url, { headers });

    if (!response.ok) {
      console.error(`OJS API error: ${response.status} ${response.statusText}`);
      return null;
    }

    const data: Publication = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching publication data:', error);
    return null;
  }
}

async function getGalleyData(
  submissionId: string | number,
  publicationId: string | number
): Promise<GalleyDataResponse | null> {
  try {
    const publication = await getPublicationData(submissionId, publicationId);

    if (!publication) {
      return null;
    }

    console.log({"publication": publication});

    const pdfGalley = publication.galleys?.find(g => g.label === 'PDF');

    if (pdfGalley) {
      const downloadUrl = `${OJS_API_BASE}/$$$call$$$/api/file/file-api/download-file?submissionFileId=${pdfGalley.submissionFileId}&submissionId=${submissionId}&stageId=3&apiToken=${OJS_API_TOKEN}`;
      return {
        galleyId: pdfGalley.id,
        downloadUrl,
        publication,
      };
    }

    return { galleyId: 0, downloadUrl: '', publication } as GalleyDataResponse | null;
  } catch (error) {
    console.error('Error getting galley data:', error);
    return null;
  }
}

export async function GET(
  request: NextRequest,
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

    if (!OJS_API_TOKEN || !OJS_API_BASE) {
      return NextResponse.json(
        { error: 'OJS API configuration not set' },
        { status: 500 }
      );
    }

    const publication = await getPublicationData(submissionId, publicationsId);

    if (!publication) {
      return NextResponse.json(
        { error: 'Publication not found' },
        { status: 404 }
      );
    }

    const galley = await getGalleyData(submissionId, publicationsId);

    return NextResponse.json({ publication, galley }, { status: 200 });
  } catch (error) {
    console.error('GET /api/submissions/[submissionId]/publications/[publicationsId] error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}