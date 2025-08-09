import useSWR from "swr"

interface ContactInfo {
  phone: string
  emergencyPhone: string
  email: string
  hours: string
  emergencyHours: string
}

interface FAQ {
  question: string
  answer: string
}

interface Download {
  name: string
  description: string
  size: string
  type: string
  platform: string
}

interface SupportData {
  contactInfo: ContactInfo
  faqs: FAQ[]
  downloads: Download[]
}

interface SupportResponse {
  success: boolean
  data: SupportData
  error?: string
}

const fetcher = async (url: string): Promise<SupportResponse> => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Failed to fetch support data")
  }
  return response.json()
}

export function useSupport() {
  const { data, error, isLoading, mutate } = useSWR<SupportResponse>(
    "/api/support",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 300000, // 5 minutes
    }
  )

  return {
    supportData: data?.data,
    isLoading,
    isError: error,
    mutate,
  }
} 