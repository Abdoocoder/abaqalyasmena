import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { api } from '../../services/api'
import {
  Package,
  FolderOpen,
  Tag,
  ClipboardList,
  PlusCircle,
  ChevronLeft,
} from 'lucide-react'

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.08 },
  },
}

const cell = {
  hidden: { opacity: 0, transform: 'translateY(20px)' },
  visible: { opacity: 1, transform: 'translateY(0px)', transition: { type: 'spring', stiffness: 100, damping: 20 } },
}

const CountingNumber = ({ value }) => {
  const [display, setDisplay] = useState(0)
  const reducedMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    if (value === undefined) return
    if (reducedMotion.current) {
      setDisplay(value)
      return
    }
    const duration = 900
    const start = performance.now()
    let raf
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.floor(eased * value))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value])
  return <>{display}</>
}

const getGreeting = () => {
  const h = new Date().getHours()
  if (h < 12) return 'صباح الخير'
  if (h < 17) return 'مساء الخير'
  return 'مساء النور'
}

const getArabicDate = () =>
  new Date().toLocaleDateString('ar-JO', { weekday: 'long', day: 'numeric', month: 'long' })

const FeaturedCard = ({ value }) => (
  <Link
    to="/admin/products"
    className="relative block bg-tertiary text-on-tertiary rounded-2xl p-8 overflow-hidden h-full min-h-[172px] transition-all duration-200 ease-out-strong hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(44,0,62,0.25)] active:scale-[0.99]"
  >
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex items-start justify-between">
        <div className="bg-white/10 p-2.5 rounded-xl">
          <Package size={20} strokeWidth={1.5} />
        </div>
        <ChevronLeft size={16} strokeWidth={1.5} className="text-white/30 mt-0.5" />
      </div>
      <div className="mt-auto pt-8">
        <p className="text-[clamp(52px,5vw,68px)] font-bold leading-none font-mono tabular-nums text-white mb-1">
          <CountingNumber value={value} />
        </p>
        <p className="text-white/55 font-label-caps text-label-caps">إجمالي المنتجات</p>
      </div>
    </div>
    <Package
      size={140}
      strokeWidth={0.4}
      className="absolute -bottom-6 -left-6 text-white/4 pointer-events-none"
    />
  </Link>
)

const StatCard = ({ icon: Icon, label, value, link, colorClass, bgClass }) => (
  <Link
    to={link}
    className="relative block bg-surface-container-lowest rounded-2xl shadow-ambient border border-surface-variant/40 p-6 overflow-hidden h-full min-h-[140px] transition-all duration-200 ease-out-strong hover:-translate-y-0.5 hover:shadow-ambient-hover hover:border-primary/25 active:scale-[0.98]"
  >
    <div className="flex flex-col h-full">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${bgClass}`}>
        <Icon size={17} strokeWidth={1.5} className={colorClass} />
      </div>
      <div className="mt-auto pt-6">
        <p className="text-3xl font-bold text-on-surface font-mono tabular-nums mb-0.5">
          <CountingNumber value={value} />
        </p>
        <p className="font-body-sm text-body-sm text-on-surface-variant">{label}</p>
      </div>
    </div>
  </Link>
)

const OrdersCard = ({ value }) => (
  <Link
    to="/admin/orders"
    className="group block bg-surface-container-lowest rounded-2xl shadow-ambient border border-surface-variant/40 overflow-hidden h-full min-h-[140px] transition-all duration-200 ease-out-strong hover:-translate-y-0.5 hover:shadow-ambient-hover hover:border-primary/25 active:scale-[0.98]"
  >
    <div className="flex items-center h-full px-8 py-6 gap-10">
      <div className="flex items-center gap-5 flex-1">
        <div className="w-12 h-12 rounded-xl bg-whatsapp/10 flex items-center justify-center flex-shrink-0">
          <ClipboardList size={22} strokeWidth={1.5} className="text-whatsapp" />
        </div>
        <div>
          <p className="text-[clamp(36px,4vw,48px)] font-bold text-on-surface font-mono tabular-nums leading-none mb-0.5">
            <CountingNumber value={value} />
          </p>
          <p className="font-body-sm text-body-sm text-on-surface-variant">إجمالي الطلبات</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-primary font-label-caps text-label-caps text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-160">
        <span>إدارة الطلبات</span>
        <ChevronLeft size={14} strokeWidth={2} />
      </div>
    </div>
  </Link>
)

const QuickActionsCard = () => {
  const actions = [
    { label: 'منتج جديد', to: '/admin/products', Icon: Package },
    { label: 'تصنيف جديد', to: '/admin/categories', Icon: FolderOpen },
    { label: 'عرض جديد', to: '/admin/offers', Icon: Tag },
  ]
  return (
    <div className="bg-surface-container-lowest rounded-2xl shadow-ambient border border-surface-variant/40 p-5 h-full min-h-[140px] flex flex-col">
      <p className="font-label-caps text-label-caps text-on-surface-variant mb-3">إجراء سريع</p>
      <div className="flex flex-col gap-1.5">
        {actions.map(({ label, to, Icon }) => (
          <Link
            key={to}
            to={to}
            className="group flex items-center gap-3 px-3 py-2.5 rounded-xl bg-surface-container hover:bg-primary/8 transition-colors duration-160 ease-out-strong active:scale-[0.98]"
          >
            <Icon
              size={15}
              strokeWidth={1.5}
              className="text-on-surface-variant group-hover:text-primary transition-colors duration-160"
            />
            <span className="font-body-sm text-body-sm font-medium text-on-surface group-hover:text-primary transition-colors duration-160 flex-1">
              {label}
            </span>
            <PlusCircle
              size={13}
              strokeWidth={1.5}
              className="text-on-surface-variant/40 group-hover:text-primary transition-colors duration-160"
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

const CardSkeleton = ({ className = '' }) => (
  <div
    className={`bg-surface-container-lowest rounded-2xl shadow-ambient border border-surface-variant/40 p-6 min-h-[140px] flex flex-col ${className}`}
  >
    <div className="w-9 h-9 rounded-xl bg-surface-container animate-pulse skeleton-shimmer animate-shimmer" />
    <div className="mt-auto space-y-2">
      <div className="w-14 h-9 rounded-lg bg-surface-container animate-pulse skeleton-shimmer animate-shimmer" />
      <div className="w-20 h-3 rounded-full bg-surface-container animate-pulse skeleton-shimmer animate-shimmer" />
    </div>
  </div>
)

const AdminDashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.getProducts(),
      api.getCategories(),
      api.getOffers(),
      api.getOrders().catch(() => []),
    ])
      .then(([products, categories, offers, orders]) => {
        setStats({
          products: products.length,
          categories: categories.length,
          offers: offers.length,
          orders: orders.length,
        })
      })
      .catch(() => console.warn('AdminDashboard: failed to load stats'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">
          {getGreeting()}
        </p>
        <h1 className="text-display-lg font-display-lg text-on-surface leading-tight">
          نظرة عامة على المتجر
        </h1>
        <p
          className="font-body-sm text-body-sm text-on-surface-variant/50 mt-1"
          aria-label="التاريخ الحالي"
        >
          {getArabicDate()}
        </p>
      </div>

      {/* Bento grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          <div className="md:col-span-1 lg:col-span-2">
            <div className="bg-tertiary/30 rounded-2xl min-h-[172px] animate-pulse" />
          </div>
          <CardSkeleton />
          <CardSkeleton />
          <div className="md:col-span-2 lg:col-span-3">
            <CardSkeleton className="h-full" />
          </div>
          <div className="md:col-span-1 lg:col-span-1">
            <CardSkeleton className="h-full" />
          </div>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter"
        >
          {/* Products — featured, spans 2 columns */}
          <motion.div variants={cell} className="md:col-span-1 lg:col-span-2">
            <FeaturedCard value={stats.products} />
          </motion.div>

          {/* Categories */}
          <motion.div variants={cell}>
            <StatCard
              icon={FolderOpen}
              label="التصنيفات"
              value={stats.categories}
              link="/admin/categories"
              colorClass="text-secondary"
              bgClass="bg-secondary/10"
            />
          </motion.div>

          {/* Offers */}
          <motion.div variants={cell}>
            <StatCard
              icon={Tag}
              label="العروض النشطة"
              value={stats.offers}
              link="/admin/offers"
              colorClass="text-highlight"
              bgClass="bg-highlight/10"
            />
          </motion.div>

          {/* Orders — spans 3 columns */}
          <motion.div variants={cell} className="md:col-span-2 lg:col-span-3">
            <OrdersCard value={stats.orders} />
          </motion.div>

          {/* Quick actions */}
          <motion.div variants={cell} className="md:col-span-1 lg:col-span-1">
            <QuickActionsCard />
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default AdminDashboard
