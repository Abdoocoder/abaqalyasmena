import { useState, useEffect } from 'react'
import { api } from '../../services/api'
import { RowSkeleton } from '../../components/Skeleton'

const emptyForm = {
  category_id: '',
  name: '',
  name_ar: '',
  brand: '',
  price: '',
  old_price: '',
  discount: '',
  image_url: '',
}

const fieldClass =
  'px-4 py-3 rounded-xl border border-surface-variant bg-surface-container-low text-on-surface font-body-base text-body-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all duration-160'

const ProductsManager = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchData = () => {
    Promise.all([api.getProducts(), api.getCategories()])
      .then(([p, c]) => {
        setProducts(p)
        setCategories(c)
      })
      .catch(() => console.warn('ProductsManager: failed to load'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = {
        ...form,
        price: parseFloat(form.price),
        old_price: form.old_price ? parseFloat(form.old_price) : null,
      }
      if (editing) {
        await api.updateProduct(editing, data)
      } else {
        await api.createProduct(data)
      }
      setForm(emptyForm)
      setEditing(null)
      fetchData()
    } catch (err) {
      alert(err.message)
    }
  }

  const handleEdit = (p) => {
    setForm({
      category_id: p.category_id,
      name: p.name,
      name_ar: p.name_ar,
      brand: p.brand,
      price: String(p.price),
      old_price: p.old_price ? String(p.old_price) : '',
      discount: p.discount || '',
      image_url: p.image_url,
    })
    setEditing(p.id)
  }

  const handleDelete = async (id) => {
    if (!confirm('تأكيد حذف هذا المنتج؟')) return
    try {
      await api.deleteProduct(id)
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
        إدارة المنتجات
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-surface-container-lowest rounded-xl shadow-ambient p-6 mb-6 animate-fade-up"
      >
        <h2 className="text-headline-md font-headline-md text-on-surface mb-4">
          {editing ? 'تعديل منتج' : 'إضافة منتج جديد'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <select
            aria-label="اختر التصنيف"
            value={form.category_id}
            onChange={(e) => setForm((f) => ({ ...f, category_id: e.target.value }))}
            className={fieldClass}
            required
          >
            <option value="">اختر التصنيف</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name_ar}
              </option>
            ))}
          </select>
          <input
            aria-label="الاسم (إنجليزي)"
            placeholder="الاسم (إنجليزي)"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className={fieldClass}
            required
          />
          <input
            aria-label="الاسم (عربي)"
            placeholder="الاسم (عربي)"
            value={form.name_ar}
            onChange={(e) => setForm((f) => ({ ...f, name_ar: e.target.value }))}
            className={fieldClass}
            required
          />
          <input
            aria-label="الماركة"
            placeholder="الماركة"
            value={form.brand}
            onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))}
            className={fieldClass}
          />
          <input
            aria-label="السعر (JOD)"
            placeholder="السعر (JOD)"
            type="number"
            step="0.01"
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
            className={fieldClass}
            required
          />
          <input
            aria-label="السعر القديم"
            placeholder="السعر القديم"
            type="number"
            step="0.01"
            value={form.old_price}
            onChange={(e) => setForm((f) => ({ ...f, old_price: e.target.value }))}
            className={fieldClass}
          />
          <input
            aria-label="الخصم"
            placeholder="الخصم (مثل: -15%)"
            value={form.discount}
            onChange={(e) => setForm((f) => ({ ...f, discount: e.target.value }))}
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
                  alt=""
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
        <div className="bg-surface-container-lowest rounded-xl shadow-ambient overflow-hidden">
          <RowSkeleton count={5} />
        </div>
      ) : products.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-xl shadow-ambient p-8 text-center animate-fade-in">
          <p className="text-on-surface-variant font-body-base text-body-base">
            لا توجد منتجات بعد
          </p>
        </div>
      ) : (
        <div className="bg-surface-container-lowest rounded-xl shadow-ambient overflow-hidden">
          {/* Mobile card list */}
          <div className="md:hidden divide-y divide-surface-variant">
            {products.map((p, i) => (
              <div
                key={p.id}
                className="flex items-center gap-3 p-4 animate-fade-in"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                {p.image_url ? (
                  <img
                    src={p.image_url}
                    className="w-14 h-14 object-cover rounded-xl flex-shrink-0"
                    alt="صورة المنتج"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                ) : (
                  <div className="w-14 h-14 bg-surface-container rounded-xl flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-body-base text-body-base text-on-surface font-medium truncate">
                    {p.name_ar}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                    <span className="text-primary font-bold font-body-sm text-body-sm">
                      {parseFloat(p.price).toFixed(2)} JOD
                    </span>
                    {p.brand && (
                      <span className="text-on-surface-variant font-body-sm text-body-sm">· {p.brand}</span>
                    )}
                  </div>
                  {p.category_name_ar && (
                    <span className="text-on-surface-variant font-label-caps text-label-caps text-xs mt-0.5 block">
                      {p.category_name_ar}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(p)}
                    className="text-primary font-label-caps text-xs px-3 py-1.5 rounded-lg bg-primary/8 active:scale-[0.97] transition-transform duration-160"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-error font-label-caps text-xs px-3 py-1.5 rounded-lg bg-error/8 active:scale-[0.97] transition-transform duration-160"
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-surface-container text-on-surface font-body-sm text-body-sm">
                  <th scope="col" className="text-right p-4 font-medium">الصورة</th>
                  <th scope="col" className="text-right p-4 font-medium">الاسم</th>
                  <th scope="col" className="text-right p-4 font-medium">التصنيف</th>
                  <th scope="col" className="text-right p-4 font-medium">السعر</th>
                  <th scope="col" className="text-right p-4 font-medium">الماركة</th>
                  <th scope="col" className="text-left p-4 font-medium">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr
                    key={p.id}
                    className="border-t border-surface-variant hover:bg-surface-container-low/50 transition-colors duration-160 animate-fade-in"
                    style={{ animationDelay: `${i * 30}ms` }}
                  >
                    <td className="p-4">
                      {p.image_url ? (
                        <img
                          src={p.image_url}
                          className="w-12 h-12 object-cover rounded-lg transition-transform duration-160 ease-out-strong hover:scale-110"
                          alt="صورة مصغرة للمنتج"
                          onError={(e) => { e.target.style.display = 'none' }}
                        />
                      ) : (
                        <div className="w-12 h-12 bg-surface-container rounded-lg" />
                      )}
                    </td>
                    <td className="p-4 font-body-sm text-body-sm text-on-surface">{p.name_ar}</td>
                    <td className="p-4 font-body-sm text-body-sm text-on-surface-variant">{p.category_name_ar}</td>
                    <td className="p-4 font-body-sm text-body-sm text-on-surface font-medium">
                      {parseFloat(p.price).toFixed(2)} JOD
                    </td>
                    <td className="p-4 font-body-sm text-body-sm text-on-surface-variant">{p.brand}</td>
                    <td className="p-4 text-left">
                      <button
                        onClick={() => handleEdit(p)}
                        className="text-primary font-body-sm hover:underline ml-3 transition-colors duration-160 active:opacity-60"
                      >
                        تعديل
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-error font-body-sm hover:underline transition-colors duration-160 active:opacity-60"
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductsManager
