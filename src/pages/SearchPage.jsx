import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import WhatsAppButton from '../components/WhatsAppButton';
import PageTransition from '../components/PageTransition';
import MagneticButton from '../components/MagneticButton';
import Icon from '../components/Icon';
import { motion } from 'framer-motion';
import { api } from '../services/api';

const springCard = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20, delay: i * 0.04 },
  }),
};

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q.trim()) return;
    setLoading(true);
    Promise.all([
      api.getProducts({ search: q }),
      api.getCategories(),
    ]).then(([prods, cats]) => {
      setProducts(prods);
      const query = q.toLowerCase();
      setCategories(cats.filter(c =>
        c.name_ar.includes(query) || c.name.toLowerCase().includes(query)
      ));
    }).catch(() => {}).finally(() => setLoading(false));
  }, [q]);

  return (
    <PageTransition>
      <main className="w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-stack-lg min-h-screen">
        <header className="mb-stack-lg">
          <nav className="animate-fade-up flex items-center gap-2 text-on-surface-variant mb-2">
            <Link to="/" className="hover:text-primary transition-colors duration-160 ease-out-strong active:scale-[0.97] font-body-sm text-body-sm">الرئيسية</Link>
            <Icon name="chevron_left" className="w-4 h-4" />
            <span className="text-on-surface font-medium font-body-sm text-body-sm">بحث</span>
          </nav>
          <h1 className="animate-fade-up text-display-lg font-display-lg text-on-surface mb-stack-sm" style={{ animationDelay: '80ms' }}>نتائج البحث عن "{q}"</h1>
          <p className="animate-fade-up text-body-base text-on-surface-variant" style={{ animationDelay: '160ms' }}>
            {products.length + categories.length} نتيجة
          </p>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-gutter">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="animate-fade-in bg-surface-container-lowest rounded-xl shadow-ambient overflow-hidden" style={{ animationDelay: `${i * 30}ms` }}>
                <div className="aspect-[3/4] bg-surface-container animate-pulse relative">
                  <div className="absolute inset-0 skeleton-shimmer animate-shimmer" />
                </div>
                <div className="p-4 space-y-2">
                  <div className="bg-surface-container rounded-xl h-4 w-1/3 skeleton-shimmer animate-shimmer" />
                  <div className="bg-surface-container rounded-xl h-5 w-3/4 skeleton-shimmer animate-shimmer" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {categories.length > 0 && (
              <section className="mb-stack-lg">
                <h2 className="text-headline-md font-headline-md text-on-surface mb-stack-md">التصنيفات</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
                  {categories.map((cat, i) => (
                    <motion.div
                      key={cat.id}
                      variants={springCard}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-40px' }}
                      custom={i}
                    >
                      <Link
                        to={`/category/${cat.id}`}
                        className="group relative block overflow-hidden rounded-xl bg-surface-container-lowest dark:bg-surface-container-lowest-dark shadow-ambient transition-transform duration-200 ease-out-strong hover:-translate-y-1 hover:shadow-ambient-hover aspect-[4/5] active:scale-[0.97]"
                      >
                        <div className="absolute inset-0 bg-surface-container-highest dark:bg-surface-container-highest-dark">
                          {cat.image_url && <img src={cat.image_url} loading="lazy" className="w-full h-full object-cover opacity-80 transition-transform duration-500 ease-out-strong group-hover:scale-105" alt={cat.name_ar} />}
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
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {products.length > 0 && (
              <section>
                <h2 className="text-headline-md font-headline-md text-on-surface mb-stack-md">المنتجات</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-gutter">
                  {products.map((product, i) => (
                    <motion.div
                      key={product.id}
                      className="bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-xl overflow-hidden shadow-ambient transition-transform duration-200 ease-out-strong hover:-translate-y-1 hover:shadow-ambient-hover flex flex-col"
                      variants={springCard}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-40px' }}
                      custom={i}
                    >
                      <div className="aspect-[3/4] bg-surface-container-low dark:bg-surface-container-low-dark overflow-hidden relative">
                        {product.discount && (
                          <span className="absolute top-3 left-3 bg-tertiary text-on-tertiary text-label-caps font-label-caps px-2 py-1 rounded-full z-10 pulse-soft">{product.discount}</span>
                        )}
                        {product.image_url && <img src={product.image_url} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 ease-out-strong hover:scale-105" alt={product.name_ar} />}
                      </div>
                      <div className="p-4 flex flex-col gap-3 flex-1">
                        <div className="flex items-center justify-between">
                          {product.brand && <span className="text-label-caps font-label-caps text-secondary bg-secondary-container px-2 py-1 rounded-full">{product.brand}</span>}
                          <span className="text-primary font-bold">{parseFloat(product.price).toFixed(2)} JOD</span>
                        </div>
                        <h3 className="font-body-base text-body-base font-medium text-on-surface">{product.name_ar}</h3>
                        <div className="mt-auto">
                          <WhatsAppButton productName={product.name_ar} variant="outline" className="w-full justify-center" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {categories.length === 0 && products.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <Icon name="search_off" className="w-20 h-20 text-outline mb-4" />
                <h2 className="text-headline-md text-on-surface mb-2">لا توجد نتائج</h2>
                <p className="max-w-readable text-body-base text-on-surface-variant mb-stack-lg">
                  عذراً، لا توجد نتائج مطابقة لـ "{q}". جرب كلمات بحث أخرى
                </p>
                <MagneticButton
                  as={Link}
                  to="/categories"
                  className="bg-tertiary text-on-tertiary font-label-caps text-label-caps px-8 py-4 rounded-xl shadow-ambient"
                >
                  تصفح التصنيفات
                </MagneticButton>
              </div>
            )}
          </>
        )}
      </main>
    </PageTransition>
  );
};

export default SearchPage;
