import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth, SignInButton, UserButton } from '@clerk/clerk-react'
import logo from '../assets/logo.png'
import Icon from './Icon'

const Navbar = () => {
  const { isLoaded, isSignedIn } = useAuth()
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme')
      if (stored) return stored === 'dark'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    const q = searchQuery.trim()
    if (q) {
      navigate(`/search?q=${encodeURIComponent(q)}`)
      setSearchQuery('')
      setIsMobileMenuOpen(false)
    }
  }

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  const toggleDark = () => setIsDark((prev) => !prev)

  const navLinks = [
    { to: '/categories', label: 'التصنيفات' },
    { to: '/offers', label: 'العروض' },
    { to: '/contact', label: 'اتصل بنا' },
  ]

  return (
    <nav className="bg-surface dark:bg-inverse-surface shadow-sm sticky top-0 z-50 transition-colors duration-200">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto h-20">
        <Link
          to="/"
          className="transition-transform duration-160 ease-out-strong active:scale-[0.97]"
        >
          <img src={logo} alt="مكتبة عبق الياسمينة" className="h-12 w-auto" />
        </Link>

        <div className="hidden md:flex space-x-reverse space-x-gutter items-center font-body-base text-body-base">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-on-surface-variant dark:text-inverse-on-surface hover:text-primary dark:hover:text-primary transition-colors duration-160 ease-out-strong active:scale-[0.97] px-3 py-2 rounded-lg"
            >
              {link.label}
            </Link>
          ))}
          {isLoaded && !isSignedIn && (
            <SignInButton mode="modal" forceRedirectUrl="/admin">
              <button className="text-label-caps font-label-caps text-primary dark:text-primary hover:bg-primary/10 px-3 py-2 rounded-xl transition-colors duration-160 ease-out-strong active:scale-[0.97]">
                تسجيل الدخول
              </button>
            </SignInButton>
          )}
          {isLoaded && isSignedIn && (
            <div className="flex items-center gap-2">
              <Link
                to="/admin"
                className="text-label-caps font-label-caps text-primary dark:text-primary hover:bg-primary/10 px-3 py-2 rounded-xl transition-colors duration-160 ease-out-strong active:scale-[0.97]"
              >
                لوحة التحكم
              </Link>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: 'w-8 h-8',
                    userButtonTrigger: 'hover:opacity-80 transition-opacity duration-160',
                  },
                }}
              />
            </div>
          )}
        </div>

        <div className="flex items-center space-x-reverse space-x-stack-sm">
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center bg-surface-container-low rounded-full px-4 py-2 border border-surface-variant transition-colors duration-160 ease-out-strong focus-within:border-primary"
          >
            <Icon name="search" className="text-outline ml-2 w-4 h-4" />
            <input
              aria-label="بحث"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:ring-0 text-body-sm font-body-sm text-on-surface placeholder-outline outline-none"
              placeholder="بحث..."
              type="text"
            />
          </form>
          <button
            aria-label="بحث"
            onClick={() => navigate('/search')}
            className="md:hidden p-3 text-primary dark:text-primary hover:bg-primary/10 rounded-full transition-colors duration-160 ease-out-strong active:scale-[0.92]"
          >
            <Icon name="search" className="w-5 h-5" />
          </button>
          <button
            aria-label={isDark ? 'الوضع النهاري' : 'الوضع الليلي'}
            onClick={toggleDark}
            className="p-3 text-primary dark:text-primary hover:bg-primary/10 rounded-full transition-colors duration-160 ease-out-strong active:scale-[0.92]"
          >
            <Icon name={isDark ? 'light_mode' : 'dark_mode'} className="w-5 h-5" />
          </button>
          <button
            aria-label="القائمة"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-3 text-primary dark:text-primary hover:bg-primary/10 rounded-full transition-colors duration-160 ease-out-strong active:scale-[0.92]"
          >
            <Icon name={isMobileMenuOpen ? 'close' : 'menu'} className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`md:hidden bg-surface dark:bg-inverse-surface border-t border-surface-variant dark:border-inverse-on-surface/20 px-margin-mobile pb-6 pt-2 flex flex-col gap-4 font-body-base text-body-base ${isMobileMenuOpen ? 'menu-enter' : 'hidden'}`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-on-surface-variant dark:text-inverse-on-surface hover:text-primary dark:hover:text-primary transition-colors duration-160 ease-out-strong py-3 px-2 rounded-lg"
          >
            {link.label}
          </Link>
        ))}
        <div className="border-t border-surface-variant dark:border-inverse-on-surface/20 pt-4 mt-2">
          {isLoaded && !isSignedIn && (
            <SignInButton mode="modal" forceRedirectUrl="/admin">
              <button className="w-full text-center text-label-caps font-label-caps text-primary dark:text-primary hover:bg-primary/10 px-3 py-3 rounded-xl transition-colors duration-160 ease-out-strong">
                تسجيل الدخول
              </button>
            </SignInButton>
          )}
          {isLoaded && isSignedIn && (
            <Link
              to="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-center text-label-caps font-label-caps text-primary dark:text-primary hover:bg-primary/10 px-3 py-3 rounded-xl transition-colors duration-160 ease-out-strong"
            >
              لوحة التحكم
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
