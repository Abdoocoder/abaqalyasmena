import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
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
          <p className="animate-fade-up max-w-readable text-body-base font-body-base text-on-surface-variant" style={{ animationDelay: '160ms' }}>منتجات مكتبية وفنية عالية الجودة</p>
        </header>

        {loading ? (
          <p className="text-on-surface-variant">جاري التحميل...</p>
        ) : (
          <div className="stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className="group relative block overflow-hidden rounded-xl bg-surface-container-lowest dark:bg-surface-container-lowest-dark shadow-ambient transition-transform duration-160 ease-out-strong hover:-translate-y-1 hover:shadow-ambient-hover active:scale-[0.97] aspect-[4/5]"
              >
                <div className="absolute inset-0 bg-surface-container-highest dark:bg-surface-container-highest-dark">
                  {cat.image_url && <img src={cat.image_url} loading="lazy" className="w-full h-full object-cover opacity-85 transition-transform duration-500 ease-out-strong group-hover:scale-105" alt={cat.name_ar} />}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-inverse-surface/90 to-transparent flex items-end justify-between">
                  <div>
                    {cat.tagline && <span className="text-label-caps font-label-caps text-primary-fixed tracking-wider mb-1 block uppercase pulse-soft">{cat.tagline}</span>}
                    <h3 className="text-headline-md font-headline-md text-on-primary font-bold">{cat.name_ar}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center text-on-primary transition-all duration-200 ease-out-strong group-hover:opacity-100 opacity-0 -translate-x-2 group-hover:translate-x-0">
                    <Icon name="arrow_back" className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </PageTransition>
  );
};

export default Categories;
