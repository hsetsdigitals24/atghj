
'use client';

import { useEffect, useState } from 'react'; 
import IssueListItem from '../components/issues/ListItem';
import IssueCard from '../components/issues/IssueCard';

export interface Issue {
  id: number;
  title: string | { [locale: string]: string };
  description?: string | { [locale: string]: string };
  volume?: number;
  number?: string;
  year?: number;
  datePublished?: string;
  coverImageUrl?: string | { [locale: string]: string };
  urlPublished?: string;
}

interface GroupedIssues {
  [year: string]: Issue[];
}

export default function ArchivePage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [groupedIssues, setGroupedIssues] = useState<GroupedIssues>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedVolume, setSelectedVolume] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    async function fetchArchive() {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedYear !== 'all') {
          params.append('year', selectedYear);
        }
        if (selectedVolume !== 'all') {
          params.append('volume', selectedVolume);
        }
  
        const response = await fetch(`/api/archive?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch archive');
        }
  
        const data = await response.json();
        const fetchedIssues = data.items || [];
        setIssues(fetchedIssues);
  
        // Group issues by year
        const grouped = fetchedIssues.reduce((acc: GroupedIssues, issue: Issue) => {
          const year = issue.year?.toString() || 
                       new Date(issue.datePublished || '').getFullYear().toString() || 
                       'Unknown';
          if (!acc[year]) {
            acc[year] = [];
          }
          acc[year].push(issue);
          return acc;
        }, {});
  
        setGroupedIssues(grouped);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }
    fetchArchive();
  }, [selectedYear, selectedVolume]);


  const getLocalizedValue = (value: string | { [locale: string]: string } | undefined) => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    return value['en'] || value['en_US'] || Object.values(value)[0] || '';
  };

  const years = Object.keys(groupedIssues).sort((a, b) => Number(b) - Number(a));
  const volumes = Array.from(
    new Set(issues.map(i => i.volume).filter(Boolean))
  ).sort((a, b) => Number(b) - Number(a));

  if (loading && issues.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-12 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-64 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Journal Archive</h1>
        <p className="text-gray-600">
          Browse all published issues - {issues.length} issue{issues.length !== 1 ? 's' : ''} available
        </p>
      </div>

      {/* Filters and View Options */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4">
            {/* Year Filter */}
            {years.length > 1 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Years</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Volume Filter */}
            {volumes.length > 1 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Volume
                </label>
                <select
                  value={selectedVolume}
                  onChange={(e) => setSelectedVolume(e.target.value)}
                  className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Volumes</option>
                  {volumes.map(vol => (
                    <option key={vol} value={vol}>Volume {vol}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              title="Grid View"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              title="List View"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Issues Display */}
      {issues.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No issues found matching your filters.</p>
        </div>
      ) : (
        <div className="space-y-12">
          {years.map(year => (
            <section key={year}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-600">
                {year}
              </h2>

              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {groupedIssues[year].map(issue => (
                    <IssueCard key={issue.id} issue={issue} getLocalizedValue={getLocalizedValue} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {groupedIssues[year].map(issue => (
                    <IssueListItem key={issue.id} issue={issue} getLocalizedValue={getLocalizedValue} />
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
