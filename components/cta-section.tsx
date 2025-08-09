"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, Mail, ArrowRight, Shield, Clock, Users } from "lucide-react"

interface CTASectionProps {
  title?: string
  description?: string
  primaryButton?: { text: string; href: string }
  secondaryButton?: { text: string; href: string }
}

export default function CTASection({
  title = "Ready to Learn More About Our Solutions?",
  description = "Discover how our GeoVision surveillance systems can enhance your security infrastructure. Contact our experts for detailed information and professional consultation.",
  primaryButton = { text: "Get Information", href: "/contact" },
  secondaryButton = { text: "Explore Products", href: "/products" },
}: CTASectionProps) {
  return (
    <section className="relative py-20 bg-gradient-to-br from-vipercam-dark via-vipercam-gray-dark to-vipercam-dark overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(229,9,20,0.1),transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_49%,rgba(229,9,20,0.05)_50%,transparent_51%)] bg-[length:20px_20px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <div className="inline-flex items-center space-x-2 bg-vipercam-red/10 border border-vipercam-red/20 rounded-full px-4 py-2 mb-6">
                  <Shield className="h-4 w-4 text-vipercam-red" />
                  <span className="text-sm font-medium text-vipercam-red">Professional Security Solutions</span>
                </div>

                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                  {title.includes("Our Solutions") ? (
                    <>
                      Ready to Learn More About
                      <span className="block text-vipercam-red">Our Solutions?</span>
                    </>
                  ) : (
                    title
                  )}
                </h2>

                <p className="text-xl text-gray-300 mb-8 leading-relaxed">{description}</p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-vipercam-red/10 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-vipercam-red" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">24/7 Support</div>
                    <div className="text-sm text-gray-400">Always here to help</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-vipercam-red/10 rounded-lg flex items-center justify-center">
                    <Shield className="h-5 w-5 text-vipercam-red" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Professional Grade</div>
                    <div className="text-sm text-gray-400">Enterprise quality</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-vipercam-red/10 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-vipercam-red" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Expert Consultation</div>
                    <div className="text-sm text-gray-400">Professional guidance</div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-vipercam-red hover:bg-red-700 text-white font-semibold px-8 py-4 text-lg group"
                  asChild
                >
                  <Link href={primaryButton.href}>
                    {primaryButton.text}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>

                {secondaryButton && (
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-vipercam-red text-vipercam-red hover:bg-vipercam-red hover:text-white font-semibold px-8 py-4 text-lg bg-transparent"
                    asChild
                  >
                    <Link href={secondaryButton.href}>{secondaryButton.text}</Link>
                  </Button>
                )}
              </div>
            </motion.div>

            {/* Right side - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:pl-8"
            >
              <div className="bg-vipercam-gray/50 backdrop-blur-sm border border-vipercam-gray-light/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-vipercam-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-vipercam-red" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Call Us Now</h4>
                      <p className="text-gray-400 mb-2">Speak with our security experts</p>
                      <a
                        href="tel:+13138003871"
                        className="text-vipercam-red hover:text-red-400 font-semibold text-lg transition-colors"
                      >
                        (313) 800-3871
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-vipercam-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-vipercam-red" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Email Support</h4>
                      <p className="text-gray-400 mb-2">Get detailed information</p>
                      <a
                        href="mailto:support@vipercam.net"
                        className="text-vipercam-red hover:text-red-400 font-semibold transition-colors"
                      >
                        support@vipercam.net
                      </a>
                    </div>
                  </div>
                </div>

                {/* Emergency contact */}
                <div className="mt-8 p-4 bg-vipercam-red/10 border border-vipercam-red/20 rounded-lg">
                  <h4 className="font-semibold text-vipercam-red mb-2">24/7 Emergency Support</h4>
                  <p className="text-gray-300 text-sm mb-2">Critical system issues and urgent support</p>
                  <a href="tel:+13132586000" className="text-white font-bold text-lg">
                    (313) 258-6000
                  </a>
                </div>

                {/* Business hours */}
                <div className="mt-6 text-sm text-gray-400">
                  <p className="mb-1">
                    <strong className="text-white">Business Hours:</strong>
                  </p>
                  <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                  <p>Saturday: 9:00 AM - 5:00 PM</p>
                  <p>Sunday: Emergency support only</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
