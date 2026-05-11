import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { auth } from '../services/auth'

const TOKEN_REFRESH_MS = 4 * 60 * 1000

export default function TokenSync({ children }) {
  const { getToken, isSignedIn } = useAuth()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!isSignedIn) {
      auth.setToken(null)
      setReady(true)
      return
    }
    let cancelled = false
    const sync = async () => {
      const token = await getToken()
      if (!cancelled) {
        if (token) auth.setToken(token)
        setReady(true)
      }
    }
    sync()
    const id = setInterval(sync, TOKEN_REFRESH_MS)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [isSignedIn, getToken])

  if (!ready) return null
  return children
}
