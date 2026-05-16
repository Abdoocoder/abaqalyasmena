import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import MagneticButton from '../components/MagneticButton'
import Icon from '../components/Icon'

const NotFound = () => {
  return (
    <PageTransition>
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg min-h-[60vh] flex flex-col items-center justify-center text-center">
        <Icon name="search_off" className="w-20 h-20 text-primary mb-4" />
        <h1
          className="animate-fade-up text-display-lg font-display-lg text-on-surface mb-stack-sm"
          style={{ animationDelay: '80ms' }}
        >
          الصفحة غير موجودة
        </h1>
        <p
          className="animate-fade-up max-w-readable text-body-base text-on-surface-variant mb-stack-lg"
          style={{ animationDelay: '160ms' }}
        >
          الصفحة التي تبحث عنها غير موجودة أو تم نقلها
        </p>
        <MagneticButton
          as={Link}
          to="/"
          className="animate-fade-up bg-tertiary text-on-tertiary font-label-caps text-label-caps px-8 py-4 rounded-xl shadow-ambient flex items-center gap-2"
          style={{ animationDelay: '240ms' }}
        >
          <Icon name="home" className="w-[18px] h-[18px]" />
          العودة إلى الرئيسية
        </MagneticButton>
      </main>
    </PageTransition>
  )
}

export default NotFound
