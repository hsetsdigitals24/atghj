import Link from 'next/link';
import hero from '../../public/images/hero.jpg'

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-indigo-900 to-blue-800 text-white bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${hero.src})`}}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            African Translational & Global Health Journal
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Bridging Research, Innovation, and Health Equity in Africa!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href={process.env.SUBMISSION_URL || "https://dashboard.atghj.africa/index.php/journal/submission"}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-md font-semibold transition-colors duration-200"
            >
              Submit Manuscript
            </Link>
            <Link 
              href="/issues/submissions"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-md font-semibold backdrop-blur-sm transition-colors duration-200"
            >
              Browse Articles
            </Link>
          </div>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold">5</div>
              <div className="text-gray-300">Issues per Year</div>
            </div>
            <div>
              <div className="text-3xl font-bold">Global</div>
              <div className="text-gray-300">Reach</div>
            </div>
            <div>
              <div className="text-3xl font-bold">Peer</div>
              <div className="text-gray-300">Reviewed</div>
            </div>
            <div>
              <div className="text-3xl font-bold">Open</div>
              <div className="text-gray-300">Access</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}