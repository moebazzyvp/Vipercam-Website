import useSWR from 'swr'
import { fetcher, productEndpoints } from '@/lib/swr-config'
import type { Product } from '@/lib/product-data'

// Hook for fetching all products
export function useProducts(params?: {
  category?: string
  type?: string
  resolution?: string
  lensType?: string
  feature?: string
  search?: string
  limit?: number
  offset?: number
}) {
  const queryParams = new URLSearchParams()
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value && value !== 'all') {
        queryParams.append(key, value)
      }
    })
  }
  
  const url = `${productEndpoints.list}?${queryParams.toString()}`
  
  const { data, error, isLoading, mutate } = useSWR(
    url,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000, // 5 minutes for product data
    }
  )
  
  return {
    products: data?.data?.products || [],
    pagination: data?.data?.pagination,
    isLoading,
    isError: error,
    mutate,
  }
}

// Hook for fetching a single product
export function useProduct(id: string) {
  const { data, error, isLoading, mutate } = useSWR(
    id ? productEndpoints.detail(id) : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000, // 5 minutes for product data
    }
  )
  
  return {
    product: data?.data?.product as Product | undefined,
    relatedProducts: data?.data?.relatedProducts || [],
    isLoading,
    isError: error,
    mutate,
  }
}

// Hook for product comparison
export function useProductComparison(productIds: string[]) {
  const { data, error, isLoading, mutate } = useSWR(
    productIds.length > 0 ? [productEndpoints.compare, productIds] : null,
    ([url, ids]) => fetcher(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productIds: ids }),
    }),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute for comparison data
    }
  )
  
  return {
    comparisonData: data?.data,
    isLoading,
    isError: error,
    mutate,
  }
}

// Hook for featured products
export function useFeaturedProducts() {
  const { products, isLoading, isError } = useProducts({
    limit: 6,
  })
  
  const featuredProducts = products.filter(product => product.isFeatured)
  
  return {
    featuredProducts,
    isLoading,
    isError,
  }
}

// Hook for new products
export function useNewProducts() {
  const { products, isLoading, isError } = useProducts({
    limit: 6,
  })
  
  const newProducts = products.filter(product => product.isNew)
  
  return {
    newProducts,
    isLoading,
    isError,
  }
} 