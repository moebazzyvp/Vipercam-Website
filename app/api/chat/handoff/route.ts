import { NextRequest, NextResponse } from "next/server"
import twilio from "twilio"
import sgMail from "@sendgrid/mail"

interface HandoffRequest {
  conversationId: string
  customerMessage: string
  customerEmail?: string
  customerName?: string
  chatHistory: Array<{
    id: string
    text: string
    isUser: boolean
    timestamp: string
  }>
  reason: string
}

interface StaffNotification {
  conversationId: string
  customerMessage: string
  customerEmail?: string
  customerName?: string
  timestamp: string
  urgency: 'low' | 'medium' | 'high'
}

// In a real implementation, these would be environment variables
const STAFF_EMAIL = process.env.STAFF_EMAIL || "support@vipercam.net"
const STAFF_PHONES = [
  process.env.STAFF_PHONE_1,
  process.env.STAFF_PHONE_2,
  process.env.STAFF_PHONE_3,
  process.env.STAFF_PHONE_4
].filter(Boolean) // Remove any undefined values
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER

export async function POST(request: NextRequest) {
  try {
    const body: HandoffRequest = await request.json()
    
    // Validate required fields
    if (!body.conversationId || !body.customerMessage) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Create staff notification
    const notification: StaffNotification = {
      conversationId: body.conversationId,
      customerMessage: body.customerMessage,
      customerEmail: body.customerEmail,
      customerName: body.customerName,
      timestamp: new Date().toISOString(),
      urgency: determineUrgency(body.customerMessage, body.reason)
    }

    // Send notifications to staff
    const notificationResults = await Promise.allSettled([
      sendEmailNotification(notification),
      sendSMSNotification(notification)
    ])

    // Log the handoff for tracking
    console.log(`Human handoff requested for conversation ${body.conversationId}:`, {
      reason: body.reason,
      customerMessage: body.customerMessage.substring(0, 100) + "...",
      timestamp: notification.timestamp
    })

    return NextResponse.json({
      success: true,
      message: "Handoff request sent to support team",
      conversationId: body.conversationId,
      estimatedResponseTime: "5-10 minutes"
    })

  } catch (error) {
    console.error("Error processing handoff request:", error)
    return NextResponse.json(
      { success: false, error: "Failed to process handoff request" },
      { status: 500 }
    )
  }
}

function determineUrgency(message: string, reason: string): 'low' | 'medium' | 'high' {
  const urgentKeywords = ['urgent', 'emergency', 'broken', 'not working', 'down', 'critical']
  const mediumKeywords = ['help', 'issue', 'problem', 'trouble', 'need assistance']
  
  const lowerMessage = message.toLowerCase()
  
  if (urgentKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return 'high'
  }
  
  if (mediumKeywords.some(keyword => lowerMessage.includes(keyword))) {
    return 'medium'
  }
  
  return 'low'
}

async function sendEmailNotification(notification: StaffNotification): Promise<void> {
  try {
    if (!process.env.SENDGRID_API_KEY) {
      console.log("SendGrid API key not configured, skipping email notification")
      return
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const emailContent = `
New Support Request from Website Chat

Conversation ID: ${notification.conversationId}
Customer: ${notification.customerName || 'Anonymous'}
Email: ${notification.customerEmail || 'Not provided'}
Urgency: ${notification.urgency.toUpperCase()}
Time: ${new Date(notification.timestamp).toLocaleString()}

Customer Message:
${notification.customerMessage}

To respond, please reply to this email with your message.
The response will be automatically sent to the customer's chat.

---
Vipercam Support Team
Phone: ${STAFF_PHONES[0] || '(313) 800-3871'}
Email: ${STAFF_EMAIL}
    `.trim()

    const msg = {
      to: STAFF_EMAIL,
      from: 'noreply@vipercam.net', // This should be a verified sender in SendGrid
      subject: `New Support Request - ${notification.urgency.toUpperCase()} Priority`,
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>')
    }

    await sgMail.send(msg)
    console.log(`Email notification sent to ${STAFF_EMAIL}`)
    
  } catch (error) {
    console.error("Failed to send email notification:", error)
    throw error
  }
}

async function sendSMSNotification(notification: StaffNotification): Promise<void> {
  try {
    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_PHONE_NUMBER) {
      console.log("Twilio credentials not configured, skipping SMS notification")
      return
    }

    if (STAFF_PHONES.length === 0) {
      console.log("No staff phone numbers configured, skipping SMS notification")
      return
    }

    const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

    const urgencyEmoji = {
      low: '🟢',
      medium: '🟡', 
      high: '🔴'
    }

    const smsMessage = `${urgencyEmoji[notification.urgency]} New support request from website chat

Customer: ${notification.customerName || 'Anonymous'}
Urgency: ${notification.urgency.toUpperCase()}

Message: ${notification.customerMessage.substring(0, 100)}${notification.customerMessage.length > 100 ? '...' : ''}

Reply to this number to respond to the customer.`

    // Send SMS to all staff phone numbers
    for (const staffPhone of STAFF_PHONES) {
      try {
        await client.messages.create({
          body: smsMessage,
          from: TWILIO_PHONE_NUMBER,
          to: staffPhone
        })
        console.log(`SMS notification sent to ${staffPhone}`)
      } catch (smsError) {
        console.error(`Failed to send SMS to ${staffPhone}:`, smsError)
        // Continue with other phone numbers even if one fails
      }
    }
    
  } catch (error) {
    console.error("Failed to send SMS notification:", error)
    throw error
  }
} 