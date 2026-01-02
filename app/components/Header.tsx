'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import logo from '../../public/logo/logo.png';
import { Divide as Hamburger } from 'hamburger-react'


interface CurrentIssue {
  id: number;
  volume?: number;
  number?: string;
  year?: number;
  month?: string;
  formattedDate?: string;
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [currentIssue, setCurrentIssue] = useState<CurrentIssue | null>(null);
  const submission_url = process.env.NEXT_PUBLIC_SUBMISSION_URL;

  // Fetch current issue
  useEffect(() => {
    async function fetchCurrentIssue() {
      try {
        const response = await fetch('/api/header');
        if (response.ok) {
          const data = await response.json();
          setCurrentIssue(data);
        }
      } catch (error) {
        console.error('Error fetching current issue:', error);
      }
    }
    fetchCurrentIssue();
  }, []);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainNav = [
    { name: 'Current Issue', href: '/' },
    { name: 'Archive', href: '/archive' },
    {name: 'Announcements', href: '/announcements' },
    { name: 'Dashboard', href: submission_url || "https://dashboard.atghj.africa/index.php/journal/submission" },
    { name: 'Author Guidelines', href: '/guidelines' },
  ];

  const secondaryNav = [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const resourcesNav = [
    { name: 'About The Journal', href: '/about' },
    { name: 'Editorial Masthead', href: '/masthead' },
    { name: 'Privacy Statement', href: '/policy' },
    { name: 'Contact', href: '/contact' },
  ];

  // Format announcement text
  const announcementText = currentIssue 
    ? `Volume ${currentIssue.volume}, Issue ${currentIssue.number} - ${currentIssue.month} ${currentIssue.year}`
    : 'Volume 1, Issue 1 - October 2025';

  return (
    <>
     

      {/* Main Header */}
      <motion.header
        className={`sticky top-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-lg`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <motion.div
              className="flex items-center flex-col space-x-4 pb-2"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Link href="/" className="flex items-center space-x-3">
                <Image
                  src={logo}
                  alt="ATGHJ Logo"
                  width={120}
                  height={50}
                  className="w-75 h-auto"
                  priority
                />
              </Link>
              <span className="text-xs font-bold italic">Supports open acces</span>
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
                      className="text-gray-700 hover:text-primary dark:text-gray-700 
                               dark:hover:text-primary transition-colors duration-200 
                               text-sm font-medium"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                
                {/* Resources Dropdown */}
                <div className="relative">
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    className="text-gray-700 hover:text-primary dark:text-gray-700 
                             dark:hover:text-primary transition-colors duration-200 
                             text-sm font-medium flex items-center"
                    onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                  >
                    Resources
                    <svg
                      className={`ml-1 h-4 w-4 transition-transform ${
                        isResourcesOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isResourcesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white 
                                 dark:bg-white ring-1 ring-black ring-opacity-5"
                      >
                        <div className="py-1">
                          {resourcesNav.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 
                                       dark:text-gray-700 dark:hover:bg-gray-700  dark:hover:text-white"
                              onClick={() => setIsResourcesOpen(false)}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={submission_url || "https://dashboard.atghj.africa/index.php/journal/submission"} 
                  className="inline-flex items-center px-6 py-2.5 border border-transparent 
                           text-sm font-semibold rounded-full text-white bg-accent
                           hover:bg-primary transition-colors duration-200 
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
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-accent 
                       dark:text-gray-800 dark:hover:text-white focus:outline-none"
            >
              <Hamburger toggled={isMobileMenuOpen} toggle={setIsMobileMenuOpen} size={20} />
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
                             hover:bg-gray-50 hover:text-primary rounded-md 
                             dark:text-gray-800 dark:hover:bg-gray-800 
                             dark:hover:text-white transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="px-3 py-3">
                  <Link
                    href={submission_url || "https://dashboard.atghj.africa/index.php/journal/submission"}
                    className="w-full inline-flex justify-center items-center px-4 py-2.5 
                             border border-transparent text-base font-medium rounded-md 
                             text-white bg-primary hover:bg-primary 
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
      {/* Announcement Bar */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-primary text-gray-800"
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-10 text-sm">
            <p className="hidden sm:block font-medium">
              Bridging Research, Innovation, and Health Equity in Africa!
            </p>
            <div className="flex items-center space-x-4">
              <span>{announcementText}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}