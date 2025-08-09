import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supportData = {
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
      ],

    }

    return NextResponse.json({
      success: true,
      data: supportData
    })
  } catch (error) {
    console.error("Error fetching support data:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch support data" },
      { status: 500 }
    )
  }
} 