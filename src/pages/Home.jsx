import React from 'react';
import Layout from '../components/Layout';
import WhatsAppButton from '../components/WhatsAppButton';
import { CATEGORIES, CONTACT_INFO } from '../constants/data';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative w-full min-h-[614px] flex items-center justify-center bg-surface-container-low px-margin-mobile md:px-margin-desktop py-stack-lg overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            alt="Premium stationery flat lay" 
            className="w-full h-full object-cover opacity-20 object-center" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNkQKw7WPUEsfoAEBfXZD2h9G79OnwlIPGD6kO4CGhalhyjWormgpXqdJzwawHd36_yhpstKMWLd9mHulOcriV2fmq1iish8ZbfG2fLnJxL0__8gymPgrploI1BuBTAiyW5Gf7aQe_i_lgKJChhKJEgiWkkKKU6zXMnld99ncbkaTMBq5esj5DA8jIKKz63yUHz_wU2TqU6LayAKB31G1xIaD2MpvsMPj0WWsmbzJ5Oouda9RJRxXkCZ3eNg62LWKdiF-BwKSCXUk" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/80 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-container-max mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
          <div className="flex flex-col space-y-stack-md text-right">
            <h1 className="font-display-lg text-display-lg text-on-surface">
              <span className="text-primary block">Abaq Al Yasmina</span>
              Stationery
            </h1>
            <p className="font-body-base text-body-base text-on-surface-variant max-w-lg">
              Your One-Stop Shop for School & Office Excellence. Providing the Java Street community with premium supplies for organized minds.
            </p>
            <div className="flex flex-wrap gap-stack-sm pt-unit">
              <a href={`tel:${CONTACT_INFO.phone}`} className="bg-primary text-on-primary font-label-caps text-label-caps px-6 py-3 rounded-xl shadow-ambient shadow-ambient-hover transition-all duration-300 flex items-center space-x-reverse space-x-2">
                <span className="material-symbols-outlined text-[18px]">phone</span>
                <span>Call the Store</span>
              </a>
              <WhatsAppButton />
            </div>
          </div>
          <div className="hidden lg:block relative rounded-[2rem] overflow-hidden shadow-ambient h-[400px]">
            <img 
              alt="Organized desk with notebook" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXzOGOl71VDjb6JwkXjTf8zSua9eCmoR4HbXn1ulMqO0ZHFxkr3PcieX1uK1defEvL6AgPbQtq_PflwJqXE8GV3gfuoc_f_wR56w4qx1so4INbE420Sll53UR3OtOTlmZjC72DqQEncvWmqwvyPLd8DzlEUZq7kqHn4Plx-aoIRxMYpLHwugxHDxRPf62_Pk8suoL1v3wKnkx91hqY4SkpMRVC2jjNIWGpI8yqQ7ihwPLfLPel93-669vEsyf7OiAwDkuGevR-_os" 
            />
          </div>
        </div>
      </section>

      {/* Quick Info Bento */}
      <section className="max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop py-stack-lg -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-md">
          {/* Location */}
          <div className="bg-surface rounded-xl p-stack-md shadow-ambient flex items-start space-x-reverse space-x-stack-sm border border-surface-variant/50">
            <div className="bg-primary/10 p-3 rounded-lg text-primary flex-shrink-0">
              <span className="material-symbols-outlined">location_on</span>
            </div>
            <div>
              <h3 className="font-headline-md text-body-base text-on-surface mb-unit">Location</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{CONTACT_INFO.address}</p>
            </div>
          </div>
          {/* Hours */}
          <div className="bg-surface rounded-xl p-stack-md shadow-ambient flex items-start space-x-reverse space-x-stack-sm border border-surface-variant/50">
            <div className="bg-primary/10 p-3 rounded-lg text-primary flex-shrink-0">
              <span className="material-symbols-outlined">schedule</span>
            </div>
            <div>
              <h3 className="font-headline-md text-body-base text-on-surface mb-unit">Working Hours</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Everyday<br/>{CONTACT_INFO.hours}</p>
            </div>
          </div>
          {/* Contact */}
          <div className="bg-surface rounded-xl p-stack-md shadow-ambient flex items-start space-x-reverse space-x-stack-sm border border-surface-variant/50">
            <div className="bg-primary/10 p-3 rounded-lg text-primary flex-shrink-0">
              <span className="material-symbols-outlined">support_agent</span>
            </div>
            <div>
              <h3 className="font-headline-md text-body-base text-on-surface mb-unit">Direct Contact</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{CONTACT_INFO.phone}<br/>Ready to assist you</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-container-max mx-auto px-margin-desktop py-stack-lg">
        <header className="mb-stack-lg flex justify-between items-end">
          <div>
            <h2 className="text-display-lg font-display-lg text-on-surface mb-stack-sm">Product Categories</h2>
            <p className="text-body-base text-on-surface-variant">Explore our wide range of high-quality stationery.</p>
          </div>
          <Link to="/categories" className="text-primary font-bold hover:underline mb-2 flex items-center gap-2">
            View All <span className="material-symbols-outlined text-sm">arrow_left_alt</span>
          </Link>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {CATEGORIES.slice(0, 4).map((cat) => (
            <Link 
              key={cat.id} 
              to={`/category/${cat.id}`}
              className="group relative block overflow-hidden rounded-xl bg-surface-container-lowest shadow-ambient transition-transform duration-300 hover:-translate-y-1 hover:shadow-ambient-hover aspect-[4/5]"
            >
              <div className="absolute inset-0 bg-secondary-container/20 p-4">
                <div className="w-full h-full rounded-lg bg-surface-container overflow-hidden">
                  <img src={cat.image} className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-transform duration-500 group-hover:scale-105" alt={cat.name} />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-inverse-surface/90 to-transparent flex items-end justify-between">
                <div>
                  <span className="text-label-caps font-label-caps text-primary-fixed tracking-wider mb-1 block uppercase">{cat.tagline}</span>
                  <h3 className="text-headline-md font-headline-md text-on-primary font-bold">{cat.name}</h3>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="material-symbols-outlined">arrow_back</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Home;
