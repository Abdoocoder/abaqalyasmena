import { useParams, Link } from 'react-router-dom';
import WhatsAppButton from '../components/WhatsAppButton';
import { CATEGORIES, PRODUCTS } from '../constants/data';
import PageTransition from '../components/PageTransition';
import MagneticButton from '../components/MagneticButton';
import Icon from '../components/Icon';
import { motion } from 'framer-motion';

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
  const category = CATEGORIES.find(c => c.id === id);
  const products = PRODUCTS.filter(p => p.categoryId === id);

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
              <span className="text-on-surface font-medium font-body-sm text-body-sm">{category.nameAr}</span>
            </nav>
            <h1 className="animate-fade-up text-display-lg font-display-lg text-primary flex items-baseline gap-4" style={{ animationDelay: '80ms' }}>
              {category.nameAr}
              <span className="font-body-base text-body-base text-on-surface-variant font-normal">({products.length} منتجات)</span>
            </h1>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-gutter items-start">
          <aside className="col-span-1 bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-xl p-6 shadow-sm border border-primary/10 hidden lg:flex flex-col gap-stack-lg sticky top-[100px]">
            <h2 className="font-headline-md text-[18px] font-semibold text-on-surface border-b border-primary/10 pb-4">تصفية</h2>
            <div className="flex flex-col gap-3">
              <h3 className="font-label-caps text-label-caps text-secondary">الماركة</h3>
                <div className="flex flex-col gap-2">
                  {Array.from(new Set(products.map(p => p.brand))).map(brand => (
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
                    className="bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-xl overflow-hidden shadow-sm transition-transform duration-200 ease-out-strong hover:-translate-y-1 hover:shadow-md border border-primary/10 flex flex-col"
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
                      <img src={product.image} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 ease-out-strong hover:scale-105" alt={product.nameAr} />
                      <span className="absolute top-3 right-3 bg-surface-container-lowest text-on-surface-variant p-2 rounded-full shadow-sm">
                        <Icon name="favorite" className="w-5 h-5" />
                      </span>
                    </div>
                    <div className="p-4 flex flex-col gap-3 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-label-caps font-label-caps text-secondary bg-secondary-container px-2 py-1 rounded-full">{product.brand}</span>
                        <div className="flex flex-col items-end">
                          <span className="text-primary font-bold">{product.price.toFixed(2)} JOD</span>
                          {product.oldPrice && (
                            <span className="text-on-surface-variant text-sm line-through">{product.oldPrice.toFixed(2)} JOD</span>
                          )}
                        </div>
                      </div>
                      <h3 className="font-body-base text-body-base font-medium text-on-surface">{product.nameAr}</h3>
                      <div className="mt-auto">
                        <WhatsAppButton productName={product.nameAr} variant="outline" className="w-full justify-center" />
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
