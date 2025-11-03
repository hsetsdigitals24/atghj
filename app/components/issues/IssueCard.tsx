import Image from 'next/image';
import Link from 'next/link';

interface Article {
  title: string;
  authors: string[];
  doi: string;
}

interface IssueCardProps {
  volume: number;
  issue: number;
  date: string;
  coverImage: string;
  articleCount: number;
  articles: Article[];
  downloadUrl: string;
}

export default function IssueCard({
  volume,
  issue,
  date,
  coverImage,
  articleCount,
  articles,
  downloadUrl,
}: IssueCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg">
      <div className="md:flex">
        {/* Cover Image */}
        <div className="md:flex-shrink-0">
          <div className="h-48 w-full md:w-48 relative">
            <Image
              src={coverImage}
              alt={`Volume ${volume}, Issue ${issue} Cover`}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-grow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Volume {volume}, Issue {issue}
              </h3>
              <time className="text-sm text-gray-600">
                {new Date(date).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric'
                })}
              </time>
            </div>
            
            <Link
              href={downloadUrl}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              PDF
            </Link>
          </div>

          {/* Articles Preview */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Featured Articles ({articleCount} total)
            </h4>
            <ul className="space-y-2">
              {articles.slice(0, 3).map((article, index) => (
                <li key={index} className="text-sm">
                  <Link 
                    href={`/articles/${article.doi}`}
                    className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                  >
                    {article.title}
                    <span className="text-gray-500">
                      {' '}— {article.authors.join(', ')}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <Link
              href={`/issues/${volume}/${issue}`}
              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
            >
              View Full Issue →
            </Link>
            <span className="text-sm text-gray-500">
              {articleCount} Articles
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}