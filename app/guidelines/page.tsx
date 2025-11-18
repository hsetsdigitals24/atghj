import Link from 'next/link';
import Image from 'next/image';
import guidelinesHero from '../../public/images/hero.jpg';

interface GuidelineSection {
  title: string;
  id: string;
  content: string | React.ReactNode;
}

const SUBMISSION_URL = process.env.SUBMISSION_URL;

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Image */}
      <div className="relative h-96 bg-gradient-to-r from-blue-800 to-indigo-900 overflow-hidden">
        {/* Background Image */}
        <Image
          src={guidelinesHero}
          alt="Author Guidelines"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-accent/50"></div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
            <h1 className="text-5xl font-bold text-white mb-4">Author Guidelines</h1>
            <p className="text-xl text-blue-100">
              Everything you need to know about submitting to ATGHJ
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Navigation Sidebar */}
          <div className="hidden lg:block">
            <nav className="sticky top-8 space-y-2 bg-white p-4 rounded-lg shadow-sm border border-gray-200" aria-label="Guidelines Navigation">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block px-3 py-2 text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-accent rounded-md transition-colors"
                >
                  {section.title}
                </a>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="prose prose-lg max-w-none">
              {/* Quick Links */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-8 border border-blue-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Links</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <Link
                    href={SUBMISSION_URL || "https://dashboard.atghj.africa/index.php/journal/submission"}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-md text-gray-800 hover:bg-accent bg-primary transition-all duration-200"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Submit Manuscript
                  </Link>
                  {/* <Link
                    href="/templates"
                    className="inline-flex items-center justify-center px-6 py-3 border-2 border-accent text-sm font-medium rounded-lg text-accent bg-white hover:bg-blue-50 transition-all duration-200"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Templates
                  </Link> */}
                </div>
              </div>

              {/* Guidelines Sections */}
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="mb-12 pb-12 border-b border-gray-200 last:border-b-0">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {section.title}
                  </h2>
                  <div className="text-gray-600 space-y-4">{section.content}</div>
                </section>
              ))}

              {/* Contact Information */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-8 rounded-lg mt-8 border border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      Need Help?
                    </h2>
                    <p className="text-gray-600 mb-3">
                      {"If you have any questions about the submission process or these guidelines, please don't hesitate to contact our editorial office:"}
                    </p>
                    <div className="space-y-2">
                      <p className="text-gray-700 font-medium">
                        <span className="text-accent">Email:</span> adeoluwa@atghj.africa
                      </p>
                      <p className="text-gray-700 font-medium">
                        <span className="text-accent">Response time:</span> 24-48 hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const sections: GuidelineSection[] = [
  {
    title: "Scope and Focus",
    id: "scope",
    content: (
      <>
        <p>
          ATGHJ publishes high-quality research advancing the translation of scientific 
          discoveries into clinical practice and community health outcomes across Africa 
          and globally. We welcome submissions in:
        </p>
        <ul className="list-disc pl-6 mt-4 space-y-2">
          <li>Biomedical sciences</li>
          <li>Translational medicine</li>
          <li>Public health</li>
          <li>Clinical research</li>
        </ul>
      </>
    ),
  },
  {
    title: "Article Types",
    id: "article-types",
    content: (
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-blue-900">Original Research Articles</h3>
          <p className="text-gray-600">4,000-6,000 words, structured abstract (250-300 words)</p>
          <p className="text-gray-600">Sections: Introduction, Methods, Results, Discussion</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-blue-900">Review Articles</h3>
          <p className="text-gray-600">5,000-8,000 words, structured abstract (250-300 words)</p>
          <p className="text-gray-600">Systematic or narrative reviews with comprehensive literature analysis</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-blue-900">Case Reports</h3>
          <p className="text-gray-600">1,500-3,000 words, structured abstract (150-200 words)</p>
          <p className="text-gray-600">Novel or educational clinical cases with literature review</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-blue-900">Short Communications</h3>
          <p className="text-gray-600">2,000-3,000 words, structured abstract (150-200 words)</p>
          <p className="text-gray-600">Brief reports of significant preliminary findings</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-blue-900">Letters to the Editor</h3>
          <p className="text-gray-600">500-1,000 words, no abstract required</p>
          <p className="text-gray-600">Commentary on published articles or current topics</p>
        </div>
      </div>
    ),
  },
  {
    title: "Manuscript Preparation",
    id: "preparation",
    content: (
      <>
        <h3 className="text-lg font-semibold mb-4 text-blue-900">File Format</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Submit manuscripts in DOC, DOCX, or LaTeX format</li>
          <li>Maximum file size: 50MB</li>
          <li>Use standard fonts (Times New Roman, Arial, or Calibri)</li>
          <li>12-point font size, double-spaced, with 1-inch margins</li>
        </ul>

        <h3 className="text-lg font-semibold mb-4 text-blue-900">Structure</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Title page (title, authors, affiliations, corresponding author)</li>
          <li>Abstract (structured according to article type)</li>
          <li>Keywords (3-6 relevant terms)</li>
          <li>Main text (following article type structure)</li>
          <li>References (Vancouver style)</li>
          <li>Tables and Figures (with legends)</li>
          <li>Supplementary materials (if applicable)</li>
        </ul>

        <h3 className="text-lg font-semibold mb-4 text-blue-900">Figures and Tables</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>High-resolution images (minimum 300 dpi)</li>
          <li>Acceptable formats: JPG, PNG, TIFF</li>
          <li>Clear, self-explanatory legends</li>
          <li>Tables in editable format (not images)</li>
        </ul>
      </>
    ),
  },
  {
    title: "Ethics and Policies",
    id: "ethics",
    content: (
      <>
        <ul className="list-disc pl-6 space-y-4">
          <li>
            <strong>Ethics Approval:</strong> All research involving human or animal 
            subjects must have appropriate ethical approval
          </li>
          <li>
            <strong>Consent:</strong> Written informed consent for publication of 
            clinical details/images
          </li>
          <li>
            <strong>Clinical Trials:</strong> Registration in a public trials 
            registry required
          </li>
          <li>
            <strong>Conflicts of Interest:</strong> Must be declared using the ICMJE form
          </li>
          <li>
            <strong>Plagiarism:</strong> All submissions are checked using Turnitin
          </li>
          <li>
            <strong>Data Sharing:</strong> Encourage open data practices where appropriate
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "Submission Process",
    id: "submission",
    content: (
      <>
        <p className="mb-4">
          Submissions are handled through our online submission system. The process 
          includes:
        </p>
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            <strong>Account Creation:</strong> Register or log in to the submission system
          </li>
          <li>
            <strong>Manuscript Upload:</strong> Follow the step-by-step submission wizard
          </li>
          <li>
            <strong>Author Information:</strong> Provide details for all authors, 
            including ORCID IDs
          </li>
          <li>
            <strong>Metadata Entry:</strong> Title, abstract, keywords, and other 
            required information
          </li>
          <li>
            <strong>File Upload:</strong> Main manuscript and supplementary files
          </li>
          <li>
            <strong>Review & Submit:</strong> Verify all information before final submission
          </li>
        </ol>
      </>
    ),
  },
  {
    title: "Publication Fees",
    id: "fees",
    content: (
      <>
        <p className="mb-4">
          ATGHJ is an open-access journal with the following publication fees:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Article Processing Charge (APC): N0 (Naira)</li>
          <li>Waiver program available for authors from low-income countries</li>
          <li>No submission fees</li>
          <li>No page charges</li>
        </ul>
        <p className="mt-4">
          Payment is required only after manuscript acceptance. Detailed payment 
          instructions will be provided with the acceptance letter.
        </p>
      </>
    ),
  },
  {
    title: "Review Process",
    id: "review",
    content: (
      <>
        <p className="mb-4">Our peer review process includes:</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Initial editorial screening (1-3 days)</li>
          <li>Double-blind peer review (4-6 weeks)</li>
          <li>Editorial decision based on reviews</li>
          <li>Revision opportunity if required</li>
          <li>Final decision and publication</li>
        </ol>
        <p className="mt-4">
          Authors can track their manuscript status through their account dashboard.
        </p>
      </>
    ),
  },
];
