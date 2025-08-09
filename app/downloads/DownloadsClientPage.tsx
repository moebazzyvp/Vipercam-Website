"use client"
import { motion } from "framer-motion"
import { useMemo } from "react"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Download, FileText, Monitor, Smartphone, Settings, Package, Search, X, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { allDownloads, getUniqueDownloadCategories, getUniqueDownloadProductTypes } from "@/lib/product-data"
import type { DownloadItem } from "@/lib/product-data"
import { AnimatePresence } from "framer-motion"

// Map string icon names to Lucide React components
const iconMap: Record<string, any> = {
  FileText,
  Monitor,
  Smartphone,
  Settings,
  Package,
  // Add other icons as needed
}

export default function DownloadsClientPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false)

  const uniqueCategories = useMemo(() => getUniqueDownloadCategories(allDownloads), [])
  const uniqueProductTypes = useMemo(() => getUniqueDownloadProductTypes(allDownloads), [])

  const filteredDownloads = useMemo(() => {
    return allDownloads.filter((item) => {
      const matchesSearch =
        !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.fileType.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category)
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(item.productType)

      return matchesSearch && matchesCategory && matchesType
    })
  }, [searchQuery, selectedCategories, selectedTypes])

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const handleClearFilters = () => {
    setSearchQuery("")
    setSelectedCategories([])
    setSelectedTypes([])
  }

  // Group downloads by category for the Accordion section
  const categorizedDownloads = useMemo(
    () =>
      filteredDownloads.reduce(
        (acc, download) => {
          if (!acc[download.category]) {
            acc[download.category] = []
          }
          acc[download.category].push(download)
          return acc
        },
        {} as Record<string, DownloadItem[]>,
      ),
    [filteredDownloads],
  )

  return (
    <>
      {/* Hero Banner */}
      <section className="relative py-20 overflow-hidden dark:bg-gray-900 bg-gray-100">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent transform -skew-y-6"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 pt-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Vipercam <span className="dark:text-red-500 text-red-600">Downloads</span>
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Access the latest firmware, software, product manuals, and essential tools for your Vipercam security
              systems.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 dark:bg-black bg-white">
        <div className="container mx-auto px-4">
          {/* Filter Sidebar Toggle (Mobile) */}
          <div className="lg:hidden flex justify-between items-center mb-6">
            <Button
              variant="outline"
              className="bg-vipercam-gray border-vipercam-gray-light text-white hover:bg-vipercam-gray-light"
              onClick={() => setIsFilterSidebarOpen(true)}
            >
              <SlidersHorizontal className="h-5 w-5 mr-2" />
              Filters
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Sidebar (Desktop & Mobile Overlay) */}
            <AnimatePresence>
              {(isFilterSidebarOpen || window.innerWidth >= 1024) && (
                <motion.div
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="fixed lg:static top-0 left-0 h-full w-64 bg-vipercam-dark border-r border-vipercam-gray-light p-6 z-40 lg:z-auto lg:block overflow-y-auto"
                >
                  <div className="flex justify-between items-center mb-6 lg:hidden">
                    <h3 className="text-xl font-bold">Filters</h3>
                    <Button variant="ghost" size="icon" onClick={() => setIsFilterSidebarOpen(false)}>
                      <X className="h-6 w-6" />
                    </Button>
                  </div>

                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      type="text"
                      placeholder="Search downloads..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-vipercam-gray border-vipercam-gray-light focus:border-vipercam-red text-white placeholder-gray-400"
                    />
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-white mb-3">Categories</h4>
                      <div className="space-y-2">
                        {uniqueCategories.map((category) => (
                          <label key={category} className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(category)}
                              onChange={() => handleCategoryToggle(category)}
                              className="form-checkbox h-4 w-4 text-vipercam-red rounded border-gray-600 bg-vipercam-gray-light focus:ring-vipercam-red"
                            />
                            <span>{category}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-white mb-3">Product Types</h4>
                      <div className="space-y-2">
                        {uniqueProductTypes.map((type) => (
                          <label key={type} className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={selectedTypes.includes(type)}
                              onChange={() => handleTypeToggle(type)}
                              className="form-checkbox h-4 w-4 text-vipercam-red rounded border-gray-600 bg-vipercam-gray-light focus:ring-vipercam-red"
                            />
                            <span>{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full bg-transparent border-vipercam-red text-vipercam-red hover:bg-vipercam-red hover:text-white"
                      onClick={handleClearFilters}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Downloads Content */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold mb-4">All Available Downloads</h2>
                <p className="text-xl dark:text-gray-400 text-gray-600 max-w-2xl mx-auto">
                  Find everything you need to set up, manage, and update your Vipercam products.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDownloads.length > 0 ? (
                  filteredDownloads.map((item, index) => {
                    const IconComponent = iconMap[item.icon] || FileText // Default to FileText if icon not found
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5 }}
                      >
                        <Card className="h-full dark:bg-gray-900/50 bg-gray-50">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center">
                                <IconComponent className="h-6 w-6 text-red-500" />
                              </div>
                              <span className="text-xs dark:text-gray-400 text-gray-600 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                                {item.fileType}
                              </span>
                            </div>
                            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                            <p className="dark:text-gray-400 text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-sm dark:text-gray-400 text-gray-600">{item.size}</span>
                              <Button size="sm" className="bg-red-600 hover:bg-red-700" asChild>
                                <a
                                  href={item.downloadLink}
                                  download={item.fileType !== "App Store" && item.fileType !== "Google Play"}
                                  target={
                                    item.fileType === "App Store" || item.fileType === "Google Play"
                                      ? "_blank"
                                      : "_self"
                                  }
                                  rel={
                                    item.fileType === "App Store" || item.fileType === "Google Play"
                                      ? "noopener noreferrer"
                                      : ""
                                  }
                                >
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </a>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16 col-span-full"
                  >
                    <div className="w-24 h-24 mx-auto mb-6 bg-vipercam-gray/30 rounded-full flex items-center justify-center">
                      <Search className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">No downloads found</h3>
                    <p className="text-gray-400 mb-6 max-w-md mx-auto">
                      We couldn't find any downloads matching your criteria. Try adjusting your search or filters.
                    </p>
                    <Button onClick={handleClearFilters} className="bg-vipercam-red hover:bg-red-700 text-white">
                      Clear Filters
                    </Button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section (Accordion) */}
      <section className="py-16 dark:bg-gray-900/50 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Browse by Category</h2>
            <p className="text-xl dark:text-gray-400 text-gray-600 max-w-2xl mx-auto">
              Easily find specific downloads by exploring our categorized library.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Accordion type="multiple" className="w-full">
              {Object.entries(categorizedDownloads).length > 0 ? (
                Object.entries(categorizedDownloads).map(([categoryName, categoryItems]) => (
                  <AccordionItem value={categoryName} key={categoryName}>
                    <AccordionTrigger className="text-lg font-semibold text-white hover:text-vipercam-red">
                      {categoryName} ({categoryItems.length})
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                        {categoryItems.map((item) => {
                          const IconComponent = iconMap[item.icon] || FileText
                          return (
                            <motion.div
                              key={item.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Card className="dark:bg-gray-800 dark:border-gray-700 bg-white">
                                <CardContent className="p-4 flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-md bg-red-500/10 flex items-center justify-center flex-shrink-0">
                                      <IconComponent className="h-5 w-5 text-red-500" />
                                    </div>
                                    <div>
                                      <h4 className="font-semibold text-white">{item.title}</h4>
                                      <p className="text-sm dark:text-gray-400 text-gray-600">
                                        {item.fileType} • {item.size}
                                      </p>
                                    </div>
                                  </div>
                                  <Button size="sm" className="bg-red-600 hover:bg-red-700" asChild>
                                    <a
                                      href={item.downloadLink}
                                      download={item.fileType !== "App Store" && item.fileType !== "Google Play"}
                                      target={
                                        item.fileType === "App Store" || item.fileType === "Google Play"
                                          ? "_blank"
                                          : "_self"
                                      }
                                      rel={
                                        item.fileType === "App Store" || item.fileType === "Google Play"
                                          ? "noopener noreferrer"
                                          : ""
                                      }
                                    >
                                      <Download className="h-4 w-4" />
                                    </a>
                                  </Button>
                                </CardContent>
                              </Card>
                            </motion.div>
                          )
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  No categorized downloads found for current filters.
                </div>
              )}
            </Accordion>
          </motion.div>
        </div>
      </section>
    </>
  )
}
