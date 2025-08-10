import { NextResponse } from "next/server"

export async function GET() {
  try {
    const companyData = {
      stats: {
        yearsExperience: "20+",
        systemsInstalled: "1000+",
        supportAvailable: "24/7",
        customerSatisfaction: "99%"
      },
      teamMembers: [
        {
          name: "Ed",
          role: "Founder/Owner (CEO)",
          image: "/logo-vipercam.png",
          description: "With over 20 years in the security industry, Ed founded Vipercam in 2004 with a vision to provide cutting-edge security solutions to businesses and homeowners."
        },
        {
          name: "Moe",
          role: "Head Technician (CTO & Head of Operations)",
          image: "/logo-vipercam.png",
          description: "Moe leads our technical operations with expertise in advanced surveillance systems, network security, and innovative technology integration."
        },
        {
          name: "Hassan",
          role: "Senior Technician",
          image: "/logo-vipercam.png",
          description: "Hassan brings extensive field experience in installation, maintenance, and customer support, ensuring every system operates at peak performance."
        }
      ],
      companyValues: [
        {
          title: "Security First",
          description: "We prioritize the safety and security of our clients above all else, using only the highest quality equipment and proven methodologies."
        },
        {
          title: "Innovation",
          description: "We stay at the forefront of security technology, continuously updating our solutions with the latest advancements in surveillance and monitoring."
        },
        {
          title: "Customer Care",
          description: "Our commitment to exceptional customer service means we're always available to support our clients with responsive, professional assistance."
        },
        {
          title: "Precision",
          description: "Every installation is executed with meticulous attention to detail, ensuring optimal coverage and system performance for maximum security."
        }
      ],
      milestones: [
        {
          year: "2004",
          title: "Company Founded",
          description: "Vipercam was established in Detroit, Michigan with a mission to provide professional security solutions."
        },
        {
          year: "2008",
          title: "First Major Contract",
          description: "Secured our first large commercial installation, establishing our reputation in the business community."
        },
        {
          year: "2012",
          title: "Technology Expansion",
          description: "Expanded our services to include advanced IP camera systems and cloud-based monitoring solutions."
        },
        {
          year: "2016",
          title: "Mobile Innovation",
          description: "Launched our custom mobile app platform, giving clients unprecedented control over their security systems."
        },
        {
          year: "2020",
          title: "AI Integration",
          description: "Integrated artificial intelligence and machine learning capabilities into our surveillance systems."
        },
        {
          year: "2024",
          title: "20 Years Strong",
          description: "Celebrating two decades of protecting Detroit and surrounding areas with cutting-edge security solutions."
        }
      ],
      contact: {
        phone: process.env.STAFF_PHONE_1 || "(313) 800-3871",
        email: process.env.STAFF_EMAIL || "support@vipercam.net",
        address: "Detroit, Michigan",
        website: "https://vipercam.net"
      }
    }

    return NextResponse.json({
      success: true,
      data: companyData
    })
  } catch (error) {
    console.error("Error fetching company data:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch company data" },
      { status: 500 }
    )
  }
} 