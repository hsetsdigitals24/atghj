import IssueHeader from '@/app/components/issues/IssueHeader';
import ArticleList from '@/app/components/issues/ArticleList';

import { getIssueByNumber } from '@/app/utils/journal';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    volume: string;
    issue: string;
  };
}

export default async function IssueView({ params }: Props) {
  const volumeNumber = parseInt(params.volume);
  const issueNumber = parseInt(params.issue);

  const issueData = await getIssueByNumber(volumeNumber, issueNumber);
  
  if (!issueData) {
    notFound();
  }

  // Transform the issue data to match our component props
  const transformedIssueData = {
    volume: volumeNumber,
    issue: issueNumber,
    date: issueData.date,
    coverImage: issueData.coverImage || '/images/default-cover.jpg',
    articleCount: issueData.articles.length,
    description: issueData.description || `Issue ${issueNumber} of Volume ${volumeNumber}`,
    editors: [], // We don't have editors in the API data yet
    downloadUrl: `/issues/${params.volume}/${params.issue}/download` // This might need to be updated based on actual PDF URL
  };

  // Transform articles from the API format to the component format
  const articles = issueData.articles.map(article => ({
    title: article.title,
    authors: article.authors.map(author => ({
      name: author.name,
      orcid: author.orcid
    })),
    abstract: article.abstract,
    doi: article.doi,
    manuscriptType: article.manuscriptType || 'Article',
    pages: article.pageRange,
    citations: 0, // We don't have this data from the API yet
    downloads: 0, // We don't have this data from the API yet
    pdfUrl: article.pdfUrl
  }));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Issue Header */}
        <div className="mb-8">
          <IssueHeader {...transformedIssueData} />
        </div>

        {/* Articles Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Articles in this Issue
          </h2>
          
          {/* Article Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {['Original Research', 'Review Articles', 'Case Reports'].map((category) => (
              <div key={category} className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-medium text-gray-900">{category}</h3>
                <p className="text-2xl font-bold text-indigo-600">
                  {articles.filter(a => a.manuscriptType === category).length}
                </p>
              </div>
            ))}
          </div>

          {/* Articles List */}
          <ArticleList articles={articles} />
        </div>

        {/* Citation Information */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">How to Cite this Issue</h2>
          <div className="prose prose-indigo max-w-none">
            <p className="text-gray-600">
              African Translational & Global Health Journal ({new Date(issueData.date).getFullYear()}) 
              Volume {params.volume}, Issue {params.issue}. 
              {issueData.description && `: ${issueData.description}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}