import { SignIn } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'

const Login = () => {
  const { isSignedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isSignedIn) navigate('/admin', { replace: true })
  }, [isSignedIn, navigate])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8 animate-fade-down">
          <h1 className="text-display-lg font-display-lg text-on-surface mb-2">تسجيل الدخول</h1>
          <p className="text-body-base text-on-surface-variant">لوحة تحكم مكتبة عبق الياسمينة</p>
        </div>
        <div className="animate-fade-up" style={{ animationDelay: '100ms' }}>
          <SignIn
            routing="virtual"
            afterSignInUrl="/admin"
            signUpUrl="/admin/login"
          />
        </div>
      </div>
    </div>
  )
}

export default Login
