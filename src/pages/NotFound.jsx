import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import MagneticButton from '../components/MagneticButton'
import Icon from '../components/Icon'
import { motion } from 'framer-motion'

const NotFound = () => {
  return (
    <PageTransition>
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop min-h-[calc(100dvh-80px)] flex items-center">
        <div className="relative w-full py-20">

          {/* 404 watermark — right edge (RTL start), layered behind content */}
          <span
            className="absolute top-0 right-0 text-[clamp(120px,22vw,260px)] font-bold leading-none text-primary/[0.05] dark:text-primary/[0.08] tabular-nums select-none pointer-events-none"
            aria-hidden="true"
          >
            404
          </span>

          <div className="relative">
            <motion.span
              className="text-label-caps font-label-caps text-secondary tracking-widest mb-3 block"
              initial={{ opacity: 0, transform: 'translateY(10px)' }}
              animate={{ opacity: 1, transform: 'translateY(0px)' }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
              خطأ ٤٠٤
            </motion.span>

            <motion.h1
              className="text-display-lg font-display-lg text-on-surface mb-stack-sm leading-tight max-w-[16ch]"
              initial={{ opacity: 0, transform: 'translateY(20px)' }}
              animate={{ opacity: 1, transform: 'translateY(0px)' }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.06 }}
            >
              الصفحة غير موجودة
            </motion.h1>

            <motion.p
              className="max-w-readable text-body-base text-on-surface-variant mb-stack-lg"
              initial={{ opacity: 0, transform: 'translateY(14px)' }}
              animate={{ opacity: 1, transform: 'translateY(0px)' }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.12 }}
            >
              الصفحة التي تبحث عنها غير موجودة أو تم نقلها. تفضل بالعودة للرئيسية أو تصفح تصنيفاتنا
            </motion.p>

            <motion.div
              className="flex items-center flex-wrap gap-stack-sm"
              initial={{ opacity: 0, transform: 'translateY(14px)' }}
              animate={{ opacity: 1, transform: 'translateY(0px)' }}
              transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.18 }}
            >
              <MagneticButton
                to="/"
                className="bg-tertiary text-on-tertiary font-label-caps text-label-caps px-8 py-3.5 rounded-xl shadow-ambient flex items-center gap-2"
              >
                <Icon name="home" className="w-[18px] h-[18px]" />
                الرئيسية
              </MagneticButton>

              <MagneticButton
                to="/categories"
                className="bg-transparent text-on-surface border-2 border-on-surface/20 font-label-caps text-label-caps px-8 py-3.5 rounded-xl flex items-center gap-2 hover:border-primary hover:text-primary transition-colors duration-160 ease-out-strong active:scale-[0.97]"
              >
                التصنيفات
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </main>
    </PageTransition>
  )
}

export default NotFound
