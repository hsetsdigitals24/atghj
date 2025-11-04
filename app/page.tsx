import HeroSection from './components/HeroSection';
import FeaturedIssues from './components/FeaturedIssues';
import FeaturedArticles from './components/FeaturedArticles';
import { getFeaturedArticles, getLatestIssue } from '@/app/utils/journal';

export default async function Home() {
  try {
    const articles = await getFeaturedArticles();
    const latestIssue = await getLatestIssue();

    if (!articles || !latestIssue) {
      throw new Error('Failed to fetch data');
    }

    // Transform the latestIssue to match the FeaturedIssues component's expectations
    const formattedIssue = {
      id: `${latestIssue.volume}-${latestIssue.issue}`,
      volume: latestIssue.volume,
      issue: latestIssue.issue,
      date: latestIssue.date,
      coverImage: latestIssue.coverImage || '/images/default-cover.jpg', // Provide a default cover image
      articleCount: latestIssue.articles.length
    };

    return (
      <div className="min-h-screen">
        <HeroSection />
        <FeaturedIssues issues={[formattedIssue]} />
        <FeaturedArticles articles={articles} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return (
      <div className="min-h-screen">
        <HeroSection />
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-gray-900">
            Unable to load journal data
          </h2>
          <p className="mt-2 text-gray-600">
            Please try again later
          </p>
        </div>
      </div>
    );
  }
}
