import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../services/api'
import { StatCardSkeleton } from '../../components/Skeleton'
import { Package, FolderOpen, Tag, ClipboardList } from 'lucide-react'

const cards = [
  { label: 'المنتجات', key: 'products', color: 'text-primary', icon: Package, link: '/admin/products' },
  { label: 'التصنيفات', key: 'categories', color: 'text-secondary', icon: FolderOpen, link: '/admin/categories' },
  { label: 'العروض', key: 'offers', color: 'text-highlight', icon: Tag, link: '/admin/offers' },
  { label: 'الطلبات', key: 'orders', color: 'text-whatsapp', icon: ClipboardList, link: '/admin/orders' },
]

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
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h1 className="text-display-lg font-display-lg text-on-surface mb-6">لوحة التحكم</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {loading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          cards.map((card, i) => {
            const Icon = card.icon
            return (
              <Link
                key={card.key}
                to={card.link}
                className="bg-surface-container-lowest rounded-xl shadow-ambient p-6 hover:shadow-ambient-hover transition-transform duration-200 ease-out-strong hover:-translate-y-1 active:scale-[0.97]"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className={`${card.color} mb-3`}>
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <p className="text-3xl font-bold text-on-surface mb-1">{stats[card.key]}</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{card.label}</p>
              </Link>
            )
          })
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
