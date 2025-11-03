import ArticleCard from './ArticleCard';

interface ArticleGridProps {
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

export default function ArticleGrid({ articles }: ArticleGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {articles.map((article, index) => (
        <ArticleCard key={article.doi || index} {...article} />
      ))}
    </div>
  );
}