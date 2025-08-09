import useSWR from "swr"

interface CompanyStats {
  yearsExperience: string
  systemsInstalled: string
  supportAvailable: string
  customerSatisfaction: string
}

interface TeamMember {
  name: string
  role: string
  image: string
  description: string
}

interface CompanyValue {
  title: string
  description: string
}

interface Milestone {
  year: string
  title: string
  description: string
}

interface ContactInfo {
  phone: string
  email: string
  location: string
}

interface CompanyData {
  stats: CompanyStats
  teamMembers: TeamMember[]
  companyValues: CompanyValue[]
  milestones: Milestone[]
  contactInfo: ContactInfo
}

interface CompanyResponse {
  success: boolean
  data: CompanyData
  error?: string
}

const fetcher = async (url: string): Promise<CompanyResponse> => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Failed to fetch company data")
  }
  return response.json()
}

export function useCompany() {
  const { data, error, isLoading, mutate } = useSWR<CompanyResponse>(
    "/api/company",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 300000, // 5 minutes
    }
  )

  return {
    companyData: data?.data,
    isLoading,
    isError: error,
    mutate,
  }
} 