import type { Metadata } from "next"
import AboutClientPage from "./AboutClientPage"

export const metadata: Metadata = {
  title: "About Us | Vipercam",
  description: "Learn about Vipercam's commitment to providing professional security camera solutions and surveillance systems.",
}

export default function AboutPage() {
  return <AboutClientPage />
}
