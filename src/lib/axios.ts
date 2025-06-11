// import axios from 'axios'
// export const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL
// })

// lib/axios.ts
import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token') // ou de um contexto
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
