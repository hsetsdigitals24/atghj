'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import logo from '../../public/logo/Color@4x.png';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguage, setLanguage] = useState('en');

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainNav = [
    { name: 'Current Issue', href: '/current-issue' },
    { name: 'Archive', href: '/archive' },
    { name: 'Submit', href: '/submit' },
    { name: 'Author Guidelines', href: '/guidelines' },
  ];

  const secondaryNav = [
    { name: 'Editorial Board', href: '/editorial-board' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-primary-600 text-white"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-10 text-sm">
            <p className="hidden sm:block font-medium">
              Bridging Research, Innovation, and Health Equity in Africa!
            </p>
            <div className="flex items-center space-x-4">
              <span>Volume 4, Issue 3 - October 2025</span>
              <button
                onClick={() => setLanguage(isLanguage === 'en' ? 'fr' : 'en')}
                className="text-white hover:text-gray-200 transition-colors"
              >
                {isLanguage === 'en' ? 'FR' : 'EN'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Header */}
      <motion.header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-white dark:bg-gray-900'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <motion.div
              className="flex items-center space-x-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Link href="/" className="flex items-center space-x-3">
                <Image
                  src={logo}
                  alt="ATGHJ Logo"
                  width={80}
                  height={48}
                  className="w-12 h-12"
                  priority
                />
                <div className="flex flex-col">
                  <motion.span 
                    className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    ATGHJ
                  </motion.span>
                  <motion.span 
                    className="text-sm text-gray-600 dark:text-gray-400"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    African Translational & Global Health Journal
                  </motion.span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {/* Main Navigation */}
              <div className="flex space-x-6">
                {mainNav.map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    <Link
                      href={item.href}
                      className="text-gray-700 hover:text-primary-600 dark:text-gray-300 
                               dark:hover:text-white transition-colors duration-200 
                               text-sm font-medium"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/submit"
                  className="inline-flex items-center px-6 py-2.5 border border-transparent 
                           text-sm font-semibold rounded-full text-white bg-primary-600 
                           hover:bg-primary-700 transition-colors duration-200 
                           shadow-sm hover:shadow-md focus:outline-none focus:ring-2 
                           focus:ring-offset-2 focus:ring-primary-500"
                >
                  Submit Manuscript
                </Link>
              </motion.div>
            </nav>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 
                       dark:text-gray-400 dark:hover:text-white focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                )}
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-gray-200 dark:border-gray-800"
            >
              <div className="space-y-1 px-4 pb-3 pt-2">
                {[...mainNav, ...secondaryNav].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-base font-medium text-gray-700 
                             hover:bg-gray-50 hover:text-primary-600 rounded-md 
                             dark:text-gray-300 dark:hover:bg-gray-800 
                             dark:hover:text-white transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="px-3 py-3">
                  <Link
                    href="/submit"
                    className="w-full inline-flex justify-center items-center px-4 py-2.5 
                             border border-transparent text-base font-medium rounded-md 
                             text-white bg-primary-600 hover:bg-primary-700 
                             transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Submit Manuscript
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}