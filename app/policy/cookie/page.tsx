'use client';

import { useState } from 'react';
import Link from 'next/link';

interface CookieCategory {
  id: string;
  name: string;
  description: string;
  necessary: boolean;
  cookies: {
    name: string;
    purpose: string;
    duration: string;
  }[];
}

const cookieCategories: CookieCategory[] = [
  {
    id: 'necessary',
    name: 'Necessary Cookies',
    description: 'Essential cookies that enable core functionality of our website. These cannot be disabled.',
    necessary: true,
    cookies: [
      {
        name: 'session_id',
        purpose: 'Maintains your user session and authentication state',
        duration: 'Session'
      },
      {
        name: 'csrf_token',
        purpose: 'Protects against cross-site request forgery attacks',
        duration: 'Session'
      },
      {
        name: 'preferences',
        purpose: 'Stores your basic site preferences',
        duration: '1 year'
      }
    ]
  },
  {
    id: 'analytics',
    name: 'Analytics Cookies',
    description: 'Help us understand how you use our site to improve your experience.',
    necessary: false,
    cookies: [
      {
        name: '_ga',
        purpose: 'Google Analytics - tracks unique visitors',
        duration: '2 years'
      },
      {
        name: '_gat',
        purpose: 'Google Analytics - throttles request rate',
        duration: '1 minute'
      },
      {
        name: '_gid',
        purpose: 'Google Analytics - tracks sessions',
        duration: '24 hours'
      }
    ]
  },
  {
    id: 'functionality',
    name: 'Functionality Cookies',
    description: 'Enable enhanced features and personalization of your experience.',
    necessary: false,
    cookies: [
      {
        name: 'user_preferences',
        purpose: 'Stores your display preferences and settings',
        duration: '1 year'
      },
      {
        name: 'language',
        purpose: 'Remembers your preferred language',
        duration: '1 year'
      },
      {
        name: 'accessibility',
        purpose: 'Maintains accessibility settings',
        duration: '1 year'
      }
    ]
  }
];

export default function CookiePolicyPage() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>('necessary');
  const [acceptedCategories, setAcceptedCategories] = useState<Set<string>>(new Set(['necessary']));

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const toggleCategoryAcceptance = (categoryId: string) => {
    const newAccepted = new Set(acceptedCategories);
    if (newAccepted.has(categoryId)) {
      if (categoryId !== 'necessary') {
        newAccepted.delete(categoryId);
      }
    } else {
      newAccepted.add(categoryId);
    }
    setAcceptedCategories(newAccepted);
  };

  const handleAcceptAll = () => {
    setAcceptedCategories(new Set(['necessary', 'analytics', 'functionality']));
  };

  const handleAcceptEssential = () => {
    setAcceptedCategories(new Set(['necessary']));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Cookie Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            We use cookies to enhance your experience, analyze site usage, and support our marketing efforts. 
            Learn about what cookies we use and how to manage your preferences.
          </p>
          <div className="mt-4 flex gap-2 text-sm text-gray-500">
            <Link href="/" className="text-accent hover:underline">Home</Link>
            <span>/</span>
            <Link href="/policy" className="text-accent hover:underline">Policy</Link>
            <span>/</span>
            <span>Cookie Policy</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Section */}
          <div className="lg:col-span-2">
            {/* What are Cookies */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What are Cookies?</h2>
              <p className="text-gray-700 mb-4">
                Cookies are small text files stored on your device (computer, tablet, or mobile phone) 
                when you visit our website. They help us recognize you on future visits and enhance your 
                browsing experience. Each cookie contains a unique identifier and may include information 
                about your browsing activity.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <p className="text-blue-900 font-medium mb-2">ATGHJ&rsquo;s Commitment:</p>
                <p className="text-blue-900 text-sm">
                  We are committed to transparency and your privacy. All cookies we use are disclosed below, 
                  and you can manage your preferences at any time.
                </p>
              </div>
            </section>

            {/* Cookie Categories */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Cookies</h2>
              <div className="space-y-4">
                {cookieCategories.map((category) => (
                  <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                    {/* Category Header */}
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1 text-left">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            {category.name}
                            {category.necessary && (
                              <span className="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
                                Required
                              </span>
                            )}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                        </div>
                      </div>
                      <div className="ml-4 flex items-center gap-3">
                        <label
                          className="flex items-center gap-2 cursor-pointer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <input
                            type="checkbox"
                            checked={acceptedCategories.has(category.id)}
                            onChange={() => toggleCategoryAcceptance(category.id)}
                            disabled={category.necessary}
                            className="w-5 h-5 rounded border-gray-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                          <span className="text-sm font-medium text-gray-700">
                            {category.necessary ? 'Always On' : 'Allow'}
                          </span>
                        </label>
                        <svg
                          className={`w-5 h-5 text-gray-600 transition-transform ${
                            expandedCategory === category.id ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>
                    </button>

                    {/* Category Details */}
                    {expandedCategory === category.id && (
                      <div className="bg-gray-50 border-t border-gray-200 px-6 py-4">
                        <div className="space-y-4">
                          {category.cookies.map((cookie, idx) => (
                            <div key={idx} className="bg-white p-4 rounded-lg">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className="font-mono text-sm font-semibold text-gray-900">{cookie.name}</h4>
                                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                  {cookie.duration}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">{cookie.purpose}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Privacy & Data Protection */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Privacy & Data Protection</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  At ATGHJ, your privacy is paramount. We comply with:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span><strong>GDPR:</strong> General Data Protection Regulation (if applicable)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span><strong>CCPA:</strong> California Consumer Privacy Act (if applicable)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span><strong>POPIA:</strong> Protection of Personal Information Act (South Africa)</span>
                  </li>
                </ul>
                <p>
                  We never sell your personal data. Cookies are used solely to improve your experience 
                  and understand how our site is used.
                </p>
              </div>
            </section>

            {/* Managing Cookies */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Your Cookies</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Most browsers allow you to control cookies through their settings. Here&rsquo;s how to manage cookies in popular browsers:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: 'Chrome', path: 'Settings → Privacy and Security → Cookies' },
                    { name: 'Firefox', path: 'Preferences → Privacy & Security → Cookies' },
                    { name: 'Safari', path: 'Preferences → Privacy → Cookies' },
                    { name: 'Edge', path: 'Settings → Privacy → Cookies' }
                  ].map((browser, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-semibold text-gray-900">{browser.name}</p>
                      <p className="text-sm text-gray-600 mt-1">{browser.path}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Changes to Policy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
              <p className="text-gray-700">
                We may update this Cookie Policy from time to time. Any changes will be posted on this page 
                with an updated &quot;Last Modified&quot; date. We encourage you to review this policy periodically.
              </p>
              <p className="text-sm text-gray-500 mt-4">
                Last Modified: November 15, 2025
              </p>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Cookie Preference Manager */}
            <div className="sticky top-8 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Cookie Preferences</h3>
              
              <div className="space-y-3 mb-6">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    {acceptedCategories.size} of {cookieCategories.length} categories enabled
                  </p>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent transition-all duration-300"
                      style={{
                        width: `${(acceptedCategories.size / cookieCategories.length) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <button
                  onClick={handleAcceptAll}
                  className="w-full bg-accent text-white py-2 px-4 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                >
                  Accept All
                </button>
                <button
                  onClick={handleAcceptEssential}
                  className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Essential Only
                </button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-xs text-blue-900">
                  You can change your cookie preferences at any time by visiting this page or through your account settings.
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-6 bg-gray-50 rounded-lg p-6">
              <h4 className="font-bold text-gray-900 mb-4">Related Policies</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/policy" className="text-accent hover:underline text-sm">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/policy/terms" className="text-accent hover:underline text-sm">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-accent hover:underline text-sm">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gray-50 border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-gray-700 font-medium">Have questions about our cookies?</p>
              <p className="text-gray-600 text-sm mt-1">Read our Privacy Policy or contact our Data Protection Officer.</p>
            </div>
            <Link
              href="/contact"
              className="inline-block bg-accent text-white px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
