import { useState, useEffect } from 'react'
import { api } from '../../services/api'
import Skeleton from '../../components/Skeleton'

const fieldClass = "w-full px-4 py-3 rounded-xl border border-surface-variant bg-surface-container-low text-on-surface font-body-base text-body-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all duration-160"

const ContactSettings = () => {
  const [form, setForm] = useState({
    phone: '', whatsapp: '', address: '', address_ar: '',
    hours: '', hours_ar: '', facebook: '', maps_query: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  useEffect(() => {
    api.getContact().then(data => {
      setForm({
        phone: data.phone || '',
        whatsapp: data.whatsapp || '',
        address: data.address || '',
        address_ar: data.address_ar || '',
        hours: data.hours || '',
        hours_ar: data.hours_ar || '',
        facebook: data.facebook || '',
        maps_query: data.maps_query || '',
      })
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')
    setMessageType('')
    try {
      await api.updateContact(form)
      setMessage('تم حفظ البيانات بنجاح')
      setMessageType('success')
    } catch (err) {
      setMessage('فشل الحفظ: ' + err.message)
      setMessageType('error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div>
      <h1 className="text-display-lg font-display-lg text-on-surface mb-6 animate-fade-down">بيانات الاتصال</h1>
      <div className="bg-surface-container-lowest rounded-xl shadow-ambient p-6 max-w-2xl animate-fade-up">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 30}ms` }}>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <h1 className="text-display-lg font-display-lg text-on-surface mb-6 animate-fade-down">بيانات الاتصال</h1>

      <form onSubmit={handleSubmit} className="bg-surface-container-lowest rounded-xl shadow-ambient p-6 max-w-2xl animate-fade-up">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-body-sm text-body-sm text-on-surface mb-1">رقم الهاتف</label>
            <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className={fieldClass} />
          </div>
          <div>
            <label className="block font-body-sm text-body-sm text-on-surface mb-1">رقم واتساب (بدون +)</label>
            <input value={form.whatsapp} onChange={e => setForm(f => ({ ...f, whatsapp: e.target.value }))} className={fieldClass} />
          </div>
          <div>
            <label className="block font-body-sm text-body-sm text-on-surface mb-1">العنوان (إنجليزي)</label>
            <input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} className={fieldClass} />
          </div>
          <div>
            <label className="block font-body-sm text-body-sm text-on-surface mb-1">العنوان (عربي)</label>
            <input value={form.address_ar} onChange={e => setForm(f => ({ ...f, address_ar: e.target.value }))} className={fieldClass} />
          </div>
          <div>
            <label className="block font-body-sm text-body-sm text-on-surface mb-1">ساعات العمل (إنجليزي)</label>
            <input value={form.hours} onChange={e => setForm(f => ({ ...f, hours: e.target.value }))} className={fieldClass} />
          </div>
          <div>
            <label className="block font-body-sm text-body-sm text-on-surface mb-1">ساعات العمل (عربي)</label>
            <input value={form.hours_ar} onChange={e => setForm(f => ({ ...f, hours_ar: e.target.value }))} className={fieldClass} />
          </div>
          <div>
            <label className="block font-body-sm text-body-sm text-on-surface mb-1">رابط فيسبوك</label>
            <input value={form.facebook} onChange={e => setForm(f => ({ ...f, facebook: e.target.value }))} className={fieldClass} />
          </div>
          <div>
            <label className="block font-body-sm text-body-sm text-on-surface mb-1">استعلام خرائط (maps_query)</label>
            <input value={form.maps_query} onChange={e => setForm(f => ({ ...f, maps_query: e.target.value }))} className={fieldClass} />
          </div>
        </div>

        {message && (
          <div className={`mb-4 px-4 py-3 rounded-xl text-body-sm animate-fade-in ${
            messageType === 'success' ? 'bg-whatsapp/10 text-whatsapp' : 'bg-error-container text-on-error-container'
          }`}>
            {message}
          </div>
        )}

        <button type="submit" disabled={saving}
          className="bg-tertiary text-on-tertiary font-label-caps text-label-caps px-8 py-4 rounded-xl shadow-ambient transition-transform duration-160 ease-out-strong active:scale-[0.97] disabled:opacity-50">
          {saving ? 'جاري الحفظ...' : 'حفظ البيانات'}
        </button>
      </form>
    </div>
  )
}

export default ContactSettings
