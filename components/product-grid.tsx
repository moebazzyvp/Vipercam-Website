"use client"

import { useState, useMemo, useCallback } from "react"
import ProductCard from "@/components/product-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Search, X, ChevronDown } from "lucide-react"
import {
  type Product,
  categories,
  productTypes,
  resolutionOptions,
  lensTypeOptions,
  featureOptions,
} from "@/lib/product-data"
import { AnimatePresence, motion } from "framer-motion"

interface ProductGridProps {
  products: Product[]
  showFilters?: boolean
  showSearch?: boolean
  className?: string
  viewMode?: "grid" | "list"
  onCompare?: (product: Product) => void
  comparisonProducts?: Product[]
}

// Define the category order for display
const categoryOrder = [
  "eyeball",
  "dome",
  "bullet",
  "fisheye",
  "thermal",
  "multi-sensor",
  "box",
  "ptz",
  "speed-dome",
  "people-counter",
  "pinhole",
  "accessory",
]

// Category display names
const categoryDisplayNames: Record<string, string> = {
  eyeball: "Eyeball Cameras",
  dome: "Dome Cameras",
  bullet: "Bullet Cameras",
  fisheye: "Fisheye Cameras",
  thermal: "Thermal Cameras",
  "multi-sensor": "Multi-sensor / Panoramic Cameras",
  box: "Box Cameras",
  ptz: "PTZ Cameras",
  "speed-dome": "IP Speed Dome Cameras",
  "people-counter": "3D People Counter Devices",
  pinhole: "Pinhole Cameras",
  accessory: "Accessories",
}

export default function ProductGrid({
  products,
  showFilters = true,
  showSearch = true,
  className,
  viewMode = "grid",
  onCompare,
  comparisonProducts = [],
}: ProductGridProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedResolution, setSelectedResolution] = useState("all")
  const [selectedLensType, setSelectedLensType] = useState("all")
  const [selectedFeature, setSelectedFeature] = useState("all")

  const filteredProducts = useMemo(() => {
    let filtered = products

    // Apply search term filter
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.displayName.toLowerCase().includes(lowerCaseSearchTerm) ||
          product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
          product.description.toLowerCase().includes(lowerCaseSearchTerm) ||
          product.features.some((feature) => feature.toLowerCase().includes(lowerCaseSearchTerm)) ||
          product.filterFeatures.some((feature) => feature.toLowerCase().includes(lowerCaseSearchTerm)),
      )
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.type === selectedCategory)
    }

    // Apply type filter
    if (selectedType !== "all") {
      filtered = filtered.filter((product) => product.type === selectedType)
    }

    // Apply resolution filter
    if (selectedResolution !== "all") {
      filtered = filtered.filter((product) => product.resolution === selectedResolution)
    }

    // Apply lens type filter
    if (selectedLensType !== "all") {
      filtered = filtered.filter((product) => product.lensType === selectedLensType)
    }

    // Apply feature filter
    if (selectedFeature !== "all") {
      filtered = filtered.filter((product) => product.filterFeatures.includes(selectedFeature))
    }

    return filtered
  }, [products, searchTerm, selectedCategory, selectedType, selectedResolution, selectedLensType, selectedFeature])

  // Group products by category in the specified order
  const groupedProducts = useMemo(() => {
    const grouped: Record<string, Product[]> = {}

    // Initialize all categories
    categoryOrder.forEach((category) => {
      grouped[category] = []
    })

    // Group filtered products by category
    filteredProducts.forEach((product) => {
      if (grouped[product.type]) {
        grouped[product.type].push(product)
      }
    })

    // Remove empty categories
    const nonEmptyGroups: Record<string, Product[]> = {}
    categoryOrder.forEach((category) => {
      if (grouped[category].length > 0) {
        nonEmptyGroups[category] = grouped[category]
      }
    })

    return nonEmptyGroups
  }, [filteredProducts])

  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (selectedCategory !== "all") count++
    if (selectedType !== "all") count++
    if (selectedResolution !== "all") count++
    if (selectedLensType !== "all") count++
    if (selectedFeature !== "all") count++
    return count
  }, [selectedCategory, selectedType, selectedResolution, selectedLensType, selectedFeature])

  const clearFilters = useCallback(() => {
    setSearchTerm("")
    setSelectedCategory("all")
    setSelectedType("all")
    setSelectedResolution("all")
    setSelectedLensType("all")
    setSelectedFeature("all")
  }, [])

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      {/* Filter and Search Controls */}
      {(showSearch || showFilters) && (
        <div className="bg-gradient-to-r from-card/80 to-card/60 backdrop-blur-md border border-border/30 rounded-2xl p-6 shadow-lg">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            {showSearch && (
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
                <Input
                  placeholder="Search products by name, model, or features..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 bg-background/80 backdrop-blur-sm border-border/40 text-foreground placeholder-muted-foreground/70 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 rounded-xl transition-all duration-200"
                />
              </div>
            )}

            {/* Filters */}
            {showFilters && (
              <div className="flex flex-wrap gap-3 items-center">
                {/* Category Select */}
                <div className="relative min-w-[140px]">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none w-full px-4 py-3 pr-10 bg-background/90 backdrop-blur-sm border border-border/40 rounded-xl text-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/20 focus:outline-none text-sm font-medium transition-all duration-200 hover:bg-background"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground/70 pointer-events-none" />
                </div>

                {/* Type Select */}
                <div className="relative min-w-[120px]">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="appearance-none w-full px-4 py-3 pr-10 bg-background/90 backdrop-blur-sm border border-border/40 rounded-xl text-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/20 focus:outline-none text-sm font-medium transition-all duration-200 hover:bg-background"
                  >
                    {productTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground/70 pointer-events-none" />
                </div>

                {/* Resolution Select */}
                <div className="relative min-w-[110px]">
                  <select
                    value={selectedResolution}
                    onChange={(e) => setSelectedResolution(e.target.value)}
                    className="appearance-none w-full px-4 py-3 pr-10 bg-background/90 backdrop-blur-sm border border-border/40 rounded-xl text-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/20 focus:outline-none text-sm font-medium transition-all duration-200 hover:bg-background"
                  >
                    {resolutionOptions.map((resolution) => (
                      <option key={resolution.id} value={resolution.id}>
                        {resolution.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground/70 pointer-events-none" />
                </div>

                {/* Lens Type Select */}
                <div className="relative min-w-[110px]">
                  <select
                    value={selectedLensType}
                    onChange={(e) => setSelectedLensType(e.target.value)}
                    className="appearance-none w-full px-4 py-3 pr-10 bg-background/90 backdrop-blur-sm border border-border/40 rounded-xl text-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/20 focus:outline-none text-sm font-medium transition-all duration-200 hover:bg-background"
                  >
                    {lensTypeOptions.map((lensType) => (
                      <option key={lensType.id} value={lensType.id}>
                        {lensType.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground/70 pointer-events-none" />
                </div>

                {/* Feature Select */}
                <div className="relative min-w-[120px]">
                  <select
                    value={selectedFeature}
                    onChange={(e) => setSelectedFeature(e.target.value)}
                    className="appearance-none w-full px-4 py-3 pr-10 bg-background/90 backdrop-blur-sm border border-border/40 rounded-xl text-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/20 focus:outline-none text-sm font-medium transition-all duration-200 hover:bg-background"
                  >
                    {featureOptions.map((feature) => (
                      <option key={feature.id} value={feature.id}>
                        {feature.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground/70 pointer-events-none" />
                </div>

                {activeFiltersCount > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground bg-transparent backdrop-blur-sm rounded-xl px-4 py-2 h-12 font-medium transition-all duration-200 hover:scale-105"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear ({activeFiltersCount})
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/20">
              {selectedCategory !== "all" && (
                <Badge
                  variant="secondary"
                  className="bg-primary/15 text-primary border-primary/30 rounded-lg px-3 py-1"
                >
                  Category: {categories.find((c) => c.id === selectedCategory)?.name}
                </Badge>
              )}
              {selectedType !== "all" && (
                <Badge
                  variant="secondary"
                  className="bg-primary/15 text-primary border-primary/30 rounded-lg px-3 py-1"
                >
                  Type: {productTypes.find((t) => t.id === selectedType)?.name}
                </Badge>
              )}
              {selectedResolution !== "all" && (
                <Badge
                  variant="secondary"
                  className="bg-primary/15 text-primary border-primary/30 rounded-lg px-3 py-1"
                >
                  Resolution: {resolutionOptions.find((r) => r.id === selectedResolution)?.name}
                </Badge>
              )}
              {selectedLensType !== "all" && (
                <Badge
                  variant="secondary"
                  className="bg-primary/15 text-primary border-primary/30 rounded-lg px-3 py-1"
                >
                  Lens: {lensTypeOptions.find((l) => l.id === selectedLensType)?.name}
                </Badge>
              )}
              {selectedFeature !== "all" && (
                <Badge
                  variant="secondary"
                  className="bg-primary/15 text-primary border-primary/30 rounded-lg px-3 py-1"
                >
                  Feature: {featureOptions.find((f) => f.id === selectedFeature)?.name}
                </Badge>
              )}
            </div>
          )}
        </div>
      )}

      {/* Products by Category */}
      {Object.keys(groupedProducts).length > 0 ? (
        <div className="space-y-12">
          {categoryOrder.map((categoryKey) => {
            const categoryProducts = groupedProducts[categoryKey]
            if (!categoryProducts || categoryProducts.length === 0) return null

            return (
              <motion.div
                key={categoryKey}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="border-b border-border/20 pb-4">
                  <h2 className="text-2xl font-bold text-foreground mb-2">{categoryDisplayNames[categoryKey]}</h2>
                  <p className="text-muted-foreground">
                    {categoryProducts.length} product{categoryProducts.length !== 1 ? "s" : ""} available
                  </p>
                </div>

                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                      : "space-y-4"
                  }
                >
                  <AnimatePresence>
                    {categoryProducts.map((product, index) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        viewMode={viewMode}
                        onCompare={onCompare}
                        isInComparison={comparisonProducts.some((p) => p.id === product.id)}
                        delay={index * 0.05}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-10">
          <LoadingSpinner size="lg" text="Loading products..." />
          <p className="mt-4">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
