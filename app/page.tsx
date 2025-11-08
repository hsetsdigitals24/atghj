import HeroSection from './components/HeroSection';
// import FeaturedIssues from './components/FeaturedIssues';
// import FeaturedArticles from './components/FeaturedArticles'; 
import { fetchCurrentIssue } from './api/journal/fetch';
import LatestIssue from './components/LatestIssue';

export default async function Home() {
  try {
    // const articles = await getFeaturedArticles();
    const latestIssue = await fetchCurrentIssue();
    console.log({"latestIssue": latestIssue});
    if (!latestIssue) {
      throw new Error('Failed to fetch data');
    }


    // console.log({"issue": latestIssue.coverImage.en});
    return (
      <div className="min-h-screen">
        <HeroSection />
       <LatestIssue issue={latestIssue} />
        {/* <FeaturedArticles articles={articles} /> */}
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
