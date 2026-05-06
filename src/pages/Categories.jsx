import React from 'react';
import Layout from '../components/Layout';
import { CATEGORIES } from '../constants/data';
import { Link } from 'react-router-dom';

const Categories = () => {
  return (
    <Layout>
      <main className="max-w-container-max mx-auto px-margin-desktop py-stack-lg">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-stack-lg text-body-sm font-body-sm text-on-surface-variant">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_left</span>
          <span className="text-primary font-bold">Categories</span>
        </nav>

        {/* Page Header */}
        <header className="mb-stack-lg">
          <h1 className="text-display-lg font-display-lg text-on-surface mb-stack-sm">Explore Our Collection</h1>
          <p className="text-body-base font-body-base text-on-surface-variant max-w-2xl">Discover high-quality stationery, art supplies, and office essentials designed to inspire creativity and organization.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
          {CATEGORIES.map((cat) => (
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
      </main>
    </Layout>
  );
};

export default Categories;
