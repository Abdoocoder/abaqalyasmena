import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useAuth, useUser } from '@clerk/clerk-react'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import TokenSync from './components/TokenSync'
import Home from './pages/Home'
import Categories from './pages/Categories'
import CategoryPage from './pages/CategoryPage'
import Contact from './pages/Contact'
import Offers from './pages/Offers'
import SearchPage from './pages/SearchPage'
import NotFound from './pages/NotFound'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import Login from './pages/admin/Login'
import ProductsManager from './pages/admin/ProductsManager'
import CategoriesManager from './pages/admin/CategoriesManager'
import OffersManager from './pages/admin/OffersManager'
import OrdersManager from './pages/admin/OrdersManager'
import ContactSettings from './pages/admin/ContactSettings'

const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS || '').split(',').map(e => e.trim()).filter(Boolean)

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth()
  const { user } = useUser()
  if (!isLoaded) return null
  if (!isSignedIn) return <Navigate to="/admin/login" replace />
  const userEmail = user?.primaryEmailAddress?.emailAddress
  if (ADMIN_EMAILS.length > 0 && userEmail && !ADMIN_EMAILS.includes(userEmail)) {
    return <Navigate to="/" replace />
  }
  return <><TokenSync />{children}</>
}

function App() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  if (isAdmin) {
    return (
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/products" element={<ProtectedRoute><AdminLayout><ProductsManager /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/categories" element={<ProtectedRoute><AdminLayout><CategoriesManager /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/offers" element={<ProtectedRoute><AdminLayout><OffersManager /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/orders" element={<ProtectedRoute><AdminLayout><OrdersManager /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/contact" element={<ProtectedRoute><AdminLayout><ContactSettings /></AdminLayout></ProtectedRoute>} />
        <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
      </Routes>
    )
  }

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  )
}

export default App
