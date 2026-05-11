import { auth } from './auth'

const API_BASE = '/api'

const headers = () => ({
  'Content-Type': 'application/json',
  ...(auth.getToken() ? { Authorization: `Bearer ${auth.getToken()}` } : {}),
})

async function request(url, options = {}) {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: headers(),
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error || 'Request failed')
  }
  return res.json()
}

export const api = {
  getCategories: () => request('/categories'),
  getCategory: (id) => request(`/categories/${id}`),
  createCategory: (data) =>
    request('/categories', { method: 'POST', body: JSON.stringify(data) }),
  updateCategory: (id, data) =>
    request(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCategory: (id) =>
    request(`/categories/${id}`, { method: 'DELETE' }),

  getProducts: (params = {}) => {
    const q = new URLSearchParams(params).toString()
    return request(`/products${q ? `?${q}` : ''}`)
  },
  getProduct: (id) => request(`/products/${id}`),
  createProduct: (data) =>
    request('/products', { method: 'POST', body: JSON.stringify(data) }),
  updateProduct: (id, data) =>
    request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProduct: (id) =>
    request(`/products/${id}`, { method: 'DELETE' }),

  getOffers: () => request('/offers'),
  getOffer: (id) => request(`/offers/${id}`),
  createOffer: (data) =>
    request('/offers', { method: 'POST', body: JSON.stringify(data) }),
  updateOffer: (id, data) =>
    request(`/offers/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteOffer: (id) =>
    request(`/offers/${id}`, { method: 'DELETE' }),

  getContact: () => request('/contact'),
  updateContact: (data) =>
    request('/contact', { method: 'PUT', body: JSON.stringify(data) }),

  getOrders: () => request('/orders'),
  createOrder: (data) =>
    request('/orders', { method: 'POST', body: JSON.stringify(data) }),
  deleteOrder: (id) =>
    request(`/orders/${id}`, { method: 'DELETE' }),

  uploadImage: async (file) => {
    const formData = new FormData()
    formData.append('image', file)
    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${auth.getToken()}` },
      body: formData,
    })
    if (!res.ok) throw new Error('Upload failed')
    return res.json()
  },
}
