"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { LazyImage } from "@/components/ui/lazy-image"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Eye, Plus, Minus } from "lucide-react"
import type { Product } from "@/lib/product-data"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  viewMode?: "grid" | "list"
  onCompare?: (product: Product) => void
  isInComparison?: boolean
  delay?: number
}

export default function ProductCard({
  product,
  viewMode = "grid",
  onCompare,
  isInComparison = false,
  delay = 0,
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay,
        ease: "easeOut",
      },
    },
  }

  const hoverVariants = {
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  }

  if (viewMode === "list") {
    return (
      <motion.div variants={cardVariants} initial="hidden" animate="visible" whileHover="hover" className="w-full">
        <Card className="overflow-hidden border-0 shadow-lg bg-card/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
          <div className="flex flex-col md:flex-row">
            <div className="relative md:w-80 h-64 md:h-auto bg-gradient-to-br from-muted/30 to-muted/10">
              {!imageError ? (
                <LazyImage
                  src={product.image || "/placeholder.svg"}
                  alt={product.displayName}
                  width={320}
                  height={240}
                  className="object-contain p-4 w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <Eye className="h-12 w-12" />
                </div>
              )}
              {product.badge && (
                <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground rounded-lg">
                  {product.badge}
                </Badge>
              )}
              {product.isNew && (
                <Badge className="absolute top-3 right-3 bg-green-500 text-white rounded-lg">New</Badge>
              )}
            </div>
            <div className="flex-1 p-6">
              <CardHeader className="p-0 mb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2">{product.displayName}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 mb-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Resolution:</span>
                    <span className="ml-2 font-medium">{product.resolution}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Type:</span>
                    <span className="ml-2 font-medium capitalize">{product.type}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Lens:</span>
                    <span className="ml-2 font-medium">{product.lensType}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Stock:</span>
                    <span className={cn("ml-2 font-medium", product.inStock ? "text-green-600" : "text-red-600")}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-1">
                    {product.features.slice(0, 4).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs rounded-md">
                        {feature}
                      </Badge>
                    ))}
                    {product.features.length > 4 && (
                      <Badge variant="secondary" className="text-xs rounded-md">
                        +{product.features.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-0 flex gap-3">
                <Button asChild className="flex-1 rounded-xl">
                  <Link href={`/products/${product.id}`}>View Details</Link>
                </Button>
                {onCompare && (
                  <Button
                    variant={isInComparison ? "default" : "outline"}
                    size="sm"
                    onClick={() => onCompare(product)}
                    className="rounded-xl px-3"
                  >
                    {isInComparison ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </Button>
                )}
              </CardFooter>
            </div>
          </div>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div variants={cardVariants} initial="hidden" animate="visible" whileHover={hoverVariants} className="group">
      <Card className="overflow-hidden border-0 shadow-lg bg-card/50 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
        <div className="relative aspect-[4/3] bg-gradient-to-br from-muted/30 to-muted/10">
          {!imageError ? (
            <LazyImage
              src={product.image || "/placeholder.svg"}
              alt={product.displayName}
              width={400}
              height={300}
              className="object-contain p-4 transition-transform duration-300 group-hover:scale-105 w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <Eye className="h-12 w-12" />
            </div>
          )}
          {product.badge && (
            <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground rounded-lg z-10">
              {product.badge}
            </Badge>
          )}
          {product.isNew && (
            <Badge className="absolute top-3 right-3 bg-green-500 text-white rounded-lg z-10">New</Badge>
          )}
          {product.isFeatured && (
            <Badge className="absolute bottom-3 left-3 bg-orange-500 text-white rounded-lg z-10">Featured</Badge>
          )}
        </div>

        <CardHeader className="pb-3">
          <h3 className="text-lg font-bold text-foreground line-clamp-2 leading-tight">{product.displayName}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
        </CardHeader>

        <CardContent className="flex-1 pb-3">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Resolution:</span>
                <div className="font-medium">{product.resolution}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Type:</span>
                <div className="font-medium capitalize">{product.type}</div>
              </div>
            </div>

            <div>
              <span className="text-muted-foreground text-sm">Key Features:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {product.features.slice(0, 3).map((feature, index) => (
                  <Badge key={index} variant="secondary" className="text-xs rounded-md">
                    {feature}
                  </Badge>
                ))}
                {product.features.length > 3 && (
                  <Badge variant="secondary" className="text-xs rounded-md">
                    +{product.features.length - 3}
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className={cn("font-medium", product.inStock ? "text-green-600" : "text-red-600")}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-0 flex gap-2">
          <Button asChild className="flex-1 rounded-xl">
            <Link href={`/products/${product.id}`}>View Details</Link>
          </Button>
          {onCompare && (
            <Button
              variant={isInComparison ? "default" : "outline"}
              size="sm"
              onClick={() => onCompare(product)}
              className="rounded-xl px-3"
            >
              {isInComparison ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}
