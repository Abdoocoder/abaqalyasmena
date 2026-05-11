import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import CategoryCard from '../components/CategoryCard';
import Icon from '../components/Icon';
import { api } from '../services/api';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getCategories().then(setCategories).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <PageTransition>
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
        <nav className="animate-fade-up flex items-center gap-2 mb-stack-lg text-body-sm font-body-sm text-on-surface-variant">
          <Link to="/" className="hover:text-primary transition-colors duration-160 ease-out-strong active:scale-[0.97]">الرئيسية</Link>
          <Icon name="chevron_left" className="w-4 h-4" />
          <span className="text-primary font-bold">التصنيفات</span>
        </nav>

        <header className="mb-stack-lg">
          <h1 className="animate-fade-up text-display-lg font-display-lg text-on-surface mb-stack-sm" style={{ animationDelay: '80ms' }}>استكشف مجموعتنا</h1>
          <p className="animate-fade-up max-w-readable text-body-base font-body-base text-on-surface-variant" style={{ animationDelay: '160ms' }}>منتجات مكتبية وفنية عالية الجودة — كل ما تحتاج لمكتبك ودراستك</p>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="animate-fade-in bg-surface-container-lowest rounded-xl shadow-ambient aspect-[4/5] overflow-hidden" style={{ animationDelay: `${i * 40}ms` }}>
                <div className="w-full h-full bg-surface-container animate-pulse relative">
                  <div className="absolute inset-0 skeleton-shimmer animate-shimmer" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        )}
      </main>
    </PageTransition>
  );
};

export default Categories;
