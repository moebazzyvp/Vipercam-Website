import { SWRConfiguration } from 'swr'

export const swrConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 60000, // 1 minute
  errorRetryCount: 3,
  errorRetryInterval: 5000, // 5 seconds
}

// API base URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

// Fetcher function for SWR
export const fetcher = async (url: string) => {
  const response = await fetch(url)
  
  if (!response.ok) {
    const error = new Error('An error occurred while fetching the data.')
    error.message = await response.text()
    throw error
  }
  
  return response.json()
}

// Product API endpoints
export const productEndpoints = {
  list: '/api/products',
  detail: (id: string) => `/api/products/${id}`,
  compare: '/api/products/compare',
} as const

// Form submission endpoints
export const formEndpoints = {
  contact: '/api/contact',
  monitoringSignup: '/api/monitoring-signup',
} as const 