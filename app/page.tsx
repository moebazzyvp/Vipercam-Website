"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, Eye, Zap, Clock } from "lucide-react"
import FeatureCard from "@/components/feature-card"
import CTASection from "@/components/cta-section"
import { products } from "@/lib/product-data"

export default function HomePage() {
  const featuredProducts = products.filter((product) => product.isFeatured).slice(0, 3)

  const features = [
    {
      icon: Eye,
      title: "Crystal Clear Vision",
      description:
        "Advanced resolution capabilities with H.265 compression ensures every detail is captured with exceptional clarity, day or night.",
    },
    {
      icon: Shield,
      title: "Professional Grade Security",
      description:
        "Enterprise-level encryption and secure storage protect your surveillance data with professional-grade security protocols.",
    },
    {
      icon: Zap,
      title: "Smart Analytics",
      description:
        "Advanced intelligent algorithms detect and classify objects, people, and vehicles with high accuracy, reducing false alarms.",
    },
    {
      icon: Clock,
      title: "24/7 Monitoring",
      description:
        "Round-the-clock surveillance capabilities with instant alerts and notifications for comprehensive security coverage.",
    },
  ]

  const stats = [
    { number: "10,000+", label: "Cameras Deployed" },
    { number: "500+", label: "Satisfied Clients" },
    { number: "99.9%", label: "System Reliability" },
    { number: "24/7", label: "Technical Support" },
  ]

  return (
    <div className="min-h-screen bg-vipercam-dark">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-vipercam-dark via-vipercam-gray-dark to-vipercam-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(229,9,20,0.1),transparent_50%)]" />

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 50,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute -top-40 -right-40 w-80 h-80 border border-vipercam-red/10 rounded-full"
          />
          <motion.div
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 40,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute -bottom-40 -left-40 w-96 h-96 border border-vipercam-red/5 rounded-full"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Badge className="mb-6 bg-vipercam-red/10 text-vipercam-red border-vipercam-red/20 hover:bg-vipercam-red/20">
                <Shield className="w-4 h-4 mr-2" />
                Professional Surveillance Solutions
              </Badge>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Secure Your World with
                <span className="block text-vipercam-red">Vipercam</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                Advanced surveillance technology powered by GeoVision. Discover professional-grade security cameras and
                intelligent monitoring systems designed for comprehensive protection.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-vipercam-red mb-2">{stat.number}</div>
                  <div className="text-gray-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                className="bg-vipercam-red hover:bg-red-700 text-white font-semibold px-8 py-4 text-lg group"
                asChild
              >
                <Link href="/products">
                  Explore Products
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-vipercam-red text-vipercam-red hover:bg-vipercam-red hover:text-white font-semibold px-8 py-4 text-lg group bg-transparent"
                asChild
              >
                <Link href="/contact">
                  Get Consultation
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-6 h-10 border-2 border-vipercam-red rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-1 h-3 bg-vipercam-red rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-vipercam-gray-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose <span className="text-vipercam-red">Vipercam?</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Experience the next generation of surveillance technology with features designed for maximum security and
              peace of mind.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-vipercam-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Featured <span className="text-vipercam-red">Products</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover our most popular GeoVision surveillance cameras, trusted by security professionals worldwide.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-vipercam-gray/50 border border-vipercam-gray-light/20 rounded-xl overflow-hidden hover:border-vipercam-red/30 transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.displayName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-white">{product.displayName}</h3>
                    {product.isNew && <Badge className="bg-vipercam-red text-white">New</Badge>}
                    {product.badge && <Badge className="bg-blue-600 text-white">{product.badge}</Badge>}
                  </div>
                  <p className="text-gray-400 mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-400">{product.resolution} Resolution</span>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/products/${product.id}`}>Learn More</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button
              size="lg"
              variant="outline"
              className="border-vipercam-red text-vipercam-red hover:bg-vipercam-red hover:text-white bg-transparent"
              asChild
            >
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  )
}
