"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Shield, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const footerSections = {
    products: [
      { name: "Surveillance Cameras", href: "/products?category=cameras" },
      { name: "Recording Systems", href: "/products?category=recorders" },
      { name: "Access Control", href: "/products?category=access" },
      { name: "Smart Integration", href: "/products?category=smart" },
    ],
    services: [
      { name: "Commercial Security", href: "/services#commercial" },
      { name: "Residential Security", href: "/services#residential" },
      { name: "Cloud Storage", href: "/services#cloud" },
      { name: "24/7 Monitoring", href: "/services#monitoring" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Team", href: "/about#team" },
      { name: "Careers", href: "/about#careers" },
      { name: "Partners", href: "/about#partners" },
    ],
    support: [
      { name: "Help Center", href: "/support" },
      { name: "Installation Guide", href: "/support#installation" },
      { name: "Technical Support", href: "/support#technical" },
      
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "GDPR Compliance", href: "/gdpr" },
    ],
  }

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/vipercam" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/vipercam" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/vipercam" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/vipercam" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  return (
    <footer className="bg-vipercam-dark border-t border-vipercam-gray/20">
      {/* Newsletter Section */}
      <div className="border-b border-vipercam-gray/20">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h3 className="text-2xl font-bold mb-4">Stay Updated with Vipercam</h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Get the latest security insights, product updates, and exclusive offers delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-vipercam-gray border border-vipercam-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-vipercam-red focus:border-transparent text-white placeholder-gray-400"
              />
              <Button className="bg-vipercam-red hover:bg-red-700 text-white px-6 py-3 font-medium">Subscribe</Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8"
        >
          {/* Company Info */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <Shield className="h-8 w-8 text-vipercam-red" />
              <span className="text-2xl font-bold font-poppins">Vipercam</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Leading provider of professional surveillance solutions. We protect what matters most with cutting-edge
              technology and unmatched expertise in security systems.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="h-4 w-4 text-vipercam-red" />
                <span>(313) 800-3871</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="h-4 w-4 text-vipercam-red" />
                <span>support@vipercam.net</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="h-4 w-4 text-vipercam-red" />
                <span>123 Security Blvd, Detroit, MI 48201</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-vipercam-gray hover:bg-vipercam-red rounded-lg flex items-center justify-center transition-colors group"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-white mb-4">Products</h4>
            <ul className="space-y-3">
              {footerSections.products.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-vipercam-red transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-3">
              {footerSections.services.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-vipercam-red transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerSections.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-vipercam-red transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-3 mb-6">
              {footerSections.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-vipercam-red transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Emergency Support */}
            <div className="bg-vipercam-gray/30 rounded-lg p-4 border border-vipercam-red/20">
              <h5 className="font-medium text-vipercam-red mb-2">24/7 Emergency</h5>
              <p className="text-sm text-gray-400 mb-2">Critical system issues</p>
              <p className="font-medium text-white">(313) 258-6000</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-vipercam-gray/20">
        <div className="container mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          >
            <div className="text-gray-400 text-sm">© {new Date().getFullYear()} Vipercam. All rights reserved.</div>

            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              {footerSections.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-vipercam-red transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
