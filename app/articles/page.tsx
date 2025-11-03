'use client';
import { useState } from 'react';
import ArticleSearch from '@/app/components/articles/ArticleSearch';
import ArticleCard from '@/app/components/ArticleCard';

interface Article {
  title: string;
  authors: { name: string; orcid?: string }[];
  abstract: string;
  publicationDate: string;
  doi: string;
  manuscriptType: string;
  imageUrl?: string;
  subject: string;
}

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    type: [] as string[],
    year: null as number | null,
    subject: [] as string[],
  });

  // Sample data - replace with actual API data
  const articles: Article[] = [
    {
      title: "Novel Approaches to Malaria Prevention in Rural Communities",
      authors: [
        { name: "John Doe", orcid: "0000-0002-1825-0097" },
        { name: "Jane Smith", orcid: "0000-0002-1825-0098" }
      ],
      abstract: "This study explores innovative strategies for malaria prevention in rural African communities, focusing on sustainable and cost-effective solutions that can be implemented at scale.",
      publicationDate: "2025-11-01",
      doi: "10.1234/atghj.2025.001",
      manuscriptType: "Original Research",
      imageUrl: "/images/articles/malaria-prevention.jpg",
      subject: "Public Health"
    },
    {
      title: "Impact of Climate Change on Vector-Borne Diseases in Africa",
      authors: [
        { name: "Alice Johnson", orcid: "0000-0002-1825-0099" }
      ],
      abstract: "A comprehensive review of the effects of climate change on the distribution and prevalence of vector-borne diseases across African regions, with implications for public health planning.",
      publicationDate: "2025-10-15",
      doi: "10.1234/atghj.2025.002",
      manuscriptType: "Review Article",
      imageUrl: "/images/articles/climate-change.jpg",
      subject: "Epidemiology"
    },
    // Add more sample articles as needed
  ];

  // Filter articles based on search and filters
  const filteredArticles = articles.filter(article => {
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.authors.some(author => 
        author.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      article.abstract.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = activeFilters.type.length === 0 || 
      activeFilters.type.includes(article.manuscriptType);

    const matchesYear = !activeFilters.year ||
      new Date(article.publicationDate).getFullYear() === activeFilters.year;

    const matchesSubject = activeFilters.subject.length === 0 ||
      activeFilters.subject.includes(article.subject);

    return matchesSearch && matchesType && matchesYear && matchesSubject;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Articles
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of peer-reviewed research articles in translational medicine
            and global health from across Africa.
          </p>
        </div>

        {/* Search and Filters */}
        <ArticleSearch
          onSearch={setSearchQuery}
          onFilterChange={setActiveFilters}
        />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            Showing {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.doi}
              {...article}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Articles Found
            </h3>
            <p className="text-gray-600">
              {"Try adjusting your search or filters to find what you're looking for."}
            </p>
          </div>
        )}

        {/* Pagination - Add if needed */}
      </div>
    </div>
  );
}