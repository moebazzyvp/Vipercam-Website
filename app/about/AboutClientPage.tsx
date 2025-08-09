"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Phone, Mail, MapPin, Target, Eye, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useCompany } from "@/hooks/use-company"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

const iconMap = {
  Shield,
  Eye,
  Heart,
  Target,
}

export default function AboutClientPage() {
  const { companyData, isLoading, isError } = useCompany()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-vipercam-dark pt-16 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading company information..." />
      </div>
    )
  }

  if (isError || !companyData) {
    return (
      <div className="min-h-screen bg-vipercam-dark pt-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Error Loading Page</h2>
          <p className="text-gray-300 mb-4">Unable to load company information.</p>
          <Button onClick={() => window.location.reload()} className="bg-vipercam-red hover:bg-red-700">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  const { stats, teamMembers, companyValues, milestones, contactInfo } = companyData

  return (
    <div className="min-h-screen bg-vipercam-dark pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-vipercam-dark via-vipercam-gray to-vipercam-dark">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-vipercam-red text-white mb-4">Est. 2004</Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">About Vipercam</h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                For over 20 years, Vipercam has been Detroit's trusted partner in security solutions. Founded in 2004,
                we've grown from a small local business to a leading provider of comprehensive surveillance and security
                systems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-vipercam-red hover:bg-red-700 text-white">
                  <Link href="/contact">Get In Touch</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-vipercam-gray bg-transparent"
                >
                  <Link href="/services">Our Services</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/logo-vipercam.png"
                alt="Vipercam Company"
                width={500}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-16 bg-vipercam-gray">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-vipercam-red mb-2">{stats.yearsExperience}</div>
              <div className="text-gray-300">Years of Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-vipercam-red mb-2">{stats.systemsInstalled}</div>
              <div className="text-gray-300">Systems Installed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-vipercam-red mb-2">{stats.supportAvailable}</div>
              <div className="text-gray-300">Support Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-vipercam-red mb-2">{stats.customerSatisfaction}</div>
              <div className="text-gray-300">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Our Story</h2>
              <p className="text-xl text-gray-300">
                Two decades of innovation, dedication, and unwavering commitment to security excellence.
              </p>
            </div>

            <div className="prose prose-lg prose-invert max-w-none">
              <div className="bg-vipercam-gray rounded-lg p-8 mb-8">
                <p className="text-gray-300 leading-relaxed mb-6">
                  Vipercam was born from a simple yet powerful vision: to provide Detroit and surrounding communities
                  with access to professional-grade security solutions that were previously only available to large
                  corporations. Founded in 2004 by Ed, our company started as a small operation focused on residential
                  security installations.
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Over the years, we've evolved alongside technology, embracing innovations in digital surveillance,
                  cloud storage, artificial intelligence, and mobile connectivity. What hasn't changed is our commitment
                  to personalized service and our understanding that every client's security needs are unique.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Today, Vipercam stands as a testament to the power of combining cutting-edge technology with
                  old-fashioned customer service. We're proud to have protected thousands of homes and businesses
                  throughout Michigan, and we look forward to many more years of keeping our community safe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-20 bg-vipercam-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our experienced team of security professionals is dedicated to providing you with the best possible
              service and support.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="bg-vipercam-dark border-vipercam-gray-light hover:border-vipercam-red transition-colors duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-6">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={120}
                      height={120}
                      className="rounded-full mx-auto border-4 border-vipercam-red"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                  <p className="text-vipercam-red font-medium mb-4">{member.role}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The principles that guide everything we do and shape our commitment to excellence in security solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => {
              const IconComponent = iconMap[value.title as keyof typeof iconMap] || Shield
              return (
                <Card
                  key={index}
                  className="bg-vipercam-gray border-vipercam-gray-light hover:border-vipercam-red transition-all duration-300 hover:shadow-lg"
                >
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <IconComponent className="h-12 w-12 text-vipercam-red mx-auto" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-3">{value.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-vipercam-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Journey</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Key milestones in our 20-year journey of innovation and growth in the security industry.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-vipercam-red hidden md:block"></div>

              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex items-start">
                    {/* Timeline dot */}
                    <div className="hidden md:flex absolute left-6 w-4 h-4 bg-vipercam-red rounded-full border-4 border-vipercam-dark"></div>

                    {/* Content */}
                    <div className="md:ml-16 bg-vipercam-dark rounded-lg p-6 border border-vipercam-gray-light hover:border-vipercam-red transition-colors duration-300">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                        <h3 className="text-xl font-semibold text-white">{milestone.title}</h3>
                        <Badge className="bg-vipercam-red text-white w-fit">{milestone.year}</Badge>
                      </div>
                      <p className="text-gray-300 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-br from-vipercam-dark via-vipercam-gray to-vipercam-dark">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Work With Us?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Experience the Vipercam difference. Contact us today to discuss your security needs and discover how our 20+
            years of expertise can protect what matters most to you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-vipercam-red hover:bg-red-700 text-white">
              <Link href="/contact">Get Started Today</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-600 text-white hover:bg-vipercam-gray bg-transparent"
            >
              <Link href="/services">View Our Services</Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-2 text-gray-300">
              <Phone className="h-5 w-5 text-vipercam-red" />
              <span>{contactInfo.phone}</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-300">
              <Mail className="h-5 w-5 text-vipercam-red" />
              <span>{contactInfo.email}</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-gray-300">
              <MapPin className="h-5 w-5 text-vipercam-red" />
              <span>{contactInfo.location}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 