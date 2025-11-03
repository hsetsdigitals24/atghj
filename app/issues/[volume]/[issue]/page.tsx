import IssueHeader from '@/app/components/issues/IssueHeader';
import ArticleList from '@/app/components/issues/ArticleList';

interface Props {
  params: {
    volume: string;
    issue: string;
  };
}

export default function IssueView({ params }: Props) {
  // Sample data - replace with actual API data
  const issueData = {
    volume: parseInt(params.volume),
    issue: parseInt(params.issue),
    date: '2025-10-01',
    coverImage: '/images/issues/2025-q4.jpg',
    articleCount: 12,
    description: 'This issue features groundbreaking research in translational medicine and global health, with a special focus on infectious diseases and public health interventions in Africa.',
    editors: [
      { name: 'Dr. Sarah Johnson', role: 'Issue Editor' },
      { name: 'Prof. Michael Okonjo', role: 'Associate Editor' },
      { name: 'Dr. Fatima Ahmed', role: 'Guest Editor' },
      { name: 'Dr. Robert Chen', role: 'Statistical Editor' }
    ],
    downloadUrl: `/issues/${params.volume}/${params.issue}/download`
  };

  const articles = [
    {
      title: "Novel Approaches to Malaria Prevention in Rural Communities",
      authors: [
        { name: "John Doe", orcid: "0000-0002-1825-0097" },
        { name: "Jane Smith", orcid: "0000-0002-1825-0098" }
      ],
      abstract: "This study explores innovative strategies for malaria prevention in rural African communities, focusing on sustainable and cost-effective solutions that can be implemented at scale.",
      doi: "10.1234/atghj.2025.001",
      manuscriptType: "Original Research",
      pages: "1-15",
      citations: 12,
      downloads: 345
    },
    {
      title: "Impact of Climate Change on Vector-Borne Diseases in Africa",
      authors: [
        { name: "Alice Johnson", orcid: "0000-0002-1825-0099" }
      ],
      abstract: "A comprehensive review of the effects of climate change on the distribution and prevalence of vector-borne diseases across African regions, with implications for public health planning.",
      doi: "10.1234/atghj.2025.002",
      manuscriptType: "Review Article",
      pages: "16-32",
      citations: 8,
      downloads: 287
    },
    // Add more sample articles as needed
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Issue Header */}
        <div className="mb-8">
          <IssueHeader {...issueData} />
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
              African Translational & Global Health Journal (2025) Volume {params.volume}, 
              Issue {params.issue}. ATGHJ Publishing Group. 
              https://doi.org/10.1234/atghj.{params.volume}.{params.issue}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}