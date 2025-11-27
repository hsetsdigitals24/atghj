'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Publication {
  id: number;
  title: string | { [locale: string]: string };
  abstract?: string | { [locale: string]: string };
  authors?: Array<{
    id: number;
    fullName: string;
  }>;
  galleys?: {
    id: number;
  };
  pages?: string;
  datePublished?: string;
  urlPublished?: string;
}

interface Submission {
  id: number;
  currentPublicationId: number;
  publications: Publication[];
  status: number;
}

interface OJSResponse {
  items: Submission[];
  itemsMax: number;
}

export default function IssueArticlesPage() {
  const params = useParams();
  const issueId = params.issueId as string;
  const [articles, setArticles] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch(`/api/issues/${issueId}`);
         
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }

        const data: OJSResponse = await response.json(); 
        setArticles(data.items || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, [issueId]);


console.log({"article": articles[1]?.publications[0]  });



  const getLocalizedValue = (value: string | { [locale: string]: string }) => {
    if (typeof value === 'string') return value;
    return value['en'] || value['en_US'] || Object.values(value)[0] || '';
  };

  if (loading) {
    return (
      <div className="p-8">
        <p>Loading articles...</p>
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

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Articles in Issue {issueId}</h1>
      
      {articles.length === 0 ? (
        <p>No articles found in this issue.</p>
      ) : (
        <div className="space-y-6">
          {articles.map((submission) => {
            const publication = submission.publications.find(
              p => p.id === submission.currentPublicationId
            );
            
            if (!publication) return null;
            console.log({"publication_in_page": publication});
            return (
              <article key={submission.id} className="border p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">
                  {getLocalizedValue(publication.title)}
                </h2>
                
                {publication.authors && publication.authors.length > 0 && (
                  <p className="text-gray-600 mb-2">
                    By: {publication.authors.map(a => a.fullName).join(', ')}
                  </p>
                )}
                
                {publication.pages && (
                  <p className="text-sm text-gray-500 mb-2">
                    Pages: {publication.pages}
                  </p>
                )}
                
                {publication.abstract && (
                  <div className="mt-3">
                    <h3 className="font-medium mb-1">Abstract:</h3>
                    <div 
                      className="text-gray-700"
                      dangerouslySetInnerHTML={{ 
                        __html: getLocalizedValue(publication.abstract) 
                      }}
                    />
                  </div>
                )}
<<<<<<< HEAD
                 
                  <Link
                  href={{
                    pathname: `/ArticlePreviewPage`,
                    query: {publication: JSON.stringify(publication), submission: JSON.stringify(submission) }
                    }} 
                    className="inline-block mt-4 text-accent hover:underline"
                  >
                    View Full Article →
                  </Link> 
=======
                
                {/* {publication.urlPublished && ( */}
                  <Link                                       
                    href={`/articles/${publication.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-accent hover:underline"
                  >
                    View →
                  </Link>
                {/* )} */}
>>>>>>> 4206553 (completed articles page with other textual edits, details and info for the journal)
              </article>
            );
          })}
        </div>
      )}
      
      <p className="mt-6 text-sm text-gray-500">
        Total articles: {articles.length}
      </p>
    </div>
  );
}
