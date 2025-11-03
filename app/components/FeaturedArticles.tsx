import Link from 'next/link';
import ArticleCard from './ArticleCard';

interface FeaturedArticlesProps {
  articles: {
    title: string;
    authors: { name: string; orcid?: string }[];
    abstract: string;
    publicationDate: string;
    doi?: string;
    manuscriptType: string;
    imageUrl?: string;
  }[];
}

export default function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Research</h2>
          <p className="text-lg text-gray-600">
            Discover groundbreaking research in translational medicine and global health
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <ArticleCard key={article.doi || index} {...article} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/articles" className="inline-flex items-center justify-center px-6 py-3 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-md font-medium transition-colors duration-200">
            View More Articles
          </Link>
        </div>
      </div>
    </section>
  );
}