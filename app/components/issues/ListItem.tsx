import { Issue } from "@/app/archive/page";
import Image from "next/image";
import Link from "next/link";

interface ListItemProps {
  issue: Issue;
  getLocalizedValue: (value: string | { [locale: string]: string } | undefined) => string;
}

// Issue List Item Component (List View)
function IssueListItem({ issue, getLocalizedValue }: ListItemProps) {
  // ✅ Handle coverImageUrl properly - it's already localized
  const coverImage = typeof issue.coverImageUrl === 'string' 
    ? issue.coverImageUrl 
    : issue.coverImageUrl?.en || issue.coverImageUrl?.['en_US'] || null;

  const issueTitle = getLocalizedValue(issue.title);
  const issueDescription = getLocalizedValue(issue.description);

  return (
    <Link href={`/issues/${issue.id}`}>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border p-6 cursor-pointer">
        <div className="flex gap-6">
          {/* Thumbnail */}
          {coverImage ? (
            <Image 
              src={coverImage} 
              alt={issueTitle || "Issue Cover"}
              width={180}
              height={240}
              className="w-24 h-32 object-cover rounded"
            />
          ) : (
            <div className="w-24 h-32 bg-gradient-to-br from-primary to-accent rounded flex items-center justify-center text-white">
              <div className="text-center">
                <p className="text-lg font-bold">
                  {issue.volume ? `V${issue.volume}` : issue.year}
                </p>
                {issue.number && (
                  <p className="text-xs">N{issue.number}</p>
                )}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {issueTitle}
            </h3>

            <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
              {issue.volume && <span className="font-medium">Volume {issue.volume}</span>}
              {issue.number && <span>Number {issue.number}</span>}
              {issue.year && <span>• {issue.year}</span>}
              {issue.datePublished && (
                <span>
                  • {new Date(issue.datePublished).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long'
                  })}
                </span>
              )}
            </div>

            {issueDescription && (
              <div 
                className="text-gray-700 text-sm line-clamp-2 mb-3"
                dangerouslySetInnerHTML={{ 
                  __html: issueDescription
                }}
              />
            )}

            <span className="text-accent hover:text-opacity-80 text-sm font-medium inline-flex items-center gap-1 transition-colors">
              View Articles
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

export default IssueListItem;