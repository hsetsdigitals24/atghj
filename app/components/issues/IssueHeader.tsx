import Image from 'next/image';
import Link from 'next/link';

interface IssueHeaderProps {
  volume: number;
  issue: number;
  date: string;
  coverImage: string;
  articleCount: number;
  description?: string;
  editors: {
    name: string;
    role: string;
  }[];
  downloadUrl: string;
}

export default function IssueHeader({
  volume,
  issue,
  date,
  coverImage,
  articleCount,
  description,
  editors,
  downloadUrl,
}: IssueHeaderProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="md:flex">
        {/* Cover Image */}
        <div className="md:w-1/3 relative">
          <div className="h-64 md:h-full relative">
            <Image
              src={coverImage}
              alt={`Volume ${volume}, Issue ${issue} Cover`}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Content */}
        <div className="md:w-2/3 p-6 md:p-8">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Volume {volume}, Issue {issue}
              </h1>
              <time className="text-lg text-gray-600 block mb-4">
                {new Date(date).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric'
                })}
              </time>
              {description && (
                <p className="text-gray-600 mb-4">
                  {description}
                </p>
              )}
            </div>

            {/* Stats and Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">{articleCount}</div>
                <div className="text-sm text-gray-600">Articles</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">{editors.length}</div>
                <div className="text-sm text-gray-600">Editors</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">{volume}</div>
                <div className="text-sm text-gray-600">Volume</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">{issue}</div>
                <div className="text-sm text-gray-600">Issue</div>
              </div>
            </div>

            {/* Editors */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Editorial Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {editors.map((editor, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-600 font-medium">
                        {editor.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{editor.name}</div>
                      <div className="text-sm text-gray-500">{editor.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-auto flex gap-4">
              <Link
                href={downloadUrl}
                className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Full Issue
              </Link>
              <button
                type="button"
                className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share Issue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}