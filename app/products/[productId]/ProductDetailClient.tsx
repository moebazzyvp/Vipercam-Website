"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Shield, Eye, Zap, Clock, CheckCircle, Info, FileText, Settings, Monitor } from "lucide-react"
import type { Product } from "@/lib/product-data"
import { ProductSchema } from "@/components/product-schema"

interface ProductDetailClientProps {
  product: Product
  relatedProducts: Product[]
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [activeTab, setActiveTab] = useState("overview")

  const images = [
    product.image,
    product.image, // Placeholder for additional images
    product.image,
    product.image,
  ]

  const iconMap: Record<string, any> = {
    FileText,
    Monitor,
    Settings,
  }

  return (
    <div className="min-h-screen bg-vipercam-dark pt-20">
      <ProductSchema product={product} />
      {/* Product Hero */}
      <section className="py-12 bg-vipercam-gray-dark">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="space-y-4">
                <div className="aspect-square overflow-hidden rounded-lg bg-vipercam-gray">
                  <Image
                    src={images[selectedImage] || "/placeholder.svg"}
                    alt={product.displayName}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                        selectedImage === index ? "border-vipercam-red" : "border-vipercam-gray-light"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${product.displayName} view ${index + 1}`}
                        width={150}
                        height={150}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="border-vipercam-red text-vipercam-red">
                    {product.type.charAt(0).toUpperCase() + product.type.slice(1)}
                  </Badge>
                  {product.badge && <Badge className="bg-blue-600 text-white">{product.badge}</Badge>}
                  {product.isNew && <Badge className="bg-vipercam-red text-white">New</Badge>}
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">{product.displayName}</h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  {product.longDescription || product.description}
                </p>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-vipercam-red hover:bg-red-700 text-white flex-1" asChild>
                  <Link href="/contact">
                    <Info className="mr-2 h-5 w-5" />
                    Request Information
                  </Link>
                </Button>
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
                <span className="text-gray-400">
                  {product.inStock ? "Available for consultation" : "Contact for availability"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-16 bg-vipercam-dark">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-vipercam-gray">
              <TabsTrigger value="overview" className="data-[state=active]:bg-vipercam-red">
                Overview
              </TabsTrigger>
              <TabsTrigger value="specifications" className="data-[state=active]:bg-vipercam-red">
                Specifications
              </TabsTrigger>
              <TabsTrigger value="downloads" className="data-[state=active]:bg-vipercam-red">
                Downloads
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="bg-vipercam-gray/50 border-vipercam-gray-light">
                  <CardHeader>
                    <CardTitle className="text-white">Product Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      {product.longDescription || product.description}
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Resolution</span>
                        <span className="text-white font-medium">{product.specifications.resolution}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Night Vision</span>
                        <span className="text-white font-medium">{product.specifications.nightVision}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Weather Rating</span>
                        <span className="text-white font-medium">{product.specifications.weatherRating}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Power</span>
                        <span className="text-white font-medium">{product.specifications.powerRequirement}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-vipercam-gray/50 border-vipercam-gray-light">
                  <CardHeader>
                    <CardTitle className="text-white">Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Shield className="h-5 w-5 text-vipercam-red mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-white">Commercial Security</h4>
                          <p className="text-sm text-gray-400">
                            Perfect for retail stores, offices, and business facilities
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Eye className="h-5 w-5 text-vipercam-red mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-white">Perimeter Monitoring</h4>
                          <p className="text-sm text-gray-400">
                            Ideal for monitoring building perimeters and entry points
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Zap className="h-5 w-5 text-vipercam-red mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-white">Smart Analytics</h4>
                          <p className="text-sm text-gray-400">
                            Advanced detection and intelligent monitoring capabilities
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Clock className="h-5 w-5 text-vipercam-red mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-white">24/7 Operation</h4>
                          <p className="text-sm text-gray-400">Reliable continuous monitoring and recording</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-8">
              <Card className="bg-vipercam-gray/50 border-vipercam-gray-light">
                <CardHeader>
                  <CardTitle className="text-white">Technical Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-vipercam-red">Video Specifications</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Resolution</span>
                          <span className="text-white">{product.specifications.resolution}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Night Vision</span>
                          <span className="text-white">{product.specifications.nightVision}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Connectivity</span>
                          <span className="text-white">{product.specifications.connectivity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Storage</span>
                          <span className="text-white">{product.specifications.storage}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold text-vipercam-red">Physical Specifications</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Dimensions</span>
                          <span className="text-white">{product.specifications.dimensions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Weight</span>
                          <span className="text-white">{product.specifications.weight}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Weather Rating</span>
                          <span className="text-white">{product.specifications.weatherRating}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Power</span>
                          <span className="text-white">{product.specifications.powerRequirement}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Warranty</span>
                          <span className="text-white">{product.specifications.warranty}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="downloads" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {product.downloads.map((download, index) => {
                  const IconComponent = iconMap[download.type] || FileText
                  return (
                    <Card key={index} className="bg-vipercam-gray/50 border-vipercam-gray-light">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 rounded-lg bg-vipercam-red/10 flex items-center justify-center">
                            <IconComponent className="h-6 w-6 text-vipercam-red" />
                          </div>
                          <span className="text-xs text-gray-400 bg-vipercam-gray px-2 py-1 rounded">
                            {download.type}
                          </span>
                        </div>
                        <h3 className="font-semibold text-white mb-2">{download.name}</h3>
                        <p className="text-sm text-gray-400 mb-4">Technical documentation and resources</p>
                        <div className="flex items-center justify-end">
                          <a
                            href={download.url}
                            download
                            className="text-sm text-vipercam-red hover:underline flex items-center"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            View Document
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-vipercam-gray-dark">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-8">Related Products</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Card
                  key={relatedProduct.id}
                  className="bg-vipercam-gray/50 border-vipercam-gray-light group hover:border-vipercam-red/30 transition-colors"
                >
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.displayName}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-white mb-2">{relatedProduct.displayName}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{relatedProduct.description}</p>
                    <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                      <Link href={`/products/${relatedProduct.id}`}>Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
