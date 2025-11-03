import Link from 'next/link';

interface Article {
  title: string;
  authors: { name: string; orcid?: string }[];
  abstract: string;
  doi: string;
  manuscriptType: string;
  pages?: string;
  citations?: number;
  downloads?: number;
}

interface ArticleListProps {
  articles: Article[];
}

export default function ArticleList({ articles }: ArticleListProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="divide-y divide-gray-200">
        {articles.map((article) => (
          <div key={article.doi} className="p-6 hover:bg-gray-50 transition-colors duration-200">
            {/* Article Type Badge */}
            <div className="mb-3">
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                {article.manuscriptType}
              </span>
            </div>

            {/* Title */}
            <Link
              href={`/articles/${article.doi}`}
              className="block group"
            >
              <h2 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-200 mb-2">
                {article.title}
              </h2>
            </Link>

            {/* Authors */}
            <div className="mb-4">
              <p className="text-gray-600">
                {article.authors.map((author, idx) => (
                  <span key={author.name}>
                    {author.name}
                    {author.orcid && (
                      <Link
                        href={`https://orcid.org/${author.orcid}`}
                        className="ml-1 text-green-600 hover:text-green-700 inline-block"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm7.369 19.369a10.36 10.36 0 01-7.369 3.05c-2.81 0-5.42-.89-7.55-2.4l.12-.12c1.13-1.13 2.33-2.12 3.52-3.05.35-.27.75-.51 1.16-.74.15-.09.31-.17.47-.24.27-.12.55-.22.84-.31.29-.09.58-.17.88-.23.3-.06.61-.11.92-.15.31-.04.63-.06.94-.07.32-.01.63 0 .95.02.32.02.63.05.94.1.31.05.62.11.92.18.3.08.6.16.89.27.29.11.57.23.84.37.27.14.54.3.79.47.25.17.49.36.72.56.23.2.44.42.64.65.2.23.38.47.54.72.16.25.3.51.43.78.13.27.23.55.32.84.09.29.15.58.2.88l.05.45c.03.32.03.63.01.95s-.04.63-.08.94c-.05.31-.1.62-.17.92-.07.3-.16.6-.26.89-.1.29-.22.57-.35.84-.13.27-.28.53-.44.78-.16.25-.34.48-.53.71z"/>
                        </svg>
                      </Link>
                    )}
                    {idx < article.authors.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </p>
            </div>

            {/* Abstract */}
            <p className="text-gray-600 mb-4 line-clamp-2">
              {article.abstract}
            </p>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              {article.pages && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Pages: {article.pages}
                </div>
              )}
              {article.citations !== undefined && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                  Citations: {article.citations}
                </div>
              )}
              {article.downloads !== undefined && (
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Downloads: {article.downloads}
                </div>
              )}
              <div className="flex items-center">
                <Link
                  href={`https://doi.org/${article.doi}`}
                  className="text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  DOI: {article.doi}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}