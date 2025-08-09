"use client"

import { useState } from "react"
import { X, Star, Download, Eye, Check, Minus } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Product } from "@/lib/product-data"
import Image from "next/image"

interface ProductComparisonProps {
  products: Product[]
  isOpen: boolean
  onClose: () => void
}

export default function ProductComparison({ products, isOpen, onClose }: ProductComparisonProps) {
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>([])
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  if (products.length === 0) return null

  // Handle scroll to show/hide scroll to top button and track progress
  const handleScroll = (event: any) => {
    const scrollTop = event.target.scrollTop
    const scrollHeight = event.target.scrollHeight
    const clientHeight = event.target.clientHeight
    const progress = Math.min((scrollTop / (scrollHeight - clientHeight)) * 100, 100)
    
    setShowScrollTop(scrollTop > 300)
    setScrollProgress(progress)
  }

  // Get all unique specification keys
  const allSpecKeys = Array.from(new Set(products.flatMap((product) => Object.keys(product.specifications))))

  const toggleSpecSelection = (spec: string) => {
    setSelectedSpecs((prev) => (prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]))
  }

  const getSpecValue = (product: Product, key: string) => {
    return product.specifications[key] || "N/A"
  }

  const compareValues = (key: string) => {
    const values = products.map((product) => getSpecValue(product, key))
    const uniqueValues = new Set(values)
    return uniqueValues.size > 1 // Returns true if values differ
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[95vh] p-0 flex flex-col">
        <DialogHeader className="p-6 pb-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">Product Comparison</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-muted-foreground">Compare up to {products.length} products side by side</p>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-muted rounded-full h-1">
              <div 
                className="bg-primary h-1 rounded-full transition-all duration-300 ease-out" 
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Scroll to explore all specifications</span>
              <span>{Math.round(scrollProgress)}%</span>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 pb-6" onScroll={handleScroll}>
          <div className="space-y-8 relative">
            {/* Floating Scroll Indicator */}
            {showScrollTop && (
              <div className="fixed bottom-4 right-4 z-50">
                <Button
                  size="sm"
                  onClick={() => {
                    const scrollArea = document.querySelector('[data-radix-scroll-area-viewport]')
                    if (scrollArea) {
                      scrollArea.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                  }}
                  className="rounded-full shadow-lg"
                >
                  ↑
                </Button>
              </div>
            )}
            {/* Product Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.displayName}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.isNew && <Badge className="bg-green-500 text-white text-xs">New</Badge>}
                      {product.isFeatured && <Badge className="bg-blue-500 text-white text-xs">Featured</Badge>}
                      {product.badge && <Badge className="bg-purple-500 text-white text-xs">{product.badge}</Badge>}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.displayName}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">({product.reviewCount} reviews)</span>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1" asChild>
                        <a href={`/products/${product.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </a>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

                            {/* Quick Comparison Table */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 py-2">
                    <h3 className="text-xl font-semibold">Quick Comparison</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Show differences only</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const differentSpecs = allSpecKeys.filter(compareValues)
                          setSelectedSpecs(differentSpecs)
                        }}
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Differences
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setSelectedSpecs([])}>
                        <Minus className="h-4 w-4 mr-2" />
                        Clear
                      </Button>
                    </div>
                  </div>

              <div className="grid gap-4">
                {/* Basic Info Comparison */}
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3 sticky top-0 bg-card z-10 py-2">Basic Information</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b sticky top-0 bg-card z-10">
                            <th className="text-left py-2 px-3 font-medium bg-card">Specification</th>
                            {products.map((product) => (
                              <th key={product.id} className="text-left py-2 px-3 font-medium min-w-[200px] bg-card">
                                {product.name}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b hover:bg-muted/50">
                            <td className="py-2 px-3 font-medium">Resolution</td>
                            {products.map((product) => (
                              <td key={product.id} className="py-2 px-3">
                                {product.resolution}
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b hover:bg-muted/50">
                            <td className="py-2 px-3 font-medium">Type</td>
                            {products.map((product) => (
                              <td key={product.id} className="py-2 px-3 capitalize">
                                {product.type}
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b hover:bg-muted/50">
                            <td className="py-2 px-3 font-medium">Lens Type</td>
                            {products.map((product) => (
                              <td key={product.id} className="py-2 px-3 capitalize">
                                {product.lensType}
                              </td>
                            ))}
                          </tr>
                          <tr className="hover:bg-muted/50">
                            <td className="py-2 px-3 font-medium">In Stock</td>
                            {products.map((product) => (
                              <td key={product.id} className="py-2 px-3">
                                <Badge variant={product.inStock ? "default" : "destructive"}>
                                  {product.inStock ? "Yes" : "No"}
                                </Badge>
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Specifications */}
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3 sticky top-0 bg-card z-10 py-2">Detailed Specifications</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b sticky top-0 bg-card z-10">
                            <th className="text-left py-2 px-3 font-medium bg-card">Specification</th>
                            {products.map((product) => (
                              <th key={product.id} className="text-left py-2 px-3 font-medium min-w-[200px] bg-card">
                                {product.name}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {allSpecKeys
                            .filter((key) => selectedSpecs.length === 0 || selectedSpecs.includes(key))
                            .map((specKey) => (
                              <tr
                                key={specKey}
                                className={`border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                                  compareValues(specKey) ? "bg-yellow-50 dark:bg-yellow-900/20" : ""
                                }`}
                                onClick={() => toggleSpecSelection(specKey)}
                              >
                                <td className="py-2 px-3 font-medium">
                                  <div className="flex items-center gap-2">
                                    {specKey}
                                    {compareValues(specKey) && (
                                      <Badge variant="outline" className="text-xs">
                                        Different
                                      </Badge>
                                    )}
                                  </div>
                                </td>
                                {products.map((product) => (
                                  <td key={product.id} className="py-2 px-3">
                                    {getSpecValue(product, specKey)}
                                  </td>
                                ))}
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Features Comparison */}
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3 sticky top-0 bg-card z-10 py-2">Features</h4>
                    <div className="grid gap-4">
                      {products.map((product) => (
                        <div key={product.id} className="hover:bg-muted/30 p-3 rounded-lg transition-colors">
                          <h5 className="font-medium mb-2">{product.name}</h5>
                          <div className="flex flex-wrap gap-1">
                            {product.features.map((feature, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>


              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
