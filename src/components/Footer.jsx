import React from 'react';
import { CONTACT_INFO } from '../constants/data';

const Footer = () => {
  return (
    <footer className="bg-surface-container-low dark:bg-inverse-surface mt-auto">
      <div className="w-full py-stack-lg px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {/* Brand Column */}
        <div className="flex flex-col space-y-stack-sm">
          <div className="text-headline-md font-headline-md font-bold text-primary dark:text-primary-fixed">
            Abaq Al Yasmina Stationery
          </div>
          <p className="font-body-sm text-body-sm text-on-secondary-container dark:text-secondary-fixed-dim max-w-xs">
            Your trusted local source for professional and academic supplies in the heart of Amman.
          </p>
        </div>

        {/* Links Column */}
        <div className="flex flex-col space-y-unit font-body-sm text-body-sm">
          <h4 className="font-headline-md text-body-base text-on-surface mb-2">Connect</h4>
          <a 
            href={`https://wa.me/${CONTACT_INFO.whatsapp}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-on-secondary-container dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-primary-fixed underline opacity-80 hover:opacity-100 transition-opacity"
          >
            WhatsApp
          </a>
          <a 
            href={`tel:${CONTACT_INFO.phone}`} 
            className="text-on-secondary-container dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-primary-fixed underline opacity-80 hover:opacity-100 transition-opacity"
          >
            Phone
          </a>
          <a 
            href="#" 
            className="text-on-secondary-container dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-primary-fixed underline opacity-80 hover:opacity-100 transition-opacity"
          >
            Facebook
          </a>
        </div>

        {/* Info Column */}
        <div className="flex flex-col space-y-unit font-body-sm text-body-sm">
          <h4 className="font-headline-md text-body-base text-on-surface mb-2">Visit Us</h4>
          <span className="text-on-secondary-container dark:text-secondary-fixed-dim">
            Address: {CONTACT_INFO.address}
          </span>
          <span className="text-on-secondary-container dark:text-secondary-fixed-dim">
            Working Hours: {CONTACT_INFO.hours}
          </span>
        </div>

        {/* Copyright spanning full width */}
        <div className="col-span-1 md:col-span-3 mt-stack-md pt-stack-sm border-t border-surface-variant font-body-sm text-body-sm text-on-secondary-container dark:text-secondary-fixed-dim text-center">
          © {new Date().getFullYear()} Abaq Al Yasmina Stationery. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
