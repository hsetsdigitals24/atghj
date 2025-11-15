'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Stage {
  id: number;
  label: string;
  isActiveStage: boolean;
  editorAssigned: boolean;
  currentUserAssignedRoles: number[];
  uploadedFilesCount: number | null;
}

interface Participant {
  id: number;
  fullName: string;
  canLoginAs: boolean;
}

interface FileRevision {
  documentType: string;
  fileId: string;
  mimetype: string;
  path: string;
  url: string;
}

interface SubmissionFile {
  id: number;
  name: { [locale: string]: string };
  mimetype: string;
  documentType: string;
  genreName: { [locale: string]: string };
  url: string;
  revisions?: FileRevision[];
}

interface Galley {
  id: number;
  label: string;
  locale: string;
  file?: SubmissionFile;
  urlPublished?: string;
  isApproved?: boolean;
}

interface Publication {
  id: number;
  title: { [locale: string]: string };
  subtitle?: { [locale: string]: string };
  fullTitle?: { [locale: string]: string };
  authorsString?: string;
  authorsStringShort?: string;
  pages?: string | null;
  datePublished?: string;
  doiObject?: { doi: string } | null;
  sectionId?: number;
  status?: number;
  urlPublished?: string;
  version?: number;
  locale?: string;
  galleys?: Galley[];
}

interface Submission {
  id: number;
  currentPublicationId: number;
  publications: Publication[];
  status: number;
  statusLabel?: string;
  dateSubmitted?: string;
  dateLastActivity?: string;
  lastModified?: string;
  issueToBePublished?: number | null;
  editorAssigned?: boolean;
  commentsForTheEditors?: string;
  participants?: Participant[];
  stages?: Stage[];
  stageId?: number;
  urlPublished?: string;
  urlAuthorWorkflow?: string;
  urlEditorialWorkflow?: string;
  urlWorkflow?: string;
}

export default function ArticlePage() {
  const params = useParams();
  const articleId = params.articleId as string;
  const [article, setArticle] = useState<Submission | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const response = await fetch(`/api/articles/${articleId}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Article not found');
          }
          throw new Error('Failed to fetch article');
        }

        const data = await response.json();
        setArticle(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
    console.log({"articleId in ArticlePage component": article});
  }, [articleId, article]);

  const getLocalizedValue = (value: string | { [locale: string]: string } | undefined) => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    return value['en'] || value['en_US'] || Object.values(value)[0] || '';
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
          <Link href="/" className="inline-block mt-4 text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto p-8">
        <p>Article not found.</p>
      </div>
    );
  }

  const publication = article.publications.find(
    p => p.id === article.currentPublicationId
  );

  if (!publication) {
    return (
      <div className="container mx-auto p-8">
        <p>Publication data not available.</p>
      </div>
    );
  }

  const getStatusColor = (status: number) => {
    const statusMap: { [key: number]: string } = {
      1: 'bg-yellow-100 text-yellow-800',
      3: 'bg-green-100 text-green-800',
      4: 'bg-blue-100 text-blue-800',
      5: 'bg-purple-100 text-purple-800'
    };
    return statusMap[status] || 'bg-gray-100 text-gray-800';
  };

  const getStageIcon = (label: string) => {
    const icons: { [key: string]: string } = {
      'Submission': '📝',
      'Review': '👀',
      'Copyediting': '✏️',
      'Production': '🖨️'
    };
    return icons[label] || '📋';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header with Status */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-4">
            <nav className="text-sm text-gray-500">
              <Link href="/" className="text-accent hover:underline">Home</Link>
              <span className="mx-2">/</span>
              <span>Article #{article.id}</span>
            </nav>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(article.status)}`}>
              {article.statusLabel}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {getLocalizedValue(publication.title)}
          </h1>
          
          {publication.subtitle && (
            <p className="text-xl text-gray-600 mb-4">
              {getLocalizedValue(publication.subtitle)}
            </p>
          )}

          <p className="text-gray-600">
            {publication.authorsString}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Article Content */}
          <div className="lg:col-span-2">
            {/* Metadata Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {publication.datePublished && (
                <div className="bg-white rounded-lg border p-4">
                  <p className="text-xs text-gray-500 font-semibold uppercase">Published</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">
                    {new Date(publication.datePublished).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              )}
              {publication.pages && (
                <div className="bg-white rounded-lg border p-4">
                  <p className="text-xs text-gray-500 font-semibold uppercase">Pages</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">{publication.pages}</p>
                </div>
              )}
              {publication.version && (
                <div className="bg-white rounded-lg border p-4">
                  <p className="text-xs text-gray-500 font-semibold uppercase">Version</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">v{publication.version}</p>
                </div>
              )}
              {article.editorAssigned && (
                <div className="bg-white rounded-lg border p-4">
                  <p className="text-xs text-gray-500 font-semibold uppercase">Editor</p>
                  <p className="text-sm font-bold text-accent mt-1">✓ Assigned</p>
                </div>
              )}
            </div>

            {/* Submission Details */}
            <div className="bg-white rounded-lg border p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Submission Details</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Submitted</p>
                  <p className="font-semibold text-gray-900">
                    {article.dateSubmitted ? new Date(article.dateSubmitted).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Last Modified</p>
                  <p className="font-semibold text-gray-900">
                    {article.lastModified ? new Date(article.lastModified).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* Workflow Stages */}
            {article.stages && article.stages.length > 0 && (
              <div className="bg-white rounded-lg border p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Submission Workflow</h2>
                <div className="space-y-3">
                  {article.stages.map((stage, id) => (
                    <div key={id} className="flex items-center gap-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                        stage.isActiveStage 
                          ? 'bg-accent text-white' 
                          : stage.id < article.stageId! 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {getStageIcon(stage.label).charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{stage.label}</p>
                        <p className="text-sm text-gray-600">
                          {stage.isActiveStage && '🔵 Current stage'}
                          {stage.id < article.stageId! && '✅ Completed'}
                          {stage.id > article.stageId! && '⏳ Pending'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comments for Editors */}
            {article.commentsForTheEditors && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">Comments for Editors</h3>
                <div 
                  className="text-blue-900 prose max-w-none text-sm"
                  dangerouslySetInnerHTML={{ __html: article.commentsForTheEditors }}
                />
              </div>
            )}

            {/* Galleys / Document Downloads */}
            {publication.galleys && publication.galleys.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Versions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {publication.galleys.map((galley) => {
                    const fileName = galley.file?.name 
                      ? (typeof galley.file.name === 'string' 
                        ? galley.file.name 
                        : galley.file.name['en'] || Object.values(galley.file.name)[0])
                      : `${galley.label} File`;
                    
                    const fileUrl = galley.file?.url || galley.urlPublished;
                    const genreName = galley.file?.genreName
                      ? (typeof galley.file.genreName === 'string'
                        ? galley.file.genreName
                        : galley.file.genreName['en'] || Object.values(galley.file.genreName)[0])
                      : 'Article';

                    return (
                      <div 
                        key={galley.id} 
                        className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-accent hover:shadow-lg transition-all"
                      >
                        {/* File Type Icon */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                              {galley.file?.mimetype?.includes('pdf') && (
                                <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm0 2h12v10H4V5z" />
                                </svg>
                              )}
                              {galley.file?.mimetype?.includes('word') && (
                                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4z" />
                                </svg>
                              )}
                              {!galley.file?.mimetype?.includes('pdf') && !galley.file?.mimetype?.includes('word') && (
                                <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                </svg>
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600">{genreName}</p>
                              <p className="text-xs text-gray-500">v{publication.version}</p>
                            </div>
                          </div>
                          {galley.isApproved && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              ✓ Approved
                            </span>
                          )}
                        </div>

                        {/* File Name */}
                        <p className="text-sm font-semibold text-gray-900 mb-4 line-clamp-2">
                          {fileName}
                        </p>

                        {/* File Info */}
                        <div className="mb-4 flex items-center gap-4 text-xs text-gray-600">
                          <span>{galley.file?.mimetype?.split('/')[1]?.toUpperCase() || 'FILE'}</span>
                          {galley.file?.documentType && (
                            <span className="capitalize">{galley.file.documentType}</span>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          {fileUrl && (
                            <a
                              href={`/article/download/${article.id.toString()}/${galley.id.toString()}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-2 bg-accent text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors font-medium text-sm"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              Download
                            </a>
                          )}
                          {galley.urlPublished && (
                            <a
                              href={`/article/view/${article.id.toString()}/${galley.id.toString()}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-2 border border-accent text-accent px-4 py-2 rounded-lg hover:bg-accent/5 transition-colors font-medium text-sm"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              View
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* View Full Article Button */}
            {publication.urlPublished && (
              <div>
                <a
                  href={publication.urlPublished}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  View Full Article on Journal
                </a>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Participants */}
            {article.participants && article.participants.length > 0 && (
              <div className="bg-white rounded-lg border p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-4">Participants</h3>
                <div className="space-y-3">
                  {article.participants.map((participant) => (
                    <div key={participant.id} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{participant.fullName}</span>
                      {participant.canLoginAs && (
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          Author
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border p-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {article.urlPublished && (
                  <a
                    href={article.urlPublished}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-gray-100 text-gray-900 px-4 py-2 rounded hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    View Article
                  </a>
                )}
                {article.urlEditorialWorkflow && (
                  <a
                    href={article.urlEditorialWorkflow}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-accent/10 text-accent px-4 py-2 rounded hover:bg-accent/20 transition-colors text-sm font-medium"
                  >
                    Editorial Dashboard
                  </a>
                )}
              </div>
            </div>

            {/* Article Info */}
            <div className="bg-white rounded-lg border p-6">
              <h3 className="font-bold text-gray-900 mb-4">Article Info</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-600">ID</p>
                  <p className="font-mono font-semibold text-gray-900">#{article.id}</p>
                </div>
                <div>
                  <p className="text-gray-600">Status</p>
                  <p className="font-semibold text-gray-900">{article.statusLabel}</p>
                </div>
                <div>
                  <p className="text-gray-600">Publication Version</p>
                  <p className="font-semibold text-gray-900">v{publication.version}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
