import type { Metadata } from "next"
import ServicesClientPage from "./ServicesClientPage"

export const metadata: Metadata = {
  title: "Services | Vipercam",
  description: "Professional security camera installation, maintenance, monitoring, and cloud storage services.",
}

export default function ServicesPage() {
  return <ServicesClientPage />
}
