import { useState, useEffect } from 'react'
import Icon from './Icon'
import { useContact } from '../contexts/ContactContext'

const WhatsAppButton = ({
  productName,
  variant = 'primary',
  className = '',
  whatsapp: propWhatsapp,
}) => {
  const contextContact = useContact()
  const [fetchedWhatsapp, setFetchedWhatsapp] = useState('')

  const whatsapp = propWhatsapp || contextContact?.whatsapp || fetchedWhatsapp

  useEffect(() => {
    if (propWhatsapp || contextContact?.whatsapp) return
    fetch('/api/contact')
      .then((r) => r.json())
      .then((data) => setFetchedWhatsapp(data.whatsapp || ''))
      .catch(() => console.warn('WhatsAppButton: failed to load contact'))
  }, [propWhatsapp, contextContact])

  const message = productName
    ? encodeURIComponent(`مرحباً، أريد طلب: ${productName}`)
    : encodeURIComponent('مرحباً، أريد الاستفسار عن المنتجات')

  const link = whatsapp ? `https://wa.me/${whatsapp}?text=${message}` : '#'

  const baseStyles =
    'font-label-caps text-label-caps px-6 py-3 rounded-xl shadow-ambient flex items-center space-x-reverse space-x-2 transition-transform duration-160 ease-out-strong'

  const variants = {
    primary: 'bg-whatsapp text-white active:scale-[0.97]',
    secondary: 'bg-secondary-container text-on-secondary-container active:scale-[0.97]',
    outline:
      'bg-surface-container-lowest border border-whatsapp text-whatsapp hover:bg-whatsapp/5 active:scale-[0.97]',
  }

  if (!whatsapp) return null

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <Icon name="chat" className="w-[18px] h-[18px]" />
      <span>{productName ? 'اطلب عبر واتساب' : 'تواصل عبر واتساب'}</span>
    </a>
  )
}

export default WhatsAppButton
