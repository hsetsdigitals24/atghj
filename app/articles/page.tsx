'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BiCheck, BiEdit } from 'react-icons/bi';
import { TfiWrite } from 'react-icons/tfi';

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
  submissionFileId?: number;
}

interface Galley {
  id: number;
  label: string;
  locale: string;
  file?: SubmissionFile;
  urlPublished?: string;
  isApproved?: boolean;
  submissionFileId?: number;
}

interface Publication {
  id: number;
  title: { [locale: string]: string };
  subtitle?: { [locale: string]: string };
  fullTitle?: { [locale: string]: string };
  authorsString?: string;
  authorsStringShort?: string;
  authorsStringIncludeInBrowse?: string;
  pages?: string | null;
  datePublished?: string;
  doiObject?: { doi: string } | null;
  sectionId?: number;
  status?: number;
  urlPublished?: string;
  version?: number;
  locale?: string;
  galleys?: Galley[];
  submissionId?: number;
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
        console.log('Article Data:', data); 
        setArticle(data.items[0]);
      } catch (err) { 
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [articleId]);

  // console.log('Article Data:', article);

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

  // Handle both direct publication object and nested publications array
  let publication: Publication | null = null;
  
  if (article.publications && Array.isArray(article.publications)) {
    publication = article.publications.find(p => p.id === article.currentPublicationId) || null;
  } else if ('title' in article && 'datePublished' in article) {
    // If article IS the publication object
    publication = article as Publication;
  }

  if (!publication) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-yellow-800 mb-2">Publication Data Issue</h2>
          <p className="text-yellow-700">Publication data not available. Please try again later.</p>
          <Link href="/archive" className="inline-block mt-4 text-yellow-600 hover:underline">
            ← Back to Archive
          </Link>
        </div>
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

  // const getStageIcon = (label: string) => {
  //   const icons: { [key: string]: string } = {
  //     'Submission': '📝',
  //     'Review': '👀',
  //     'Copyediting': '✏️',
  //     'Production': '🖨️'
  //   };
  //   return icons[label] || '📋';
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Hero Header with Gradient */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-r from-primary/10 to-accent/10 border-b border-gray-200 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <motion.nav 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 text-sm text-gray-600 mb-6"
          >
            <Link href="/" className="hover:text-accent transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/archive" className="hover:text-accent transition-colors">Archive</Link>
            <span className="text-gray-400">/</span>
            <span className="text-accent font-semibold">Article #{article.id}</span>
          </motion.nav>

          {/* Status Badge */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm ${getStatusColor(article.status)} backdrop-blur-sm transition-all`}
              >
                {article.status === 3 && <BiCheck className="w-5 h-5" />}
                {article.statusLabel}
              </motion.span>
            </motion.div>

            {/* DOI if available */}
            {publication.doiObject?.doi && (
              <motion.a
                whileHover={{ scale: 1.02 }}
                href={`https://doi.org/${publication.doiObject.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent hover:underline"
              >
                DOI: {publication.doiObject.doi}
              </motion.a>
            )}
          </div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              {getLocalizedValue(publication.title)}
            </h1>

            {/* Authors */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-gray-700 mb-6 font-medium"
            >
              {publication.authorsString}
            </motion.p>

            {/* Publication Info */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 text-gray-600"
            >
              {publication.datePublished && (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{new Date(publication.datePublished).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              )}
              <span className="text-gray-400">•</span>
              <span>Version {publication.version}</span>
              {publication.pages && (
                <>
                  <span className="text-gray-400">•</span>
                  <span>pp. {publication.pages}</span>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* PDF Download & View Section - Featured */}
            {publication.galleys && publication.galleys.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="group relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                
                <div className="relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-accent/50 transition-all">
                  {/* Header */}
                  <div className="mb-8 pb-6 border-b border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl">
                        <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm0 2h12v10H4V5z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">Read Article</h2>
                        <p className="text-sm text-gray-600 mt-1">Download or view the full PDF publication</p>
                      </div>
                    </div>
                  </div>

                  {/* Author Info Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-4 mb-6 border border-primary/10"
                  >
                    <p className="text-xs text-gray-500 font-semibold uppercase mb-2">Authors</p>
                    <p className="text-sm font-semibold text-gray-900">{publication.authorsString}</p>
                    {publication.datePublished && (
                      <p className="text-xs text-gray-600 mt-2">
                        Published on {new Date(publication.datePublished).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    )}
                  </motion.div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {publication.galleys.map((galley, index) => (
                      <motion.div
                        key={galley.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="space-y-3"
                      >
                        {/* View Button */}
                        <motion.a
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          href={`https://dashboard.atghj.africa/index.php/journal/article/view/${article.id}/${galley.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-accent text-white font-semibold rounded-xl hover:shadow-lg transition-all group/btn"
                        >
                          <svg className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span>View PDF</span>
                        </motion.a>

                        {/* Download Button */}
                        <motion.a
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          href={`https://dashboard.atghj.africa/index.php/journal/article/download/${article.id}/${galley.id}`}
                          download
                          className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-xl transition-all group/btn"
                        >
                          <svg className="w-5 h-5 group-hover/btn:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          <span>Download PDF</span>
                        </motion.a>

                        {/* Galley Info */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.55 + index * 0.1 }}
                          className="flex items-center justify-between text-xs text-gray-600 bg-gray-50 px-4 py-3 rounded-lg"
                        >
                          <span className="font-medium capitalize">{galley.label} Version</span>
                          {galley.file?.mimetype && (
                            <span className="bg-accent/10 text-accent px-2 py-1 rounded font-semibold">
                              {galley.file.mimetype.split('/')[1].toUpperCase()}
                            </span>
                          )}
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Publication Details - Cards Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              
              {publication.pages && (
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-xl border border-gray-200 p-4 hover:border-accent/50 transition-all"
                >
                  <p className="text-xs text-gray-500 font-semibold uppercase mb-2">Pages</p>
                  <p className="text-lg font-bold text-gray-900">{publication.pages}</p>
                </motion.div>
              )}
              
              {article.editorAssigned && (
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl border border-green-200 p-4"
                >
                  <p className="text-xs text-green-600 font-semibold uppercase mb-2">Editor</p>
                  <p className="text-lg font-bold text-green-700">✓ Assigned</p>
                </motion.div>
              )}
            </motion.div>

            {/* Submission Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl border border-gray-200 p-8 hover:border-accent/50 transition-all"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <div className="p-2 bg-primary text-white rounded-lg">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                Submission Timeline
              </h2>

              <div className="space-y-4">
                {/* Submitted */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex gap-4"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-accent font-bold shadow-lg">
                     <TfiWrite className="w-6 h-6"/>
                    </div>
                    <div className="w-1 h-12 bg-gradient-to-b from-accent to-transparent mt-2"></div>
                  </div>
                  <div className="pb-4">
                    <p className="font-semibold text-gray-900">Submitted</p>
                    <p className="text-sm text-gray-600">
                      {article.dateSubmitted ? new Date(article.dateSubmitted).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                    </p>
                  </div>
                </motion.div>

                {/* Last Modified */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.75 }}
                  className="flex gap-4"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full  bg-gray-200 flex items-center justify-center text-accent font-bold shadow-lg">
                    <BiEdit className="w-6 h-6" />
                    </div>
                    <div className="w-1 h-12 bg-gradient-to-b from-accent to-transparent mt-2"></div>
                  </div>
                  <div className="pb-4">
                    <p className="font-semibold text-gray-900">Last Modified</p>
                    <p className="text-sm text-gray-600">
                      {article.lastModified ? new Date(article.lastModified).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                    </p>
                  </div>
                </motion.div>

                {/* Published */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex gap-4"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-accent font-bold shadow-lg">
                      <BiCheck className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Published</p>
                    <p className="text-sm text-gray-600">
                      {publication.datePublished ? new Date(publication.datePublished).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Comments for Editors */}
            {article.commentsForTheEditors && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200 rounded-2xl p-8"
              >
                <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  Author Comments
                </h3>
                <div 
                  className="text-blue-900 prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: article.commentsForTheEditors }}
                />
              </motion.div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Article Metadata Card */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-accent/50 transition-all hover:shadow-lg"
            >
              <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                Article Info
              </h3>
              <div className="space-y-4 text-sm">
                <div className="pb-4 border-b border-gray-200">
                  <p className="text-gray-600 font-medium mb-1">Article ID</p>
                  <p className="font-mono font-bold text-accent text-lg">#{article.id}</p>
                </div>
                <div className="pb-4 border-b border-gray-200">
                  <p className="text-gray-600 font-medium mb-1">Status</p>
                  <motion.span 
                    whileHover={{ scale: 1.05 }}
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(article.status)}`}
                  >
                    {article.status === 3 && <> <BiCheck className="w-4 h-4" /> P   ublished</>}
                  </motion.span>
                </div>
                <div>
                  <p className="text-gray-600 font-medium mb-1">Publication Version</p>
                  <p className="font-bold text-gray-900">v{publication.version}</p>
                </div>
              </div>
            </motion.div>

            
            {/* Publication Stats */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-gradient-to-br from-accent/5 to-primary/5 rounded-2xl border border-accent/20 p-6 hover:border-accent/50 transition-all"
            >
              <h3 className="font-bold text-gray-900 mb-4">Publication Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Section</span>
                  <span className="font-semibold text-gray-900">{publication.sectionId ? `Section ${publication.sectionId}` : 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Locale</span>
                  <span className="font-semibold text-gray-900 uppercase">{publication.locale}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Type</span>
                  <span className="font-semibold text-accent">Article</span>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-primary to-accent rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all"
            >
              <p className="text-sm font-semibold opacity-90 mb-3">Interested in publishing?</p>
              <Link 
                href="/submit"
                className="inline-flex items-center gap-2 font-bold hover:gap-3 transition-all"
              >
                Submit Your Research
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
