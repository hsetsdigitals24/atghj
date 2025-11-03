import { useState } from 'react';

interface ArticleSearchProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: {
    type: string[];
    year: number | null;
    subject: string[];
  }) => void;
}

export default function ArticleSearch({ onSearch, onFilterChange }: ArticleSearchProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const articleTypes = [
    'Original Research',
    'Review Article',
    'Case Report',
    'Short Communication',
    'Letter to the Editor'
  ];

  const subjects = [
    'Biomedical Sciences',
    'Translational Medicine',
    'Clinical Research',
    'Neuroscience',
    'Public Health',
    'Epidemiology'
  ];

  const years = Array.from({ length: 5 }, (_, i) => 2025 - i);

  const handleTypeChange = (type: string) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];
    setSelectedTypes(newTypes);
    onFilterChange({ type: newTypes, year: selectedYear, subject: selectedSubjects });
  };

  const handleSubjectChange = (subject: string) => {
    const newSubjects = selectedSubjects.includes(subject)
      ? selectedSubjects.filter(s => s !== subject)
      : [...selectedSubjects, subject];
    setSelectedSubjects(newSubjects);
    onFilterChange({ type: selectedTypes, year: selectedYear, subject: newSubjects });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm mb-8">
      {/* Search Bar */}
      <div className="p-4 border-b">
        <div className="relative">
          <input
            type="text"
            placeholder="Search articles by title, author, or keywords..."
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
            onChange={(e) => onSearch(e.target.value)}
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

      {/* Filters Toggle */}
      <div className="px-4 py-3 flex justify-between items-center">
        <button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
          Filters
        </button>
        {(selectedTypes.length > 0 || selectedYear || selectedSubjects.length > 0) && (
          <button
            onClick={() => {
              setSelectedTypes([]);
              setSelectedYear(null);
              setSelectedSubjects([]);
              onFilterChange({ type: [], year: null, subject: [] });
            }}
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Filters Panel */}
      {isFiltersOpen && (
        <div className="px-4 pb-4 border-t">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {/* Article Types */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Article Type</h3>
              <div className="space-y-2">
                {articleTypes.map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => handleTypeChange(type)}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Publication Year */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Publication Year</h3>
              <select
                value={selectedYear || ''}
                onChange={(e) => {
                  const year = e.target.value ? parseInt(e.target.value) : null;
                  setSelectedYear(year);
                  onFilterChange({ type: selectedTypes, year, subject: selectedSubjects });
                }}
                className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="">All Years</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject Areas */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Subject Area</h3>
              <div className="space-y-2">
                {subjects.map((subject) => (
                  <label key={subject} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedSubjects.includes(subject)}
                      onChange={() => handleSubjectChange(subject)}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{subject}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}