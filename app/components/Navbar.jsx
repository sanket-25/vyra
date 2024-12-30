'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User } from 'lucide-react'; // Assuming you're using lucide-react for icons

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status when component mounts
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#e4e4e4] text-gray-800 bg-white dark:bg-gray-900 dark:text-white px-4 py-6 border-b border-[#9e9e9e] z-50 navbar">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-lg font-bold flex-shrink-0">
          <Link href="/" className="hover:text-gray-600">
            VYRA
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden flex-shrink-0 z-99">
          <button
            className="text-gray-800 hover:text-gray-600 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Links */}
        <ul
          className={`absolute md:relative top-16 md:top-auto left-0 right-0 md:flex md:items-center md:space-x-4 bg-[#e4e4e4] md:bg-transparent p-4 md:p-0 z-40 transform ${isMenuOpen ? 'block' : 'hidden'} md:block`}
        >
          <li className="md:inline">
            <Link href="/about" className="block md:inline dark:text-white text-gray-800 hover:text-gray-600">
              About
            </Link>
          </li>
          <li className="md:inline">
            <Link href="/Events" className="block md:inline dark:text-white text-gray-800 hover:text-gray-600">
              Events
            </Link>
          </li>
          <li className="md:inline">
            <Link href="/Clubs" className="block md:inline dark:text-white text-gray-800 hover:text-gray-600">
              Clubs
            </Link>
          </li>
          <li className="md:inline">
            <Link href="/AI-Coach" className="block md:inline dark:text-white text-gray-800 hover:text-gray-600">
              AI Coach
            </Link>
          </li>
          <li className="md:inline">
            <Link href="/AI-Analysis" className="block md:inline dark:text-white text-gray-800 hover:text-gray-600">
              AI Analysis
            </Link>
          </li>
          <li className="md:inline">
            <Link href="/contact" className="block md:inline dark:text-white text-gray-800 hover:text-gray-600">
              Contact
            </Link>
          </li>
        </ul>

        {/* Toggle Button and Join Button */}
        <div className="flex items-center space-x-4">
          {/* Conditional Rendering: Profile Icon or Join Button */}
          <div className="hidden md:block flex-shrink-0">
            {isLoggedIn ? (
              <Link href="/profile">
                <div className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                  <User size={24} />
                </div>
              </Link>
            ) : (
              <Link href="/join">
                <button
                  className="bg-red-600 text-black px-6 py-2 hover:bg-[#e4e4e4] hover:text-black hover:border-black border-2"
                  style={{
                    clipPath: 'polygon(10% 0%, 99% 0%, 100% 70%, 100% 70%, 90% 100%, 1% 100%, 0% 30%)',
                    borderRadius: '5px',
                    border: '1px solid red',
                  }}
                >
                  Join Now
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Join Button/Profile Icon */}
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          {isLoggedIn ? (
            <Link href="/profile" className="block">
              <div className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full flex items-center justify-center">
                <User size={24} className="mr-2" /> Profile
              </div>
            </Link>
          ) : (
            <Link href="/join">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
                Join Now
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;