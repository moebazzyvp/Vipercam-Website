import { NextResponse } from "next/server"

export async function GET() {
  const supportData = {
    faqs: [
      {
        question: "How do I reset my camera to factory settings?",
        answer: "To reset your camera to factory settings, locate the reset button (usually a small hole) on the camera. Use a paperclip to press and hold it for 10-15 seconds until the LED indicator flashes. This will restore all default settings."
      },
      {
        question: "What should I do if my camera is not recording?",
        answer: "First, check if your SD card is properly inserted and has sufficient storage space. Ensure the camera is powered on and the recording indicator is active. If issues persist, try reformatting the SD card or contact our support team."
      },
      {
        question: "How do I connect my camera to WiFi?",
        answer: "Download the Vipercam app, create an account, and follow the in-app setup wizard. Make sure your WiFi password is correct and the camera is within range of your router. The app will guide you through the pairing process step by step."
      },
      {
        question: "Why is my camera's night vision not working?",
        answer: "Check if the night vision mode is enabled in your app settings. Ensure the camera lens is clean and not obstructed. Night vision requires complete darkness to activate automatically. If problems continue, verify the IR LEDs are functioning properly."
      },
      {
        question: "How do I update my camera's firmware?",
        answer: "Firmware updates are automatically pushed through the Vipercam app. Ensure your camera is connected to WiFi and the app is up to date. You'll receive a notification when updates are available. Never disconnect power during a firmware update."
      },
      {
        question: "What's the best placement for outdoor cameras?",
        answer: "Mount outdoor cameras 8-10 feet high, pointing slightly downward. Ensure they're protected from direct sunlight and rain. Position them to cover entry points like doors and windows. Avoid pointing directly at bright lights or reflective surfaces."
      }
    ],
    downloads: [
      {
        name: "Vipercam Mobile App",
        description: "Download our mobile app for iOS and Android devices",
        url: "https://apps.apple.com/app/vipercam",
        icon: "📱"
      },
      {
        name: "Desktop Software",
        description: "Windows and Mac desktop application for advanced features",
        url: "https://vipercam.net/downloads/desktop",
        icon: "💻"
      },
      {
        name: "User Manual",
        description: "Complete user guide and troubleshooting manual",
        url: "https://vipercam.net/downloads/manual",
        icon: "📖"
      },
      {
        name: "Quick Start Guide",
        description: "Get your camera up and running in minutes",
        url: "https://vipercam.net/downloads/quickstart",
        icon: "🚀"
      }
    ],
    contactInfo: {
      phone: process.env.STAFF_PHONE_1 || "(313) 800-3871",
      emergencyPhone: "(313) 258-6000",
      email: process.env.STAFF_EMAIL || "support@vipercam.net",
      hours: "Mon-Fri, 9am-5pm EST",
      emergencyHours: "Available 24/7"
    }
  }

  return NextResponse.json({
    success: true,
    data: supportData
  })
} 