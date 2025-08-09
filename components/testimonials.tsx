"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface Testimonial {
  id: string
  name: string
  company: string
  role: string
  content: string
  rating: number
  image: string
}

interface TestimonialsProps {
  testimonials?: Testimonial[]
}

const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    company: "SecureCorps Inc.",
    role: "Security Director",
    content:
      "Vipercam's surveillance system has exceeded our expectations. The 4K clarity and night vision capabilities are outstanding. Installation was seamless and the support team is incredibly responsive.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60&text=SJ",
  },
  {
    id: "2",
    name: "Michael Chen",
    company: "TechGuard Solutions",
    role: "IT Manager",
    content:
      "We've deployed over 50 Vipercam units across multiple locations. The reliability and image quality are consistently excellent. The mobile app makes monitoring effortless.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60&text=MC",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    company: "SafeHome Properties",
    role: "Property Manager",
    content:
      "The PTZ cameras have revolutionized our property security. The auto-tracking feature and preset positions make monitoring large areas incredibly efficient. Highly recommended!",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60&text=ER",
  },
  {
    id: "4",
    name: "David Thompson",
    company: "RetailWatch LLC",
    role: "Operations Manager",
    content:
      "Outstanding product quality and customer service. The weatherproof design has held up perfectly through harsh conditions. The cloud storage integration is a game-changer.",
    rating: 5,
    image: "/placeholder.svg?height=60&width=60&text=DT",
  },
]

export default function Testimonials({ testimonials = defaultTestimonials }: TestimonialsProps) {
  if (!testimonials || testimonials.length === 0) {
    return null
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    
  )
}
