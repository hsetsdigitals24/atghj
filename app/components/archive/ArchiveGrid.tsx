import Link from 'next/link';

interface Issue {
  volume: number;
  issue: number;
  date: string;
  articleCount: number;
}

interface Article {
  title: string;
  authors: { name: string; orcid?: string }[];
  abstract: string;
  doi: string;
  publicationDate: string;
  manuscriptType: string;
}

interface ArchiveGridProps {
  volumes: {
    volume: number;
    year: number;
    issues: Issue[];
    articles: Article[];
  }[];
}

export default function ArchiveGrid({ volumes }: ArchiveGridProps) {
  return (
    <div className="space-y-12">
      {volumes.map((volume) => (
        <div key={volume.volume} className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Volume Header */}
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Volume {volume.volume} ({volume.year})
                </h2>
                <p className="text-sm text-gray-600">
                  {volume.articles.length} Articles in {volume.issues.length} Issues
                </p>
              </div>
              <Link
                href={`/volumes/${volume.volume}`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
              >
                View Volume Details
              </Link>
            </div>
          </div>

          {/* Issues Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {volume.issues.map((issue) => (
                <Link
                  key={`${volume.volume}-${issue.issue}`}
                  href={`/issues/${volume.volume}/${issue.issue}`}
                  className="block group"
                >
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-500 transition-colors duration-200">
                    <div className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
                      Issue {issue.issue}
                    </div>
                    <div className="text-sm text-gray-600">
                      {new Date(issue.date).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      {issue.articleCount} Articles
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Articles List */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Featured Articles
              </h3>
              <div className="divide-y divide-gray-200">
                {volume.articles.slice(0, 3).map((article) => (
                  <div key={article.doi} className="py-4">
                    <Link
                      href={`/articles/${article.doi}`}
                      className="group block"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-1">
                          <h4 className="text-base font-medium text-gray-900 group-hover:text-indigo-600 transition-colors duration-200">
                            {article.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {article.authors.map((author) => author.name).join(', ')}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span>{article.manuscriptType}</span>
                            <span>
                              {new Date(article.publicationDate).toLocaleDateString('en-US', {
                                month: 'long',
                                year: 'numeric',
                              })}
                            </span>
                            <Link
                              href={`https://doi.org/${article.doi}`}
                              className="text-indigo-600 hover:text-indigo-700"
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              DOI: {article.doi}
                            </Link>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <svg
                            className="w-5 h-5 text-gray-400 group-hover:text-indigo-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              {volume.articles.length > 3 && (
                <div className="mt-4 text-center">
                  <Link
                    href={`/volumes/${volume.volume}/articles`}
                    className="text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    View all {volume.articles.length} articles from this volume →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}