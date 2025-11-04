interface IssueFilterProps {
  selectedYear: number;
  years: number[];
  onYearChange: (year: number) => void;
  onSort: (sortBy: 'newest' | 'oldest') => void;
  sortOrder: 'newest' | 'oldest';
}

export default function IssueFilter({
  selectedYear,
  years,
  onYearChange,
  onSort,
  sortOrder,
}: IssueFilterProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 bg-white rounded-lg shadow-sm mb-8">
      <div className="flex flex-wrap gap-2">
        <span className="text-gray-700 font-medium mr-2 my-auto">Filter by Year:</span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onYearChange(0)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
              ${selectedYear === 0 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            All Years
          </button>
          {years.map((year) => (
            <button
              key={year}
              onClick={() => onYearChange(year)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                ${selectedYear === year 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-gray-700 font-medium">Sort by:</span>
        <select
          value={sortOrder}
          onChange={(e) => onSort(e.target.value as 'newest' | 'oldest')}
          className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
    </div>
  );
}