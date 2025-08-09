import type { Metadata } from "next"
import SupportClientPage from "./SupportClientPage"

export const metadata: Metadata = {
  title: "Support | Vipercam",
  description:
    "Get help with your Vipercam security system. Find FAQs, downloads, and contact support.",
}

export default function SupportPage() {
  return <SupportClientPage />
}
