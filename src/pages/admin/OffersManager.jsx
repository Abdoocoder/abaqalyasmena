import { useState, useEffect } from 'react'
import { api } from '../../services/api'
import { CardSkeleton } from '../../components/Skeleton'

const emptyForm = { title: '', title_ar: '', description: '', price: '', tag: '', image_url: '' }

const fieldClass =
  'px-4 py-3 rounded-xl border border-surface-variant bg-surface-container-low text-on-surface font-body-base text-body-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all duration-160'

const OffersManager = () => {
  const [offers, setOffers] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchData = () => {
    api
      .getOffers()
      .then(setOffers)
      .catch(() => console.warn('OffersManager: failed to load'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editing) {
        await api.updateOffer(editing, form)
      } else {
        await api.createOffer(form)
      }
      setForm(emptyForm)
      setEditing(null)
      fetchData()
    } catch (err) {
      alert(err.message)
    }
  }

  const handleEdit = (offer) => {
    setForm({
      title: offer.title,
      title_ar: offer.title_ar,
      description: offer.description,
      price: offer.price,
      tag: offer.tag,
      image_url: offer.image_url,
    })
    setEditing(offer.id)
  }

  const handleDelete = async (id) => {
    if (!confirm('تأكيد حذف هذا العرض؟')) return
    try {
      await api.deleteOffer(id)
      fetchData()
    } catch (err) {
      alert(err.message)
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    try {
      const result = await api.uploadImage(file)
      setForm((prev) => ({ ...prev, image_url: result.url }))
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div>
      <h1 className="text-display-lg font-display-lg text-on-surface mb-6 animate-fade-down">
        إدارة العروض
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-surface-container-lowest rounded-xl shadow-ambient p-6 mb-6 animate-fade-up"
      >
        <h2 className="text-headline-md font-headline-md text-on-surface mb-4">
          {editing ? 'تعديل عرض' : 'إضافة عرض جديد'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            aria-label="العنوان (إنجليزي)"
            placeholder="العنوان (إنجليزي)"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            className={fieldClass}
            required
          />
          <input
            aria-label="العنوان (عربي)"
            placeholder="العنوان (عربي)"
            value={form.title_ar}
            onChange={(e) => setForm((f) => ({ ...f, title_ar: e.target.value }))}
            className={fieldClass}
            required
          />
          <input
            aria-label="الوصف"
            placeholder="الوصف"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className={fieldClass}
          />
          <input
            aria-label="السعر"
            placeholder="السعر (مثل: 25.00 JOD)"
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
            className={fieldClass}
          />
          <input
            aria-label="الوسم"
            placeholder="الوسم (مثل: الأكثر طلباً)"
            value={form.tag}
            onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value }))}
            className={fieldClass}
          />
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <input
                aria-label="رفع صورة"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="text-body-sm text-on-surface-variant file:mr-2 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-primary/10 file:text-primary file:font-body-sm file:text-body-sm file:transition-all duration-160 file:active:scale-[0.97] cursor-pointer"
              />
              {form.image_url && (
                <img
                  src={form.image_url}
                  className="w-12 h-12 object-cover rounded-lg"
                  alt="صورة مصغرة للعرض"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              )}
            </div>
            <input
              aria-label="رابط الصورة"
              placeholder="أو أدخل رابط الصورة مباشرة"
              value={form.image_url}
              onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
              className={fieldClass}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-tertiary text-on-tertiary font-label-caps text-label-caps px-6 py-3 rounded-xl shadow-ambient transition-transform duration-160 ease-out-strong active:scale-[0.97]"
          >
            {editing ? 'تحديث' : 'إضافة'}
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => {
                setForm(emptyForm)
                setEditing(null)
              }}
              className="bg-surface-container text-on-surface font-label-caps text-label-caps px-6 py-3 rounded-xl transition-transform duration-160 ease-out-strong active:scale-[0.97]"
            >
              إلغاء
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : offers.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-xl shadow-ambient p-8 text-center animate-fade-in">
          <p className="text-on-surface-variant font-body-base text-body-base">لا توجد عروض بعد</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {offers.map((offer, i) => (
            <div
              key={offer.id}
              className="bg-surface-container-lowest rounded-xl shadow-ambient p-4 flex gap-4 transition-transform duration-200 ease-out-strong hover:-translate-y-1 hover:shadow-ambient-hover animate-scale-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {offer.image_url && (
                <img
                  src={offer.image_url}
                  alt={offer.title_ar}
                  className="w-24 h-24 object-cover rounded-lg flex-shrink-0 transition-transform duration-160 ease-out-strong hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              )}
              <div className="flex-1">
                <h3 className="font-headline-md text-on-surface mb-1">{offer.title_ar}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-1">
                  {offer.title}
                </p>
                {offer.tag && (
                  <span className="text-label-caps font-label-caps text-secondary bg-secondary-container px-2 py-1 rounded-full">
                    {offer.tag}
                  </span>
                )}
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEdit(offer)}
                    className="text-primary font-body-sm hover:underline transition-colors duration-160 active:opacity-60"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(offer.id)}
                    className="text-error font-body-sm hover:underline transition-colors duration-160 active:opacity-60"
                  >
                    حذف
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OffersManager
