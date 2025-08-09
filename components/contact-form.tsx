"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Send, Loader2, CheckCircle, MessageSquare } from "lucide-react"
import { toast } from "sonner"

interface ContactFormProps {
  showContactInfo?: boolean
  className?: string
}

export default function ContactForm({ showContactInfo = true, className = "" }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    service: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const services = [
    "Commercial Security",
    "Residential Security",
    "Cloud Storage",
    "24/7 Monitoring",
    "Installation Services",
    "Maintenance & Support",
    "Custom Solution",
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.message.trim()) newErrors.message = "Message is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        toast.success("Message sent successfully!")
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          subject: "",
          message: "",
          service: "",
        })
      } else {
        // Handle validation errors
        if (result.error) {
          setErrors({ submit: result.error })
          toast.error(result.error)
        }
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setErrors({ submit: "Failed to send message. Please try again." })
      toast.error("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className={`grid lg:grid-cols-2 gap-12 ${className}`}>
      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Card className="bg-vipercam-gray/30 border-vipercam-gray-light backdrop-blur-sm">
          <CardContent className="p-8">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Message Sent Successfully!</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Thank you for contacting Vipercam. Our team will review your message and get back to you within 24
                  hours.
                </p>
                <div className="space-y-3 mb-6">
                  <p className="text-sm text-gray-400">
                    <strong className="text-white">Next steps:</strong>
                  </p>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• We'll review your requirements</li>
                    <li>• Schedule a consultation call</li>
                    <li>• Provide a custom quote</li>
                  </ul>
                </div>
                <Button onClick={() => setIsSubmitted(false)} className="bg-vipercam-red hover:bg-red-700 text-white">
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <>
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-white">Get in Touch</h3>
                  <p className="text-gray-400">
                    Ready to secure your property? Fill out the form below and we'll get back to you promptly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email Row */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white">
                        Name <span className="text-vipercam-red">*</span>
                      </label>
                      <Input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={`bg-vipercam-gray-dark border-vipercam-gray-light focus:border-vipercam-red text-white placeholder-gray-400 ${
                          errors.name ? "border-red-500" : ""
                        }`}
                        placeholder="Your full name"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white">
                        Email <span className="text-vipercam-red">*</span>
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`bg-vipercam-gray-dark border-vipercam-gray-light focus:border-vipercam-red text-white placeholder-gray-400 ${
                          errors.email ? "border-red-500" : ""
                        }`}
                        placeholder="your@email.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Phone & Company Row */}
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

                  {/* Service & Subject Row */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white">Service Interest</label>
                      <select
                        value={formData.service}
                        onChange={(e) => handleInputChange("service", e.target.value)}
                        className="w-full bg-vipercam-gray-dark border border-vipercam-gray-light rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-vipercam-red focus:border-transparent"
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-white">Subject</label>
                      <Input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        className="bg-vipercam-gray-dark border-vipercam-gray-light focus:border-vipercam-red text-white placeholder-gray-400"
                        placeholder="Brief subject line"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">
                      Message <span className="text-vipercam-red">*</span>
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      rows={5}
                      className={`bg-vipercam-gray-dark border-vipercam-gray-light focus:border-vipercam-red text-white placeholder-gray-400 resize-none ${
                        errors.message ? "border-red-500" : ""
                      }`}
                      placeholder="Tell us about your security needs, property size, specific requirements, or any questions you have..."
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  {/* Error Display */}
                  {errors.submit && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      <p className="text-red-500 text-sm">{errors.submit}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-vipercam-red hover:bg-red-700 text-white font-semibold py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Contact Information */}
      {showContactInfo && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Contact Methods */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>

            <div className="space-y-6">
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-start space-x-4 p-4 rounded-lg bg-vipercam-gray/20 border border-vipercam-gray-light hover:border-vipercam-red/50 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-vipercam-red/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-vipercam-red" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Phone Support</h4>
                  <p className="text-gray-400 mb-2">Speak directly with our security experts</p>
                  <p className="font-medium text-white">(313) 800-3871</p>
                  <p className="text-sm text-gray-400">Mon-Fri, 8am-8pm EST</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-start space-x-4 p-4 rounded-lg bg-vipercam-gray/20 border border-vipercam-gray-light hover:border-vipercam-red/50 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-vipercam-red/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-vipercam-red" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Email Support</h4>
                  <p className="text-gray-400 mb-2">Get detailed responses to your questions</p>
                  <p className="font-medium text-white">support@vipercam.net</p>
                  <p className="text-sm text-gray-400">Response within 4 hours</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-start space-x-4 p-4 rounded-lg bg-vipercam-gray/20 border border-vipercam-gray-light hover:border-vipercam-red/50 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-vipercam-red/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-vipercam-red" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Visit Our Office</h4>
                  <p className="text-gray-400 mb-2">Schedule an in-person consultation</p>
                  <p className="font-medium text-white">{"27349 W Warren "}</p>
                  <p className="text-white">Dearborn Heights, 48127  </p>
                  <p className="text-sm text-gray-400">By appointment only</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Actions</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button className="bg-green-600 hover:bg-green-700 text-white font-medium py-3" asChild>
                <a href="tel:+13138003871" className="flex items-center justify-center">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </a>
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3" asChild>
                <a
                  href="https://wa.me/13138003871"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-gradient-to-r from-vipercam-red/20 to-red-900/20 border border-vipercam-red/30 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-white mb-2">24/7 Emergency Support</h4>
            <p className="text-gray-300 mb-3">For critical security system issues that require immediate attention</p>
            <p className="font-bold text-xl text-vipercam-red">(313) 258-6000</p>
            <p className="text-sm text-gray-400">Available 24/7 for existing customers</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
