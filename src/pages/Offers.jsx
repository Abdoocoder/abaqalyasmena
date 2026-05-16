import { useState, useEffect } from 'react'
import WhatsAppButton from '../components/WhatsAppButton'
import MagneticButton from '../components/MagneticButton'
import PageTransition from '../components/PageTransition'
import Icon from '../components/Icon'
import { motion } from 'framer-motion'
import { api } from '../services/api'

const springOffer = {
  hidden: { opacity: 0, transform: 'translateY(32px)' },
  visible: (i) => ({
    opacity: 1,
    transform: 'translateY(0px)',
    transition: { type: 'spring', stiffness: 100, damping: 20, delay: Math.min(i * 0.07, 0.25) },
  }),
}

const Offers = () => {
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .getOffers()
      .then(setOffers)
      .catch(() => console.warn('Offers: failed to load'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <PageTransition>
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">

        {/* Header — editorial, matches Categories page */}
        <header className="mb-12 relative">
          {!loading && offers.length > 0 && (
            <span
              className="absolute -top-3 left-0 text-[clamp(96px,14vw,152px)] font-bold leading-none text-secondary/[0.06] dark:text-secondary/[0.1] tabular-nums select-none pointer-events-none"
              aria-hidden="true"
            >
              {String(offers.length).padStart(2, '0')}
            </span>
          )}
          <div className="relative">
            <motion.span
              className="text-label-caps font-label-caps text-secondary tracking-widest mb-2 block"
              initial={{ opacity: 0, transform: 'translateY(10px)' }}
              animate={{ opacity: 1, transform: 'translateY(0px)' }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
              حصري
            </motion.span>
            <motion.h1
              className="text-display-lg font-display-lg text-on-surface mb-stack-sm leading-tight"
              initial={{ opacity: 0, transform: 'translateY(20px)' }}
              animate={{ opacity: 1, transform: 'translateY(0px)' }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.06 }}
            >
              عروض وحزم خاصة
            </motion.h1>
            <motion.p
              className="max-w-readable text-body-base font-body-base text-on-surface-variant"
              initial={{ opacity: 0, transform: 'translateY(14px)' }}
              animate={{ opacity: 1, transform: 'translateY(0px)' }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.12 }}
            >
              حزم مكتبية مختارة للطلاب والمحترفين
            </motion.p>
          </div>
        </header>

        {/* Loading skeleton */}
        {loading ? (
          <div className="flex flex-col gap-8">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="animate-fade-in bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-ambient"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="w-full md:w-2/5 h-72 md:h-auto bg-surface-container dark:bg-surface-container-dark animate-pulse relative">
                  <div className="absolute inset-0 skeleton-shimmer animate-shimmer" />
                </div>
                <div className="p-8 md:p-10 flex-1 space-y-4">
                  <div className="bg-surface-container dark:bg-surface-container-dark rounded-full h-6 w-24 skeleton-shimmer animate-shimmer" />
                  <div className="bg-surface-container dark:bg-surface-container-dark rounded-xl h-8 w-3/4 skeleton-shimmer animate-shimmer" />
                  <div className="bg-surface-container dark:bg-surface-container-dark rounded-xl h-5 w-1/2 skeleton-shimmer animate-shimmer" />
                  <div className="bg-surface-container dark:bg-surface-container-dark rounded-xl h-4 w-2/3 skeleton-shimmer animate-shimmer" />
                  <div className="bg-surface-container dark:bg-surface-container-dark rounded-xl h-12 w-48 mt-4 skeleton-shimmer animate-shimmer" />
                </div>
              </div>
            ))}
          </div>
        ) : offers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Icon name="local_offer" className="w-20 h-20 text-outline mb-4" />
            <h2 className="text-headline-md font-headline-md text-on-surface mb-2">لا توجد عروض حالياً</h2>
            <p className="max-w-readable text-body-base text-on-surface-variant mb-stack-lg">
              تفضل بتصفح تصنيفاتنا وستجد ما يناسبك
            </p>
            <MagneticButton
              to="/categories"
              className="bg-tertiary text-on-tertiary font-label-caps text-label-caps px-8 py-4 rounded-xl shadow-ambient"
            >
              استعرض التصنيفات
            </MagneticButton>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {offers.map((bundle, i) => (
              <motion.div
                key={bundle.id}
                className={`bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-3xl overflow-hidden flex flex-col items-stretch shadow-ambient transition-shadow duration-200 ease-out-strong hover:shadow-ambient-hover ${
                  i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
                }`}
                variants={springOffer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                custom={i}
              >
                {/* Image */}
                <div className="w-full md:w-2/5 h-72 md:h-auto overflow-hidden bg-surface-container-low dark:bg-surface-container-low-dark">
                  {bundle.image_url ? (
                    <img
                      src={bundle.image_url}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 ease-out-strong hover:scale-105"
                      alt={bundle.title_ar}
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon name="local_offer" className="w-16 h-16 text-outline/30" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 flex-1 flex flex-col justify-center gap-4">
                  {bundle.tag && (
                    <span className="bg-secondary/10 text-secondary text-label-caps font-label-caps px-3 py-1 rounded-full w-fit">
                      {bundle.tag}
                    </span>
                  )}

                  <div>
                    <h2 className="text-[clamp(22px,3.5vw,30px)] font-display-lg text-on-surface leading-tight mb-1">
                      {bundle.title_ar}
                    </h2>
                    {bundle.title && (
                      <p className="text-label-caps font-label-caps text-primary tracking-widest mt-1">
                        {bundle.title}
                      </p>
                    )}
                  </div>

                  {bundle.description && (
                    <p className="max-w-readable text-body-base text-on-surface-variant leading-relaxed">
                      {bundle.description}
                    </p>
                  )}

                  <div className="flex items-center flex-wrap gap-stack-md mt-2">
                    {bundle.price && (
                      <span className="text-3xl font-bold text-on-surface tabular-nums">
                        {bundle.price}
                      </span>
                    )}
                    <WhatsAppButton
                      productName={bundle.title_ar}
                      className="min-h-[44px]"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </PageTransition>
  )
}

export default Offers
