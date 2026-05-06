import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-surface dark:bg-inverse-surface shadow-sm sticky top-0 z-50 transition-colors duration-200">
      <div className="flex justify-between items-center w-full px-margin-desktop max-w-container-max mx-auto h-20">
        {/* Brand */}
        <Link to="/" className="text-headline-md font-headline-md font-bold text-primary dark:text-primary-fixed scale-95 active:scale-90 transition-transform">
          Abaq Al Yasmina Stationery
        </Link>

        {/* Navigation Links (Web) */}
        <div className="hidden md:flex space-x-reverse space-x-gutter items-center font-body-base text-body-base">
          <Link 
            to="/categories" 
            className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-colors duration-200 px-2"
          >
            Categories
          </Link>
          <Link 
            to="/offers" 
            className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-colors duration-200 px-2"
          >
            Offers
          </Link>
          <Link 
            to="/contact" 
            className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-colors duration-200 px-2"
          >
            Contact
          </Link>
        </div>

        {/* Trailing Actions & Search */}
        <div className="flex items-center space-x-reverse space-x-stack-sm">
          <div className="hidden md:flex items-center bg-surface-container-low rounded-full px-4 py-2 border border-surface-variant focus-within:border-primary transition-colors">
            <span className="material-symbols-outlined text-outline ml-2">search</span>
            <input 
              aria-label="Search" 
              className="bg-transparent border-none focus:ring-0 text-body-sm font-body-sm text-on-surface placeholder-outline outline-none" 
              placeholder="Search..." 
              type="text"
            />
          </div>
          <button aria-label="Language" className="p-2 text-primary dark:text-primary-fixed hover:bg-surface-container rounded-full transition-colors scale-95 active:scale-90">
            <span className="material-symbols-outlined">language</span>
          </button>
          <button aria-label="Menu" className="md:hidden p-2 text-primary dark:text-primary-fixed hover:bg-surface-container rounded-full transition-colors scale-95 active:scale-90">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
