'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Galley {
  id: number;
  label: string;
  submissionFileId: number;
  fileType?: string;
}

interface LocaleString {
  [locale: string]: string;
}

interface CoverImage {
  [locale: string]: {
    dateUploaded: string;
    uploadName: string;
    altText?: string;
  };
}

interface Publication {
  id: number;
  title?: LocaleString | string;
  fullTitle?: LocaleString | string;
  subtitle?: LocaleString | string;
  abstract?: LocaleString | string;
  doi?: string;
  galleys?: Galley[];
  authorsString?: string;
  authorsStringShort?: string;
  datePublished?: string;
  coverImage?: CoverImage;
  status?: number;
  locale?: string;
  pages?: string | null;
  submissionId?: number;
  version?: number;
  urlPublished?: string;
  [key: string]: any;
}

interface Submission {
  id: number;
  contextId: number;
  currentPublicationId: number;
  dateSubmitted: string;
  dateLastActivity: string;
  publications: Publication[];
  status: number;
  statusLabel: string;
  locale: string;
  editorAssigned: boolean;
  [key: string]: any;
}

interface ApiResponse {
  publication?: Publication;
  galley?: any;
  submission?: Submission;
}

export default function ArticlePreviewPage() {
  const params = useParams();
  const submissionsId = params.submissionsId as string;
  const publicationsId = params.publicationsId as string;

  const [submission, setSubmission] = useState<Submission | null>(null);
  const [publication, setPublication] = useState<Publication | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Helper function to extract string value from object or string
  const getStringValue = (value: any): string => {
    if (typeof value === 'string') return value;
    if (value && typeof value === 'object' && 'en' in value) return value.en;
    if (value && typeof value === 'object') {
      const firstKey = Object.keys(value)[0];
      return firstKey ? String(value[firstKey]) : '';
    }
    return '';
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `/api/submissions/${submissionsId}/publications/${publicationsId}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const result: ApiResponse = await response.json();
        
        // Check if result has submission data or just publication
        if (result.submission) {
          setSubmission(result.submission);
          // Get the latest version of the publication
          const publications = result.submission.publications || [];
          const latestPub = publications.reduce((latest: Publication | null, current: Publication) => {
            if (!latest) return current;
            return (current.version || 0) > (latest.version || 0) ? current : latest;
          }, null);
          setPublication(latestPub || null);
        } else if (result.publication) {
          setPublication(result.publication);
          console.log({"results": result})
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(`Error loading article: ${message}`);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    if (submissionsId && publicationsId) {
      fetchData();
    }
  }, [submissionsId, publicationsId]);

  const handleDownload = async () => {
    if (!publication) return;
    // This would require galley data - for now show message
    alert('PDF download feature requires galley data to be available');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="inline-block">
            <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-300 text-lg font-light">Loading article preview...</p>
        </div>
      </div>
    );
  }

  if (error || !publication) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-red-500/10 border border-red-500/50 rounded-lg p-6 backdrop-blur-sm">
          <h2 className="text-red-400 font-semibold text-lg mb-2">Error Loading Article</h2>
          <p className="text-slate-300 mb-4">{error || 'Publication not found'}</p>
          <Link
            href="/articles"
            className="inline-block text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  const title = getStringValue(publication.fullTitle || publication.title);
  const subtitle = getStringValue(publication.subtitle);
  const coverImageData = publication.coverImage?.en;
  const hasGalleys = publication.galleys && publication.galleys.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header Navigation */}
        <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/30 sticky top-0 z-20">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link
              href="/articles"
              className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <span className="text-sm font-medium">Back</span>
            </Link>
            <div className="text-sm text-slate-500">
              Submission #{submissionsId} • Publication #{publicationsId}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-6 py-12 space-y-8">
          {/* Hero Section with Cover Image */}
          <div className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {/* Cover Image */}
              {coverImageData && (
                <div className="md:col-span-1">
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 aspect-square">
                    <img
                      src={`https://dashboard.atghj.africa/public/journals/1/submissions/${submissionsId}/${publicationsId}/${coverImageData.uploadName}`}
                      alt={coverImageData.altText || 'Article cover'}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600"%3E%3Crect fill="%23334155" width="400" height="600"/%3E%3Ctext x="50%25" y="50%25" font-size="24" fill="%2394a3b8" text-anchor="middle" dominant-baseline="middle"%3ENo Cover Image%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Title and Meta */}
              <div className={`${coverImageData ? 'md:col-span-2' : 'md:col-span-3'} space-y-6`}>
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                    {title || 'Untitled Article'}
                  </h1>

                  {subtitle && (
                    <h2 className="text-2xl text-slate-300 font-light">
                      {subtitle}
                    </h2>
                  )}

                  {/* Authors */}
                  {publication.authorsString && (
                    <div className="pt-2">
                      <p className="text-slate-400 text-lg">
                        <span className="text-slate-500 font-medium">Authors:</span> {publication.authorsString}
                      </p>
                    </div>
                  )}
                </div>

                {/* Meta Information */}
                <div className="flex flex-wrap gap-6 text-sm pt-4 border-t border-slate-700">
                  {publication.datePublished && (
                    <div>
                      <p className="text-slate-500 uppercase text-xs font-medium tracking-wide">Published</p>
                      <p className="text-white text-base mt-1">
                        {new Date(publication.datePublished).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  )}
                  {publication.version && (
                    <div>
                      <p className="text-slate-500 uppercase text-xs font-medium tracking-wide">Version</p>
                      <p className="text-white text-base mt-1">v{publication.version}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-slate-500 uppercase text-xs font-medium tracking-wide">Status</p>
                    <p className="text-emerald-400 text-base mt-1 font-medium">Published</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-4">
                  {publication.urlPublished && (
                    <a
                      href={publication.urlPublished}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105 active:scale-95"
                    >
                      🔗 View Published
                    </a>
                  )}
                  {hasGalleys && (
                    <button
                      onClick={() => setPreviewOpen(true)}
                      className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 active:scale-95"
                    >
                      📄 View Galleys
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submission Details */}
          {submission && (
            <div className="animate-fade-in animation-delay-100">
              <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-slate-700/50 rounded-lg p-8 backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <span className="text-blue-400">📋</span> Submission Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">Submission ID</p>
                    <p className="text-white text-lg font-mono mt-1">{submission.id}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">Date Submitted</p>
                    <p className="text-white text-base mt-1">
                      {new Date(submission.dateSubmitted).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">Last Activity</p>
                    <p className="text-white text-base mt-1">
                      {new Date(submission.dateLastActivity).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Publication Details */}
          <div className="animate-fade-in animation-delay-200">
            <div className="bg-gradient-to-r from-emerald-600/10 to-teal-600/10 border border-slate-700/50 rounded-lg p-8 backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <span className="text-emerald-400">ℹ️</span> Publication Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">Publication ID</p>
                  <p className="text-white text-lg font-mono mt-1">{publication.id}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">Primary Contact ID</p>
                  <p className="text-white text-lg font-mono mt-1">{publication.primaryContactId}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">Language</p>
                  <p className="text-white text-lg mt-1 uppercase">{publication.locale}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">Section ID</p>
                  <p className="text-white text-lg font-mono mt-1">{publication.sectionId}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Galleys / Formats Section */}
          {hasGalleys && (
            <div className="animate-fade-in animation-delay-300">
              <div className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-slate-700/50 rounded-lg p-8 backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  <span className="text-purple-400">📄</span> Available Formats
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {publication.galleys?.map((galley: Galley) => (
                    <div
                      key={galley.id}
                      className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-all duration-200 hover:bg-slate-800"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-white text-lg">
                            {galley.label || 'Document'}
                          </h3>
                          <p className="text-sm text-slate-400 mt-1">
                            {galley.fileType || 'File'} • ID: {galley.submissionFileId}
                          </p>
                        </div>
                        <span className="text-2xl">
                          {galley.label === 'PDF' ? '📕' : '📄'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!hasGalleys && (
            <div className="animate-fade-in animation-delay-300 bg-amber-500/10 border border-amber-500/50 rounded-lg p-8 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📋</span>
                <div>
                  <p className="text-amber-200 font-semibold">No Galleys Available</p>
                  <p className="text-amber-100/70 text-sm mt-1">This publication does not have any galley files available yet.</p>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Galleys Preview Modal */}
        {previewOpen && hasGalleys && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setPreviewOpen(false)}
          >
            <div
              className="bg-slate-900 border border-slate-700 rounded-lg w-full max-w-4xl max-h-96 overflow-hidden flex flex-col animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="border-b border-slate-700 p-4 flex items-center justify-between bg-slate-800/50">
                <h3 className="text-white font-semibold">Available Galleys</h3>
                <button
                  onClick={() => setPreviewOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors text-2xl leading-none"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-auto bg-slate-950 p-6">
                <div className="space-y-4">
                  {publication.galleys?.map((galley: Galley) => (
                    <div key={galley.id} className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-semibold">{galley.label}</h4>
                          <p className="text-slate-400 text-sm mt-1">{galley.fileType || 'Unknown'} • File ID: {galley.submissionFileId}</p>
                        </div>
                        <span className="text-2xl">{galley.label === 'PDF' ? '📕' : '📄'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
        }

        .animation-delay-100 {
          animation-delay: 100ms;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </div>
  );
}
