import Image from 'next/image';
import Link from 'next/link';
import aboutHero from '../../public/images/hero.jpg';

const SUBMISSION_URL = process.env.SUBMISSION_URL || "https://dashboard.atghj.africa/index.php/journal/submission";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Image */}
      <div className="relative h-96 overflow-hidden">
        {/* Background Image */}
        <Image
          src={aboutHero}
          alt="About ATGHJ"
          fill
          className="object-cover"
          priority
        /> 
      
              {/* Overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-accent/40"></div>
      
        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
            <h1 className="text-5xl font-bold text-white mb-4">
              About ATGHJ
            </h1>
            <p className="text-xl text-white/90 font-medium">
              Bridging Research, Innovation, and Health Equity in Africa!
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Journal Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About the Journal</h2>
          <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
            <p>
              The African Translational & Global Health Journal (ATGHJ) is an open-access, 
              peer-reviewed journal dedicated to advancing the translation of scientific 
              discoveries into clinical practice and community health outcomes across Africa 
              and globally.
            </p>
            <p>
              We publish high-quality research in biomedical sciences, translational medicine, 
              clinical research, neuroscience, public health, epidemiology, and related disciplines.
            </p>
          </div>
        </section>

        {/* Publication Info */}
        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-primary/10 to-primary/20 p-6 rounded-lg border border-primary/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Publication Schedule</h3>
            </div>
            <p className="text-gray-700 font-medium mb-3">
              ATGHJ publishes quarterly issues in:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                January
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                April
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                July
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                October
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-accent/10 to-accent/20 p-6 rounded-lg border border-accent/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-accent rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Indexing</h3>
            </div>
            <p className="text-gray-700 font-medium mb-3">ATGHJ is working towards indexing in:</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                Scopus
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                PubMed
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                DOAJ (Directory of Open Access Journals)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                Web of Science
              </li>
            </ul>
          </div>
        </section>

        {/* Article Types */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Types of Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articleTypes.map((type) => (
              <div 
                key={type.title} 
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-primary transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg group-hover:bg-primary transition-colors mb-3"></div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{type.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{type.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Editorial Process */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Editorial Process</h2>
          <div className="space-y-6">
            <div className="prose prose-lg max-w-none text-gray-600">
              <p>
                ATGHJ follows a rigorous double-blind peer-review process to ensure the 
                highest quality of published research. Our editorial workflow includes:
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {editorialSteps.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-6 rounded-lg border-2 border-primary/30 hover:border-primary/60 transition-colors">
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl"></div>
          <div className="relative px-8 py-12 md:px-12 md:py-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Submit Your Research?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Join our community of researchers advancing health equity in Africa
            </p>
            <Link 
              href={SUBMISSION_URL}
              className="inline-flex items-center px-8 py-4 text-accent bg-white font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Submit Manuscript
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

const articleTypes = [
  {
    title: "Original Research Articles",
    description: "Primary research findings with comprehensive methodology and results analysis."
  },
  {
    title: "Review Articles",
    description: "Systematic or narrative reviews synthesizing current knowledge in the field."
  },
  {
    title: "Case Reports",
    description: "Detailed reports of unique or noteworthy clinical cases."
  },
  {
    title: "Short Communications",
    description: "Brief reports of significant preliminary or novel findings."
  },
  {
    title: "Letters to the Editor",
    description: "Scholarly correspondence regarding published articles or current topics."
  },
  {
    title: "Special Issues",
    description: "Themed collections focusing on specific areas of translational medicine."
  }
];

const editorialSteps = [
  {
    title: "Initial Screening",
    description: "Manuscripts are checked for scope alignment and technical requirements."
  },
  {
    title: "Peer Review",
    description: "Double-blind review by at least two independent experts."
  },
  {
    title: "Editorial Decision",
    description: "Based on reviewer feedback and editorial assessment."
  },
  {
    title: "Publication",
    description: "Accepted articles are prepared for publication with assigned DOI."
  }
];
