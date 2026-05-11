import { useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { auth } from '../services/auth'

const TOKEN_REFRESH_MS = 4 * 60 * 1000

export default function TokenSync() {
  const { getToken, isSignedIn } = useAuth()

  useEffect(() => {
    if (!isSignedIn) {
      auth.setToken(null)
      return
    }
    const sync = async () => {
      const token = await getToken()
      if (token) auth.setToken(token)
    }
    sync()
    const id = setInterval(sync, TOKEN_REFRESH_MS)
    return () => clearInterval(id)
  }, [isSignedIn, getToken])

  return null
}
