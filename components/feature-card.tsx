"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  delay?: number
}

export default function FeatureCard({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group relative bg-vipercam-gray/50 backdrop-blur-sm border border-vipercam-gray-light/20 rounded-xl p-6 hover:border-vipercam-red/30 transition-all duration-300"
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-vipercam-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

      {/* Content */}
      <div className="relative z-10">
        <div className="w-12 h-12 bg-vipercam-red/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-vipercam-red/20 transition-colors duration-300">
          <Icon className="h-6 w-6 text-vipercam-red" />
        </div>

        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-vipercam-red transition-colors duration-300">
          {title}
        </h3>

        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
          {description}
        </p>
      </div>

      {/* Subtle border glow on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-vipercam-red/20 via-transparent to-vipercam-red/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10" />
    </motion.div>
  )
}
