import type { Metadata } from "next"
import ContactForm from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Contact Us | Vipercam",
  description:
    "Get in touch with Vipercam for professional surveillance solutions. Call, email, or use our contact form for a free consultation.",
}

export default function ContactPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative py-20 overflow-hidden dark:bg-vipercam-dark bg-vipercam-gray">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent transform -skew-y-6"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 pt-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get In <span className="text-vipercam-red">Touch</span>
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
              Ready to secure your property? Let's discuss your security needs and find the perfect solution for you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-vipercam-dark">
        <div className="container mx-auto px-4">
          <ContactForm />
        </div>
      </section>

      {/* Map Section */}
      

      {/* Business Hours */}
      <section className="py-16 bg-vipercam-dark">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white">Business Hours</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Monday - Friday</span>
                  <span className="font-medium text-white">Varies</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Saturday</span>
                  <span className="font-medium text-white">Varies</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Sunday</span>
                  <span className="font-medium text-white">Emergency support only</span>
                </div>
                <div className="border-t border-vipercam-gray-light pt-4 mt-6">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Emergency Support</span>
                    <span className="font-medium text-vipercam-red">24/7 Available</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white">Service Areas</h2>
              <p className="text-lg mb-4 text-gray-300">We proudly serve the following areas:</p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-vipercam-red rounded-full mr-3"></div>
                  <span className="text-gray-300">Detroit Metro Area</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-vipercam-red rounded-full mr-3"></div>
                  <span className="text-gray-300">Suburban Communities</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-vipercam-red rounded-full mr-3"></div>
                  <span className="text-gray-300">Industrial Districts</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-vipercam-red rounded-full mr-3"></div>
                  <span className="text-gray-300">Commercial Centers</span>
                </li>
              </ul>
              <p className="text-sm mt-4 text-gray-400">
                Don't see your area listed? Contact us to discuss service availability in your location.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
