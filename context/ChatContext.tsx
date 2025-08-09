"use client"

import React, { createContext, useContext, useState } from "react"

interface ChatContextType {
  isOpen: boolean
  isAnimating: boolean
  triggerSource: 'bubble' | 'button' | null
  openChat: (source?: 'bubble' | 'button') => void
  closeChat: () => void
  toggleChat: () => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [triggerSource, setTriggerSource] = useState<'bubble' | 'button' | null>(null)

  const openChat = (source: 'bubble' | 'button' = 'bubble') => {
    setTriggerSource(source)
    setIsAnimating(true)
    setIsOpen(true)
    // Reset animation state after animation completes
    setTimeout(() => setIsAnimating(false), 1000)
  }

  const closeChat = () => {
    setIsAnimating(true)
    setIsOpen(false)
    setTriggerSource(null)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const toggleChat = () => {
    if (isOpen) {
      closeChat()
    } else {
      openChat('bubble')
    }
  }

  return (
    <ChatContext.Provider value={{ isOpen, isAnimating, triggerSource, openChat, closeChat, toggleChat }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChatContext() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider")
  }
  return context
}