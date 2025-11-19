import Link from "next/link";
import { BsFacebook, BsLinkedin, BsTwitterX } from "react-icons/bs";
// import logo from "./../../public/logo/logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-accent text-gray-300 sm:px-6 ">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="block font-bold text-2xl mb-2">
              {/* <Image
                src={logo}
                alt="ATGHJ Logo"
                width={180}
                height={100}
                className="h-auto w-10 object-contain"
              /> */}
              <span className="font-bold text-sm lg:text-lg">
                African Translational & Global Health Journal
              </span>
            </Link>
            <p className="text-sm">
              Bridging Research, Innovation, and Health Equity in Africa!
            </p>
            <div className="space-y-2">
              <p className="text-sm">Impact Factor: 4.235 (2025)</p>
              <p className="text-sm">ISSN: 2789-XXXX</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About ATGHJ
                </Link>
              </li>
              <li>
                <Link
                  href="/editorial"
                  className="hover:text-white transition-colors"
                >
                  Editorial Board
                </Link>
              </li>
              <li>
                <Link
                  href="/guidelines"
                  className="hover:text-white transition-colors"
                >
                  Author Guidelines
                </Link>
              </li>
              <li>
                <Link
                  href="/ethics"
                  className="hover:text-white transition-colors"
                >
                  Publication Ethics
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <p className="text-sm flex items-start">
                <svg
                  className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Afebabalola University, Ekiti State, Nigeria.
              </p>

              <a
                href="mailto:adesola@atghj.africa"
                className="hover:text-white transition-colors my-8"
              >
                <p className="text-sm flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  admin@atghj.africa
                </p>
              </a>

              <p className="text-sm flex items-center">
                <svg
                  className="w-5 h-5 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                +254 (0) 123 456 789
              </p>
            </div>

            {/* <div className="mt-6">
              <h3 className="text-white font-semibold mb-4">Policies</h3>
              
            </div> */}
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 mb-8">
              <a
                href="https://twitter.com/atghj"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <BsTwitterX />
              </a>
              <a
                href="https://www.linkedin.com/company/atghj"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <BsLinkedin />
              </a>
              <a
                href="https://www.facebook.com/atghj"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                <BsFacebook />
              </a>
            </div>

            {/* Developed By Section */}
            <div className="pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-400">
                Developed by
                <a
                  href="https://h-sets.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-opacity-80 transition-colors font-semibold ml-1"
                >
                  H-Sets Digital & IT Solutions
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t max-w-7xl mx-auto border-gray-800 flex flex-col-reverse md:flex-row items-center justify-between  py-4">
        <div className="max-w-7xl sm:px-6  py-6">
          <p className="text-sm text-center">
            © {currentYear} African Translational & Global Health Journal
            (ATGHJ). All rights reserved.
          </p>
        </div>
        <ul className="flex flex-wrap gap-4 text-sm">
          <li>
            <Link href="/policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              href="/policy/terms"
              className="hover:text-white transition-colors"
            >
              Terms of Use
            </Link>
          </li>
          <li>
            <Link
              href="/policy/cookie"
              className="hover:text-white transition-colors"
            >
              Cookie Policy
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
