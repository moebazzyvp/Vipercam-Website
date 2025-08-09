"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, X, Grid, List } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import ProductGrid from "@/components/product-grid"
import ProductComparison from "@/components/product-comparison"
import {
  categories,
  productTypes,
  resolutionOptions,
  lensTypeOptions,
  featureOptions,
  megapixelOptions,
  protectionRatingOptions,
  aiSupportOptions,
  wdrOptions,
  nightVisionOptions,
  type Product,
} from "@/lib/product-data"

interface ProductClientPageProps {
  products: Product[]
}

export default function ProductClientPage({ products }: ProductClientPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedResolution, setSelectedResolution] = useState("all")
  const [selectedLensType, setSelectedLensType] = useState("all")
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("name")
  const [comparisonProducts, setComparisonProducts] = useState<Product[]>([])
  const [showComparison, setShowComparison] = useState(false)

  const [selectedMegapixel, setSelectedMegapixel] = useState("all")
  const [selectedProtectionRating, setSelectedProtectionRating] = useState("all")
  const [selectedAiSupport, setSelectedAiSupport] = useState("all")
  const [selectedWdr, setSelectedWdr] = useState("all")
  const [selectedNightVision, setSelectedNightVision] = useState("all")

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.features.some((feature) => feature.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === "all" || product.type === selectedCategory
      const matchesType = selectedType === "all" || product.type === selectedType
      const matchesResolution = selectedResolution === "all" || product.resolution === selectedResolution
      const matchesLensType = selectedLensType === "all" || product.lensType === selectedLensType
      const matchesFeatures =
        selectedFeatures.length === 0 || selectedFeatures.every((feature) => product.filterFeatures.includes(feature))

      // New filter logic
      const matchesMegapixel = selectedMegapixel === "all" || product.resolution === selectedMegapixel

      const matchesProtectionRating =
        selectedProtectionRating === "all" ||
        product.filterFeatures.some(
          (feature) =>
            (selectedProtectionRating === "IP66" && feature.includes("IP66")) ||
            (selectedProtectionRating === "IP67" && feature.includes("IP67")) ||
            (selectedProtectionRating === "IP68" && feature.includes("IP68")) ||
            (selectedProtectionRating === "IK10" && feature.includes("IK10")) ||
            (selectedProtectionRating === "IK10+" && feature.includes("IK10+")),
        )

      const matchesAiSupport =
        selectedAiSupport === "all" ||
        (selectedAiSupport === "ai-enabled" && product.filterFeatures.includes("AI")) ||
        (selectedAiSupport === "ai-isp" && product.filterFeatures.includes("AI-ISP")) ||
        (selectedAiSupport === "face-recognition" && product.filterFeatures.includes("Face Recognition")) ||
        (selectedAiSupport === "face-detection" && product.filterFeatures.includes("Face Detection")) ||
        (selectedAiSupport === "no-ai" && !product.filterFeatures.includes("AI"))

      const matchesWdr =
        selectedWdr === "all" ||
        (selectedWdr === "wdr-pro" && product.filterFeatures.includes("WDR Pro")) ||
        (selectedWdr === "standard-wdr" && product.filterFeatures.includes("WDR")) ||
        (selectedWdr === "no-wdr" && !product.filterFeatures.some((f) => f.includes("WDR")))

      const matchesNightVision =
        selectedNightVision === "all" ||
        (selectedNightVision === "full-color" && product.filterFeatures.includes("Full Color")) ||
        (selectedNightVision === "super-low-lux" && product.filterFeatures.includes("Super Low Lux")) ||
        (selectedNightVision === "starlight" && product.filterFeatures.includes("Starlight")) ||
        (selectedNightVision === "thermal" && product.type === "thermal")

      return (
        matchesSearch &&
        matchesCategory &&
        matchesType &&
        matchesResolution &&
        matchesLensType &&
        matchesFeatures &&
        matchesMegapixel &&
        matchesProtectionRating &&
        matchesAiSupport &&
        matchesWdr &&
        matchesNightVision
      )
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.displayName.localeCompare(b.displayName)
        case "rating":
          return b.rating - a.rating
        case "newest":
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
        case "featured":
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
        default:
          return 0
      }
    })

    return filtered
  }, [
    products,
    searchTerm,
    selectedCategory,
    selectedType,
    selectedResolution,
    selectedLensType,
    selectedFeatures,
    selectedMegapixel,
    selectedProtectionRating,
    selectedAiSupport,
    selectedWdr,
    selectedNightVision,
    sortBy,
  ])

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures((prev) => (prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]))
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedCategory("all")
    setSelectedType("all")
    setSelectedResolution("all")
    setSelectedLensType("all")
    setSelectedFeatures([])
    setSelectedMegapixel("all")
    setSelectedProtectionRating("all")
    setSelectedAiSupport("all")
    setSelectedWdr("all")
    setSelectedNightVision("all")
  }

  const activeFiltersCount = [
    selectedCategory !== "all",
    selectedType !== "all",
    selectedResolution !== "all",
    selectedLensType !== "all",
    selectedFeatures.length > 0,
    searchTerm.length > 0,
    selectedMegapixel !== "all",
    selectedProtectionRating !== "all",
    selectedAiSupport !== "all",
    selectedWdr !== "all",
    selectedNightVision !== "all",
  ].filter(Boolean).length

  const handleCompareToggle = (product: Product) => {
    setComparisonProducts((prev) => {
      const exists = prev.find((p) => p.id === product.id)
      if (exists) {
        return prev.filter((p) => p.id !== product.id)
      } else if (prev.length < 3) {
        return [...prev, product]
      }
      return prev
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-foreground mb-4"
          >
            Our Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Discover our comprehensive range of professional surveillance solutions
          </motion.p>
        </div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary/50 rounded-xl"
                  />
                </div>

                {/* Quick Filters */}
                <div className="flex flex-wrap gap-3">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[140px] h-12 bg-background/50 border-border/50 rounded-xl">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id} className="rounded-lg">
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-[120px] h-12 bg-background/50 border-border/50 rounded-xl">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {productTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id} className="rounded-lg">
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[130px] h-12 bg-background/50 border-border/50 rounded-xl">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="name" className="rounded-lg">
                        Name
                      </SelectItem>
                      <SelectItem value="rating" className="rounded-lg">
                        Rating
                      </SelectItem>
                      <SelectItem value="newest" className="rounded-lg">
                        Newest
                      </SelectItem>
                      <SelectItem value="featured" className="rounded-lg">
                        Featured
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="h-12 px-4 bg-background/50 border-border/50 hover:bg-primary/10 hover:border-primary/50 rounded-xl relative"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge className="ml-2 h-5 w-5 p-0 text-xs bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>

                  <div className="flex border border-border/50 rounded-xl bg-background/50 p-1">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="h-10 px-3 rounded-lg"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="h-10 px-3 rounded-lg"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Advanced Filters */}
              <Collapsible open={showFilters} onOpenChange={setShowFilters}>
                <CollapsibleContent>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t border-border/50"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {/* Resolution Filter */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm text-foreground">Resolution</h4>
                        <Select value={selectedResolution} onValueChange={setSelectedResolution}>
                          <SelectTrigger className="bg-background/50 border-border/50 rounded-lg">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            {resolutionOptions.map((option) => (
                              <SelectItem key={option.id} value={option.id} className="rounded-lg">
                                {option.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Lens Type Filter */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm text-foreground">Lens Type</h4>
                        <Select value={selectedLensType} onValueChange={setSelectedLensType}>
                          <SelectTrigger className="bg-background/50 border-border/50 rounded-lg">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            {lensTypeOptions.map((option) => (
                              <SelectItem key={option.id} value={option.id} className="rounded-lg">
                                {option.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Features Filter */}
                      <div className="space-y-3 md:col-span-2">
                        <h4 className="font-medium text-sm text-foreground">Features</h4>
                        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                          {featureOptions.slice(1).map((feature) => (
                            <Badge
                              key={feature.id}
                              variant={selectedFeatures.includes(feature.id) ? "default" : "outline"}
                              className={`cursor-pointer transition-all duration-200 rounded-lg ${
                                selectedFeatures.includes(feature.id)
                                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                  : "hover:bg-primary/10 hover:border-primary/50"
                              }`}
                              onClick={() => handleFeatureToggle(feature.id)}
                            >
                              {feature.name}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Megapixel Filter */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm text-foreground">Megapixels</h4>
                        <Select value={selectedMegapixel} onValueChange={setSelectedMegapixel}>
                          <SelectTrigger className="bg-background/50 border-border/50 rounded-lg">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            {megapixelOptions.map((option) => (
                              <SelectItem key={option.id} value={option.id} className="rounded-lg">
                                {option.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Protection Rating Filter */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm text-foreground">Protection Rating</h4>
                        <Select value={selectedProtectionRating} onValueChange={setSelectedProtectionRating}>
                          <SelectTrigger className="bg-background/50 border-border/50 rounded-lg">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            {protectionRatingOptions.map((option) => (
                              <SelectItem key={option.id} value={option.id} className="rounded-lg">
                                {option.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* AI Support Filter */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm text-foreground">AI Support</h4>
                        <Select value={selectedAiSupport} onValueChange={setSelectedAiSupport}>
                          <SelectTrigger className="bg-background/50 border-border/50 rounded-lg">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            {aiSupportOptions.map((option) => (
                              <SelectItem key={option.id} value={option.id} className="rounded-lg">
                                {option.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* WDR Filter */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm text-foreground">WDR Technology</h4>
                        <Select value={selectedWdr} onValueChange={setSelectedWdr}>
                          <SelectTrigger className="bg-background/50 border-border/50 rounded-lg">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            {wdrOptions.map((option) => (
                              <SelectItem key={option.id} value={option.id} className="rounded-lg">
                                {option.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Night Vision Filter */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm text-foreground">Night Vision</h4>
                        <Select value={selectedNightVision} onValueChange={setSelectedNightVision}>
                          <SelectTrigger className="bg-background/50 border-border/50 rounded-lg">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            {nightVisionOptions.map((option) => (
                              <SelectItem key={option.id} value={option.id} className="rounded-lg">
                                {option.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Clear Filters */}
                    {activeFiltersCount > 0 && (
                      <div className="mt-6 flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">{filteredProducts.length} products found</p>
                        <Button
                          variant="outline"
                          onClick={clearAllFilters}
                          className="h-9 px-4 rounded-lg hover:bg-destructive/10 hover:border-destructive/50 hover:text-destructive bg-transparent"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Clear all filters
                        </Button>
                      </div>
                    )}
                  </motion.div>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        </motion.div>

        {/* Active Filters Display */}
        <AnimatePresence>
          {activeFiltersCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6"
            >
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <Badge variant="secondary" className="rounded-lg">
                    Search: "{searchTerm}"
                    <X className="h-3 w-3 ml-2 cursor-pointer" onClick={() => setSearchTerm("")} />
                  </Badge>
                )}
                {selectedCategory !== "all" && (
                  <Badge variant="secondary" className="rounded-lg">
                    {categories.find((c) => c.id === selectedCategory)?.name}
                    <X className="h-3 w-3 ml-2 cursor-pointer" onClick={() => setSelectedCategory("all")} />
                  </Badge>
                )}
                {selectedType !== "all" && (
                  <Badge variant="secondary" className="rounded-lg">
                    {productTypes.find((t) => t.id === selectedType)?.name}
                    <X className="h-3 w-3 ml-2 cursor-pointer" onClick={() => setSelectedType("all")} />
                  </Badge>
                )}
                {selectedResolution !== "all" && (
                  <Badge variant="secondary" className="rounded-lg">
                    {resolutionOptions.find((r) => r.id === selectedResolution)?.name}
                    <X className="h-3 w-3 ml-2 cursor-pointer" onClick={() => setSelectedResolution("all")} />
                  </Badge>
                )}
                {selectedLensType !== "all" && (
                  <Badge variant="secondary" className="rounded-lg">
                    {lensTypeOptions.find((l) => l.id === selectedLensType)?.name}
                    <X className="h-3 w-3 ml-2 cursor-pointer" onClick={() => setSelectedLensType("all")} />
                  </Badge>
                )}
                {selectedFeatures.map((feature) => (
                  <Badge key={feature} variant="secondary" className="rounded-lg">
                    {featureOptions.find((f) => f.id === feature)?.name}
                    <X className="h-3 w-3 ml-2 cursor-pointer" onClick={() => handleFeatureToggle(feature)} />
                  </Badge>
                ))}

                {selectedMegapixel !== "all" && (
                  <Badge variant="secondary" className="rounded-lg">
                    {megapixelOptions.find((m) => m.id === selectedMegapixel)?.name}
                    <X className="h-3 w-3 ml-2 cursor-pointer" onClick={() => setSelectedMegapixel("all")} />
                  </Badge>
                )}
                {selectedProtectionRating !== "all" && (
                  <Badge variant="secondary" className="rounded-lg">
                    {protectionRatingOptions.find((p) => p.id === selectedProtectionRating)?.name}
                    <X className="h-3 w-3 ml-2 cursor-pointer" onClick={() => setSelectedProtectionRating("all")} />
                  </Badge>
                )}
                {selectedAiSupport !== "all" && (
                  <Badge variant="secondary" className="rounded-lg">
                    {aiSupportOptions.find((a) => a.id === selectedAiSupport)?.name}
                    <X className="h-3 w-3 ml-2 cursor-pointer" onClick={() => setSelectedAiSupport("all")} />
                  </Badge>
                )}
                {selectedWdr !== "all" && (
                  <Badge variant="secondary" className="rounded-lg">
                    {wdrOptions.find((w) => w.id === selectedWdr)?.name}
                    <X className="h-3 w-3 ml-2 cursor-pointer" onClick={() => setSelectedWdr("all")} />
                  </Badge>
                )}
                {selectedNightVision !== "all" && (
                  <Badge variant="secondary" className="rounded-lg">
                    {nightVisionOptions.find((n) => n.id === selectedNightVision)?.name}
                    <X className="h-3 w-3 ml-2 cursor-pointer" onClick={() => setSelectedNightVision("all")} />
                  </Badge>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Count */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </motion.div>

        {/* Product Grid */}
        <ProductGrid
          products={filteredProducts}
          viewMode={viewMode}
          onCompare={handleCompareToggle}
          comparisonProducts={comparisonProducts}
          showFilters={false}
          showSearch={false}
        />

        {/* Comparison Bar */}
        <AnimatePresence>
          {comparisonProducts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed bottom-6 left-6 right-6 z-50"
            >
              <Card className="bg-card/95 backdrop-blur-sm border shadow-2xl">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="font-medium">Compare Products ({comparisonProducts.length}/3)</span>
                      <div className="flex gap-2">
                        {comparisonProducts.map((product) => (
                          <Badge key={product.id} variant="secondary" className="rounded-lg">
                            {product.name}
                            <X className="h-3 w-3 ml-2 cursor-pointer" onClick={() => handleCompareToggle(product)} />
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => setShowComparison(true)}
                        disabled={comparisonProducts.length < 2}
                        className="rounded-lg"
                      >
                        Compare Now
                      </Button>
                      <Button variant="outline" onClick={() => setComparisonProducts([])} className="rounded-lg">
                        Clear All
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Comparison Modal */}
        <ProductComparison
          products={comparisonProducts}
          isOpen={showComparison}
          onClose={() => setShowComparison(false)}
        />
      </div>
    </div>
  )
}
