import Image from 'next/image';
import Link from 'next/link';

interface Issue {
  id: string;
  volume: number;
  issue: number;
  date: string;
  coverImage: string;
  articleCount: number;
}

interface FeaturedIssuesProps {
  issues: Issue[];
}

export default function FeaturedIssues({ issues }: FeaturedIssuesProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Issues</h2>
          <p className="text-lg text-gray-600">
            Explore our latest publications in biomedical sciences and global health
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {issues.map((issue) => (
            <Link
              key={issue.id}
              href={`/issues/${issue.id}`}
              className="group block"
            >
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-md transition-transform duration-300 group-hover:scale-105">
              {issue.coverImage && 
               <Image
                  src={issue.coverImage}
                  alt={`Volume ${issue.volume}, Issue ${issue.issue}`}
                  fill
                  className="object-cover"
                />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-lg font-semibold mb-2">
                    Volume {issue.volume}, Issue {issue.issue}
                  </h3>
                  <div className="flex justify-between items-center">
                    <time className="text-sm text-gray-300">
                      {new Date(issue.date).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </time>
                    <span className="text-sm text-gray-300">
                      {issue.articleCount} Articles
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/issues"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
          >
            View All Issues
            <svg
              className="ml-2 w-4 h-4"
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
          </Link>
        </div>
      </div>
    </section>
  );
}