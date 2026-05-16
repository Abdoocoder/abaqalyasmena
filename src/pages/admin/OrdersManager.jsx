import { useState, useEffect } from 'react'
import { api } from '../../services/api'
import { CardSkeleton } from '../../components/Skeleton'

const OrdersManager = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = () => {
    api
      .getOrders()
      .then(setOrders)
      .catch(() => console.warn('OrdersManager: failed to load'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('تأكيد حذف هذا الطلب؟')) return
    try {
      await api.deleteOrder(id)
      fetchData()
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div>
      <h1 className="text-display-lg font-display-lg text-on-surface mb-6 animate-fade-down">
        إدارة الطلبات
      </h1>

      {loading ? (
        <div className="flex flex-col gap-4">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-xl shadow-ambient p-8 text-center animate-fade-in">
          <p className="text-on-surface-variant font-body-base text-body-base">لا توجد طلبات بعد</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order, i) => (
            <div
              key={order.id}
              className="bg-surface-container-lowest rounded-xl shadow-ambient p-6 transition-transform duration-200 ease-out-strong hover:-translate-y-0.5 active:scale-[0.99] animate-fade-up"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-headline-md text-on-surface">{order.customer_name}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{order.phone}</p>
                </div>
                <div className="text-left">
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {new Date(order.created_at).toLocaleDateString('ar-JO', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
              {order.notes && (
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-3">
                  <span className="font-medium">ملاحظات:</span> {order.notes}
                </p>
              )}
              {order.items && Array.isArray(order.items) && order.items.length > 0 && (
                <div className="bg-surface-container rounded-lg p-3 mb-4">
                  <p className="font-label-caps text-label-caps text-on-surface-variant mb-2">
                    المنتجات:
                  </p>
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="font-body-sm text-body-sm text-on-surface flex justify-between py-1 border-b border-surface-variant last:border-0"
                    >
                      <span>{item.name || item.name_ar || `منتج ${i + 1}`}</span>
                      {item.quantity && <span>الكمية: {item.quantity}</span>}
                    </div>
                  ))}
                </div>
              )}
              <div className="flex gap-2 justify-end">
                <a
                  href={`https://wa.me/${order.phone.replace(/^\+/, '')}?text=${encodeURIComponent('مرحباً، بخصوص طلبك من مكتبة عبق الياسمينة')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-whatsapp text-white font-label-caps text-label-caps px-4 py-2 rounded-xl transition-transform duration-160 ease-out-strong active:scale-[0.97]"
                >
                  واتساب
                </a>
                <button
                  onClick={() => handleDelete(order.id)}
                  className="bg-surface-container text-on-surface font-label-caps text-label-caps px-4 py-2 rounded-xl transition-transform duration-160 ease-out-strong active:scale-[0.97]"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrdersManager
