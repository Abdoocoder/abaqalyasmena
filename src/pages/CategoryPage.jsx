import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import WhatsAppButton from '../components/WhatsAppButton'
import PageTransition from '../components/PageTransition'
import MagneticButton from '../components/MagneticButton'
import Icon from '../components/Icon'
import { motion, AnimatePresence } from 'framer-motion'
import { api } from '../services/api'

const springCard = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20, delay: i * 0.04 },
  }),
}

const BrandPill = ({ brand, selected, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2.5 rounded-full font-label-caps text-label-caps border transition-colors duration-160 ease-out-strong active:scale-[0.97] ${
      selected
        ? 'bg-primary text-on-primary border-primary'
        : 'bg-surface-container-lowest dark:bg-surface-container-lowest-dark text-on-surface-variant dark:text-inverse-on-surface/70 border-surface-variant dark:border-inverse-on-surface/20 hover:border-primary hover:text-primary'
    }`}
  >
    {brand}
  </button>
)

const CategoryPage = () => {
  const { id } = useParams()
  const [category, setCategory] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  useEffect(() => {
    Promise.all([api.getCategory(id).catch(() => null), api.getProducts({ category_id: id })])
      .then(([cat, prods]) => {
        setCategory(cat)
        setProducts(prods)
      })
      .catch(() => console.warn('CategoryPage: failed to load'))
      .finally(() => setLoading(false))
  }, [id])

  const brands = Array.from(new Set(products.map((p) => p.brand).filter(Boolean)))
  const filteredProducts = selectedBrand
    ? products.filter((p) => p.brand === selectedBrand)
    : products

  const clearBrand = () => setSelectedBrand(null)

  if (loading) {
    return (
      <PageTransition>
        <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg min-h-[60vh]">
          <header className="mb-stack-lg">
            <div className="animate-fade-in bg-surface-container dark:bg-surface-container-dark rounded-xl h-4 w-48 skeleton-shimmer animate-shimmer mb-4" />
            <div
              className="animate-fade-in bg-surface-container dark:bg-surface-container-dark rounded-xl h-10 w-72 skeleton-shimmer animate-shimmer"
              style={{ animationDelay: '40ms' }}
            />
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="animate-fade-in bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-xl shadow-ambient overflow-hidden"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="aspect-[3/4] bg-surface-container dark:bg-surface-container-dark animate-pulse relative">
                  <div className="absolute inset-0 skeleton-shimmer animate-shimmer" />
                </div>
                <div className="p-4 space-y-2">
                  <div className="bg-surface-container dark:bg-surface-container-dark rounded-xl h-4 w-1/3 skeleton-shimmer animate-shimmer" />
                  <div className="bg-surface-container dark:bg-surface-container-dark rounded-xl h-5 w-3/4 skeleton-shimmer animate-shimmer" />
                  <div className="bg-surface-container dark:bg-surface-container-dark rounded-xl h-4 w-1/2 skeleton-shimmer animate-shimmer" />
                </div>
              </div>
            ))}
          </div>
        </main>
      </PageTransition>
    )
  }

  if (!category) {
    return (
      <PageTransition>
        <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg min-h-[60vh] flex flex-col items-center justify-center text-center">
          <Icon name="folder_off" className="w-20 h-20 text-primary mb-4" />
          <h1
            className="animate-fade-up text-display-lg font-display-lg text-on-surface mb-stack-sm"
            style={{ animationDelay: '80ms' }}
          >
            التصنيف غير موجود
          </h1>
          <p
            className="animate-fade-up max-w-readable text-body-base text-on-surface-variant mb-stack-lg"
            style={{ animationDelay: '160ms' }}
          >
            عذراً، التصنيف الذي تبحث عنه غير موجود أو تمت إزالته
          </p>
          <MagneticButton
            to="/categories"
            className="animate-fade-up bg-tertiary text-on-tertiary font-label-caps text-label-caps px-8 py-4 rounded-xl shadow-ambient flex items-center gap-2"
          >
            <Icon name="arrow_right_alt" className="w-[18px] h-[18px]" />
            العودة إلى التصنيفات
          </MagneticButton>
        </main>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <main className="w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-stack-lg min-h-screen">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-stack-md mb-stack-lg border-b border-primary/20 pb-stack-md">
          <div>
            <nav
              aria-label="مسار التنقل"
              className="animate-fade-up flex items-center gap-2 text-on-surface-variant mb-2 overflow-hidden"
            >
              <Link
                to="/"
                className="hover:text-primary transition-colors duration-160 ease-out-strong active:scale-[0.97] font-body-sm text-body-sm shrink-0"
              >
                الرئيسية
              </Link>
              <Icon name="chevron_left" className="w-4 h-4 shrink-0" />
              <Link
                to="/categories"
                className="hover:text-primary transition-colors duration-160 ease-out-strong active:scale-[0.97] font-body-sm text-body-sm shrink-0"
              >
                التصنيفات
              </Link>
              <Icon name="chevron_left" className="w-4 h-4 shrink-0" />
              <span
                aria-current="page"
                className="text-on-surface font-medium font-body-sm text-body-sm truncate min-w-0"
              >
                {category.name_ar}
              </span>
            </nav>
            <h1
              className="animate-fade-up text-display-lg font-display-lg text-primary flex items-baseline gap-4 flex-wrap"
              style={{ animationDelay: '80ms' }}
            >
              {category.name_ar}
              <span className="font-body-base text-body-base text-on-surface-variant font-normal">
                ({filteredProducts.length} منتجات)
              </span>
            </h1>
          </div>
        </header>

        {brands.length > 0 && (
          <div className="flex items-center justify-between mb-stack-md lg:hidden">
            <span className="text-body-sm font-body-sm text-on-surface-variant">
              {filteredProducts.length} منتج
            </span>
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              aria-label="تصفية المنتجات"
              aria-expanded={isMobileFilterOpen}
              className={`flex items-center gap-2 text-label-caps font-label-caps px-4 py-2.5 rounded-full transition-colors duration-160 ease-out-strong active:scale-[0.97] ${
                selectedBrand
                  ? 'bg-primary text-on-primary'
                  : 'bg-primary/10 text-primary hover:bg-primary/20'
              }`}
            >
              <Icon name="tune" className="w-4 h-4" />
              {selectedBrand ? selectedBrand : 'تصفية'}
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-gutter items-start">
          {brands.length > 0 && (
            <aside className="col-span-1 bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-xl p-6 shadow-ambient hidden lg:flex flex-col gap-stack-lg sticky top-[100px]">
              <h2 className="font-headline-md text-lg font-semibold text-on-surface border-b border-surface-variant pb-4">
                تصفية
              </h2>
              <div className="flex flex-col gap-3">
                <h3 className="font-label-caps text-label-caps text-secondary">الماركة</h3>
                <div className="flex flex-col gap-1">
                  {selectedBrand && (
                    <button
                      onClick={clearBrand}
                      className="text-right text-on-surface-variant font-body-sm text-body-sm hover:text-primary transition-colors duration-160 ease-out-strong flex items-center gap-1 py-1 mb-1"
                    >
                      <Icon name="close" className="w-3.5 h-3.5" />
                      إلغاء التصفية
                    </button>
                  )}
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand === selectedBrand ? null : brand)}
                      className={`text-right font-body-sm text-body-sm py-1.5 px-2 rounded-lg transition-colors duration-160 ease-out-strong ${
                        selectedBrand === brand
                          ? 'text-primary font-semibold bg-primary/5'
                          : 'text-on-surface-variant hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          )}

          <div className={`col-span-1 ${brands.length > 0 ? 'lg:col-span-4' : 'lg:col-span-5'}`}>
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <Icon name="inventory_2" className="w-16 h-16 text-outline mb-4" />
                <h3 className="text-headline-md text-on-surface mb-2">
                  {selectedBrand ? `لا توجد منتجات من ${selectedBrand}` : 'لا توجد منتجات'}
                </h3>
                <p className="max-w-readable text-body-base text-on-surface-variant mb-4">
                  {selectedBrand
                    ? 'جرب تصفية ماركة أخرى أو عرض جميع المنتجات'
                    : 'لا توجد منتجات في هذا التصنيف حالياً. تفضل بتصفح التصنيفات الأخرى'}
                </p>
                {selectedBrand && (
                  <button
                    onClick={clearBrand}
                    className="text-primary font-label-caps text-label-caps underline underline-offset-4"
                  >
                    عرض جميع المنتجات
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter">
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    className="bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-xl overflow-hidden shadow-ambient transition-transform duration-200 ease-out-strong hover:-translate-y-1 hover:shadow-ambient-hover flex flex-col"
                    variants={springCard}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                    custom={i}
                  >
                    <div
                      className={`bg-surface-container-low dark:bg-surface-container-low-dark overflow-hidden relative ${i % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[3/4]'}`}
                    >
                      {product.discount && (
                        <span
                          className={`absolute top-3 left-3 text-label-caps font-label-caps px-2 py-1 rounded-full z-10 pulse-soft ${i % 2 === 0 ? 'bg-tertiary text-on-tertiary' : 'bg-secondary text-on-secondary'}`}
                        >
                          {product.discount}
                        </span>
                      )}
                      {product.image_url && (
                        <img
                          src={product.image_url}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 ease-out-strong hover:scale-105"
                          alt={product.name_ar}
                          onError={(e) => {
                            e.target.style.display = 'none'
                          }}
                        />
                      )}
                      <span
                        className="absolute top-3 right-3 bg-surface-container-lowest text-on-surface-variant p-2 rounded-full shadow-sm"
                        aria-hidden="true"
                      >
                        <Icon name="favorite" className="w-5 h-5" />
                      </span>
                    </div>
                    <div className="p-4 flex flex-col gap-3 flex-1">
                      <div className="flex items-center justify-between">
                        {product.brand && (
                          <span className="text-label-caps font-label-caps text-secondary bg-secondary-container px-2 py-1 rounded-full">
                            {product.brand}
                          </span>
                        )}
                        <div className="flex flex-col items-end">
                          {product.price != null && !isNaN(parseFloat(product.price)) && (
                            <span className="text-primary font-bold">
                              {parseFloat(product.price).toFixed(2)} JOD
                            </span>
                          )}
                          {product.old_price != null && !isNaN(parseFloat(product.old_price)) && (
                            <span className="text-on-surface-variant text-body-sm font-body-sm line-through">
                              {parseFloat(product.old_price).toFixed(2)} JOD
                            </span>
                          )}
                        </div>
                      </div>
                      <h3 className="font-body-base text-body-base font-medium text-on-surface">
                        {product.name_ar}
                      </h3>
                      <div className="mt-auto">
                        <WhatsAppButton
                          productName={product.name_ar}
                          variant="outline"
                          className="w-full justify-center"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-inverse-surface/40 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 bg-surface dark:bg-inverse-surface rounded-t-3xl shadow-ambient-hover lg:hidden"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.8 }}
              role="dialog"
              aria-modal="true"
              aria-label="تصفية المنتجات"
            >
              <div className="w-10 h-1 bg-surface-variant dark:bg-inverse-on-surface/20 rounded-full mx-auto mt-4 mb-2" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-headline-md text-headline-md text-on-surface dark:text-inverse-on-surface">
                    تصفية المنتجات
                  </h3>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    aria-label="إغلاق"
                    className="p-2 text-on-surface-variant dark:text-inverse-on-surface/60 hover:text-primary transition-colors duration-160 ease-out-strong rounded-full hover:bg-primary/10 active:scale-[0.92]"
                  >
                    <Icon name="close" className="w-5 h-5" />
                  </button>
                </div>

                <div className="mb-6">
                  <h4 className="font-label-caps text-label-caps text-secondary mb-3">الماركة</h4>
                  <div className="flex flex-wrap gap-2">
                    <BrandPill
                      brand="الكل"
                      selected={!selectedBrand}
                      onClick={() => {
                        clearBrand()
                        setIsMobileFilterOpen(false)
                      }}
                    />
                    {brands.map((brand) => (
                      <BrandPill
                        key={brand}
                        brand={brand}
                        selected={selectedBrand === brand}
                        onClick={() => {
                          setSelectedBrand(brand === selectedBrand ? null : brand)
                          setIsMobileFilterOpen(false)
                        }}
                      />
                    ))}
                  </div>
                </div>

                {selectedBrand && (
                  <button
                    onClick={() => {
                      clearBrand()
                      setIsMobileFilterOpen(false)
                    }}
                    className="w-full py-2 text-center text-on-surface-variant dark:text-inverse-on-surface/60 font-label-caps text-label-caps underline underline-offset-4 decoration-dotted"
                  >
                    إلغاء التصفية
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageTransition>
  )
}

export default CategoryPage
