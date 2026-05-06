import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import WhatsAppButton from '../components/WhatsAppButton';
import { CATEGORIES, PRODUCTS } from '../constants/data';

const CategoryPage = () => {
  const { id } = useParams();
  const category = CATEGORIES.find(c => c.id === id);
  const products = PRODUCTS.filter(p => p.categoryId === id);

  if (!category) return <div>Category not found</div>;

  return (
    <Layout>
      <main className="w-full px-margin-desktop max-w-container-max mx-auto py-stack-lg min-h-screen">
        {/* Page Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-stack-md mb-stack-lg border-b border-surface-container-high pb-stack-md">
          <div>
            <nav className="flex items-center gap-2 text-on-surface-variant mb-2">
              <Link to="/" className="hover:text-primary transition-colors font-body-sm text-body-sm">Home</Link>
              <span className="material-symbols-outlined text-sm">chevron_left</span>
              <Link to="/categories" className="hover:text-primary transition-colors font-body-sm text-body-sm">Categories</Link>
              <span className="material-symbols-outlined text-sm">chevron_left</span>
              <span className="text-on-surface font-medium font-body-sm text-body-sm">{category.name}</span>
            </nav>
            <h1 className="font-display-lg text-display-lg text-primary flex items-baseline gap-4">
              {category.name}
              <span className="font-body-base text-body-base text-on-surface-variant font-normal">({products.length} items)</span>
            </h1>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-gutter items-start">
          {/* Sidebar Filters (Simplified) */}
          <aside className="col-span-1 bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-surface-container-low hidden lg:flex flex-col gap-stack-lg sticky top-[100px]">
            <h2 className="font-headline-md text-[18px] font-semibold text-on-surface border-b border-surface-container-low pb-4">Filters</h2>
            <div className="flex flex-col gap-3">
              <h3 className="font-label-caps text-label-caps text-secondary uppercase">Brand</h3>
              {Array.from(new Set(products.map(p => p.brand))).map(brand => (
                <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary" />
                  <span className="text-on-surface group-hover:text-primary transition-colors">{brand}</span>
                </label>
              ))}
            </div>
          </aside>

          {/* Product Grid */}
          <div className="col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
            {products.map((product) => (
              <div key={product.id} className="bg-surface-container-lowest rounded-xl p-4 flex flex-col gap-4 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 border border-surface-container-low">
                <div className="aspect-[3/4] bg-surface-container-low rounded-lg overflow-hidden relative group">
                  {product.discount && (
                    <span className="absolute top-3 left-3 bg-error text-on-error font-label-caps text-[10px] px-2 py-1 rounded-full z-10">{product.discount}</span>
                  )}
                  <img src={product.image} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" alt={product.name} />
                  <button className="absolute top-3 right-3 bg-surface-container-lowest text-on-surface-variant p-2 rounded-full shadow-sm hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-[20px]">favorite</span>
                  </button>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-label-caps text-[10px] text-secondary bg-secondary-container px-2 py-1 rounded-full">{product.brand}</span>
                    <div className="flex flex-col items-end">
                      <span className="text-primary font-bold">{product.price.toFixed(2)} JOD</span>
                      {product.oldPrice && (
                        <span className="text-on-surface-variant text-sm line-through">{product.oldPrice.toFixed(2)} JOD</span>
                      )}
                    </div>
                  </div>
                  <h3 className="font-body-base text-body-base font-medium text-on-surface line-clamp-2">{product.name}</h3>
                </div>
                <WhatsAppButton productName={product.nameAr} variant="outline" className="w-full justify-center" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default CategoryPage;
