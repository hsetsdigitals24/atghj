"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import IssueFilter from './IssueFilter';
import IssueCard from './IssueCard';
import { Issue } from '@/app/api/journal/types';

interface IssueListProps {
  issues: Issue[];
  years: number[];
  selectedYear: number;
  defaultSortOrder: 'newest' | 'oldest';
}

export default function IssueList({ 
  issues,
  years,
  selectedYear: initialYear,
  defaultSortOrder
}: IssueListProps) {
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>(defaultSortOrder);

  // Filter and sort issues
  const filteredIssues = issues
    .filter(issue => selectedYear === 0 || new Date(issue.date).getFullYear() === selectedYear)
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  // Update URL when filters change
  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    const params = new URLSearchParams();
    if (year !== 0) params.set('year', year.toString());
    if (sortOrder !== 'newest') params.set('sort', sortOrder);
    const newUrl = params.toString() ? `?${params.toString()}` : '';
    router.push(newUrl);
  };

  const handleSortChange = (order: 'newest' | 'oldest') => {
    setSortOrder(order);
    const params = new URLSearchParams();
    if (selectedYear !== 0) params.set('year', selectedYear.toString());
    if (order !== 'newest') params.set('sort', order);
    const newUrl = params.toString() ? `?${params.toString()}` : '';
    router.push(newUrl);
  };

  return (
    <>
      {/* Filters */}
      <IssueFilter
        selectedYear={selectedYear}
        years={years}
        onYearChange={handleYearChange}
        onSort={handleSortChange}
        sortOrder={sortOrder}
      />

      {/* Issues Grid */}
      <div className="space-y-6">
        {filteredIssues.map((issue) => (
          <IssueCard
            key={`${issue.volume}-${issue.issue}`}
            volume={issue.volume}
            issue={issue.issue}
            date={issue.date}
            coverImage={issue.coverImage || '/images/default-cover.jpg'}
            articleCount={issue.articles.length}
            articles={issue.articles.map(article => ({
              title: article.title,
              authors: article.authors.map(author => author.name),
              doi: article.doi
            }))}
            downloadUrl={`/issues/${issue.volume}/${issue.issue}/download`}
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
    </>
  );
}