'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface IssueProp {
  id: number;
  title: string | { [locale: string]: string };
  description?: string | { [locale: string]: string };
  volume?: number;
  number?: string;
  year?: number;
  datePublished?: string;
  coverImageUrl?: {en: string}
  urlPublished?: string;
  articles?: Array<{
    id: number;
    title: string | { [locale: string]: string };
  }>;
}

export default function LatestIssue() {
    const [issue, setIssue] = useState<IssueProp | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    console.log({"issue in LatestIssue component": issue});
  useEffect(() => {
    async function fetchCurrentIssue() {
      try {
        const response = await fetch('/api/issues/current');
        
        if (!response.ok) {
          throw new Error('Failed to fetch current issue');
        }

        const data = await response.json();
        setIssue(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchCurrentIssue();
  }, []);

  const getLocalizedValue = (value: string | { [locale: string]: string }) => {
    if (typeof value === 'string') return value;
    return value['en'] || value['en_US'] || Object.values(value)[0] || '';
  };

  if (loading) {
    return (
      <div className="p-8">
        <p>Loading current issue...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (!issue || issue === null) {
    return (
      <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900">
            Unable to load journal data
          </h2>
          <p className="mt-2 text-gray-600">
            Please try again later
          </p>
        </div>
    );
  }
 
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Current Issue</h1>
      
      <div className="border rounded-lg p-6">
        {issue.coverImageUrl && (
          <Image 
            src={issue.coverImageUrl.en} 
            alt="Issue Cover" 
            className="w-48 mb-4"
            width={192}
            height={288}
          />
        )}
        
        <h2 className="text-2xl font-semibold mb-2">
          {getLocalizedValue(issue.title)}
        </h2>
        
        <div className="text-gray-600 mb-4">
          {issue.volume && <span>Vol. {issue.volume}</span>}
          {issue.number && <span>, No. {issue.number}</span>}
          {issue.year && <span> ({issue.year})</span>}
        </div>
        
        {issue.description && (
          <div 
            className="mb-4"
            dangerouslySetInnerHTML={{ 
              __html: getLocalizedValue(issue.description) 
            }}
          />
        )}
        
        {issue.datePublished && (
          <p className="text-sm text-gray-500 mb-4">
            Published: {new Date(issue.datePublished).toLocaleDateString()}
          </p>
        )}
        
        <Link 
          href={`/issues/${issue.id}`}
          className="inline-block bg-accent text-white px-6 py-2 rounded hover:bg-primary transition-colors duration-200"
        >
          View Articles in This Issue
        </Link>
      </div>
    </div>
  );
}