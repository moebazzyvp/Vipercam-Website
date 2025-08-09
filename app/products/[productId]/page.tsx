import { notFound } from "next/navigation"
import type { Metadata } from "next"
import ProductDetailClient from "./ProductDetailClient"
import { products } from "@/lib/product-data"

interface ProductPageProps {
  params: {
    productId: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const productId = params.productId
  const product = products.find((p) => p.id === productId)

  if (!product) {
    return {
      title: "Product Not Found - Vipercam",
      description: "The requested product could not be found.",
    }
  }

  return {
    title: `${product.displayName} - Professional Surveillance Camera | Vipercam`,
    description: product.description,
    keywords: [
      product.displayName,
      product.type,
      "surveillance camera",
      "security camera",
      "Vipercam",
      ...product.features.slice(0, 3),
    ].join(", "),
    openGraph: {
      title: `${product.displayName} - Vipercam`,
      description: product.description,
      images: [product.image],
      type: "website",
    },
  }
}

export async function generateStaticParams() {
  return products.map((product) => ({
    productId: product.id,
  }))
}

export default async function ProductPage({ params }: ProductPageProps) {
  const productId = params.productId
  const product = products.find((p) => p.id === productId)

  if (!product) {
    notFound()
  }

  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.type === product.type || p.category === product.category))
    .slice(0, 3)

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />
}
