import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useUser, useAuth } from '@clerk/clerk-react'
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  Tag,
  ClipboardList,
  Phone,
  LogOut,
  ArrowLeftFromLine,
  Menu,
  Store,
  X,
} from 'lucide-react'

const navItems = [
  { path: '/admin', label: 'لوحة التحكم', icon: LayoutDashboard },
  { path: '/admin/products', label: 'المنتجات', icon: Package },
  { path: '/admin/categories', label: 'التصنيفات', icon: FolderOpen },
  { path: '/admin/offers', label: 'العروض', icon: Tag },
  { path: '/admin/orders', label: 'الطلبات', icon: ClipboardList },
  { path: '/admin/contact', label: 'بيانات الاتصال', icon: Phone },
]

const AdminLayout = ({ children }) => {
  const location = useLocation()
  const { user } = useUser()
  const { signOut } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const currentPage = navItems.find((n) => n.path === location.pathname)
  const userInitial =
    user?.firstName?.[0] || user?.primaryEmailAddress?.emailAddress?.[0] || 'A'

  return (
    <div className="min-h-screen flex" dir="rtl">
      {/* ── Sidebar ── */}
      <aside
        className={`bg-gradient-to-b from-surface-container-dark to-tertiary text-white w-64 flex-shrink-0 fixed top-0 right-0 h-full z-30 overflow-y-auto flex flex-col transition-transform duration-200 ease-out-strong ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0 lg:static lg:top-auto lg:right-auto`}
      >
        {/* Sidebar header */}
        <div className="p-5 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/25 flex items-center justify-center flex-shrink-0">
              <Store size={17} strokeWidth={1.5} className="text-primary-fixed" />
            </div>
            <div className="min-w-0">
              <h2 className="font-headline-md text-sm font-semibold text-white leading-tight truncate">
                مكتبة عبق الياسمينة
              </h2>
              <p className="text-white/40 text-[10px] font-label-caps font-label-caps mt-0.5">
                لوحة الإدارة
              </p>
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav className="p-3 flex flex-col gap-0.5 flex-1">
          {navItems.map((navItem) => {
            const Icon = navItem.icon
            const isActive = location.pathname === navItem.path
            return (
              <Link
                key={navItem.path}
                to={navItem.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-160 ease-out-strong ${
                  isActive
                    ? 'bg-white/12 text-white'
                    : 'text-white/55 hover:bg-white/6 hover:text-white/85'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-160 flex-shrink-0 ${
                    isActive ? 'bg-primary/25 text-primary-fixed' : 'text-white/40'
                  }`}
                >
                  <Icon size={15} strokeWidth={1.5} />
                </div>
                <span className="font-body-sm text-body-sm font-medium">{navItem.label}</span>
                {isActive && (
                  <div className="w-1 h-1 rounded-full bg-primary-fixed mr-auto flex-shrink-0" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="p-3 border-t border-white/8">
          {/* User pill */}
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 mb-1">
            <div className="w-7 h-7 rounded-full bg-primary/30 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
              {userInitial}
            </div>
            <p className="font-body-sm text-body-sm text-white/70 truncate flex-1 min-w-0">
              {user?.fullName || user?.primaryEmailAddress?.emailAddress || 'Admin'}
            </p>
          </div>

          <button
            onClick={() => signOut()}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/45 hover:bg-white/6 hover:text-white/75 transition-all duration-160 ease-out-strong active:scale-[0.98]"
          >
            <LogOut size={15} strokeWidth={1.5} />
            <span className="font-body-sm text-body-sm">تسجيل خروج</span>
          </button>

          <Link
            to="/"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/45 hover:bg-white/6 hover:text-white/75 transition-all duration-160 ease-out-strong active:scale-[0.98]"
          >
            <ArrowLeftFromLine size={15} strokeWidth={1.5} />
            <span className="font-body-sm text-body-sm">العودة للموقع</span>
          </Link>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex-1 bg-background min-h-screen flex flex-col">
        {/* Top header */}
        <header className="bg-surface-container-lowest border-b border-surface-variant/50 px-4 md:px-6 py-3.5 flex items-center gap-4">
          {/* Mobile hamburger */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 text-on-surface-variant hover:text-primary hover:bg-primary/8 rounded-xl transition-colors duration-160 ease-out-strong"
            aria-label={sidebarOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          >
            {sidebarOpen ? (
              <X size={20} strokeWidth={1.5} />
            ) : (
              <Menu size={20} strokeWidth={1.5} />
            )}
          </button>

          {/* Current page label */}
          {currentPage && (
            <div className="flex items-center gap-2">
              <currentPage.icon
                size={15}
                strokeWidth={1.5}
                className="text-on-surface-variant/50"
              />
              <span className="font-label-caps text-label-caps text-on-surface-variant">
                {currentPage.label}
              </span>
            </div>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Desktop user pill */}
          <div className="hidden lg:flex items-center gap-2.5 bg-surface-container rounded-xl px-3 py-2">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
              {userInitial}
            </div>
            <span className="font-body-sm text-body-sm text-on-surface-variant truncate max-w-[160px]">
              {user?.fullName || user?.primaryEmailAddress?.emailAddress || 'Admin'}
            </span>
          </div>
        </header>

        <main className="p-4 md:p-6 flex-1">{children}</main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-tertiary/30 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

export default AdminLayout
