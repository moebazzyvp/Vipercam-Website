import { NextRequest, NextResponse } from "next/server"

interface StaffResponse {
  conversationId: string
  staffMessage: string
  staffName?: string
  timestamp: string
}

// In-memory storage for active conversations (in production, use a database)
const activeConversations = new Map<string, {
  customerId: string
  lastActivity: Date
  messages: Array<{
    id: string
    text: string
    isUser: boolean
    timestamp: string
    sender?: string
  }>
}>()

export async function POST(request: NextRequest) {
  try {
    const body: StaffResponse = await request.json()
    
    // Validate required fields
    if (!body.conversationId || !body.staffMessage) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if conversation exists
    const conversation = activeConversations.get(body.conversationId)
    if (!conversation) {
      return NextResponse.json(
        { success: false, error: "Conversation not found" },
        { status: 404 }
      )
    }

    // Add staff response to conversation
    const staffMessage = {
      id: `staff-${Date.now()}`,
      text: body.staffMessage,
      isUser: false,
      timestamp: body.timestamp || new Date().toISOString(),
      sender: body.staffName || "Vipercam Support"
    }

    conversation.messages.push(staffMessage)
    conversation.lastActivity = new Date()

    // In a real implementation, you would:
    // 1. Store the message in a database
    // 2. Send a WebSocket message to the customer's chat
    // 3. Update the conversation status

    console.log(`Staff response added to conversation ${body.conversationId}:`, {
      message: body.staffMessage.substring(0, 100) + "...",
      staffName: body.staffName,
      timestamp: staffMessage.timestamp
    })

    return NextResponse.json({
      success: true,
      message: "Staff response sent to customer",
      conversationId: body.conversationId,
      messageId: staffMessage.id
    })

  } catch (error) {
    console.error("Error processing staff response:", error)
    return NextResponse.json(
      { success: false, error: "Failed to process staff response" },
      { status: 500 }
    )
  }
}

// Webhook endpoint for receiving responses from email/SMS services
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    
    // This would handle webhooks from email/SMS services
    // For example, when staff replies to an email or SMS
    
    const { conversationId, message, sender } = body
    
    if (!conversationId || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Process the incoming response
    const staffResponse: StaffResponse = {
      conversationId,
      staffMessage: message,
      staffName: sender || "Vipercam Support",
      timestamp: new Date().toISOString()
    }

    // Reuse the POST logic
    return await POST(request)

  } catch (error) {
    console.error("Error processing webhook response:", error)
    return NextResponse.json(
      { success: false, error: "Failed to process webhook" },
      { status: 500 }
    )
  }
}

// Helper function to create a new conversation
export function createConversation(conversationId: string, customerId: string) {
  activeConversations.set(conversationId, {
    customerId,
    lastActivity: new Date(),
    messages: []
  })
}

// Helper function to get conversation
export function getConversation(conversationId: string) {
  return activeConversations.get(conversationId)
}

// Helper function to add message to conversation
export function addMessageToConversation(conversationId: string, message: {
  id: string
  text: string
  isUser: boolean
  timestamp: string
  sender?: string
}) {
  const conversation = activeConversations.get(conversationId)
  if (conversation) {
    conversation.messages.push(message)
    conversation.lastActivity = new Date()
  }
} 