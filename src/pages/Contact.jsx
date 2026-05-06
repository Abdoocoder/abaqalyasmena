import React from 'react';
import Layout from '../components/Layout';
import { CONTACT_INFO } from '../constants/data';
import WhatsAppButton from '../components/WhatsAppButton';

const Contact = () => {
  return (
    <Layout>
      <main className="max-w-container-max mx-auto px-margin-desktop py-stack-lg">
        <header className="mb-stack-lg">
          <h1 className="text-display-lg font-display-lg text-on-surface mb-stack-sm text-center">Contact Us</h1>
          <p className="text-body-base text-on-surface-variant text-center max-w-2xl mx-auto">We are here to help you with all your stationery needs. Visit us at Java Street or reach out online.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-stretch">
          {/* Contact Details */}
          <div className="flex flex-col gap-stack-md">
            <div className="bg-surface-container-low rounded-xl p-8 shadow-ambient flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg text-primary">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-on-surface mb-1">Our Location</h3>
                  <p className="text-on-surface-variant">{CONTACT_INFO.addressAr}</p>
                  <p className="text-on-surface-variant">{CONTACT_INFO.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg text-primary">
                  <span className="material-symbols-outlined">phone</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-on-surface mb-1">Phone Number</h3>
                  <p className="text-on-surface-variant">{CONTACT_INFO.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg text-primary">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-on-surface mb-1">Working Hours</h3>
                  <p className="text-on-surface-variant">{CONTACT_INFO.hoursAr}</p>
                  <p className="text-on-surface-variant">{CONTACT_INFO.hours}</p>
                </div>
              </div>
              <div className="pt-4 flex flex-col gap-3">
                <WhatsAppButton className="w-full justify-center" />
                <a href={`tel:${CONTACT_INFO.phone}`} className="w-full bg-secondary-container text-primary font-label-caps text-label-caps px-6 py-3 rounded-xl shadow-ambient text-center flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">phone</span>
                  Call Now
                </a>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-surface-container-highest rounded-xl overflow-hidden shadow-ambient min-h-[400px] flex items-center justify-center relative">
            <div className="absolute inset-0 bg-primary/5 flex flex-col items-center justify-center p-8 text-center">
              <span className="material-symbols-outlined text-[64px] text-primary mb-4">map</span>
              <h3 className="text-headline-md text-on-surface mb-2">Find Us on Google Maps</h3>
              <p className="text-on-surface-variant mb-6">Click the button below to get directions to our store on Java Street.</p>
              <a 
                href="https://maps.google.com/?q=Java+Street+Amman" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-primary text-on-primary font-label-caps text-label-caps px-8 py-4 rounded-xl shadow-ambient-hover"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Contact;
