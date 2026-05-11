import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useUser, useAuth } from '@clerk/clerk-react'
import { LayoutDashboard, Package, FolderOpen, Tag, ClipboardList, Phone, LogOut, ArrowLeftFromLine, Menu } from 'lucide-react'

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

  return (
    <div className="min-h-screen flex" dir="rtl">
      <aside className={`bg-tertiary text-white w-64 flex-shrink-0 fixed h-full z-30 transition-transform duration-200 ease-out-strong ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}>
        <div className="p-6 border-b border-white/10">
          <h2 className="font-bold text-lg">لوحة التحكم</h2>
          <p className="text-white/60 text-sm mt-1">مكتبة عبق الياسمينة</p>
        </div>
        <nav className="p-4 flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-160 ease-out-strong ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white active:scale-[0.97]'
                }`}
              >
                <Icon size={20} strokeWidth={1.5} />
                <span className="font-body-sm text-body-sm">{item.label}</span>
              </Link>
            )
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <button
            onClick={() => signOut()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all duration-160 ease-out-strong active:scale-[0.97]"
          >
            <LogOut size={20} strokeWidth={1.5} />
            <span className="font-body-sm text-body-sm">تسجيل خروج</span>
          </button>
          <Link
            to="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all duration-160 ease-out-strong active:scale-[0.97] mt-1"
          >
            <ArrowLeftFromLine size={20} strokeWidth={1.5} />
            <span className="font-body-sm text-body-sm">العودة للموقع</span>
          </Link>
        </div>
      </aside>

      <div className="flex-1 bg-background min-h-screen">
        <header className="bg-surface-container-lowest shadow-sm px-6 py-4 flex items-center justify-between lg:justify-end">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 text-primary transition-transform duration-160 ease-out-strong active:scale-[0.95]"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
          <span className="text-on-surface-variant font-body-sm text-body-sm">
            {user?.fullName || user?.primaryEmailAddress?.emailAddress || 'Admin'}
          </span>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden transition-opacity duration-200"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default AdminLayout
