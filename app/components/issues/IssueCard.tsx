import { Issue } from "@/app/archive/page";
import Image from "next/image";
import Link from "next/link";

interface IssueCardProps {
  issue: Issue;
  getLocalizedValue: (value: string | { [locale: string]: string } | undefined) => string;
}

// Issue Card Component (Grid View)
function IssueCard({ issue, getLocalizedValue }: IssueCardProps) {
  // Handle coverImageUrl safely
  const coverImage = typeof issue.coverImageUrl === 'string' 
    ? issue.coverImageUrl 
    : issue.coverImageUrl?.en || issue.coverImageUrl?.['en_US'] || null;

  const issueTitle = getLocalizedValue(issue.title);

  return (
    <Link href={`/issues/${issue.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow border overflow-hidden h-full cursor-pointer">
        {/* Cover Image */}
        {coverImage ? (
          <div className="aspect-[3/4] relative bg-gray-100">
            <Image 
              src={coverImage} 
              alt={issueTitle || "Issue Cover"}
              width={180}
              height={240}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="aspect-[3/4] bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <div className="text-white text-center p-6">
              <p className="text-4xl font-bold mb-2">
                {issue.volume ? `Vol. ${issue.volume}` : issue.year}
              </p>
              {issue.number && (
                <p className="text-xl">No. {issue.number}</p>
              )}
            </div>
          </div>
        )}

        {/* Issue Info */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {issueTitle}
          </h3>
          
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            {issue.volume && <span>Vol. {issue.volume}</span>}
            {issue.number && <span>• No. {issue.number}</span>}
            {issue.year && <span>• {issue.year}</span>}
          </div>

          {issue.datePublished && (
            <p className="text-xs text-gray-500">
              {new Date(issue.datePublished).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long'
              })}
            </p>
          )}

          <div className="mt-3">
            <span className="text-accent hover:text-opacity-80 text-sm font-medium inline-flex items-center gap-1 transition-colors">
              View Issue
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default IssueCard;