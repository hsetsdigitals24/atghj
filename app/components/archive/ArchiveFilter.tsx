import { useState } from 'react';

interface ArchiveFilterProps {
  onYearChange: (year: number | null) => void;
  onVolumeChange: (volume: number | null) => void;
  onSearch: (query: string) => void;
  years: number[];
  volumes: number[];
}

export default function ArchiveFilter({
  onYearChange,
  onVolumeChange,
  onSearch,
  years,
  volumes,
}: ArchiveFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search articles by title, author, or keywords..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Year Filter */}
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
            Publication Year
          </label>
          <select
            id="year"
            onChange={(e) => onYearChange(e.target.value ? Number(e.target.value) : null)}
            className="w-full rounded-lg border border-gray-200 py-2.5 pl-3 pr-10 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">All Years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Volume Filter */}
        <div>
          <label htmlFor="volume" className="block text-sm font-medium text-gray-700 mb-2">
            Volume
          </label>
          <select
            id="volume"
            onChange={(e) => onVolumeChange(e.target.value ? Number(e.target.value) : null)}
            className="w-full rounded-lg border border-gray-200 py-2.5 pl-3 pr-10 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="">All Volumes</option>
            {volumes.map((volume) => (
              <option key={volume} value={volume}>
                Volume {volume}
              </option>
            ))}
          </select>
        </div>

        {/* Export Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Export Options
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              className="flex-1 inline-flex items-center justify-center px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              CSV
            </button>
            <button
              type="button"
              className="flex-1 inline-flex items-center justify-center px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              BibTeX
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}