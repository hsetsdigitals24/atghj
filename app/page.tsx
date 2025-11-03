 import HeroSection from './components/HeroSection';
import FeaturedIssues from './components/FeaturedIssues';
import FeaturedArticles from './components/FeaturedArticles';

export default function Home() {
  // Sample data - replace with actual data from your API
  const sampleIssues = [
    {
      id: '2025-q4',
      volume: 5,
      issue: 4,
      date: '2025-10-01',
      coverImage: '/images/issues/2025-q4.jpg',
      articleCount: 12,
    },
    {
      id: '2025-q3',
      volume: 5,
      issue: 3,
      date: '2025-07-01',
      coverImage: '/images/issues/2025-q3.jpg',
      articleCount: 15,
    },
    {
      id: '2025-q2',
      volume: 5,
      issue: 2,
      date: '2025-04-01',
      coverImage: '/images/issues/2025-q2.jpg',
      articleCount: 14,
    },
    {
      id: '2025-q1',
      volume: 5,
      issue: 1,
      date: '2025-01-01',
      coverImage: '/images/issues/2025-q1.jpg',
      articleCount: 13,
    },
  ];

  const sampleArticles = [
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
      imageUrl: "/images/articles/malaria-prevention.jpg"
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
      imageUrl: "/images/articles/climate-change.jpg"
    },
    {
      title: "Healthcare Access Disparities in Sub-Saharan Africa",
      authors: [
        { name: "Robert Wilson", orcid: "0000-0002-1825-0100" },
        { name: "Mary Brown", orcid: "0000-0002-1825-0101" }
      ],
      abstract: "Analysis of healthcare accessibility patterns and disparities across Sub-Saharan Africa, identifying key barriers and proposing evidence-based solutions for improved healthcare delivery.",
      publicationDate: "2025-10-01",
      doi: "10.1234/atghj.2025.003",
      manuscriptType: "Original Research",
      imageUrl: "/images/articles/healthcare-access.jpg"
    }
  ];

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedIssues issues={sampleIssues} />
      <FeaturedArticles articles={sampleArticles} />
    </div>
  );
}
