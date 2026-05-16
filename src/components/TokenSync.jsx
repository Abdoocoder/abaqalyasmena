import { useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { auth } from '../services/auth'

export default function TokenSync({ children }) {
  const { getToken, isSignedIn } = useAuth()

  useEffect(() => {
    auth.setTokenGetter(isSignedIn ? getToken : null)
  }, [isSignedIn, getToken])

  return children
}
