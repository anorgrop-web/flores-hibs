"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation'
import Link from "next/link"
import Image from "next/image"
import { CheckCircle, Mail, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { trackHybridEvent } from "@/components/hybrid-tracker"

export default function ThankYouPage() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState<string | null>(null)
  const upsellAccepted = searchParams.get("upsell") === "true"
  const upsell2Accepted = searchParams.get("upsell2") === "true"

  useEffect(() => {
    const emailParam = searchParams.get("email")
    setEmail(emailParam)

    const orderDataStr = sessionStorage.getItem("orderData")
    if (orderDataStr) {
      try {
        const orderData = JSON.parse(orderDataStr)
        const purchaseEventId = crypto.randomUUID()

        trackHybridEvent(
          "Purchase",
          {
            ...orderData,
            locale: "us",
          },
          {
            email: emailParam || undefined,
          },
          purchaseEventId
        )

        sessionStorage.removeItem("orderData")
      } catch (error) {
        console.error("[hybrid-tracker] Error parsing order data:", error)
      }
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background">
        <div className="container mx-auto px-4 py-4">
          <Link href="/us">
            <Image src="https://mk6n6kinhajxg1fp.public.blob.vercel-storage.com/Versia/Group%201087.png" alt="Versia Garden" width={120} height={50} className="h-12 w-auto" />
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-[#016630]/10 p-4">
              <CheckCircle className="h-16 w-16 text-[#016630]" strokeWidth={1.5} />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Thanks for your order!
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty">
            {"Your order is confirmed! We'll send you all the details about your order and shipping straight to your inbox."}
          </p>

          {email && (
            <div className="bg-muted/50 border border-border rounded-lg p-6 mb-8 inline-flex items-center gap-3">
              <Mail className="h-5 w-5 text-[#016630] flex-shrink-0" />
              <div className="text-left">
                <p className="text-sm text-muted-foreground mb-1">Confirmation sent to:</p>
                <p className="text-base font-medium text-foreground">{email}</p>
              </div>
            </div>
          )}

          {upsellAccepted && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8 text-left">
              <p className="text-base text-emerald-900">
                <strong>{"You're all set!"}</strong> Your access to the <strong>Master Gardening Video Course</strong> is now active.
                Check your email for access instructions.
              </p>
            </div>
          )}

          {upsell2Accepted && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
              <p className="text-base text-blue-900">
                <strong>Offer Confirmed!</strong> Your extra Hibiscus Kit has been added to your shipment.
              </p>
            </div>
          )}

          <div className="bg-[#F3F8F4] border border-[#016630]/20 rounded-lg p-6 mb-8 text-left">
            <h2 className="text-lg font-semibold text-foreground mb-3">What happens next?</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-[#016630] mt-1">✓</span>
                <span>{"You'll get a confirmation email with your full order details"}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#016630] mt-1">✓</span>
                <span>Tracking info will be sent as soon as your order ships</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#016630] mt-1">✓</span>
                <span>Our support team is available 24/7 if you have any questions</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#016630] hover:bg-[#014d24] text-white">
              <Link href="/us">
                Back to homepage
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="mailto:support@versiagarden.com">Contact support</Link>
            </Button>
          </div>
        </div>
      </main>

      <footer className="border-t border-border mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground justify-center">
            <Link href="#" className="hover:text-foreground transition-colors">Refund Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Shipping</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Contact</Link>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            © {new Date().getFullYear()} Versia Garden. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
