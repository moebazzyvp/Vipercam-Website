"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, HelpCircle, Shield, Phone, ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { useSupport } from "@/hooks/use-support"
import { useChatContext } from "@/context/ChatContext"

export default function SupportClientPage() {
  const { supportData, isLoading, isError } = useSupport()
  const { openChat } = useChatContext()
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [activeSection, setActiveSection] = useState("")



  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.1 }
    )

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-lg">Loading support information...</p>
        </div>
      </div>
    )
  }

  if (isError || !supportData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <HelpCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Unable to load support information</h2>
          <p className="text-gray-600 mb-4">Please try refreshing the page or contact us directly.</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  // Fallback data in case API fails
  const fallbackData = {
    contactInfo: {
      phone: "(313) 800-3871",
      emergencyPhone: "(313) 258-6000",
      email: "support@vipercam.net",
      hours: "Mon-Fri, 9am-5pm EST",
      emergencyHours: "Available 24/7"
    },
    faqs: [
      {
        question: "How do I reset my camera password if I forgot it?",
        answer: "You can reset your camera password through our mobile app by going to Settings > Security > Reset Password. If you're still having trouble, contact our support team and we can help you reset it remotely."
      },
      {
        question: "Why is my camera showing a black screen?",
        answer: "A black screen usually indicates a power or connection issue. First, check if the camera's power LED is on. If not, try unplugging and reconnecting the power adapter. If the LED is on but still black screen, check your network connection and try restarting the camera."
      },
      {
        question: "How do I set up motion detection alerts?",
        answer: "Open the Vipercam app, select your camera, go to Settings > Motion Detection. You can adjust sensitivity levels, set detection zones, and configure notification preferences. You'll receive push notifications or email alerts when motion is detected."
      },
      {
        question: "Can I view my cameras on multiple devices?",
        answer: "Yes, you can access your cameras from unlimited devices. Simply download the Vipercam app on each device and log in with your account credentials. All your cameras will be available across all devices."
      },
      {
        question: "What internet speed do I need for remote viewing?",
        answer: "For smooth remote viewing, we recommend a minimum upload speed of 2 Mbps per camera. For HD quality, aim for 5 Mbps upload speed. You can check your internet speed at speedtest.net."
      },
      {
        question: "How do I update my camera's firmware?",
        answer: "Firmware updates are typically automatic and happen overnight. To manually update, go to Camera Settings > System > Firmware Update. Never unplug your camera during an update as this can cause permanent damage."
      },
      {
        question: "Why is my camera recording quality poor?",
        answer: "Poor recording quality can be due to low light conditions, dirty lens, or incorrect settings. Clean the camera lens with a microfiber cloth, ensure adequate lighting, and check that video quality is set to your preferred resolution in the app settings."
      },
      {
        question: "How do I connect my camera to a new WiFi network?",
        answer: "Go to Camera Settings > Network > WiFi Setup. Follow the on-screen instructions to scan and select your new WiFi network. You'll need to enter the WiFi password. The camera will automatically reconnect to the new network."
      },
      {
        question: "What's the difference between local and cloud storage?",
        answer: "Local storage saves footage to an SD card in your camera or a local NVR system. Cloud storage saves footage to our secure servers. Local storage is free but limited by storage capacity, while cloud storage offers more space and remote access but requires a subscription."
      }
    ],
    downloads: [
      {
        name: "Splashtop SOS",
        description: "Remote support tool for instant technical assistance and troubleshooting sessions",
        size: "12.5 MB",
        type: "EXE",
        platform: "Windows"
      },
      {
        name: "Splashtop Streamer Windows Installer",
        description: "Professional remote access solution for Windows systems with enterprise-grade security",
        size: "28.7 MB",
        type: "EXE",
        platform: "Windows"
      },
      {
        name: "AnyDesk",
        description: "Fast and secure remote desktop application for technical support and system access",
        size: "3.2 MB",
        type: "EXE",
        platform: "Windows"
      }
    ]
  }

  // Use fallback data if API data is not available
  const data = supportData || fallbackData

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2
      }
    }
  }

  return (
    <>
      {/* Hero Banner */}
      <section className="relative py-20 overflow-hidden dark:bg-gray-900 bg-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent transform -skew-y-6"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
        </motion.div>
        <div className="container mx-auto px-4 pt-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Support <span className="dark:text-red-500 text-red-600">Center</span>
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Find answers to common questions, download resources, and get the help you need.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Help */}
      <section className="py-16 dark:bg-black bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
                        <motion.div variants={itemVariants}>
              <motion.div
                variants={cardVariants}
                whileHover="hover"
              >
                <Card className="text-center dark:bg-gray-900/50 bg-gray-50 cursor-pointer">
                  <CardContent className="p-8">
                    <motion.div
                      whileHover={{ rotate: 5 }}
                      className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4"
                    >
                      <Phone className="h-8 w-8 text-red-500" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-3">Call Support</h3>
                    <p className="dark:text-gray-400 text-gray-600 mb-4">Speak directly with our technical support team</p>
                    <p className="font-semibold text-lg">{data.contactInfo.phone}</p>
                    <p className="text-sm dark:text-gray-400 text-gray-600">{data.contactInfo.hours}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.div
                variants={cardVariants}
                whileHover="hover"
              >
                <Card className="text-center dark:bg-gray-900/50 bg-gray-50 cursor-pointer">
                  <CardContent className="p-8">
                    <motion.div
                      whileHover={{ rotate: 5 }}
                      className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4"
                    >
                      <HelpCircle className="h-8 w-8 text-red-500" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-3">Live Chat</h3>
                    <p className="dark:text-gray-400 text-gray-600 mb-4">Get instant help through our live chat system</p>
                    <Button 
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => openChat('button')}
                    >
                      Start Chat
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

                        <motion.div variants={itemVariants}>
              <motion.div
                variants={cardVariants}
                whileHover="hover"
              >
                <Card className="text-center dark:bg-gray-900/50 bg-gray-50 cursor-pointer">
                  <CardContent className="p-8">
                    <motion.div
                      whileHover={{ rotate: 5 }}
                      className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4"
                    >
                      <Shield className="h-8 w-8 text-red-500" />
                    </motion.div>
                    <h3 className="text-xl font-semibold mb-3">Emergency Support</h3>
                    <p className="dark:text-gray-400 text-gray-600 mb-4">24/7 emergency support for critical issues</p>
                    <p className="font-semibold text-lg text-red-500">{data.contactInfo.emergencyPhone}</p>
                    <p className="text-sm dark:text-gray-400 text-gray-600">{data.contactInfo.emergencyHours}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="py-16 dark:bg-gray-900/50 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl dark:text-gray-400 text-gray-600 max-w-2xl mx-auto">
              Find quick answers to the most common questions about our products and services
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
                         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {data.faqs.map((faq, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  >
                    <Card className="dark:bg-gray-800 bg-white cursor-pointer h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-red-500">
                    <CardContent className="p-6 h-full flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight pr-4">
                          {faq.question}
                        </h3>
                        <motion.div
                          animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex-shrink-0 mt-1"
                        >
                          {expandedFaq === index ? (
                            <ChevronUp className="h-5 w-5 text-red-500" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-red-500" />
                          )}
                        </motion.div>
                      </div>
                      <AnimatePresence>
                        {expandedFaq === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex-grow"
                          >
                            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                              <p className="dark:text-gray-300 text-gray-700 text-sm leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {expandedFaq !== index && (
                        <div className="flex-grow flex items-end">
                          <div className="w-full h-1 bg-gradient-to-r from-red-500/20 to-transparent rounded-full"></div>
                        </div>
                      )}
                    </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Downloads */}
      <section id="downloads" className="py-16 dark:bg-black bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Downloads</h2>
            <p className="text-xl dark:text-gray-400 text-gray-600 max-w-2xl mx-auto">
              Download our apps, software, and documentation
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
                         {data.downloads.map((download, index) => (
              <motion.div key={index} variants={itemVariants}>
                <motion.div
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <Card className="dark:bg-gray-900/50 bg-gray-50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <motion.div
                        whileHover={{ rotate: 5 }}
                        className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center"
                      >
                        <Download className="h-6 w-6 text-red-500" />
                      </motion.div>
                      <span className="text-xs dark:text-gray-400 text-gray-600 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                        {download.type}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{download.name}</h3>
                    <p className="dark:text-gray-400 text-gray-600 mb-2">{download.description}</p>
                    <p className="text-sm text-gray-500 mb-4">Platform: {download.platform}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm dark:text-gray-400 text-gray-600">{download.size}</span>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


    </>
  )
} 