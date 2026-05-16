import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../services/api'

const ContactContext = createContext({ contact: null, loading: true })

export function ContactProvider({ children }) {
  const [contact, setContact] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .getContact()
      .then(setContact)
      .catch(() => console.warn('ContactContext: failed to load'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <ContactContext.Provider value={{ contact, loading }}>
      {children}
    </ContactContext.Provider>
  )
}

export function useContact() {
  return useContext(ContactContext).contact
}

export function useContactLoading() {
  return useContext(ContactContext).loading
}
