import { useState, useEffect } from 'react'
import WhatsAppButton from '../components/WhatsAppButton'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import PageTransition from '../components/PageTransition'
import MagneticButton from '../components/MagneticButton'
import CategoryCard from '../components/CategoryCard'
import Icon from '../components/Icon'
import { motion } from 'framer-motion'
import { api } from '../services/api'
import { useContact, useContactLoading } from '../contexts/ContactContext'
import { useAuth, SignInButton } from '@clerk/clerk-react'

const ContactTile = ({ icon, title, value, href, delay = 0 }) => (
  <motion.div
    className="bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-xl p-stack-md shadow-ambient flex items-start space-x-reverse space-x-stack-sm"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ type: 'spring', stiffness: 100, damping: 20, delay: delay * 0.06 }}
  >
    <div className="bg-primary/10 p-3 rounded-lg text-primary flex-shrink-0">
      <Icon name={icon} className="w-6 h-6" />
    </div>
    <div>
      <p className="font-headline-md text-body-base text-on-surface dark:text-inverse-on-surface mb-unit font-semibold">
        {title}
      </p>
      {href ? (
        <a
          href={href}
          className="font-body-sm text-body-sm text-on-surface-variant dark:text-inverse-on-surface/80 hover:text-primary transition-colors duration-160 ease-out-strong"
        >
          {value}
        </a>
      ) : (
        <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-inverse-on-surface/80">
          {value}
        </p>
      )}
    </div>
  </motion.div>
)

const Home = () => {
  const [categories, setCategories] = useState([])
  const contact = useContact()
  const contactLoading = useContactLoading()
  const { isLoaded, isSignedIn } = useAuth()

  useEffect(() => {
    api
      .getCategories()
      .then(setCategories)
      .catch(() => console.warn('Home: failed to load categories'))
  }, [])

  return (
    <PageTransition>
      <main>
        {/* ── Hero ── */}
        <section
          aria-label="الصفحة الرئيسية"
          className="relative w-full min-h-[100dvh] bg-background dark:bg-surface-dark overflow-hidden flex items-center"
        >
          <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop min-h-[100dvh] grid grid-cols-1 lg:grid-cols-2 gap-stack-lg lg:gap-16 items-center py-28 lg:py-20">

            {/* Text column — right side in RTL */}
            <div className="flex flex-col justify-center">

              {/* Location pill */}
              <motion.div
                className="flex items-center gap-1.5 w-fit mb-stack-lg bg-primary/10 text-primary px-3 py-1.5 rounded-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              >
                <Icon name="location_on" className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="font-label-caps text-label-caps">شارع جاوا · عمّان، الأردن</span>
              </motion.div>

              {/* H1 — split weight/size for editorial drama */}
              <motion.h1
                className="leading-none mb-gutter"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.06 }}
              >
                <span className="font-display-lg text-primary block font-bold text-[clamp(56px,8vw,96px)] leading-none">
                  مكتبة
                </span>
                <span className="font-display-lg text-on-surface dark:text-inverse-on-surface font-medium text-[clamp(36px,5.5vw,64px)] leading-tight">
                  عبق الياسمينة
                </span>
              </motion.h1>

              {/* Accent line */}
              <motion.div
                className="w-10 h-0.5 bg-primary mb-gutter"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                style={{ transformOrigin: 'right' }}
                transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.14 }}
              />

              {/* Subtitle */}
              <motion.p
                className="text-body-base font-body-base text-on-surface-variant dark:text-inverse-on-surface/70 max-w-[38ch] mb-stack-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.16 }}
              >
                وجهتك للقرطاسية والأدوات المكتبية عالية الجودة، كل ما تحتاج لمكتبك ودراستك
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="flex flex-wrap gap-stack-sm mb-stack-lg"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.22 }}
              >
                {contactLoading ? (
                  <>
                    <div className="h-12 w-48 bg-surface-container animate-pulse rounded-xl skeleton-shimmer animate-shimmer" />
                    <div className="h-12 w-40 bg-surface-container animate-pulse rounded-xl skeleton-shimmer animate-shimmer" />
                  </>
                ) : (
                  <>
                    <WhatsAppButton />
                    {contact && (
                      <MagneticButton
                        href={`tel:${contact.phone}`}
                        className="bg-transparent text-on-surface dark:text-inverse-on-surface border-2 border-on-surface/20 font-label-caps text-label-caps px-6 py-3 rounded-xl flex items-center gap-2 hover:border-primary hover:text-primary transition-colors duration-160 ease-out-strong active:scale-[0.97]"
                      >
                        <Icon name="phone" className="w-[18px] h-[18px]" />
                        <span>اتصل بالمتجر</span>
                      </MagneticButton>
                    )}
                  </>
                )}
              </motion.div>

              {/* Trust bar */}
              <motion.div
                className="flex items-center gap-gutter pt-gutter border-t border-on-surface/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div>
                  <p className="font-headline-md font-bold text-on-surface dark:text-inverse-on-surface text-lg leading-none mb-0.5">
                    ٥٠٠+
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-inverse-on-surface/60">
                    منتج
                  </p>
                </div>
                <div className="w-px h-8 bg-on-surface/10" />
                <div>
                  <p className="font-headline-md font-bold text-on-surface dark:text-inverse-on-surface text-lg leading-none mb-0.5">
                    ٢٠+
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-inverse-on-surface/60">
                    تصنيف
                  </p>
                </div>
                <div className="w-px h-8 bg-on-surface/10" />
                <div>
                  <p className="font-headline-md font-bold text-on-surface dark:text-inverse-on-surface text-lg leading-none mb-0.5">
                    يومياً
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-inverse-on-surface/60">
                    نخدمك
                  </p>
                </div>
              </motion.div>

              {/* Admin link */}
              {isLoaded && !isSignedIn && (
                <motion.div
                  className="mt-gutter"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.38 }}
                >
                  <SignInButton mode="modal" forceRedirectUrl="/admin">
                    <button className="text-label-caps font-label-caps text-on-surface-variant/40 hover:text-primary transition-colors duration-160 ease-out-strong underline underline-offset-4 decoration-dotted decoration-1">
                      تسجيل دخول المتجر
                    </button>
                  </SignInButton>
                </motion.div>
              )}
            </div>

            {/* Image column — left side in RTL */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.02 }}
            >
              {/* Main image frame */}
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-ambient-hover">
                <picture>
                  <source
                    type="image/avif"
                    srcSet="/img/hero-bg-640w.avif 640w, /img/hero-bg-1024w.avif 1024w, /img/hero-bg-1920w.avif 1920w"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <source
                    type="image/webp"
                    srcSet="/img/hero-bg-640w.webp 640w, /img/hero-bg-1024w.webp 1024w, /img/hero-bg-1920w.webp 1920w"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <img
                    alt="أدوات مكتبية مرتبة على طاولة"
                    className="w-full h-full object-cover"
                    src="/img/hero-bg-lg.jpg"
                    fetchPriority="high"
                    decoding="sync"
                  />
                </picture>
                {/* Bottom gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-tertiary/50 via-tertiary/10 to-transparent" />
              </div>

              {/* Floating badge — top outer edge */}
              <motion.div
                className="absolute -top-3 left-6 bg-primary text-on-primary rounded-xl px-3 py-1.5 shadow-ambient"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.32 }}
              >
                <span className="font-label-caps text-label-caps text-xs">قرطاسية راقية</span>
              </motion.div>

              {/* Floating badge — bottom right */}
              <motion.div
                className="absolute -bottom-4 right-6 bg-surface dark:bg-surface-container-dark rounded-2xl px-4 py-3 shadow-ambient flex items-center gap-2.5"
                initial={{ opacity: 0, scale: 0.85, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.38 }}
              >
                <span className="w-2 h-2 rounded-full bg-whatsapp flex-shrink-0" />
                <span className="font-label-caps text-label-caps text-on-surface dark:text-inverse-on-surface text-sm">
                  متجر مفتوح
                </span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── Contact tiles ── */}
        <section
          aria-label="معلومات التواصل والموقع"
          className="max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop pt-12 pb-stack-lg"
        >
          {contactLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
              <div className="lg:col-span-2 bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-xl p-stack-md shadow-ambient flex items-start gap-stack-sm">
                <div className="w-12 h-12 rounded-lg bg-surface-container dark:bg-surface-container-dark animate-pulse skeleton-shimmer animate-shimmer flex-shrink-0" />
                <div className="flex-1 space-y-2 pt-1">
                  <div className="h-4 w-16 bg-surface-container dark:bg-surface-container-dark rounded-full animate-pulse skeleton-shimmer animate-shimmer" />
                  <div className="h-3 w-36 bg-surface-container dark:bg-surface-container-dark rounded-full animate-pulse skeleton-shimmer animate-shimmer" />
                </div>
              </div>
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="bg-surface-container-lowest dark:bg-surface-container-lowest-dark rounded-xl p-stack-md shadow-ambient flex items-start gap-stack-sm"
                >
                  <div className="w-12 h-12 rounded-lg bg-surface-container dark:bg-surface-container-dark animate-pulse skeleton-shimmer animate-shimmer flex-shrink-0" />
                  <div className="flex-1 space-y-2 pt-1">
                    <div className="h-4 w-20 bg-surface-container dark:bg-surface-container-dark rounded-full animate-pulse skeleton-shimmer animate-shimmer" />
                    <div className="h-3 w-28 bg-surface-container dark:bg-surface-container-dark rounded-full animate-pulse skeleton-shimmer animate-shimmer" />
                  </div>
                </div>
              ))}
            </div>
          ) : contact ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
              <div className="lg:col-span-2">
                <ContactTile
                  icon="location_on"
                  title="الموقع"
                  value={contact.address_ar}
                  delay={0}
                />
              </div>
              <ContactTile icon="schedule" title="ساعات العمل" value={contact.hours_ar} delay={1} />
              <ContactTile
                icon="support_agent"
                title="اتصال مباشر"
                value={contact.phone}
                href={`tel:${contact.phone}`}
                delay={2}
              />
            </div>
          ) : null}
        </section>

        {/* ── Categories preview ── */}
        <section aria-label="استكشف التصنيفات" className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">
          <Reveal>
            <header className="mb-stack-lg">
              <span className="text-label-caps font-label-caps text-secondary tracking-widest mb-2 block">
                استكشف
              </span>
              <h2 className="text-display-lg font-display-lg text-on-surface mb-stack-sm">
                التصنيفات
              </h2>
              <p className="max-w-readable text-body-base text-on-surface-variant">
                دفاتر، أقلام، حقائب، أدوات فنية، كل ما تحتاج في مكان واحد
              </p>
            </header>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {categories.length === 0 ? (
              <p className="col-span-full text-on-surface-variant font-body-base text-body-base py-stack-lg text-center">
                لا توجد تصنيفات متاحة حالياً
              </p>
            ) : (
              categories.slice(0, 4).map((cat) => (
                <CategoryCard key={cat.id} category={cat} />
              ))
            )}
          </div>
          <div className="mt-stack-md text-left">
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 text-primary font-bold transition-colors duration-160 ease-out-strong active:scale-[0.97] border-b-2 border-transparent hover:border-primary pb-1"
            >
              عرض جميع التصنيفات
              <Icon name="arrow_left_alt" className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </PageTransition>
  )
}

export default Home
