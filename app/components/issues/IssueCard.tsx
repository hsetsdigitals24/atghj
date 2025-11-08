import Image from 'next/image';
import { Issues } from '@/app/api/issues/types';
import Link from 'next/link';

interface IssueCardProps {
  issue: Issues;
}

const IssueCard = ({ issue }: IssueCardProps) => {
  const formattedDate = new Date(issue.datePublished).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Cover Image */}
      <div className="relative h-48 w-full">
        {issue.coverImageUrl && Object.values(issue.coverImageUrl)[0] ? (
          <Image
            src={Object.values(issue.coverImageUrl)[0]}
            alt={Object.values(issue.coverImageAltText)[0] || 'Issue cover'}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No cover image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title and Identification */}
        <h3 className="text-xl font-semibold mb-2 text-gray-900">
          {issue.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {issue.identification}
        </p>

        {/* Publication Details */}
        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <span className="font-medium">Published:</span> {formattedDate}
          </p>
          <p>
            <span className="font-medium">Volume:</span> {issue.volume}
          </p>
          {issue.issue && (
            <p>
              <span className="font-medium">Issue:</span> {issue.issue}
            </p>
          )}
          <p>
            <span className="font-medium">Year:</span> {issue.year}
          </p>
        </div>

        {/* Description */}
        {issue.description && Object.values(issue.description)[0] && (
          <div className="mt-4">
            <p className="text-sm text-gray-700 line-clamp-3">
              {Object.values(issue.description)[0]}
            </p>
          </div>
        )}

        {/* Action Button */}
        <Link
          href={`articles/${issue}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
        >
          View Issue
        </Link>
      </div>
    </div>
  );
};

export default IssueCard;