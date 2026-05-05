import Image from "next/image";
import hero from "../../public/images/hero.jpg";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
 <div className="relative h-96 overflow-hidden">
        {/* Background Image */}
        <Image
          src={hero}
          alt="Privacy Policy"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-accent/40"></div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
           
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
            <p className="text-lg mx-auto text-gray-50 max-w-3xl mb-4">
            How we handle and protect your information.
          </p>
          </div>
        </div>
      </div>
     

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          {/* Last Updated */}
          <p className="text-sm text-gray-500">
            Last Updated: November 18, 2025
          </p>

          {/* Introduction */}
          <section className="mb-12">
            <h2>Introduction</h2>
            <p>
              The African Translational & Global Health Journal (ATGHJ) is
              committed to protecting the privacy of our users. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your
              information when you interact with our journal website and
              submission system.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-12">
            <h2>Information We Collect</h2>

            <h3>Account Information</h3>
            <ul>
              <li>Name and academic titles</li>
              <li>Institutional affiliation</li>
              <li>Email address</li>
              <li>ORCID identifier</li>
              <li>Contact information</li>
              <li>Professional biographical information</li>
            </ul>

            <h3>Submission Data</h3>
            <ul>
              <li>Manuscript content and metadata</li>
              <li>Author information</li>
              <li>Supplementary materials</li>
              <li>Correspondence related to submissions</li>
              <li>Review comments and decisions</li>
            </ul>

            <h3>Usage Information</h3>
            <ul>
              <li>IP addresses</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Access timestamps</li>
              <li>Page views and navigation patterns</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-12">
            <h2>How We Use Your Information</h2>
            <ul>
              <li>
                <strong>Manuscript Processing:</strong> To manage the peer
                review and publication process
              </li>
              <li>
                <strong>Communication:</strong> To send notifications about
                submission status, review requests, and journal updates
              </li>
              <li>
                <strong>Account Management:</strong> To maintain your user
                account and provide access to journal services
              </li>
              <li>
                <strong>Quality Improvement:</strong> To analyze and improve our
                services and user experience
              </li>
            </ul>
          </section>

          {/* Data Protection */}
          <section className="mb-12">
            <h2>Data Protection</h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal information, including:
            </p>
            <ul>
              <li>Secure SSL/TLS encryption for all data transmission</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication protocols</li>
              <li>Data backup and recovery procedures</li>
              <li>Staff training on data protection and privacy</li>
            </ul>
          </section>

          {/* Data Sharing */}
          <section className="mb-12">
            <h2>Data Sharing and Disclosure</h2>
            <p>We may share your information with:</p>
            <ul>
              <li>Editorial team members for manuscript processing</li>
              <li>Peer reviewers (with appropriate anonymization)</li>
              <li>Publishing partners for accepted manuscripts</li>
              <li>
                Technical service providers who assist in journal operations
              </li>
            </ul>
            <p>
              We do not sell or rent your personal information to third parties
              for marketing purposes.
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <h2>Your Rights</h2>
            <p>Under data protection laws, you have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to certain data processing</li>
              <li>Withdraw consent for optional data processing</li>
              <li>Receive your data in a portable format</li>
            </ul>
          </section>

          {/* Cookies */}
          <section className="mb-12">
            <h2>Cookie Policy</h2>
            <p>
              We use cookies and similar technologies to improve your browsing
              experience and analyze website traffic. You can control cookie
              preferences through your browser settings.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-12">
            <h2>Contact Us</h2>
            <p>
              For any privacy-related questions or requests, please contact our
              Data Protection Officer:
            </p>
            <div className="bg-gray-100 p-4 rounded-lg mt-4">
              <p>Email: privacy@atghj.africa</p>
              <p>Address: [Journal Office Address]</p>
              <p>Phone: [Contact Number]</p>
            </div>
          </section>

          {/* Updates to Policy */}
          <section className="mb-12">
            <h2>Updates to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically to reflect changes
              in our practices or legal requirements. We will notify users of
              any material changes through our website or direct communication.
            </p>
          </section>
        </div>

        {/* Quick Links */}
        <div className="mt-16 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Related Policies
          </h2>
          <div className="grid gap-4">
            <a href="/terms" className="text-indigo-600 hover:text-indigo-800">
              Terms of Use
            </a>
            <a
              href="/author-guidelines"
              className="text-indigo-600 hover:text-indigo-800"
            >
              Author Guidelines
            </a>
            <a
              href="/publication-ethics"
              className="text-indigo-600 hover:text-indigo-800"
            >
              Publication Ethics
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
