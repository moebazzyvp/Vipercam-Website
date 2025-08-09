import { NextRequest, NextResponse } from "next/server"
import { products } from "@/lib/product-data"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id
    
    // Find the product by ID
    const product = products.find(p => p.id === productId)
    
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }

    // Get related products (same category, different product)
    const relatedProducts = products
      .filter(p => p.type === product.type && p.id !== product.id)
      .slice(0, 4)

    return NextResponse.json({
      success: true,
      data: {
        product,
        relatedProducts
      }
    })
  } catch (error) {
    console.error("Product detail API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 