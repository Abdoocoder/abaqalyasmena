import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { api } from '../../services/api'
import { StatCardSkeleton } from '../../components/Skeleton'
import { Package, FolderOpen, Tag, ClipboardList, TrendingUp } from 'lucide-react'

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 },
  },
}

const CountingNumber = ({ value }) => {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (value === undefined) return
    const duration = 800
    const start = performance.now()
    let raf
    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.floor(eased * value))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value])

  return <span>{display}</span>
}

const BentoCard = ({ icon: Icon, label, value, color, link, gradient }) => (
  <motion.div variants={item}>
    <Link
      to={link}
      className={`relative block bg-surface-container-lowest rounded-2xl shadow-ambient p-6 overflow-hidden transition-transform duration-200 ease-out-strong hover:-translate-y-1 hover:shadow-ambient-hover active:scale-[0.98] ${gradient}`}
    >
      <div className="relative z-10">
        <div className={`${color} mb-3`}>
          <Icon size={24} strokeWidth={1.5} />
        </div>
        <p className="text-3xl font-bold text-on-surface mb-1 font-mono tabular-nums">
          <CountingNumber value={value} />
        </p>
        <p className="font-body-sm text-body-sm text-on-surface-variant">{label}</p>
      </div>
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white/5 to-transparent"
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </Link>
  </motion.div>
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
    ]).then(([products, categories, offers, orders]) => {
      setStats({
        products: products.length,
        categories: categories.length,
        offers: offers.length,
        orders: orders.length,
      })
    }).catch(() => console.warn('AdminDashboard: failed to load stats')).finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-display-lg font-display-lg text-on-surface animate-fade-down">لوحة التحكم</h1>
        <div className="animate-fade-down flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm" style={{ animationDelay: '60ms' }}>
          <TrendingUp size={16} strokeWidth={1.5} className="text-primary" />
          <span>نظرة عامة على المتجر</span>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter"
        >
          <div className="lg:col-span-2">
            <BentoCard
              icon={Package}
              label="إجمالي المنتجات"
              value={stats.products}
              color="text-primary"
              link="/admin/products"
              gradient=""
            />
          </div>
          <BentoCard
            icon={FolderOpen}
            label="التصنيفات"
            value={stats.categories}
            color="text-secondary"
            link="/admin/categories"
            gradient=""
          />
          <BentoCard
            icon={Tag}
            label="العروض النشطة"
            value={stats.offers}
            color="text-highlight"
            link="/admin/offers"
            gradient=""
          />
          <BentoCard
            icon={ClipboardList}
            label="الطلبات"
            value={stats.orders}
            color="text-whatsapp"
            link="/admin/orders"
            gradient=""
          />
        </motion.div>
      )}
    </div>
  )
}

export default AdminDashboard
