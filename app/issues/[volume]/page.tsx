"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; 
import { Issues, IssuesResponse } from '@/app/api/issues/types';

// Components
import IssueFilter from '@/app/components/issues/IssueFilter';
import IssueCard from '@/app/components/issues/IssueCard';
 
export default function IssuesPage() {
  const params = useParams();
  const [issues, setIssues] = useState<Issues[]>([]);
  const [metadata, setMetadata] = useState<IssuesResponse['metadata'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [page, setPage] = useState(1);
  const [searchPhrase, setSearchPhrase] = useState('');
  // const [sortBy, setSortBy] = useState('dateSubmitted');
  // const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => { 
    const fetchIssues = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams({
          volume: params.volume as string, 
          page: page.toString(),
          count: '20',
        });

        console.log('Fetching with params:', queryParams.toString()); // Debug log

        const response = await fetch(`/api/issues?${queryParams.toString()}`);
        
        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }

        const data: IssuesResponse = await response.json();
        console.log('Fetched data:', data); // Debug log
        setIssues(data.issues);
        setMetadata(data.metadata);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (params.volume) {
      fetchIssues();
    }
  }, [params, page]);

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

        {/* Search and Filters */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search issues..."
            className="w-full p-2 border rounded"
            value={searchPhrase}
            onChange={(e) => setSearchPhrase(e.target.value)}
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading issues...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12 text-red-600">
            <p>{error}</p>
          </div>
        )}

        {/* Issues Grid */}
        {!loading && !error && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {issues.map((issue) => (
             <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {metadata && (
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="py-2">
              Page {page} of {metadata.totalPages}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page >= metadata.totalPages}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}