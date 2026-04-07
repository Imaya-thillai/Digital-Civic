import axios from 'axios'

const BASE = import.meta.env.VITE_API_URL || 'https://digital-civic-1tji.onrender.com/api'

const api = axios.create({
  baseURL: BASE,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
