import type { Product } from "@/lib/product-data"

interface ProductSchemaProps {
  product: Product
}

export function ProductSchema({ product }: ProductSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.displayName,
    "description": product.description,
    "image": product.image,
    "brand": {
      "@type": "Brand",
      "name": "Vipercam"
    },
    "category": product.type,
    "offers": {
      "@type": "Offer",
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "priceCurrency": "USD",
      "price": "0",
      "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      "seller": {
        "@type": "Organization",
        "name": "Vipercam"
      }
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Resolution",
        "value": product.resolution
      },
      {
        "@type": "PropertyValue",
        "name": "Lens Type",
        "value": product.lensType
      },
      {
        "@type": "PropertyValue",
        "name": "Features",
        "value": product.features.join(", ")
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
} 