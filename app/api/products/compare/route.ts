import { NextRequest, NextResponse } from "next/server"
import { products } from "@/lib/product-data"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productIds } = body

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json(
        { error: "Product IDs array is required" },
        { status: 400 }
      )
    }

    // Limit to 4 products for comparison
    const limitedProductIds = productIds.slice(0, 4)
    
    // Find products by IDs
    const productsToCompare = products.filter(p => limitedProductIds.includes(p.id))

    if (productsToCompare.length === 0) {
      return NextResponse.json(
        { error: "No valid products found for comparison" },
        { status: 404 }
      )
    }

    // Generate comparison data
    const comparisonData = {
      products: productsToCompare,
      specifications: {
        resolution: productsToCompare.map(p => p.specifications.resolution),
        nightVision: productsToCompare.map(p => p.specifications.nightVision),
        weatherRating: productsToCompare.map(p => p.specifications.weatherRating),
        connectivity: productsToCompare.map(p => p.specifications.connectivity),
        storage: productsToCompare.map(p => p.specifications.storage),
        dimensions: productsToCompare.map(p => p.specifications.dimensions),
        weight: productsToCompare.map(p => p.specifications.weight),
        powerRequirement: productsToCompare.map(p => p.specifications.powerRequirement),
        warranty: productsToCompare.map(p => p.specifications.warranty),
      },
      features: {
        resolution: productsToCompare.map(p => p.resolution),
        lensType: productsToCompare.map(p => p.lensType),
        features: productsToCompare.map(p => p.features),
        filterFeatures: productsToCompare.map(p => p.filterFeatures),
      }
    }

    return NextResponse.json({
      success: true,
      data: comparisonData
    })
  } catch (error) {
    console.error("Product comparison API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 