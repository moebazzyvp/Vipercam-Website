import type { Metadata } from "next"
import MonitoringSignupForm from "./MonitoringSignupForm"

export const metadata: Metadata = {
  title: "Sign Up for 24/7 Monitoring | Vipercam",
  description: "Sign up for professional 24/7 monitoring services. Secure payment processing and instant activation.",
}

export default function MonitoringSignupPage() {
  return <MonitoringSignupForm />
}
