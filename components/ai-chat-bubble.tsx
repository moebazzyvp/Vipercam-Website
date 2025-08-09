"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send } from "lucide-react"
import { products } from "@/lib/product-data"
import { useChatContext } from "@/context/ChatContext"

interface ChatMessage {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

const aiChatData = {
  keywords: {
    camera:
      "We offer a wide range of professional surveillance cameras including eyeball, dome, bullet, fisheye, multi-sensor, thermal, box, PTZ, and speed dome cameras. Our cameras feature AI analytics, 4K resolution, night vision, and weatherproof construction.",
    price:
      "Our cameras are competitively priced for professional surveillance applications. Please contact our sales team for detailed pricing information and volume discounts. We offer flexible pricing options for different project sizes.",
    pricing:
      "Our cameras are competitively priced for professional surveillance applications. Please contact our sales team for detailed pricing information and volume discounts. We offer flexible pricing options for different project sizes.",
    installation:
      "We provide comprehensive installation support including technical documentation, installation guides, and professional installation services. Our cameras feature easy setup with PoE connectivity and user-friendly configuration.",
    setup:
      "Our cameras are designed for easy setup with plug-and-play functionality. We provide detailed setup guides, remote configuration assistance, and 24/7 technical support to ensure smooth installation.",
    support:
      "We offer comprehensive support including 24/7 technical assistance, remote troubleshooting, firmware updates, and professional training. Contact our support team at (313) 800-3871 for immediate help.",
    help:
      "Our support team is here to help with any questions about our cameras, installation, configuration, or troubleshooting. We provide detailed documentation, video tutorials, and direct technical support.",
    specifications:
      "Our cameras feature professional-grade specifications including 4K Ultra HD resolution, advanced night vision, weatherproof IP67 rating, AI-powered analytics, and flexible connectivity options.",
    features:
      "Our cameras include advanced features like AI motion detection, facial recognition, license plate recognition, smart alerts, cloud storage integration, mobile app control, and professional-grade construction.",
    warranty:
      "All our cameras come with comprehensive warranty coverage including hardware replacement, technical support, and firmware updates. We stand behind our products with industry-leading warranty terms.",
    monitoring:
      "We offer professional monitoring services with 24/7 surveillance center coverage, instant alerts, emergency response coordination, and detailed reporting. Our monitoring plans include Basic, Professional, and Enterprise options.",
    "monitoring service":
      "Our monitoring services provide 24/7 professional surveillance with trained operators, instant alert response, emergency dispatch coordination, and comprehensive reporting for complete peace of mind.",
    service:
      "We offer comprehensive services including installation, configuration, monitoring, maintenance, training, and ongoing support. Our service packages are designed to meet professional surveillance requirements.",
  },
  responses: {
    greeting:
      "Hello! I'm here to help you with Vipercam surveillance solutions. I can assist with product information, technical specifications, installation guidance, and more. What can I help you with today?",
    fallback:
      "I'd be happy to help you with that! For specific technical questions or detailed information, please contact our support team at (313) 800-3871 or email support@vipercam.net. Is there anything else about our cameras or services I can help you with?",
  },
}

export default function AiChatBubble() {
  const { isOpen, isAnimating, triggerSource, closeChat, toggleChat } = useChatContext()
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: aiChatData.responses.greeting,
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isHandoffRequested, setIsHandoffRequested] = useState(false)
  const [conversationId, setConversationId] = useState<string>("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [customerName, setCustomerName] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const needsHumanHandoff = (userMessage: string): boolean => {
    const lowerMessage = userMessage.toLowerCase()
    
    // Keywords that indicate need for human help
    const handoffKeywords = [
      'speak to someone', 'talk to someone', 'human', 'person', 'agent', 'representative',
      'real person', 'live person', 'customer service', 'support team', 'help desk',
      'urgent', 'emergency', 'broken', 'not working', 'issue', 'problem', 'complaint',
      'billing', 'payment', 'refund', 'cancel', 'specific', 'detailed', 'complex'
    ]
    
    // Check if message contains handoff keywords
    if (handoffKeywords.some(keyword => lowerMessage.includes(keyword))) {
      return true
    }
    
    // Check if message is very long (might be complex)
    if (userMessage.length > 200) {
      return true
    }
    
    // Check if this is the 3rd or more message (escalation)
    const userMessages = messages.filter(m => m.isUser).length
    if (userMessages >= 3) {
      return true
    }
    
    return false
  }

  const requestHumanHandoff = async (userMessage: string, reason: string) => {
    try {
      const newConversationId = `conv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      setConversationId(newConversationId)
      setIsHandoffRequested(true)
      
      const handoffData = {
        conversationId: newConversationId,
        customerMessage: userMessage,
        customerEmail: customerEmail || undefined,
        customerName: customerName || undefined,
        chatHistory: messages.map(m => ({
          id: m.id,
          text: m.text,
          isUser: m.isUser,
          timestamp: m.timestamp.toISOString()
        })),
        reason: reason
      }
      
      const response = await fetch('/api/chat/handoff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(handoffData),
      })
      
      const result = await response.json()
      
      if (result.success) {
        return `I understand you need more specific assistance. I'm connecting you with our support team now. They'll be with you shortly (usually within 5-10 minutes). Your conversation ID is: ${newConversationId}`
      } else {
        throw new Error(result.error || 'Failed to request handoff')
      }
      
    } catch (error) {
      console.error('Error requesting human handoff:', error)
      return "I apologize, but I'm having trouble connecting you to our support team right now. Please call us directly at (313) 800-3871 or email support@vipercam.net for immediate assistance."
    }
  }

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    // Check if human handoff is needed
    if (needsHumanHandoff(userMessage)) {
      const reason = lowerMessage.includes('urgent') || lowerMessage.includes('emergency') 
        ? 'urgent_request' 
        : lowerMessage.includes('speak to someone') || lowerMessage.includes('human')
        ? 'human_requested'
        : 'complex_inquiry'
      
      // This will be handled in handleSendMessage
      return 'HUMAN_HANDOFF_NEEDED'
    }

    // Check for product-specific queries
    const mentionedProduct = products.find(
      (product) => lowerMessage.includes(product.name.toLowerCase()) || lowerMessage.includes(product.id.toLowerCase()),
    )

    if (mentionedProduct) {
      return `The ${mentionedProduct.displayName} is a ${mentionedProduct.description} It features ${mentionedProduct.features.slice(0, 3).join(", ")} and more. Would you like detailed specifications or pricing information?`
    }

    // Check for keyword matches
    for (const [keyword, response] of Object.entries(aiChatData.keywords)) {
      if (lowerMessage.includes(keyword)) {
        return response
      }
    }

    // Check for specific response triggers
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return "Hello! How can I help you with your Vipercam surveillance needs today?"
    }

    if (lowerMessage.includes("thank")) {
      return "You're welcome! Feel free to ask if you have any other questions about our surveillance solutions."
    }

    return aiChatData.responses.fallback
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue("")
    setIsTyping(true)

    // Check if human handoff is needed
    const aiResponse = generateResponse(currentInput)
    
    if (aiResponse === 'HUMAN_HANDOFF_NEEDED') {
      // Request human handoff
      const handoffResponse = await requestHumanHandoff(currentInput, 'complex_inquiry')
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: handoffResponse,
        isUser: false,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    } else {
      // Normal AI response
      setTimeout(() => {
        const aiMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: aiResponse,
          isUser: false,
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, aiMessage])
        setIsTyping(false)
      }, 1000 + Math.random() * 2000) // Random delay between 1-3 seconds
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Animation variants
  const bubbleVariants = {
    idle: {
      scale: 1,
      rotate: 0,
      boxShadow: "0 10px 25px rgba(239, 68, 68, 0.3)",
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut"
      }
    },
    hover: {
      scale: 1.1,
      boxShadow: "0 15px 35px rgba(239, 68, 68, 0.5)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    pressed: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    },
    triggeredFromButton: {
      scale: [1, 1.3, 0.8, 1.2, 1],
      rotate: [0, 10, -10, 5, 0],
      boxShadow: "0 20px 40px rgba(239, 68, 68, 0.6)",
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const chatVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transformOrigin: "bottom right",
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transformOrigin: "bottom right",
      transition: {
        duration: 0.5,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transformOrigin: "bottom right",
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  }

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }

  const messageVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 chat-bubble-container">
      <AnimatePresence mode="wait">
        {!isOpen && (
          <motion.div
            key="bubble"
            variants={bubbleVariants}
            initial="idle"
            animate={
              triggerSource === 'button' && isAnimating
                ? "triggeredFromButton"
                : "idle"
            }
            whileHover="hover"
            whileTap="pressed"
            exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
            className="chat-bubble-container"
          >
            <motion.div
              onClick={toggleChat}
              className="h-16 w-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 flex items-center justify-center cursor-pointer"
              style={{
                border: 'none',
                outline: 'none',
                boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)',
                WebkitUserSelect: 'none',
                userSelect: 'none'
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleChat();
                }
              }}
            >
              <motion.div
                animate={{
                  rotate: isAnimating ? [0, 360] : 0,
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut"
                }}
              >
                <MessageCircle className="h-6 w-6 text-white" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {isOpen && (
          <motion.div
            key="chat"
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Card className="w-96 h-[500px] bg-black text-white shadow-2xl overflow-hidden border border-gray-800 rounded-2xl">
              <motion.div
                variants={headerVariants}
                className="flex items-center justify-between p-6 border-b border-gray-800 bg-gradient-to-r from-black to-gray-900"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="h-8 w-8 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center"
                  >
                    <MessageCircle className="h-4 w-4 text-white" />
                  </motion.div>
                  <div>
                    <span className="font-semibold text-lg">Vipercam AI Assistant</span>
                    <p className="text-xs text-gray-400">Online now</p>
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    onClick={closeChat}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-400 hover:text-white hover:bg-red-600 rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
              </motion.div>

              <CardContent className="p-0 h-80 overflow-y-auto bg-gray-900 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
                <div className="p-6 space-y-4">
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${message.isUser ? "justify-end" : "justify-start"} mb-4`}
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-lg ${
                          message.isUser 
                            ? "bg-gradient-to-br from-red-500 to-red-600 text-white rounded-br-md" 
                            : "bg-gray-800 text-gray-100 border border-gray-700 rounded-bl-md"
                        }`}
                      >
                        {message.text}
                      </motion.div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex justify-start mb-4"
                    >
                      <div className="bg-gray-800 border border-gray-700 text-gray-100 p-4 rounded-2xl rounded-bl-md text-sm shadow-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </CardContent>

              {/* Customer Information Form for Handoff */}
              {isHandoffRequested && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border-t border-gray-800 bg-gray-900"
                >
                  <div className="space-y-3">
                    <p className="text-sm text-gray-300">Please provide your contact information for our support team:</p>
                    <Input
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Your name"
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 rounded-lg"
                    />
                    <Input
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="Your email address"
                      type="email"
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 rounded-lg"
                    />
                  </div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 border-t border-gray-800 bg-black"
              >
                <div className="flex gap-3">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isHandoffRequested ? "Continue chatting with our team..." : "Ask about cameras, pricing, support..."}
                    className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      size="icon"
                      className="bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl h-12 w-12 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}