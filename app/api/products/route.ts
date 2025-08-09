import { NextRequest, NextResponse } from "next/server"
import { products } from "@/lib/product-data"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Get filter parameters
    const category = searchParams.get('category')
    const type = searchParams.get('type')
    const resolution = searchParams.get('resolution')
    const lensType = searchParams.get('lensType')
    const feature = searchParams.get('feature')
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Filter products based on parameters
    let filteredProducts = products

    // Category filter
    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter(product => product.type === category)
    }

    // Type filter
    if (type && type !== 'all') {
      filteredProducts = filteredProducts.filter(product => product.type === type)
    }

    // Resolution filter
    if (resolution && resolution !== 'all') {
      filteredProducts = filteredProducts.filter(product => product.resolution === resolution)
    }

    // Lens type filter
    if (lensType && lensType !== 'all') {
      filteredProducts = filteredProducts.filter(product => product.lensType === lensType)
    }

    // Feature filter
    if (feature && feature !== 'all') {
      filteredProducts = filteredProducts.filter(product => 
        product.filterFeatures.includes(feature)
      )
    }

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase()
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.displayName.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.resolution.toLowerCase().includes(searchLower) ||
        product.filterFeatures.some(feature => feature.toLowerCase().includes(searchLower))
      )
    }

    // Apply pagination
    const totalCount = filteredProducts.length
    const paginatedProducts = filteredProducts.slice(offset, offset + limit)

    return NextResponse.json({
      success: true,
      data: {
        products: paginatedProducts,
        pagination: {
          total: totalCount,
          limit,
          offset,
          hasMore: offset + limit < totalCount
        }
      }
    })
  } catch (error) {
    console.error("Products API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 