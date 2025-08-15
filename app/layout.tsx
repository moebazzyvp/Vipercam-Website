import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AIChatBubble from "@/components/ai-chat-bubble"
import ErrorBoundary from "@/components/error-boundary"
import { SWRConfig } from "swr"
import { swrConfig } from "@/lib/swr-config"
import { cn } from "@/lib/utils"
import { ChatProvider } from "@/context/ChatContext"
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://vipercam.net"),
  title: "Vipercam - Professional Security Camera Systems",
  description:
    "Professional security camera systems, installation, and 24/7 monitoring services. Protect your business with advanced surveillance technology.",
  keywords: "security cameras, surveillance systems, CCTV, business security, monitoring services",
  authors: [{ name: "Vipercam" }],
  creator: "Vipercam",
  publisher: "Vipercam",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vipercam.net",
    title: "Vipercam - Professional Security Camera Systems",
    description: "Professional security camera systems, installation, and 24/7 monitoring services.",
    siteName: "Vipercam",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vipercam - Professional Security Camera Systems",
    description: "Professional security camera systems, installation, and 24/7 monitoring services.",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.variable, poppins.variable, "font-sans antialiased")}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
          <SWRConfig value={swrConfig}>
            <ChatProvider>
              <ErrorBoundary>
                <div className="min-h-screen bg-background text-foreground">
                  <Header />
                  <main>{children}</main>
                  <Footer />
                  <AIChatBubble />
                </div>
              </ErrorBoundary>
            </ChatProvider>
          </SWRConfig>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
