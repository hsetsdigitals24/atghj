import HeroSection from './components/HeroSection';  
import LatestIssue from './components/LatestIssue'; 

export default async function Home() {
  
    return (
      <div className="min-h-screen">
        <HeroSection />
       <LatestIssue  />
        {/* <FeaturedArticles articles={articles} /> */}
      </div>
    );
  
}
