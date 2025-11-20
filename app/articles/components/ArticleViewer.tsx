'use client';

import { useState } from 'react';

interface Galley {
  id: number;
  label: string;
  urlPublished?: string;
  file?: {
    mimetype: string;
  };
}

interface ArticleViewerProps {
  articleId: string;
  galleys: Galley[];
}

export default function ArticleViewer({ articleId, galleys }: ArticleViewerProps) {
  const [selectedGalley, setSelectedGalley] = useState<Galley | null>(
    galleys.find(g => g.label.toLowerCase().includes('pdf')) || galleys[0] || null
  );
  const [viewMode, setViewMode] = useState<'inline' | 'download'>('inline');

  if (!galleys || galleys.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800">No files available for this article.</p>
      </div>
    );
  }

  const isPDF = selectedGalley?.file?.mimetype === 'application/pdf' ||
                selectedGalley?.label.toLowerCase().includes('pdf');

  return (
    <div className="space-y-4">
      {/* File Selection */}
      {galleys.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          {galleys.map((galley) => (
            <button
              key={galley.id}
              onClick={() => setSelectedGalley(galley)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedGalley?.id === galley.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {galley.label}
            </button>
          ))}
        </div>
      )}

      {/* View/Download Options */}
      <div className="flex gap-3">
        {isPDF && (
          <button
            onClick={() => setViewMode('inline')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'inline'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            📄 View
          </button>
        )}
        
        <a
          href={`/api/articles/${articleId}/download/${selectedGalley?.id}`}
          download
          className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
            />
          </svg>
          Download {selectedGalley?.label}
        </a>

        {/* Direct OJS Link */}
        {selectedGalley?.urlPublished && (
          <a
            href={selectedGalley.urlPublished}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            View on OJS →
          </a>
        )}
      </div>

      {/* PDF Viewer */}
      {isPDF && viewMode === 'inline' && selectedGalley && (
        <div className="border rounded-lg overflow-hidden bg-gray-100">
          <iframe
            src={`/api/articles/${articleId}/view/${selectedGalley.id}`}
            className="w-full h-[800px]"
            title={`View ${selectedGalley.label}`}
          />
        </div>
      )}

      {/* HTML Content Viewer */}
      {!isPDF && selectedGalley?.urlPublished && (
        <div className="border rounded-lg overflow-hidden">
          <iframe
            src={selectedGalley.urlPublished}
            className="w-full h-[800px]"
            title={`View ${selectedGalley.label}`}
          />
        </div>
      )}
    </div>
  );
}
