'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSocialClick = (e) => {
    e.preventDefault();
    window.location.href = 'https://thevyra.live';
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 px-4 py-6 border-b z-50 navbar transition-colors duration-300 ${
        isScrolled ? 'bg-gray-800 text-white border-gray-700' : 'bg-[#ededed] text-gray-800 border-[#9e9e9e]'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-lg font-bold flex-shrink-0">
          <Link href="/" className="hover:text-gray-400">
            VYRA
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden flex-shrink-0 ml-auto">
          <button
            className="hover:text-gray-400 focus:outline-none"
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
          className={`absolute md:relative top-16 md:top-auto left-0 right-0 md:flex md:items-center md:space-x-4 bg-[#ededed] md:bg-transparent p-4 md:p-0 z-40 transform ${
            isMenuOpen ? 'block' : 'hidden'
          } md:block`}
        >
          <li>
            <Link href="/AI-Analysis" className="block md:inline hover:text-gray-400">
              AI Analysis
            </Link>
          </li>
          <li>
            <a href="#" onClick={handleSocialClick} className="block md:inline hover:text-gray-400">
              Social
            </a>
          </li>
          <li>
            <Link href="/AI-Coach" className="block md:inline hover:text-gray-400">
              AI Coach
            </Link>
          </li>
          <li>
            <Link href="/events" className="block md:inline hover:text-gray-400">
              Events
            </Link>
          </li>
          <li>
            <Link href="/clubs" className="block md:inline hover:text-gray-400">
              Clubs
            </Link>
          </li>
        </ul>

        {/* Toggle Button and Join Button */}
        <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
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
