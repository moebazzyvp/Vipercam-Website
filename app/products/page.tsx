import { Suspense } from "react"
import ProductClientPage from "./ProductClientPage"
import { allProducts } from "@/lib/product-data"

export const metadata = {
  title: "Security Camera Products | Vipercam",
  description:
    "Explore our comprehensive range of IP security cameras including Eyeball, Dome, Bullet, PTZ, and Fisheye cameras. Advanced AI detection, night vision, and weatherproof designs.",
  keywords:
    "security cameras, IP cameras, surveillance, CCTV, eyeball cameras, dome cameras, bullet cameras, PTZ cameras, AI detection, night vision",
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-vipercam-dark">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-vipercam-dark via-vipercam-gray to-vipercam-dark border-b border-vipercam-gray-light">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Professional Security Camera Solutions</h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Discover our comprehensive range of IP security cameras designed for every surveillance need. From compact
              eyeball cameras to powerful PTZ systems, each product features advanced AI detection, superior night
              vision, and weatherproof construction.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-vipercam-red rounded-full mr-2"></span>
                AI-Powered Detection
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-vipercam-red rounded-full mr-2"></span>
                4K Ultra HD Resolution
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-vipercam-red rounded-full mr-2"></span>
                Weatherproof Design
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-vipercam-red rounded-full mr-2"></span>
                Professional Installation
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12">
        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-vipercam-gray/30 rounded-lg p-6 animate-pulse">
                  <div className="aspect-[4/3] bg-vipercam-gray-light rounded mb-4" />
                  <div className="h-4 bg-vipercam-gray-light rounded mb-2" />
                  <div className="h-4 bg-vipercam-gray-light rounded w-3/4 mb-4" />
                  <div className="h-3 bg-vipercam-gray-light rounded mb-2" />
                  <div className="h-3 bg-vipercam-gray-light rounded w-2/3" />
                </div>
              ))}
            </div>
          }
        >
          <ProductClientPage products={allProducts} />
        </Suspense>
      </div>
    </div>
  )
}
