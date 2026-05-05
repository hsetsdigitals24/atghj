'use client';

import { useState } from 'react';
import Link from 'next/link';

interface TermsSection {
  id: string;
  title: string;
  content: string | string[];
  subsections?: {
    title: string;
    content: string | string[];
  }[];
}

const termsSections: TermsSection[] = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: [
      'By accessing and using the ATGHJ website (atghj.africa), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website or services.',
      'ATGHJ reserves the right to modify these terms at any time. Continued use of the website following any changes constitutes your acceptance of the new terms. We will notify users of significant changes via email or prominent website notice.'
    ]
  },
  {
    id: 'use-license',
    title: '2. License and Use Restrictions',
    content: 'The materials on ATGHJ\'s website are provided on an "as is" basis. ATGHJ grants you a limited, non-exclusive, non-transferable license to access and use the website for legitimate research and educational purposes.',
    subsections: [
      {
        title: 'You May NOT:',
        content: [
          'Modify or copy the materials',
          'Use the materials for any commercial purpose or for any public display',
          'Attempt to decompile or reverse engineer any software contained on the website',
          'Remove any copyright or other proprietary notations from the materials',
          'Transfer the materials to another person or "mirror" the materials on any other server',
          'Systematically retrieve data or content to create a competing service',
          'Use automated tools, scripts, or bots to scrape content without permission'
        ]
      },
      {
        title: 'Permitted Uses:',
        content: [
          'Reading and viewing published articles',
          'Downloading single articles for personal, non-commercial use',
          'Sharing article links through social media or academic networks',
          'Citing articles with proper attribution',
          'Submitting manuscripts through our submission system'
        ]
      }
    ]
  },
  {
    id: 'intellectual-property',
    title: '3. Intellectual Property Rights',
    content: [
      'All content published on ATGHJ, including articles, images, logos, and text, is protected by copyright and other intellectual property laws.',
      'Authors retain copyright to their work but grant ATGHJ an exclusive license to publish and distribute the article under a Creative Commons Attribution 4.0 International (CC BY 4.0) license.',
      'Users may share, distribute, and build upon published articles, provided they give credit to the original authors and indicate if changes were made.',
      'The ATGHJ name, logo, and branding are registered trademarks and cannot be used without explicit written permission.'
    ]
  },
  {
    id: 'user-content',
    title: '4. User-Generated Content',
    content: [
      'By submitting manuscripts, comments, or other content to ATGHJ, you represent and warrant that:',
      '• The content is original and created by you',
      '• You own all rights to the content or have obtained necessary permissions',
      '• The content does not violate any laws or third-party rights',
      '• The content has not been previously published or submitted elsewhere'
    ],
    subsections: [
      {
        title: 'Grant of Rights',
        content: 'Upon submission, you grant ATGHJ a worldwide, royalty-free, non-exclusive license to use, reproduce, distribute, and display your content in connection with our services.'
      },
      {
        title: 'Removal of Content',
        content: 'ATGHJ may remove or restrict access to any user content that violates these terms, publication ethics, or applicable law, without liability to the user.'
      }
    ]
  },
  {
    id: 'user-accounts',
    title: '5. User Accounts and Registration',
    content: [
      'If you create an account on ATGHJ, you are responsible for maintaining the confidentiality of your password and account information.',
      'You agree to accept responsibility for all activities that occur under your account.',
      'You must provide accurate, current, and complete information during registration.',
      'ATGHJ reserves the right to suspend or terminate accounts that violate these terms or engage in prohibited conduct.'
    ]
  },
  {
    id: 'submissions',
    title: '6. Manuscript Submissions',
    content: [
      'All manuscripts submitted to ATGHJ must be original, previously unpublished work that is not under consideration by another journal.',
      'By submitting a manuscript, you agree to ATGHJ\'s publication ethics standards, peer-review process, and editorial decisions.',
      'ATGHJ maintains the right to reject manuscripts that do not meet scientific, ethical, or formatting standards.',
      'Submission fees and Article Processing Charges (APCs) are non-refundable unless ATGHJ withdraws the manuscript for cause.'
    ],
    subsections: [
      {
        title: 'Manuscript Rights',
        content: 'Upon acceptance and publication, authors grant ATGHJ the right to publish the work under the CC BY 4.0 license while retaining their copyright.'
      },
      {
        title: 'Author Responsibilities',
        content: 'Authors are responsible for the accuracy of their work, including citations, data, and ethical compliance. ATGHJ is not liable for errors or omissions in published articles.'
      }
    ]
  },
  {
    id: 'privacy',
    title: '7. Privacy and Data Protection',
    content: [
      'ATGHJ respects your privacy and is committed to protecting your personal data in accordance with applicable privacy laws.',
      'We collect information necessary for account management, manuscript submission, and communication purposes.',
      'Your data is stored securely and will not be shared with third parties without your consent, except as required by law.',
      'For detailed information, please refer to our Privacy Policy.'
    ]
  },
  {
    id: 'disclaimer',
    title: '8. Disclaimer of Warranties',
    content: 'The website and all materials are provided on an "as is" basis without warranties of any kind, either express or implied, including but not limited to:',
    subsections: [
      {
        title: 'Disclaimer Coverage',
        content: [
          'Merchantability or fitness for a particular purpose',
          'Non-infringement of intellectual property rights',
          'Accuracy, completeness, or reliability of content',
          'Uninterrupted or error-free operation of the website',
          'Freedom from viruses or malicious code'
        ]
      }
    ]
  },
  {
    id: 'limitation-liability',
    title: '9. Limitation of Liability',
    content: [
      'To the fullest extent permitted by law, ATGHJ and its officers, directors, employees, and agents shall not be liable for:',
      '• Any indirect, incidental, special, consequential, or punitive damages',
      '• Loss of data, revenue, profits, or business opportunities',
      '• Damages arising from unauthorized access to or use of your account',
      '• Any interruption or cessation of service',
      'Even if ATGHJ has been advised of the possibility of such damages.'
    ]
  },
  {
    id: 'indemnification',
    title: '10. Indemnification',
    content: 'You agree to indemnify and hold harmless ATGHJ and its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including attorney\'s fees) arising from:',
    subsections: [
      {
        title: 'Indemnification Covers',
        content: [
          'Your violation of these Terms of Service',
          'Your violation of any applicable law or regulation',
          'Your infringement of any intellectual property rights',
          'Your user content or submissions',
          'Any claims by third parties related to your use of the website'
        ]
      }
    ]
  },
  {
    id: 'third-party',
    title: '11. Third-Party Links and Content',
    content: [
      'ATGHJ may contain links to third-party websites and resources. We are not responsible for:',
      '• The availability or accuracy of third-party content',
      '• Any damages or losses resulting from use of third-party sites',
      '• The privacy practices of third-party websites',
      'Your use of third-party links is at your own risk and subject to their terms of service.'
    ]
  },
  {
    id: 'termination',
    title: '12. Termination of Service',
    content: [
      'ATGHJ reserves the right to terminate or suspend your account and access to the website at any time, with or without cause.',
      'Termination may result from:',
      '• Violation of these Terms of Service',
      '• Unlawful conduct or misconduct',
      '• Research integrity violations',
      '• Abuse of the submission or peer-review process',
      'Upon termination, your right to use the website immediately ceases.'
    ]
  },
  {
    id: 'governing-law',
    title: '13. Governing Law',
    content: 'These Terms of Service are governed by and construed in accordance with the laws of South Africa, without regard to its conflict of law provisions. Any legal action or proceeding shall be subject to the exclusive jurisdiction of the courts located in South Africa.'
  },
  {
    id: 'dispute-resolution',
    title: '14. Dispute Resolution',
    content: [
      'Before initiating any legal proceedings, you agree to attempt resolution through informal negotiation with ATGHJ.',
      'If informal negotiation fails, you agree to mediation before pursuing arbitration or litigation.',
      'ATGHJ shall not be liable for any failure or delay in performing obligations under these terms when such failure or delay results from circumstances beyond our reasonable control, including natural disasters, pandemics, acts of war, or government actions.'
    ]
  },
  {
    id: 'entire-agreement',
    title: '15. Entire Agreement',
    content: 'These Terms of Service, together with our Privacy Policy, Publication Ethics guidelines, and any other policies posted on the website, constitute the entire agreement between you and ATGHJ regarding your use of the website and supersede all prior and contemporaneous agreements, whether written or oral.'
  },
  {
    id: 'severability',
    title: '16. Severability',
    content: 'If any provision of these Terms of Service is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, that provision shall be severed, and the remaining provisions shall continue in full force and effect.'
  },
  {
    id: 'contact',
    title: '17. Contact Information',
    content: 'For questions about these Terms of Service, please contact us at:',
    subsections: [
      {
        title: 'ATGHJ Editorial Office',
        content: [
          'Email: admin@atghj.africa',
          'Website: www.atghj.africa',
          'Mailing Address: Afe Babalola University, Ekiti State, Nigeria'
        ]
      }
    ]
  }
];

export default function TermsOfServicePage() {
  const [expandedSection, setExpandedSection] = useState<string | null>('acceptance');

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const renderContent = (content: string | string[]) => {
    if (typeof content === 'string') {
      return <p className="text-gray-700 leading-relaxed">{content}</p>;
    }
    return (
      <ul className="space-y-2">
        {content.map((item, idx) => (
          <li key={idx} className="flex gap-3 text-gray-700">
            <span className="text-accent font-bold flex-shrink-0">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mb-4">
            Please read these terms carefully before using ATGHJ. By accessing and using our website and services, 
            you agree to be bound by these Terms of Service and all applicable laws and regulations.
          </p>
          <div className="mt-4 flex gap-2 text-sm text-gray-500">
            <Link href="/" className="text-accent hover:underline">Home</Link>
            <span>/</span>
            <Link href="/policy" className="text-accent hover:underline">Policy</Link>
            <span>/</span>
            <span>Terms of Service</span>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            <strong>Last Updated:</strong> November 15, 2025
          </p>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {termsSections.map((section) => (
              <button
                key={section.id}
                onClick={() => toggleSection(section.id)}
                className="text-left text-accent hover:text-accent/80 text-sm font-medium transition-colors"
              >
                {section.title.split('.')[0]}. {section.title.split('.')[1]?.trim()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="space-y-4">
          {termsSections.map((section) => (
            <div
              key={section.id}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white"
            >
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-6 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-bold text-gray-900 text-left">
                  {section.title}
                </h3>
                <svg
                  className={`w-6 h-6 text-gray-600 transition-transform flex-shrink-0 ${
                    expandedSection === section.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              {/* Section Content */}
              {expandedSection === section.id && (
                <div className="bg-gray-50 border-t border-gray-200 px-6 py-6">
                  <div className="space-y-6">
                    {/* Main content */}
                    <div>
                      {renderContent(section.content)}
                    </div>

                    {/* Subsections */}
                    {section.subsections && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                        {section.subsections.map((subsection, idx) => (
                          <div key={idx} className="bg-white p-5 rounded-lg border border-gray-200">
                            <h4 className="font-bold text-gray-900 mb-3">
                              {subsection.title}
                            </h4>
                            {renderContent(subsection.content)}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-yellow-50 border-t border-yellow-200 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Notice</h2>
            <div className="bg-white border border-yellow-200 rounded-lg p-6 space-y-4 text-gray-700">
              <p>
                These Terms of Service are subject to change at any time. ATGHJ will make reasonable efforts to 
                notify users of significant changes. However, it is your responsibility to review these terms regularly 
                to ensure you are aware of any modifications.
              </p>
              <p>
                If you disagree with the modified terms, you must stop using the website immediately. Your continued 
                use of the website following any changes constitutes your acceptance of the new terms.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Policies */}
      <div className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Policies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Privacy Policy',
                description: 'Learn how we collect, use, and protect your personal information.',
                href: '/policy'
              },
              {
                title: 'Publication Ethics',
                description: 'Understand our standards for research integrity and ethical conduct.',
                href: '/ethics'
              },
              {
                title: 'Cookie Policy',
                description: 'Information about cookies and your privacy preferences.',
                href: '/policy/cookie'
              }
            ].map((policy, idx) => (
              <Link
                key={idx}
                href={policy.href}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow hover:border-accent"
              >
                <h3 className="font-bold text-gray-900 mb-2">{policy.title}</h3>
                <p className="text-gray-600 text-sm">{policy.description}</p>
                <span className="inline-block mt-4 text-accent font-medium text-sm">Read More →</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-accent to-accent/90 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Questions About Our Terms?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Contact our team for clarification or inquiries regarding these Terms of Service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-block bg-white text-accent px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/guidelines"
                className="inline-block border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                Author Guidelines
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
