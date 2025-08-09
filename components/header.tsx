"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/theme-toggle"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Support", href: "/support" },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-vipercam-dark/95 backdrop-blur-sm border-b border-vipercam-gray">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image src="/logo-vipercam.png" alt="Vipercam Logo" width={32} height={32} className="w-8 h-8" />
            <span className="text-xl font-bold text-white">Vipercam</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-4 text-sm text-gray-300">
              <a href="tel:+13138003871" className="flex items-center space-x-1 hover:text-white transition-colors">
                <Phone className="h-4 w-4" />
                <span>(313) 800-3871</span>
              </a>
              <a
                href="mailto:support@vipercam.net"
                className="flex items-center space-x-1 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>support@vipercam.net</span>
              </a>
            </div>
            <ThemeToggle />
            <Button asChild className="bg-vipercam-red hover:bg-red-700 text-white">
              <Link href="/contact">Get Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-vipercam-gray">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors duration-200 px-2 py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-vipercam-gray space-y-2">
                <a
                  href="tel:+13138003871"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white px-2 py-1"
                >
                  <Phone className="h-4 w-4" />
                  <span>(313) 800-3871</span>
                </a>
                <a
                  href="mailto:support@vipercam.net"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white px-2 py-1"
                >
                  <Mail className="h-4 w-4" />
                  <span>support@vipercam.net</span>
                </a>
                <Button asChild className="bg-vipercam-red hover:bg-red-700 text-white w-full mt-4">
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                    Get Quote
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
