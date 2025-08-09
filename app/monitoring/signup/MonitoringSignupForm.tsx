"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Shield, Clock, Zap, Loader2, CreditCard, Lock } from "lucide-react"

export default function MonitoringSignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    monitoringType: "",
    cameraCount: "",
    message: "",
    // Payment fields
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    cardName: "",
    billingAddress: "",
    zipCode: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const monitoringTypes = [
    "24/7 Professional Monitoring",
    "Event-Based Monitoring",
    "Custom Monitoring Schedule",
    "Emergency Response Only",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/monitoring-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (result.success) {
        setIsSubmitted(true)
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          address: "",
          monitoringType: "",
          cameraCount: "",
          message: "",
          // Payment fields
          cardNumber: "",
          cardExpiry: "",
          cardCvc: "",
          cardName: "",
          billingAddress: "",
          zipCode: "",
        })
      } else {
        console.error("Form submission error:", result.error)
        // You could add error state handling here
      }
    } catch (error) {
      console.error("Form submission error:", error)
      // Handle the error gracefully without throwing
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    try {
      setFormData((prev) => ({ ...prev, [field]: value }))
    } catch (error) {
      console.error("Input change error:", error)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-vipercam-dark pt-20">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Monitoring Request Submitted!</h1>
            <p className="text-xl text-gray-300 mb-8">
              Thank you for your interest in our 24/7 monitoring services. Our team will contact you within 24 hours to
              discuss your requirements and provide a custom quote.
            </p>
            <div className="bg-vipercam-gray/30 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">What happens next?</h3>
              <div className="space-y-4 text-left">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-vipercam-red/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-vipercam-red font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Initial Consultation</h4>
                    <p className="text-gray-400 text-sm">We'll review your requirements and discuss monitoring options</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-vipercam-red/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-vipercam-red font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Custom Quote</h4>
                    <p className="text-gray-400 text-sm">Receive a detailed quote tailored to your specific needs</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-vipercam-red/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-vipercam-red font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Service Setup</h4>
                    <p className="text-gray-400 text-sm">Professional installation and monitoring system activation</p>
                  </div>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setIsSubmitted(false)}
              className="bg-vipercam-red hover:bg-red-700 text-white"
            >
              Submit Another Request
            </Button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-vipercam-dark pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-vipercam-gray-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="mb-6 bg-vipercam-red/10 text-vipercam-red border-vipercam-red/20">
              <Shield className="w-4 h-4 mr-2" />
              24/7 Professional Monitoring
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Sign Up for <span className="text-vipercam-red">Professional Monitoring</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Get comprehensive 24/7 monitoring services with instant alerts, professional response, and peace of mind.
              Our expert team monitors your security system around the clock.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-vipercam-dark">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-vipercam-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-vipercam-red" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">24/7 Monitoring</h3>
              <p className="text-gray-400">Round-the-clock surveillance with instant response to security events</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-vipercam-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-vipercam-red" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Instant Alerts</h3>
              <p className="text-gray-400">Immediate notifications via phone, email, and mobile app</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-vipercam-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-vipercam-red" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Professional Response</h3>
              <p className="text-gray-400">Trained security professionals handle all security incidents</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-vipercam-gray-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid lg:grid-cols-2 gap-12"
            >
              {/* Form */}
              <Card className="bg-vipercam-gray/30 border-vipercam-gray-light">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white">Request Monitoring Services</CardTitle>
                  <p className="text-gray-400">Fill out the form below and we'll get back to you within 24 hours</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name & Email */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">
                          Name <span className="text-vipercam-red">*</span>
                        </label>
                        <Input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="bg-vipercam-gray-dark border-vipercam-gray-light focus:border-vipercam-red text-white placeholder-gray-400"
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">
                          Email <span className="text-vipercam-red">*</span>
                        </label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="bg-vipercam-gray-dark border-vipercam-gray-light focus:border-vipercam-red text-white placeholder-gray-400"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    {/* Phone & Company */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">Phone</label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="bg-vipercam-gray-dark border-vipercam-gray-light focus:border-vipercam-red text-white placeholder-gray-400"
                          placeholder="(313) 800-3871"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">Company</label>
                        <Input
                          type="text"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          className="bg-vipercam-gray-dark border-vipercam-gray-light focus:border-vipercam-red text-white placeholder-gray-400"
                          placeholder="Your company name"
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white">Property Address</label>
                      <Input
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        className="bg-vipercam-gray-dark border-vipercam-gray-light focus:border-vipercam-red text-white placeholder-gray-400"
                        placeholder="Property address for monitoring"
                      />
                    </div>

                    {/* Monitoring Type & Camera Count */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">Monitoring Type</label>
                        <select
                          value={formData.monitoringType}
                          onChange={(e) => handleInputChange("monitoringType", e.target.value)}
                          className="w-full bg-vipercam-gray-dark border border-vipercam-gray-light rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-vipercam-red focus:border-transparent"
                        >
                          <option value="">Select monitoring type</option>
                          {monitoringTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">Number of Cameras</label>
                        <Input
                          type="number"
                          value={formData.cameraCount}
                          onChange={(e) => handleInputChange("cameraCount", e.target.value)}
                          className="bg-vipercam-gray-dark border-vipercam-gray-light focus:border-vipercam-red text-white placeholder-gray-400"
                          placeholder="e.g., 8"
                          min="1"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white">Additional Requirements</label>
                      <Textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        rows={4}
                        className="bg-vipercam-gray-dark border-vipercam-gray-light focus:border-vipercam-red text-white placeholder-gray-400 resize-none"
                        placeholder="Tell us about your specific monitoring needs, security concerns, or any special requirements..."
                      />
                    </div>

                    {/* Payment Section */}
                    <div className="border-t border-vipercam-gray-light pt-6">
                      <div className="flex items-center mb-4">
                        <CreditCard className="h-5 w-5 text-vipercam-red mr-2" />
                        <h3 className="text-lg font-semibold text-white">Payment Information</h3>
                      </div>
                      
                      <div className="bg-vipercam-gray-dark rounded-lg p-4 mb-4">
                        <div className="flex items-center mb-3">
                          <Lock className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-green-400 text-sm font-medium">Secure Payment Processing</span>
                        </div>
                        <p className="text-gray-400 text-xs">All payment information is encrypted and secure</p>
                      </div>

                      {/* Card Information */}
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-white">
                            Card Number <span className="text-vipercam-red">*</span>
                          </label>
                          <Input
                            type="text"
                            value={formData.cardNumber}
                            onChange={(e) => {
                             const value = e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim()
                             handleInputChange("cardNumber", value)
                           }}
                            className="bg-vipercam-gray-dark border-vipercam-gray-light focus:border-vipercam-red text-white placeholder-gray-400"
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-white">
                            Cardholder Name <span className="text-vipercam-red">*</span>
                          </label>
                          <Input
                            type="text"
                            value={formData.cardName}
                            onChange={(e) => handleInputChange("cardName", e.target.value)}
                            className="bg-vipercam-gray-dark border-vipercam-gray-light focus:border-vipercam-red text-white placeholder-gray-400"
                            placeholder="Name on card"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-white">
                            Expiry Date <span className="text-vipercam-red">*</span>
                          </label>
                          <Input
                            type="text"
                            value={formData.cardExpiry}
                            onChange={(e) => {
                             const value = e.target.value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2')
                             handleInputChange("cardExpiry", value)
                           }}
                            className="bg-vipercam-gray-dark border-vipercam-gray-light focus:border-vipercam-red text-white placeholder-gray-400"
                            placeholder="MM/YY"
                            maxLength={5}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-white">
                            CVC <span className="text-vipercam-red">*</span>
                          </label>
                          <Input
                            type="text"
                            value={formData.cardCvc}
                            onChange={(e) => {
                             const value = e.target.value.replace(/\D/g, '')
                             handleInputChange("cardCvc", value)
                           }}
                            className="bg-vipercam-gray-dark border-vipercam-gray-light focus:border-vipercam-red text-white placeholder-gray-400"
                            placeholder="123"
                            maxLength={4}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2 text-white">
                            ZIP Code <span className="text-vipercam-red">*</span>
                          </label>
                          <Input
                            type="text"
                            value={formData.zipCode}
                            onChange={(e) => {
                             const value = e.target.value.replace(/\D/g, '')
                             handleInputChange("zipCode", value)
                           }}
                            className="bg-vipercam-gray-dark border-vipercam-gray-light focus:border-vipercam-red text-white placeholder-gray-400"
                            placeholder="12345"
                            maxLength={10}
                            required
                          />
                        </div>
                      </div>

                      {/* Billing Address */}
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">Billing Address</label>
                        <Input
                          type="text"
                          value={formData.billingAddress}
                          onChange={(e) => handleInputChange("billingAddress", e.target.value)}
                          className="bg-vipercam-gray-dark border-vipercam-gray-light focus:border-vipercam-red text-white placeholder-gray-400"
                          placeholder="Billing address (if different from property address)"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-vipercam-red hover:bg-red-700 text-white font-semibold py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Submitting Request...
                        </>
                      ) : (
                        "Sign Up & Pay Securely"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Information */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Why Choose Our Monitoring?</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-white">Professional Monitoring Center</h4>
                        <p className="text-gray-400 text-sm">UL-listed monitoring facility with certified operators</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-white">Instant Response</h4>
                        <p className="text-gray-400 text-sm">Average response time of under 30 seconds</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-white">Multiple Alert Methods</h4>
                        <p className="text-gray-400 text-sm">Phone, email, SMS, and mobile app notifications</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-white">Police Dispatch</h4>
                        <p className="text-gray-400 text-sm">Direct connection to local law enforcement</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-vipercam-gray/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Pricing Information</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Basic Monitoring</span>
                      <span className="text-white font-medium">$29.99/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Professional Monitoring</span>
                      <span className="text-white font-medium">$49.99/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Enterprise Monitoring</span>
                      <span className="text-white font-medium">$99.99/month</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mt-4">
                    * Pricing includes setup and first month of service. Cancel anytime.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-vipercam-red/20 to-red-900/20 border border-vipercam-red/30 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-2">Emergency Contact</h4>
                  <p className="text-gray-300 mb-3">For immediate assistance with existing monitoring</p>
                  <p className="font-bold text-xl text-vipercam-red">(313) 258-6000</p>
                  <p className="text-sm text-gray-400">Available 24/7 for existing customers</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
} 