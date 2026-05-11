import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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

const CategoryPage = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.getCategory(id).catch(() => null),
      api.getProducts({ category_id: id }),
    ]).then(([cat, prods]) => {
      setCategory(cat);
      setProducts(prods);
    }).catch(() => console.warn('CategoryPage: failed to load')).finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <PageTransition>
        <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg min-h-[60vh]">
          <header className="mb-stack-lg">
            <div className="animate-fade-in bg-surface-container rounded-xl h-4 w-48 skeleton-shimmer animate-shimmer mb-4" />
            <div className="animate-fade-in bg-surface-container rounded-xl h-10 w-72 skeleton-shimmer animate-shimmer" style={{ animationDelay: '40ms' }} />
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="animate-fade-in bg-surface-container-lowest rounded-xl shadow-ambient overflow-hidden" style={{ animationDelay: `${i * 40}ms` }}>
                <div className="aspect-[3/4] bg-surface-container animate-pulse relative">
                  <div className="absolute inset-0 skeleton-shimmer animate-shimmer" />
                </div>
                <div className="p-4 space-y-2">
                  <div className="bg-surface-container rounded-xl h-4 w-1/3 skeleton-shimmer animate-shimmer" />
                  <div className="bg-surface-container rounded-xl h-5 w-3/4 skeleton-shimmer animate-shimmer" />
                  <div className="bg-surface-container rounded-xl h-4 w-1/2 skeleton-shimmer animate-shimmer" />
                </div>
              </div>
            ))}
          </div>
        </main>
      </PageTransition>
    );
  }

  if (!category) {
    return (
      <PageTransition>
        <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg min-h-[60vh] flex flex-col items-center justify-center text-center">
          <Icon name="folder_off" className="w-20 h-20 text-primary mb-4" />
          <h1 className="animate-fade-up text-display-lg font-display-lg text-on-surface mb-stack-sm" style={{ animationDelay: '80ms' }}>التصنيف غير موجود</h1>
          <p className="animate-fade-up max-w-readable text-body-base text-on-surface-variant mb-stack-lg" style={{ animationDelay: '160ms' }}>
            عذراً، التصنيف الذي تبحث عنه غير موجود أو تمت إزالته
          </p>
          <MagneticButton
            as={Link}
            to="/categories"
            className="animate-fade-up bg-tertiary text-on-tertiary font-label-caps text-label-caps px-8 py-4 rounded-xl shadow-ambient flex items-center gap-2"
            style={{ animationDelay: '240ms' }}
          >
            <Icon name="arrow_right_alt" className="w-[18px] h-[18px]" />
            العودة إلى التصنيفات
          </MagneticButton>
        </main>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <main className="w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-stack-lg min-h-screen">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-stack-md mb-stack-lg border-b border-primary/20 pb-stack-md">
          <div>
            <nav className="animate-fade-up flex items-center gap-2 text-on-surface-variant mb-2">
              <Link to="/" className="hover:text-primary transition-colors duration-160 ease-out-strong active:scale-[0.97] font-body-sm text-body-sm">الرئيسية</Link>
              <Icon name="chevron_left" className="w-4 h-4" />
              <Link to="/categories" className="hover:text-primary transition-colors duration-160 ease-out-strong active:scale-[0.97] font-body-sm text-body-sm">التصنيفات</Link>
              <Icon name="chevron_left" className="w-4 h-4" />
              <span className="text-on-surface font-medium font-body-sm text-body-sm">{category.name_ar}</span>
            </nav>
            <h1 className="animate-fade-up text-display-lg font-display-lg text-primary flex items-baseline gap-4" style={{ animationDelay: '80ms' }}>
              {category.name_ar}
              <span className="font-body-base text-body-base text-on-surface-variant font-normal">({products.length} منتجات)</span>
            </h1>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-gutter items-start">
          <aside className="col-span-1 bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-xl p-6 shadow-ambient hidden lg:flex flex-col gap-stack-lg sticky top-[100px]">
            <h2 className="font-headline-md text-lg font-semibold text-on-surface border-b border-surface-variant pb-4">تصفية</h2>
            <div className="flex flex-col gap-3">
              <h3 className="font-label-caps text-label-caps text-secondary">الماركة</h3>
                <div className="flex flex-col gap-2">
                  {Array.from(new Set(products.map(p => p.brand).filter(Boolean))).map(brand => (
                    <span key={brand} className="text-on-surface-variant font-body-sm text-body-sm">{brand}</span>
                  ))}
                </div>
            </div>
          </aside>

          <div className="col-span-1 lg:col-span-4">
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <Icon name="inventory_2" className="w-16 h-16 text-outline mb-4" />
                <h3 className="text-headline-md text-on-surface mb-2">لا توجد منتجات</h3>
                <p className="max-w-readable text-body-base text-on-surface-variant">لا توجد منتجات في هذا التصنيف حالياً. تفضل بتصفح التصنيفات الأخرى</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
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
                      <span className="absolute top-3 right-3 bg-surface-container-lowest text-on-surface-variant p-2 rounded-full shadow-sm">
                        <Icon name="favorite" className="w-5 h-5" />
                      </span>
                    </div>
                    <div className="p-4 flex flex-col gap-3 flex-1">
                      <div className="flex items-center justify-between">
                        {product.brand && <span className="text-label-caps font-label-caps text-secondary bg-secondary-container px-2 py-1 rounded-full">{product.brand}</span>}
                        <div className="flex flex-col items-end">
                          <span className="text-primary font-bold">{parseFloat(product.price).toFixed(2)} JOD</span>
                          {product.old_price && (
                            <span className="text-on-surface-variant text-sm line-through">{parseFloat(product.old_price).toFixed(2)} JOD</span>
                          )}
                        </div>
                      </div>
                      <h3 className="font-body-base text-body-base font-medium text-on-surface">{product.name_ar}</h3>
                      <div className="mt-auto">
                        <WhatsAppButton productName={product.name_ar} variant="outline" className="w-full justify-center" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </PageTransition>
  );
};

export default CategoryPage;
