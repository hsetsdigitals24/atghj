'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Download, Eye, FileText, Calendar, Users, BookOpen, ArrowLeft, File, X } from 'lucide-react';

interface FileRevision {
  documentType: string;
  fileId: string;
  mimetype: string;
  path: string;
  url: string;
}

interface SubmissionFile {
  _href: string;
  id: number;
  fileId: number;
  submissionFileId: number;
  submissionId: number;
  name: { [locale: string]: string };
  mimetype: string;
  documentType: string;
  genreName: { [locale: string]: string };
  revisions: FileRevision[];
  url: string;
  [key: string]: any;
}

interface Galley {
  id: number;
  label: string;
  submissionFileId: number;
  publicationId: number;
  locale: string;
  file?: SubmissionFile;
  urlPublished?: string;
  isApproved: boolean;
  [key: string]: any;
}

interface Publication {
  id: number;
  submissionId: number;
  title?: { [locale: string]: string } | string;
  fullTitle?: { [locale: string]: string } | string;
  subtitle?: { [locale: string]: string } | string;
  abstract?: { [locale: string]: string } | string;
  datePublished?: string;
  galleys?: Galley[];
  authorsString?: string;
  pages?: string | null;
  version?: number;
  locale?: string;
  urlPublished?: string;
  coverImage?: { [locale: string]: { dateUploaded: string; uploadName: string; altText?: string } | null };
  status?: number;
  sectionId?: number;
  primaryContactId?: number;
  [key: string]: any;
}

interface Submission {
  id: number;
  dateSubmitted: string;
  statusLabel: string;
  [key: string]: any;
}

export default function ArticlePreviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [publication, setPublication] = useState<Publication | null>(null);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [previewingId, setPreviewingId] = useState<number | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    try {
      const publicationParam = searchParams.get('publication');
      const submissionParam = searchParams.get('submission');

      if (publicationParam) {
        const parsedPublication = JSON.parse(publicationParam);
        setPublication(parsedPublication);
      }

      if (submissionParam) {
        const parsedSubmission = JSON.parse(submissionParam);
        setSubmission(parsedSubmission);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error parsing query parameters:', error);
      setLoading(false);
    }
  }, [searchParams]);

  const getStringValue = (value: any): string => {
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && value !== null) {
      return value['en'] || value['en_US'] || Object.values(value)[0] || '';
    }
    return '';
  };

  const constructDownloadLink = (galley: Galley): string => {
    try {
      if (!publication || !submission) return '';

      const OJS_API_BASE = process.env.NEXT_PUBLIC_OJS_API_URL;
      const OJS_API_TOKEN = process.env.NEXT_PUBLIC_OJS_API_KEY;

      if (!OJS_API_BASE || !OJS_API_TOKEN) {
        console.error('Missing OJS API configuration');
        return '';
      }

      // Construct proper OJS download link
      const downloadUrl = `${OJS_API_BASE}/$$$call$$$/api/file/file-api/download-file?submissionFileId=${galley.submissionFileId}&submissionId=${publication.submissionId}&stageId=5&apiToken=${OJS_API_TOKEN}`;

      console.log('Constructed download URL:', downloadUrl);
      console.log('Galley submission file ID:', galley.submissionFileId);
      console.log('Publication submission ID:', publication.submissionId);

      return downloadUrl;
    } catch (error) {
      console.error('Error constructing download link:', error);
      return '';
    }
  };

  const constructPreviewLink = (galley: Galley): string => {
    // For preview, use the same download link
    return constructDownloadLink(galley);
  };

  const constructViewLink = (galley: Galley): string => {
    try {
      if (!galley.urlPublished) return '';

      console.log('Constructed view URL:', galley.urlPublished);
      return galley.urlPublished;
    } catch (error) {
      console.error('Error constructing view link:', error);
      return '';
    }
  };

  const handlePreview = (galley: Galley) => {
    const previewLink = constructPreviewLink(galley);
    if (previewLink) {
      setPreviewingId(galley.id);
      setPreviewUrl(previewLink);
    }
  };

  const handleDownload = async (galley: Galley) => {
    setDownloadingId(galley.id);
    try {
      const downloadUrl = constructDownloadLink(galley);

      if (!downloadUrl) {
        console.error('No download URL found for galley');
        setDownloadingId(null);
        return;
      }

      const link = document.createElement('a');
      link.href = downloadUrl;
      const fileName = galley.file?.name
        ? getStringValue(galley.file.name)
        : `${getStringValue(publication?.title)}-${galley.label}`;
      link.download = fileName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setDownloadingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-900">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!publication) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 p-8">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
          <div className="text-center text-gray-900">
            <p>Article not found</p>
          </div>
        </div>
      </div>
    );
  }

  const title = getStringValue(publication.fullTitle || publication.title);
  const subtitle = getStringValue(publication.subtitle);
  const authors = publication.authorsString || 'Unknown Authors';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Articles
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-gray-200">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-50"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="animate-fadeIn">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">{title}</h1>
            {subtitle && <p className="text-xl text-gray-700 mb-4">{subtitle}</p>}

            <div className="flex flex-wrap gap-6 text-gray-700 mt-6">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-blue-600" />
                <span>{authors}</span>
              </div>
              {publication.datePublished && (
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-blue-600" />
                  <span>{new Date(publication.datePublished).toLocaleDateString()}</span>
                </div>
              )}
              {publication.pages && (
                <div className="flex items-center gap-2">
                  <BookOpen size={18} className="text-blue-600" />
                  <span>Pages: {publication.pages}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Galleys Section */}
          <div className="lg:col-span-2 animate-fadeIn" style={{ animationDelay: '100ms' }}>
            {publication.galleys && publication.galleys.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-8 hover:border-gray-300 hover:shadow-md transition-all mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Available Formats</h2>
                <div className="space-y-4">
                  {publication.galleys.map((galley) => {
                    const fileName = galley.file?.name
                      ? getStringValue(galley.file.name)
                      : `Article - ${galley.label.toUpperCase()}`;
                    const fileMimetype = galley.file?.mimetype || 'application/pdf';
                    const previewLink = constructPreviewLink(galley);
                    const downloadLink = constructDownloadLink(galley);
                    const viewLink = constructViewLink(galley);

                    return (
                      <div
                        key={galley.id}
                        className="flex items-center justify-between bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                            <File size={24} className="text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-900 font-semibold text-lg">{fileName}</p>
                            <div className="flex gap-4 text-sm text-gray-600 mt-1">
                              <span>{fileMimetype}</span>
                              {galley.isApproved && (
                                <span className="text-green-600">✓ Approved</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {viewLink && (
                            <Link
                              href={viewLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all"
                            >
                              <Eye size={18} />
                              View
                            </Link>
                          )}
                          {previewLink && (
                            <button
                              onClick={() => handlePreview(galley)}
                              className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 px-4 py-2 rounded-lg transition-all"
                            >
                              <FileText size={18} />
                              Preview
                            </button>
                          )}
                          {downloadLink && (
                            <a
                              href={downloadLink}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
                              onClick={(e) => {
                                e.preventDefault();
                                handleDownload(galley);
                              }}
                            >
                              <Download size={18} />
                              {downloadingId === galley.id ? 'Downloading...' : 'Download'}
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="animate-fadeIn" style={{ animationDelay: '200ms' }}>
            {submission && (
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 hover:border-gray-300 hover:shadow-md transition-all">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Submission Details</h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div>
                    <p className="text-gray-600">Submission ID</p>
                    <p className="text-gray-900 font-medium">{submission.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Status</p>
                    <p className="text-gray-900 font-medium">{submission.statusLabel}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Submitted</p>
                    <p className="text-gray-900 font-medium">
                      {new Date(submission.dateSubmitted).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 hover:shadow-md transition-all">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Publication Info</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <p className="text-gray-600">Publication ID</p>
                  <p className="text-gray-900 font-medium">{publication.id}</p>
                </div>
                <div>
                  <p className="text-gray-600">Submission ID</p>
                  <p className="text-gray-900 font-medium">{publication.submissionId}</p>
                </div>
                <div>
                  <p className="text-gray-600">Version</p>
                  <p className="text-gray-900 font-medium">{publication.version || 1}</p>
                </div>
                <div>
                  <p className="text-gray-600">Section ID</p>
                  <p className="text-gray-900 font-medium">{publication.sectionId || 'N/A'}</p>
                </div>
              </div>

              {publication.urlPublished && (
                <Link
                  href={publication.urlPublished}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
                >
                  <Eye size={18} />
                  View on Journal
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* PDF Preview Modal */}
      {previewUrl && previewingId !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">PDF Preview</h3>
              <button
                onClick={() => {
                  setPreviewingId(null);
                  setPreviewUrl(null);
                }}
                className="text-gray-600 hover:text-gray-900"
              >
                <X size={24} />
              </button>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 overflow-auto bg-gray-100">
              <iframe
                src={`${previewUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                className="w-full h-full"
                title="PDF Preview"
              />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
              <p className="text-sm text-gray-600">Preview powered by your browser's PDF viewer</p>
              <a
                href={previewUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
              >
                <Download size={18} />
                Download PDF
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}