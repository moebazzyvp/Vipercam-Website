import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, address, monitoringType, cameraCount, message } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification to sales team
    // 3. Send confirmation email to customer
    // 4. Create lead in CRM system
    // 5. Schedule follow-up call

    // For now, we'll just log and return success
    console.log("Monitoring signup submission:", {
      name,
      email,
      phone,
      company,
      address,
      monitoringType,
      cameraCount,
      message,
      timestamp: new Date().toISOString(),
      leadType: "monitoring_signup",
    })

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your monitoring request. Our team will contact you within 24 hours to discuss your requirements and provide a custom quote.",
        nextSteps: [
          "Initial consultation call",
          "Custom quote preparation",
          "Service setup and installation",
        ],
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Monitoring signup error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 