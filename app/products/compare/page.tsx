import type { Metadata } from "next"
import ProductComparison from "@/components/product-comparison"
import { products } from "@/lib/product-data"

export const metadata: Metadata = {
  title: "Product Comparison | Vipercam",
  description:
    "Compare our security camera systems and surveillance products side by side to find the perfect solution for your needs.",
}

export default function ProductComparisonPage() {
  // Use actual products from the product data
  const sampleProducts = products.slice(0, 3) // Take first 3 products for comparison

  return (
    <>
      {/* Hero Banner */}
      <section className="relative py-20 overflow-hidden dark:bg-gray-900 bg-gray-100">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent transform -skew-y-6"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 pt-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Product <span className="dark:text-red-500 text-red-600">Comparison</span>
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Compare our products side by side to find the perfect security solution for your needs.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Tool */}
      <section className="py-16 dark:bg-black bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Sample Product Comparison</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Select products from the main products page to compare them side by side.
            </p>
          </div>
          
          {/* Display sample products */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {sampleProducts.map((product) => (
              <div key={product.id} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">{product.displayName}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{product.description}</p>
                <div className="text-sm">
                  <p><strong>Resolution:</strong> {product.resolution}</p>
                  <p><strong>Type:</strong> {product.type}</p>
                  <p><strong>Features:</strong> {product.features.slice(0, 3).join(", ")}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">
              To compare products, go to the <a href="/products" className="text-red-500 hover:underline">products page</a> and use the comparison feature.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
