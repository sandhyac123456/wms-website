// src/components/Header.jsx - Fully Responsive & SEO-Friendly

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Upcoming', path: '/upcoming' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
  { name: 'Career', path: '/job-listing' },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuRef = useRef(null);
  const location = useLocation();

  // Handle scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Manage body overflow when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Manage padding based on route
  useEffect(() => {
    const isHome = location.pathname === '/';
    const headerHeight = '64px'; // h-16
    document.body.style.paddingTop = isHome ? '' : headerHeight;
    
    return () => { document.body.style.paddingTop = ''; };
  }, [location.pathname]);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [menuOpen]);

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-blue-100/40 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 shadow-md' 
          : 'bg-white/90'
      } backdrop-blur-xl`}
      role="banner"
    >
      <nav 
        className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex justify-between items-center h-16">
          
          {/* Logo/Brand - Responsive sizing */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              to="/" 
              className="flex items-center gap-1 xs:gap-2 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
              aria-label="White Mirror Solutions - Home"
            >
              <img
                src="/logo.jpg"
                alt=""
                className="h-8 w-8 sm:h-10 sm:w-10 object-contain drop-shadow rounded"
              />
              <span className="hidden sm:inline text-xs xs:text-sm sm:text-base font-bold text-gray-900 tracking-tight">
                White Mirror
              </span>
              <span className="hidden lg:inline text-xs font-semibold text-gray-600 tracking-tight ml-0.5">
                Solutions
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xs sm:text-sm md:text-base font-semibold px-2 xs:px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 relative group ${
                  isActive(link.path)
                    ? 'text-blue-700 bg-blue-100 shadow-sm'
                    : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50/80 focus:outline-none focus:ring-2 focus:ring-blue-500'
                }`}
                aria-current={isActive(link.path) ? 'page' : undefined}
              >
                {link.name}
                {/* Underline animation on desktop */}
                <span 
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-300 ${
                    isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                  aria-hidden="true"
                ></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button - Responsive */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="inline-flex items-center justify-center p-2 rounded-lg text-blue-700 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-400 transition-all duration-200"
            >
              {/* Hamburger Icon */}
              <svg
                className={`h-5 xs:h-6 w-5 xs:w-6 transition-all duration-300 ${menuOpen ? 'hidden' : 'block'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              
              {/* Close Icon */}
              <svg
                className={`h-5 xs:h-6 w-5 xs:w-6 transition-all duration-300 ${menuOpen ? 'block' : 'hidden'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu - Responsive */}
        <div
          id="mobile-menu"
          ref={mobileMenuRef}
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? 'max-h-screen visible' : 'max-h-0 hidden'
          }`}
          role="region"
          aria-hidden={!menuOpen}
        >
          <div className="px-2 xs:px-3 pt-2 pb-4 xs:pb-6 space-y-1 xs:space-y-2 bg-gradient-to-br from-white via-blue-50 to-cyan-50 border-t border-blue-100/40 shadow-lg rounded-b-2xl">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 xs:px-4 py-2 xs:py-2.5 text-sm xs:text-base font-semibold rounded-lg transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-blue-700 bg-blue-100 shadow-sm'
                    : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50 active:bg-blue-100'
                }`}
                aria-current={isActive(link.path) ? 'page' : undefined}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
