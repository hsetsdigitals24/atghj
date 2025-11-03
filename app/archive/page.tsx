import { useState } from 'react';
import ArchiveFilter from '@/app/components/archive/ArchiveFilter';
import ArchiveGrid from '@/app/components/archive/ArchiveGrid';

export default function ArchivePage() {
  // Sample data - replace with actual API data
  const archiveData = {
    volumes: [
      {
        volume: 5,
        year: 2025,
        issues: [
          {
            volume: 5,
            issue: 4,
            date: '2025-10-01',
            articleCount: 12,
          },
          {
            volume: 5,
            issue: 3,
            date: '2025-07-01',
            articleCount: 15,
          },
          {
            volume: 5,
            issue: 2,
            date: '2025-04-01',
            articleCount: 14,
          },
          {
            volume: 5,
            issue: 1,
            date: '2025-01-01',
            articleCount: 13,
          },
        ],
        articles: [
          {
            title: "Novel Approaches to Malaria Prevention in Rural Communities",
            authors: [
              { name: "John Doe", orcid: "0000-0002-1825-0097" },
              { name: "Jane Smith", orcid: "0000-0002-1825-0098" }
            ],
            abstract: "This study explores innovative strategies for malaria prevention...",
            doi: "10.1234/atghj.2025.001",
            publicationDate: "2025-10-01",
            manuscriptType: "Original Research"
          },
          // Add more articles...
        ],
      },
      // Add more volumes...
    ],
  };

  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedVolume, setSelectedVolume] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Get unique years and volumes
  const years = Array.from(new Set(archiveData.volumes.map(v => v.year))).sort((a, b) => b - a);
  const volumes = Array.from(new Set(archiveData.volumes.map(v => v.volume))).sort((a, b) => b - a);

  // Filter volumes based on selected filters
  const filteredVolumes = archiveData.volumes.filter(volume => {
    const matchesYear = !selectedYear || volume.year === selectedYear;
    const matchesVolume = !selectedVolume || volume.volume === selectedVolume;
    const matchesSearch = !searchQuery || volume.articles.some(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.authors.some(author =>
        author.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    return matchesYear && matchesVolume && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Journal Archive
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse all published volumes, issues, and articles from the African Translational & Global Health Journal.
          </p>
        </div>

        {/* Archive Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">
              {archiveData.volumes.length}
            </div>
            <div className="text-sm text-gray-600">Volumes</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">
              {archiveData.volumes.reduce((acc, vol) => acc + vol.issues.length, 0)}
            </div>
            <div className="text-sm text-gray-600">Issues</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">
              {archiveData.volumes.reduce((acc, vol) => acc + vol.articles.length, 0)}
            </div>
            <div className="text-sm text-gray-600">Articles</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">
              {years[years.length - 1]} - {years[0]}
            </div>
            <div className="text-sm text-gray-600">Year Range</div>
          </div>
        </div>

        {/* Filters */}
        <ArchiveFilter
          years={years}
          volumes={volumes}
          onYearChange={setSelectedYear}
          onVolumeChange={setSelectedVolume}
          onSearch={setSearchQuery}
        />

        {/* Results */}
        {filteredVolumes.length > 0 ? (
          <ArchiveGrid volumes={filteredVolumes} />
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No results found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}