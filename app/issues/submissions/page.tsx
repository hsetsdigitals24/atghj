'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface Author {
  id: number;
  fullName: string;
}

interface Publication {
  id: number;
  title: string | { [locale: string]: string };
  abstract?: string | { [locale: string]: string };
  authors?: Author[];
  pages?: string;
  datePublished?: string;
  urlPublished?: string;
  doiObject?: {
    doi?: string;
  };
}

interface Submission {
  id: number;
  currentPublicationId: number;
  publications: Publication[];
  status: number;
  sectionId?: number;
  sectionTitle?: string;
}

interface IssueData {
  id: number;
  title: string | { [locale: string]: string };
  volume?: number;
  number?: string;
  year?: number;
  description?: string | { [locale: string]: string };
  coverImageUrl?: { en: string };
  datePublished?: string;
}

function SubmissionsContent() {
  const searchParams = useSearchParams();
  const issueId = searchParams.get('issueId') || '1';

  const [articles, setArticles] = useState<Submission[]>([]);
  const [issue, setIssue] = useState<IssueData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(`/api/issues/submissions?issueId=${issueId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch submissions');
        }
        const data = await response.json();
        setArticles(data.articles || []);
        setIssue(data.issue || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [issueId]);

  const getLocalizedValue = (value: string | { [locale: string]: string }): string => {
    if (typeof value === 'string') return value;
    return value['en'] || value['en_US'] || Object.values(value)[0] || '';
  };

  const sections = Array.from(
    new Set(articles.map(a => a.sectionTitle).filter(Boolean))
  ) as string[];

  const filteredArticles = articles.filter((article) => {
    const publication = article.publications.find(
      p => p.id === article.currentPublicationId
    );

    if (!publication) return false;

    const matchesSearch =
      getLocalizedValue(publication.title)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      publication.authors?.some(a =>
        a.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesSection =
      selectedSection === 'all' || article.sectionTitle === selectedSection;

    return matchesSearch && matchesSection;
  });

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    const pubA = a.publications.find(p => p.id === a.currentPublicationId);
    const pubB = b.publications.find(p => p.id === b.currentPublicationId);

    if (!pubA || !pubB) return 0;

    if (sortBy === 'date') {
      return (
        new Date(pubB.datePublished || '').getTime() -
        new Date(pubA.datePublished || '').getTime()
      );
    } else if (sortBy === 'title') {
      return getLocalizedValue(pubA.title).localeCompare(
        getLocalizedValue(pubB.title)
      );
    } else if (sortBy === 'author') {
      const authorsA = pubA.authors?.map(a => a.fullName).join(', ') || '';
      const authorsB = pubB.authors?.map(a => a.fullName).join(', ') || '';
      return authorsA.localeCompare(authorsB);
    }

    return 0;
  });

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p className="font-semibold">Error loading submissions</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Issue Header */}
      {issue && (
        <div className="bg-white border-b">
          <div className="container mx-auto p-8">
            <div className="flex gap-8">
              {issue.coverImageUrl?.en && (
                <Image
                  src={issue.coverImageUrl.en}
                  alt="Issue Cover"
                  width={200}
                  height={300}
                  className="rounded shadow-lg"
                />
              )}
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2">
                  {getLocalizedValue(issue.title)}
                </h1>
                <div className="text-gray-600 mb-4">
                  {issue.volume && <span>Vol. {issue.volume}</span>}
                  {issue.number && <span>, No. {issue.number}</span>}
                  {issue.year && <span> ({issue.year})</span>}
                </div>
                {issue.description && (
                  <div className="text-gray-700">
                    {getLocalizedValue(issue.description)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">
            Published Submissions ({sortedArticles.length})
          </h2>

          {/* Filters and Search */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="md:col-span-1">
              <input
                type="text"
                placeholder="Search articles or authors..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {sections.length > 0 && (
              <div className="md:col-span-1">
                <select
                  value={selectedSection}
                  onChange={e => setSelectedSection(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="all">All Sections</option>
                  {sections.map(section => (
                    <option key={section} value={section}>
                      {section}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="md:col-span-1">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="date">Sort by Date (Newest)</option>
                <option value="title">Sort by Title</option>
                <option value="author">Sort by Author</option>
              </select>
            </div>
          </div>

          {/* Articles List */}
          {sortedArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {articles.length === 0
                  ? 'No published articles found in this issue.'
                  : 'No articles match your search criteria.'}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {sortedArticles.map((submission, index) => {
                const publication = submission.publications.find(
                  p => p.id === submission.currentPublicationId
                );

                if (!publication) return null;

                return (
                  <article
                    key={submission.id}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="text-sm text-gray-500 mb-1">
                          #{index + 1}
                          {submission.sectionTitle && (
                            <span className="ml-3 inline-block px-3 py-1 bg-primary text-white rounded-full text-xs">
                              {submission.sectionTitle}
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-gray-900">
                          {getLocalizedValue(publication.title)}
                        </h3>
                      </div>
                      {publication.doiObject?.doi && (
                        <div className="text-sm text-gray-500 ml-4">
                          DOI: {publication.doiObject.doi}
                        </div>
                      )}
                    </div>

                    {/* Authors */}
                    {publication.authors && publication.authors.length > 0 && (
                      <p className="text-gray-700 mb-3">
                        <span className="font-medium">Authors:</span>{' '}
                        {publication.authors
                          .map(a => a.fullName)
                          .join(', ')}
                      </p>
                    )}

                    {/* Pages and Date */}
                    <div className="flex gap-4 text-sm text-gray-600 mb-3">
                      {publication.pages && (
                        <span>Pages: {publication.pages}</span>
                      )}
                      {publication.datePublished && (
                        <span>
                          Published:{' '}
                          {new Date(publication.datePublished).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      )}
                    </div>

                    {/* Abstract */}
                    {publication.abstract && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Abstract
                        </h4>
                        <div className="text-gray-700 line-clamp-3">
                          {typeof publication.abstract === 'string' ? (
                            <p>{publication.abstract}</p>
                          ) : (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: getLocalizedValue(publication.abstract)
                              }}
                            />
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    {publication.urlPublished && (
                      <div className="flex gap-3 mt-4 pt-4 border-t">
                        <a
                          href={publication.urlPublished}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-accent text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
                        >
                          Read Full Article
                        </a>
                        <a
                          href={publication.urlPublished}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition-colors"
                        >
                          PDF
                        </a>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* Back Link */}
        <div className="mt-12 pt-8 border-t">
          <Link
            href="/issues"
            className="text-accent hover:underline font-medium"
          >
            ← Back to All Issues
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SubmissionsPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    }>
      <SubmissionsContent />
    </Suspense>
  );
}
