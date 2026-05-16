import { motion } from 'framer-motion'
import WhatsAppButton from '../components/WhatsAppButton'
import MagneticButton from '../components/MagneticButton'
import PageTransition from '../components/PageTransition'
import Icon from '../components/Icon'
import { useContact, useContactLoading } from '../contexts/ContactContext'

const InfoRow = ({ icon, label, children, delay = 0 }) => (
  <motion.div
    className="py-8 flex items-start gap-5"
    initial={{ opacity: 0, transform: 'translateY(16px)' }}
    whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
    viewport={{ once: true }}
    transition={{ type: 'spring', stiffness: 100, damping: 20, delay }}
  >
    <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0 mt-0.5">
      <Icon name={icon} className="w-5 h-5 text-primary" />
    </div>
    <div className="min-w-0">
      <p className="text-label-caps font-label-caps text-on-surface-variant mb-1.5">{label}</p>
      {children}
    </div>
  </motion.div>
)

const SkeletonRow = ({ wide = false }) => (
  <div className="py-8 flex items-start gap-5">
    <div className="w-10 h-10 rounded-xl bg-surface-container dark:bg-surface-container-dark animate-pulse skeleton-shimmer animate-shimmer flex-shrink-0" />
    <div className="flex-1 space-y-2 pt-1">
      <div className="h-3 w-16 bg-surface-container dark:bg-surface-container-dark rounded-full skeleton-shimmer animate-shimmer" />
      <div className={`h-6 ${wide ? 'w-56' : 'w-40'} bg-surface-container dark:bg-surface-container-dark rounded-lg skeleton-shimmer animate-shimmer`} />
    </div>
  </div>
)

const Contact = () => {
  const contact = useContact()
  const contactLoading = useContactLoading()

  return (
    <PageTransition>
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">

        {/* Header */}
        <header className="mb-12 relative">
          <div className="relative">
            <motion.span
              className="text-label-caps font-label-caps text-secondary tracking-widest mb-2 block"
              initial={{ opacity: 0, transform: 'translateY(10px)' }}
              animate={{ opacity: 1, transform: 'translateY(0px)' }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
              تواصل معنا
            </motion.span>
            <motion.h1
              className="text-display-lg font-display-lg text-on-surface mb-stack-sm leading-tight"
              initial={{ opacity: 0, transform: 'translateY(20px)' }}
              animate={{ opacity: 1, transform: 'translateY(0px)' }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.06 }}
            >
              اتصل بنا
            </motion.h1>
            <motion.p
              className="max-w-readable text-body-base font-body-base text-on-surface-variant"
              initial={{ opacity: 0, transform: 'translateY(14px)' }}
              animate={{ opacity: 1, transform: 'translateY(0px)' }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.12 }}
            >
              زورنا في شارع جاوا أو تواصل معنا أونلاين
            </motion.p>
          </div>
        </header>

        {/* Main split */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-gutter items-start">

          {/* Contact info — no card, dividers only */}
          <div className="lg:col-span-3">
            {contactLoading ? (
              <div className="divide-y divide-surface-variant dark:divide-inverse-on-surface/20">
                <SkeletonRow wide />
                <SkeletonRow />
                <SkeletonRow wide />
                <SkeletonRow />
              </div>
            ) : contact ? (
              <div className="divide-y divide-surface-variant dark:divide-inverse-on-surface/20">

                {/* Phone — large, prominent */}
                <InfoRow icon="phone" label="اتصال مباشر" delay={0}>
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-[clamp(22px,4vw,32px)] font-bold text-on-surface tabular-nums hover:text-primary transition-colors duration-160 ease-out-strong"
                    dir="ltr"
                  >
                    {contact.phone}
                  </a>
                </InfoRow>

                {/* WhatsApp */}
                <InfoRow icon="chat" label="واتساب" delay={0.06}>
                  <a
                    href={`https://wa.me/${contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body-base font-body-base text-whatsapp hover:underline underline-offset-4 transition-colors duration-160 ease-out-strong"
                    dir="ltr"
                  >
                    {contact.whatsapp}
                  </a>
                </InfoRow>

                {/* Address */}
                <InfoRow icon="location_on" label="الموقع" delay={0.12}>
                  <p className="text-body-base font-body-base text-on-surface leading-relaxed">
                    {contact.address_ar}
                  </p>
                </InfoRow>

                {/* Hours */}
                <InfoRow icon="schedule" label="ساعات العمل" delay={0.18}>
                  <p className="text-body-base font-body-base text-on-surface">
                    {contact.hours_ar}
                  </p>
                </InfoRow>

                {/* Facebook */}
                {contact.facebook && (
                  <InfoRow icon="facebook" label="فيسبوك" delay={0.18}>
                    <a
                      href={contact.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-body-base font-body-base text-primary hover:underline underline-offset-4 transition-colors duration-160 ease-out-strong"
                    >
                      تابعنا على فيسبوك
                    </a>
                  </InfoRow>
                )}

                {/* CTAs */}
                <motion.div
                  className="pt-8 flex flex-wrap gap-stack-sm"
                  initial={{ opacity: 0, transform: 'translateY(14px)' }}
                  whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.18 }}
                >
                  <WhatsAppButton className="min-h-[44px]" />
                  <MagneticButton
                    href={`tel:${contact.phone}`}
                    className="bg-tertiary text-on-tertiary font-label-caps text-label-caps px-6 py-3 rounded-xl shadow-ambient flex items-center gap-2 min-h-[44px]"
                  >
                    <Icon name="phone" className="w-[18px] h-[18px]" />
                    اتصل الآن
                  </MagneticButton>
                </motion.div>
              </div>
            ) : null}
          </div>

          {/* Map — sticky on desktop */}
          <div className="lg:col-span-2 lg:sticky lg:top-[100px]">
            <div className="rounded-2xl overflow-hidden shadow-ambient min-h-[420px] relative bg-surface-container dark:bg-surface-container-dark">
              {contact && (
                <iframe
                  title="موقع المتجر على خرائط جوجل"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(contact.maps_query)}&output=embed`}
                  className="w-full h-full absolute inset-0 border-0 min-h-[420px]"
                  loading="lazy"
                  allowFullScreen
                />
              )}
              {!contact && contactLoading && (
                <div className="absolute inset-0 skeleton-shimmer animate-shimmer animate-pulse" />
              )}
              <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                <a
                  href="https://maps.app.goo.gl/WPgaCqvevjm7qWwU6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-tertiary text-on-tertiary font-label-caps text-label-caps px-6 py-3 rounded-xl shadow-ambient inline-flex items-center gap-2 transition-transform duration-160 ease-out-strong active:scale-[0.97]"
                >
                  <Icon name="map" className="w-4 h-4" />
                  احصل على الاتجاهات
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  )
}

export default Contact
