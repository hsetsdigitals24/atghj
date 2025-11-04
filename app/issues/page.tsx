"use client";
import { useState } from 'react';
import IssueFilter from '@/app/components/issues/IssueFilter';
import IssueCard from '@/app/components/issues/IssueCard';

// Types
interface Article {
  title: string;
  authors: string[];
  doi: string;
}

interface Issue {
  volume: number;
  issue: number;
  date: string;
  coverImage: string;
  articleCount: number;
  articles: Article[];
  downloadUrl: string;
}

export default function IssuesPage() {
  // Sample data - replace with actual API data
  const issues: Issue[] = [
    {
      volume: 5,
      issue: 4,
      date: '2025-10-01',
      coverImage: '/images/issues/2025-q4.jpg',
      articleCount: 12,
      articles: [
        {
          title: "Novel Approaches to Malaria Prevention in Rural Communities",
          authors: ["John Doe", "Jane Smith"],
          doi: "10.1234/atghj.2025.001"
        },
        {
          title: "Impact of Climate Change on Vector-Borne Diseases",
          authors: ["Alice Johnson"],
          doi: "10.1234/atghj.2025.002"
        },
        {
          title: "Healthcare Access Disparities in Sub-Saharan Africa",
          authors: ["Robert Wilson", "Mary Brown"],
          doi: "10.1234/atghj.2025.003"
        }
      ],
      downloadUrl: '/issues/2025-q4.pdf'
    },
    // Add more sample issues here
  ];

  const [selectedYear, setSelectedYear] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  // Get unique years from issues
  const years = Array.from(new Set(issues.map(issue => 
    new Date(issue.date).getFullYear()
  ))).sort((a, b) => b - a);

  // Filter and sort issues
  const filteredIssues = issues
    .filter(issue => selectedYear === 0 || new Date(issue.date).getFullYear() === selectedYear)
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Journal Issues
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our quarterly publications featuring cutting-edge research in translational medicine
            and global health across Africa.
          </p>
        </div>

        {/* Filters */}
        <IssueFilter
          selectedYear={selectedYear}
          years={years}
          onYearChange={setSelectedYear}
          onSort={setSortOrder}
          sortOrder={sortOrder}
        />

        {/* Issues Grid */}
        <div className="space-y-6">
          {filteredIssues.map((issue) => (
            <IssueCard
              key={`${issue.volume}-${issue.issue}`}
              {...issue}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredIssues.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Issues Found
            </h3>
            <p className="text-gray-600">
              There are no issues available for the selected filters.
            </p>
          </div>
        )}

        {/* Pagination - Add if needed */}
      </div>
    </div>
  );
}