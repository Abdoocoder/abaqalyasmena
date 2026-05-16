import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import WhatsAppButton from '../components/WhatsAppButton'
import PageTransition from '../components/PageTransition'
import MagneticButton from '../components/MagneticButton'
import CategoryCard from '../components/CategoryCard'
import Icon from '../components/Icon'
import { motion } from 'framer-motion'
import { api } from '../services/api'

const springCard = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20, delay: i * 0.04 },
  }),
}

const SearchPage = () => {
  const [searchParams] = useSearchParams()
  const q = searchParams.get('q') || ''
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(!!q)

  useEffect(() => {
    if (!q.trim()) return
    Promise.all([api.getProducts({ search: q }), api.getCategories()])
      .then(([prods, cats]) => {
        setProducts(prods)
        const query = q.toLowerCase()
        setCategories(
          cats.filter((c) => c.name_ar.includes(query) || c.name.toLowerCase().includes(query)),
        )
      })
      .catch(() => console.warn('SearchPage: failed to load data'))
      .finally(() => setLoading(false))
  }, [q])

  return (
    <PageTransition>
      <main className="w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-stack-lg min-h-screen">
        <header className="mb-stack-lg">
          <nav className="animate-fade-up flex items-center gap-2 text-on-surface-variant mb-2">
            <Link
              to="/"
              className="hover:text-primary transition-colors duration-160 ease-out-strong active:scale-[0.97] font-body-sm text-body-sm"
            >
              الرئيسية
            </Link>
            <Icon name="chevron_left" className="w-4 h-4" />
            <span className="text-on-surface font-medium font-body-sm text-body-sm">بحث</span>
          </nav>
          <h1
            className="animate-fade-up text-display-lg font-display-lg text-on-surface mb-stack-sm"
            style={{ animationDelay: '80ms' }}
          >
            نتائج البحث عن &ldquo;{q}&rdquo;
          </h1>
          <p
            className="animate-fade-up text-body-base text-on-surface-variant"
            style={{ animationDelay: '160ms' }}
          >
            {products.length + categories.length} نتيجة
          </p>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-gutter">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="animate-fade-in bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-xl shadow-ambient overflow-hidden"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <div className="aspect-[3/4] bg-surface-container dark:bg-surface-container-dark animate-pulse relative">
                  <div className="absolute inset-0 skeleton-shimmer animate-shimmer" />
                </div>
                <div className="p-4 space-y-2">
                  <div className="bg-surface-container dark:bg-surface-container-dark rounded-xl h-4 w-1/3 skeleton-shimmer animate-shimmer" />
                  <div className="bg-surface-container dark:bg-surface-container-dark rounded-xl h-5 w-3/4 skeleton-shimmer animate-shimmer" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {categories.length > 0 && (
              <section className="mb-stack-lg">
                <h2 className="text-headline-md font-headline-md text-on-surface mb-stack-md">
                  التصنيفات
                </h2>
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
                      <CategoryCard category={cat} />
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {products.length > 0 && (
              <section>
                <h2 className="text-headline-md font-headline-md text-on-surface mb-stack-md">
                  المنتجات
                </h2>
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
                      </div>
                      <div className="p-4 flex flex-col gap-3 flex-1">
                        <div className="flex items-center justify-between">
                          {product.brand && (
                            <span className="text-label-caps font-label-caps text-secondary bg-secondary-container px-2 py-1 rounded-full">
                              {product.brand}
                            </span>
                          )}
                          {product.price != null && !isNaN(parseFloat(product.price)) && (
                            <span className="text-primary font-bold">
                              {parseFloat(product.price).toFixed(2)} JOD
                            </span>
                          )}
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
              </section>
            )}

            {categories.length === 0 && products.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <Icon name="search_off" className="w-20 h-20 text-outline mb-4" />
                <h2 className="text-headline-md text-on-surface mb-2">لا توجد نتائج</h2>
                <p className="max-w-readable text-body-base text-on-surface-variant mb-stack-lg">
                  عذراً، لا توجد نتائج مطابقة لـ &ldquo;{q}&rdquo;. جرب كلمات بحث أخرى
                </p>
                <MagneticButton
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
  )
}

export default SearchPage
