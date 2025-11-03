import Image from 'next/image';
import Link from 'next/link';

interface Author {
  name: string;
  orcid?: string;
}

interface ArticleCardProps {
  title: string;
  authors: Author[];
  abstract: string;
  publicationDate: string;
  doi?: string;
  manuscriptType: string;
  imageUrl?: string;
}

export default function ArticleCard({
  title,
  authors,
  abstract,
  publicationDate,
  doi,
  manuscriptType,
  imageUrl,
}: ArticleCardProps) {
  return (
    <div className="group relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Optional Featured Image */}
      {imageUrl && (
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Content Container */}
      <div className="p-6">
        {/* Article Type Badge */}
        <span className="inline-block px-3 py-1 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-full mb-4">
          {manuscriptType}
        </span>

        {/* Title */}
        <Link href={`/articles/${doi}`} className="block">
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-200">
            {title}
          </h3>
        </Link>

        {/* Authors */}
        <div className="mb-3">
          <p className="text-sm text-gray-600">
            {authors.map((author, index) => (
              <span key={author.name}>
                {author.name}
                {author.orcid && (
                  <Link 
                    href={`https://orcid.org/${author.orcid}`}
                    className="ml-1 text-green-600 hover:text-green-700"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-id-card"></i>
                  </Link>
                )}
                {index < authors.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        </div>

        {/* Abstract Preview */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {abstract}
        </p>

        {/* Footer */}
        <div className="flex justify-between items-center text-sm text-gray-500">
          <time dateTime={publicationDate}>
            {new Date(publicationDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          {doi && (
            <Link
              href={`https://doi.org/${doi}`}
              className="text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              DOI: {doi}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}