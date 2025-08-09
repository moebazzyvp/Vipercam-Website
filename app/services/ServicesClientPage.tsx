"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Monitor,
  Wrench,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Star,
  ArrowRight,
  Clock,
  Settings,
  Headphones,
  Zap,
  Cloud,
  GraduationCap,
  ChevronRight,
  Shield,
  Eye,
  AlertTriangle,
  CreditCard,
  Lock,
} from "lucide-react"
import Link from "next/link"

const packages = [
  {
    name: "Basic Package",
    description: "Essential security coverage for small properties",
    popular: false,
    includes: [
      "Up to 4 camera installation",
      "Basic DVR/NVR system",
      "Standard definition recording",
      "Local storage setup",
      "Basic mobile app access",
      "Initial system configuration",
    ],
  },
  {
    name: "Business Package",
    description: "Comprehensive commercial security solution",
    popular: true,
    includes: [
      "Up to 16 camera installation",
      "Professional grade NVR system",
      "High definition recording",
      "Cloud storage integration",
      "Advanced mobile app features",
      "Multi-user access control",
      "Motion detection setup",
      "Night vision optimization",
    ],
  },
  {
    name: "Enterprise Package",
    description: "Enterprise-grade premium security solution",
    popular: false,
    includes: [
      "Unlimited camera installation",
      "Enterprise NVR/server system",
      "4K ultra-high definition recording",
      "Redundant cloud storage",
      "Custom mobile application",
      "Advanced user management",
      "AI-powered analytics",
      "Facial recognition system",
      "License plate recognition",
      "Integration with existing systems",
    ],
  },
]

const additionalServices = [
  {
    icon: Wrench,
    title: "Professional Installation",
    description: "Expert installation by certified technicians with proper cable management and system optimization.",
    availability: "Included in all packages",
  },
  {
    icon: Settings,
    title: "Technical Support",
    description:
      "Comprehensive technical support including remote diagnostics, troubleshooting, and system maintenance.",
    availability: "Available as add-on",
  },
  {
    icon: Clock,
    title: "Maintenance Contracts",
    description:
      "Scheduled maintenance visits, system health checks, and preventive care to ensure optimal performance.",
    availability: "Available for all packages",
  },
  {
    icon: Cloud,
    title: "Cloud Storage Solutions",
    description: "Secure cloud storage with redundant backups, remote access, and scalable storage capacity options.",
    availability: "Available as add-on",
  },
]

const processSteps = [
  {
    step: "01",
    title: "Initial Consultation",
    description: "We assess your property and security needs to design the perfect solution.",
  },
  {
    step: "02",
    title: "Custom Proposal",
    description: "Receive a detailed proposal with equipment specifications and pricing.",
  },
  {
    step: "03",
    title: "Professional Installation",
    description: "Our certified technicians install and configure your complete system.",
  },
  {
    step: "04",
    title: "Training & Support",
    description: "Comprehensive training and ongoing support to maximize your security investment.",
  },
]

export default function ServicesClientPage() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-vipercam-dark pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-vipercam-dark via-vipercam-gray to-vipercam-dark">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Security Services</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Professional security solutions from basic residential coverage to enterprise-grade systems with 24/7 monitoring.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-vipercam-red hover:bg-red-700 text-white">
              <Link href="/contact" className="flex items-center">
                Get Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-600 text-white hover:bg-vipercam-gray bg-transparent"
            >
              <Link href="/products">View Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Service Packages</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose from our comprehensive service packages, each designed to meet different security needs and budgets.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {packages.map((pkg, index) => (
              <Card
                key={index}
                className={`relative bg-vipercam-gray border-vipercam-gray-light hover:border-vipercam-red transition-all duration-300 hover:shadow-xl ${
                  pkg.popular ? "ring-2 ring-vipercam-red" : ""
                }`}
              >
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-vipercam-red text-white px-4 py-1">
                    Most Popular
                  </Badge>
                )}

                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-white mb-2">{pkg.name}</CardTitle>
                  <CardDescription className="text-gray-300 text-base">{pkg.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Package Includes */}
                  <div>
                    <h4 className="font-semibold text-white mb-4 flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      Package Includes:
                    </h4>
                    <ul className="space-y-3">
                      {pkg.includes.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start text-gray-300">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4">
                    <Button
                      className={`w-full ${
                        pkg.popular ? "bg-vipercam-red hover:bg-red-700" : "bg-vipercam-gray-light hover:bg-gray-600"
                      } text-white`}
                    >
                      <Link href="/contact" className="flex items-center justify-center w-full">
                        Get Quote
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 24/7 Monitoring Section */}
      <section className="py-20 bg-gradient-to-br from-vipercam-gray via-vipercam-dark to-vipercam-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-vipercam-red/20 rounded-full mb-6">
              <Shield className="h-8 w-8 text-vipercam-red" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">24/7 Professional Monitoring</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Round-the-clock professional monitoring with immediate response protocols and emergency dispatch coordination.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Monitoring Features */}
            <div className="space-y-8">
              <div className="bg-vipercam-dark/80 backdrop-blur-sm p-8 rounded-xl border border-vipercam-gray-light shadow-2xl hover:shadow-vipercam-red/10 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="w-10 h-10 bg-vipercam-red/20 rounded-lg flex items-center justify-center mr-3">
                    <Shield className="h-6 w-6 text-vipercam-red" />
                  </div>
                  Monitoring Features
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start group">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mr-4 mt-1 group-hover:bg-green-500/30 transition-colors">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Real-time Surveillance</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">24/7 live monitoring of your security cameras with AI-powered detection</p>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mr-4 mt-1 group-hover:bg-green-500/30 transition-colors">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Instant Alerts</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">Immediate notifications via phone, email, SMS, and mobile app</p>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mr-4 mt-1 group-hover:bg-green-500/30 transition-colors">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Emergency Response</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">Direct dispatch to law enforcement with verified incident reporting</p>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mr-4 mt-1 group-hover:bg-green-500/30 transition-colors">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Mobile App Access</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">Monitor your property from anywhere with our intuitive mobile app</p>
                    </div>
                  </div>
                  <div className="flex items-start group">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mr-4 mt-1 group-hover:bg-green-500/30 transition-colors">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Video Verification</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">Visual confirmation before dispatching authorities to prevent false alarms</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-vipercam-dark/80 backdrop-blur-sm p-8 rounded-xl border border-vipercam-gray-light shadow-2xl hover:shadow-vipercam-red/10 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <div className="w-10 h-10 bg-vipercam-red/20 rounded-lg flex items-center justify-center mr-3">
                    <Eye className="h-6 w-6 text-vipercam-red" />
                  </div>
                  Response Times
                </h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center p-3 bg-vipercam-gray/30 rounded-lg">
                    <span className="text-gray-300 font-medium">Alert Detection</span>
                    <Badge className="bg-green-600 text-white px-3 py-1">Instant</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-vipercam-gray/30 rounded-lg">
                    <span className="text-gray-300 font-medium">Video Verification</span>
                    <Badge className="bg-yellow-600 text-white px-3 py-1">15 seconds</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-vipercam-gray/30 rounded-lg">
                    <span className="text-gray-300 font-medium">Emergency Dispatch</span>
                    <Badge className="bg-red-600 text-white px-3 py-1">30 seconds</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-vipercam-gray/30 rounded-lg">
                    <span className="text-gray-300 font-medium">Mobile Notification</span>
                    <Badge className="bg-blue-600 text-white px-3 py-1">Immediate</Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing & Signup */}
            <div className="space-y-8">
              <div className="bg-vipercam-dark/80 backdrop-blur-sm p-8 rounded-xl border border-vipercam-gray-light shadow-2xl hover:shadow-vipercam-red/10 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                  <div className="w-10 h-10 bg-vipercam-red/20 rounded-lg flex items-center justify-center mr-3">
                    <CreditCard className="h-6 w-6 text-vipercam-red" />
                  </div>
                  Monitoring Plans
                </h3>
                
                <div className="space-y-6">
                  <div className="border border-vipercam-gray-light rounded-xl p-6 hover:border-vipercam-red/50 transition-colors duration-300">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold text-white text-lg">Basic Monitoring</h4>
                      <div className="text-right">
                        <span className="text-3xl font-bold text-vipercam-red">$149</span>
                        <span className="text-gray-400 text-sm block">per month</span>
                      </div>
                    </div>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        Up to 16 cameras
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        Basic motion detection
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        Mobile app access
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        Email alerts
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        Additional locations: $129/month
                      </li>
                    </ul>
                  </div>

                  <div className="border-2 border-vipercam-red rounded-xl p-6 relative bg-vipercam-red/5 hover:bg-vipercam-red/10 transition-colors duration-300">
                    <Badge className="absolute -top-3 left-6 bg-vipercam-red text-white px-4 py-1 rounded-full">Most Popular</Badge>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold text-white text-lg">Professional Monitoring</h4>
                      <div className="text-right">
                        <span className="text-3xl font-bold text-vipercam-red">$229</span>
                        <span className="text-gray-400 text-sm block">per month</span>
                      </div>
                    </div>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        Up to 32 cameras
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        Advanced AI detection
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        24/7 live monitoring
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        Emergency dispatch
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        Video verification
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        Priority support
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        Additional locations: $199/month
                      </li>
                    </ul>
                  </div>

                  <div className="border border-vipercam-gray-light rounded-xl p-6 hover:border-vipercam-red/50 transition-colors duration-300">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-semibold text-white text-lg">Enterprise Monitoring</h4>
                      <div className="text-right">
                        <span className="text-3xl font-bold text-vipercam-red">$249</span>
                        <span className="text-gray-400 text-sm block">per month</span>
                      </div>
                    </div>
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        Up to 64 cameras
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        Dedicated monitoring
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        Custom analytics
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        Advanced reporting
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        24/7 phone support
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        Additional locations: $229/month
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Secure Payment Section */}
              <div className="bg-vipercam-dark/80 backdrop-blur-sm p-8 rounded-xl border border-vipercam-gray-light shadow-2xl hover:shadow-vipercam-red/10 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                  <div className="w-10 h-10 bg-vipercam-red/20 rounded-lg flex items-center justify-center mr-3">
                    <Lock className="h-6 w-6 text-vipercam-red" />
                  </div>
                  Secure Payment Setup
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center space-x-3 p-3 bg-vipercam-gray/30 rounded-lg">
                      <CreditCard className="h-5 w-5 text-green-500" />
                      <span className="text-gray-300 text-sm">Credit/Debit Cards</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-vipercam-gray/30 rounded-lg">
                      <CreditCard className="h-5 w-5 text-green-500" />
                      <span className="text-gray-300 text-sm">Bank Transfers</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-vipercam-gray/30 rounded-lg">
                      <CreditCard className="h-5 w-5 text-green-500" />
                      <span className="text-gray-300 text-sm">PayPal</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-vipercam-gray/30 rounded-lg">
                      <CreditCard className="h-5 w-5 text-green-500" />
                      <span className="text-gray-300 text-sm">Apple Pay</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-vipercam-gray/30 rounded-lg">
                    <CreditCard className="h-5 w-5 text-green-500" />
                    <span className="text-gray-300 text-sm">Google Pay</span>
                  </div>
                  
                  <div className="mt-6 p-4 bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-xl">
                    <div className="flex items-center mb-2">
                      <Shield className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-green-400 text-sm font-medium">256-bit SSL Encryption</span>
                    </div>
                    <p className="text-gray-300 text-xs">All payments are processed securely with bank-level encryption and PCI DSS compliance</p>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <Button className="w-full bg-vipercam-red hover:bg-red-700 text-white py-3 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105">
                    <Link href="/monitoring/signup" className="flex items-center justify-center w-full">
                      <CreditCard className="mr-2 h-5 w-5" />
                      Sign Up for Monitoring
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full border-vipercam-gray-light text-white hover:bg-vipercam-gray py-3 text-lg rounded-xl transition-all duration-300">
                    <Link href="/contact" className="flex items-center justify-center w-full">
                      <Phone className="mr-2 h-5 w-5" />
                      Speak with Sales
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-vipercam-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Additional Services</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Enhance your security system with our comprehensive range of professional services, each tailored to your
              specific needs and requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <Card
                key={index}
                className="bg-vipercam-dark border-vipercam-gray-light hover:border-vipercam-red transition-all duration-300 hover:shadow-lg"
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <service.icon className="h-12 w-12 text-vipercam-red mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{service.description}</p>
                  <div className="bg-vipercam-gray rounded-lg p-2">
                    <p className="text-xs text-gray-400">{service.availability}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Process</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From initial consultation to ongoing support, we ensure a seamless experience every step of the way.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-vipercam-red rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl font-bold text-white">{step.step}</span>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-vipercam-gray-light transform -translate-x-8"></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-gray-300 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-vipercam-gray via-vipercam-dark to-vipercam-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Secure Your Property?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Contact us today for a free consultation and quote.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="bg-vipercam-dark border-vipercam-gray-light text-center hover:border-vipercam-red transition-colors duration-300">
              <CardContent className="p-8">
                <Phone className="h-12 w-12 text-vipercam-red mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Call Us</h3>
                <p className="text-gray-300 mb-4">Speak with our security experts</p>
                <a href="tel:+13138003871" className="text-vipercam-red hover:text-red-400 font-semibold">
                  (313) 800-3871
                </a>
              </CardContent>
            </Card>

            <Card className="bg-vipercam-dark border-vipercam-gray-light text-center hover:border-vipercam-red transition-colors duration-300">
              <CardContent className="p-8">
                <Mail className="h-12 w-12 text-vipercam-red mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Email Us</h3>
                <p className="text-gray-300 mb-4">Get detailed information</p>
                <a href="mailto:support@vipercam.net" className="text-vipercam-red hover:text-red-400 font-semibold">
                  support@vipercam.net
                </a>
              </CardContent>
            </Card>

            <Card className="bg-vipercam-dark border-vipercam-gray-light text-center hover:border-vipercam-red transition-colors duration-300">
              <CardContent className="p-8">
                <MapPin className="h-12 w-12 text-vipercam-red mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Visit Us</h3>
                <p className="text-gray-300 mb-4">Schedule an appointment</p>
                <p className="text-vipercam-red font-semibold">Detroit, Michigan</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-vipercam-red hover:bg-red-700 text-white">
              <Link href="/contact" className="flex items-center">
                Get Free Quote
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

