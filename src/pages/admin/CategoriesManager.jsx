import { useState, useEffect } from 'react'
import { api } from '../../services/api'
import { CardSkeleton } from '../../components/Skeleton'

const emptyForm = { name: '', name_ar: '', tagline: '', image_url: '' }

const fieldClass = "px-4 py-3 rounded-xl border border-surface-variant bg-surface-container-low text-on-surface font-body-base text-body-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all duration-160"

const CategoriesManager = () => {
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchData = () => {
    setLoading(true)
    api.getCategories().then(setCategories).catch(() => {}).finally(() => setLoading(false))
  }

  useEffect(() => { fetchData() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editing) {
        await api.updateCategory(editing, form)
      } else {
        await api.createCategory(form)
      }
      setForm(emptyForm)
      setEditing(null)
      fetchData()
    } catch (err) { alert(err.message) }
  }

  const handleEdit = (cat) => {
    setForm({ name: cat.name, name_ar: cat.name_ar, tagline: cat.tagline, image_url: cat.image_url })
    setEditing(cat.id)
  }

  const handleDelete = async (id) => {
    if (!confirm('تأكيد حذف هذا التصنيف؟')) return
    try { await api.deleteCategory(id); fetchData() }
    catch (err) { alert(err.message) }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    try {
      const result = await api.uploadImage(file)
      setForm(prev => ({ ...prev, image_url: result.url }))
    } catch (err) { alert(err.message) }
  }

  return (
    <div>
      <h1 className="text-display-lg font-display-lg text-on-surface mb-6">إدارة التصنيفات</h1>

      <form onSubmit={handleSubmit} className="bg-surface-container-lowest rounded-xl shadow-ambient p-6 mb-6">
        <h2 className="text-headline-md font-headline-md text-on-surface mb-4">{editing ? 'تعديل تصنيف' : 'إضافة تصنيف جديد'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input placeholder="الاسم (إنجليزي)" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className={fieldClass} required />
          <input placeholder="الاسم (عربي)" value={form.name_ar} onChange={e => setForm(f => ({ ...f, name_ar: e.target.value }))}
            className={fieldClass} required />
          <input placeholder="الشعار (tagline)" value={form.tagline} onChange={e => setForm(f => ({ ...f, tagline: e.target.value }))}
            className={fieldClass} />
          <div className="flex gap-2 items-center">
            <input type="file" accept="image/*" onChange={handleImageUpload}
              className="text-body-sm text-on-surface-variant file:mr-2 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-primary/10 file:text-primary file:font-body-sm file:text-body-sm file:transition-all duration-160 file:active:scale-[0.97] cursor-pointer" />
            {form.image_url && <img src={form.image_url} className="w-12 h-12 object-cover rounded-lg" alt="" />}
          </div>
        </div>
        <div className="flex gap-2">
          <button type="submit" className="bg-tertiary text-on-tertiary font-label-caps text-label-caps px-6 py-3 rounded-xl shadow-ambient transition-transform duration-160 ease-out-strong active:scale-[0.97]">
            {editing ? 'تحديث' : 'إضافة'}
          </button>
          {editing && (
            <button type="button" onClick={() => { setForm(emptyForm); setEditing(null) }}
              className="bg-surface-container text-on-surface font-label-caps text-label-caps px-6 py-3 rounded-xl transition-transform duration-160 ease-out-strong active:scale-[0.97]">
              إلغاء
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : categories.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-xl shadow-ambient p-8 text-center animate-fade-in">
          <p className="text-on-surface-variant font-body-base text-body-base">لا توجد تصنيفات بعد</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <div key={cat.id} className="bg-surface-container-lowest rounded-xl shadow-ambient p-4 transition-transform duration-200 ease-out-strong hover:-translate-y-1 hover:shadow-ambient-hover" style={{ animationDelay: `${i * 50}ms` }}>
              {cat.image_url && <img src={cat.image_url} alt={cat.name_ar} className="w-full h-32 object-cover rounded-lg mb-3 transition-transform duration-160 ease-out-strong hover:scale-[1.02]" />}
              <h3 className="font-headline-md text-on-surface mb-1">{cat.name_ar}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-1">{cat.name}</p>
              {cat.tagline && <span className="text-label-caps font-label-caps text-secondary">{cat.tagline}</span>}
              <div className="flex gap-2 mt-3">
                <button onClick={() => handleEdit(cat)} className="text-primary font-body-sm hover:underline transition-colors duration-160 active:opacity-60">تعديل</button>
                <button onClick={() => handleDelete(cat.id)} className="text-error font-body-sm hover:underline transition-colors duration-160 active:opacity-60">حذف</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoriesManager
