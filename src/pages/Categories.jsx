import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import CategoryCard from '../components/CategoryCard'
import MagneticButton from '../components/MagneticButton'
import Icon from '../components/Icon'
import { motion } from 'framer-motion'
import { api } from '../services/api'

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
}

const cardVariant = {
  hidden: { opacity: 0, transform: 'translateY(28px)' },
  visible: { opacity: 1, transform: 'translateY(0px)', transition: { type: 'spring', stiffness: 100, damping: 20 } },
}

// Alternating aspect ratios create visual rhythm without complex grid math
const ASPECTS = ['aspect-[4/5]', 'aspect-[3/4]', 'aspect-[4/5]', 'aspect-[4/5]', 'aspect-[3/4]']

const SkeletonCard = ({ index }) => (
  <div
    className={`animate-fade-in bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-xl shadow-ambient overflow-hidden ${ASPECTS[index % ASPECTS.length]}`}
    style={{ animationDelay: `${index * 40}ms` }}
  >
    <div className="w-full h-full bg-surface-container dark:bg-surface-container-dark animate-pulse relative">
      <div className="absolute inset-0 skeleton-shimmer animate-shimmer" />
    </div>
  </div>
)

const Categories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .getCategories()
      .then(setCategories)
      .catch(() => console.warn('Categories: failed to load'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <PageTransition>
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">

        {/* Breadcrumb */}
        <nav
          aria-label="مسار التنقل"
          className="animate-fade-up flex items-center gap-2 mb-stack-lg text-body-sm font-body-sm text-on-surface-variant"
        >
          <Link
            to="/"
            className="hover:text-primary transition-colors duration-160 ease-out-strong active:scale-[0.97]"
          >
            الرئيسية
          </Link>
          <Icon name="chevron_left" className="w-4 h-4" />
          <span className="text-primary font-bold">التصنيفات</span>
        </nav>

        {/* Header — editorial layout with faint count */}
        <header className="mb-12 relative">
          {!loading && categories.length > 0 && (
            <span
              className="absolute -top-3 left-0 text-[clamp(96px,14vw,152px)] font-bold leading-none text-primary/[0.06] dark:text-primary/[0.1] tabular-nums select-none pointer-events-none"
              aria-hidden="true"
            >
              {String(categories.length).padStart(2, '0')}
            </span>
          )}

          <div className="relative">
            <motion.span
              className="text-label-caps font-label-caps text-secondary tracking-widest mb-2 block"
              initial={{ opacity: 0, transform: 'translateY(10px)' }}
              animate={{ opacity: 1, transform: 'translateY(0px)' }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
              استكشف
            </motion.span>

            <motion.h1
              className="text-display-lg font-display-lg text-on-surface mb-stack-sm leading-tight"
              initial={{ opacity: 0, transform: 'translateY(20px)' }}
              animate={{ opacity: 1, transform: 'translateY(0px)' }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.06 }}
            >
              التصنيفات
            </motion.h1>

            <motion.p
              className="max-w-readable text-body-base font-body-base text-on-surface-variant"
              initial={{ opacity: 0, transform: 'translateY(14px)' }}
              animate={{ opacity: 1, transform: 'translateY(0px)' }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.12 }}
            >
              منتجات مكتبية وفنية عالية الجودة، كل ما تحتاج لمكتبك ودراستك
            </motion.p>
          </div>
        </header>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
            {Array.from({ length: 8 }, (_, i) => (
              <SkeletonCard key={i} index={i} />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Icon name="category" className="w-20 h-20 text-outline mb-4" />
            <h2 className="text-headline-md font-headline-md text-on-surface mb-2">
              لا توجد تصنيفات
            </h2>
            <p className="max-w-readable text-body-base text-on-surface-variant mb-stack-lg">
              لا توجد تصنيفات متاحة حالياً. تفضل بزيارتنا لاحقاً
            </p>
            <MagneticButton
              to="/"
              className="bg-tertiary text-on-tertiary font-label-caps text-label-caps px-8 py-4 rounded-xl shadow-ambient"
            >
              العودة للرئيسية
            </MagneticButton>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {categories.map((cat, i) => (
              <motion.div key={cat.id} variants={cardVariant}>
                <CategoryCard category={cat} aspectClass={ASPECTS[i % ASPECTS.length]} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </PageTransition>
  )
}

export default Categories
