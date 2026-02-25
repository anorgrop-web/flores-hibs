"use client"

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play, Check } from 'lucide-react'

declare global {
  interface Window {
    fbq?: (action: string, eventName: string, params?: any) => void
  }
}

export default function Upsell1Page() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const email = searchParams.get("email")
  const customer = searchParams.get("customer")

  useEffect(() => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Purchase", {
        value: 29.90,
        currency: "USD",
        content_name: "Master Gardening Course",
        content_type: "product",
      })
    }
  }, [])

  const handleAccept = async () => {
    setIsLoading(true)
    setErrorMessage(null)

    if (!customer) {
      setErrorMessage("Customer ID not found. Please contact support.")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/stripe/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: customer,
          priceId: "price_1T4lrKCNWzvB3NeguJtQyRvu",
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create subscription")
      }

      router.push(`/us/upsell2?email=${encodeURIComponent(email || "")}&customer=${encodeURIComponent(customer)}&upsell1_accepted=true`)
    } catch (error) {
      console.error("[v0] Upsell subscription error:", error)
      setErrorMessage(error instanceof Error ? error.message : "An error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  const handleDecline = () => {
    router.push(`/us/upsell2?email=${encodeURIComponent(email || "")}&customer=${encodeURIComponent(customer || "")}`)
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <div className="bg-[#002F5D] text-white text-center py-2 px-4">
        <p className="text-sm">
          {"Don't close this page. Important: Don't hit 'Back' or close this page."}
        </p>
      </div>

      <main className="w-full max-w-md mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 leading-tight px-2">
          {"YOUR HIBISCUS KIT IS ON ITS WAY! "}
          <span className="bg-black text-white px-2 py-1 inline-block">
            {"DON'T MISS THIS"}
          </span>
        </h1>

        <div className="relative mx-auto mb-6 sm:mb-8" style={{ maxWidth: '320px' }}>
          <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl">
            <div className="relative bg-gradient-to-br from-green-50 to-blue-50 rounded-[2.5rem] overflow-hidden aspect-[9/16]">
              <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 to-blue-100/50" />
              
              <div className="relative h-full flex flex-col items-center justify-between p-6 text-center">
                <div className="pt-8">
                  <h2 className="text-white text-2xl font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    MASTER GARDENING VIDEO COURSE
                  </h2>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                  <p className="text-white text-lg font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    20 EXCLUSIVE VIDEO LESSONS TO MAKE YOUR HIBISCUS THRIVE
                  </p>
                  
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-6 shadow-xl">
                    <Play className="h-12 w-12 text-[#007A55] fill-[#007A55]" />
                  </div>
                </div>

                <div className="pb-4">
                  <Image
                    src="https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/Gemini_Generated_Image_fclrdyfclrdyfclr.png"
                    alt="Botanist with Practical Guide"
                    width={280}
                    height={200}
                    sizes="280px"
                    className="rounded-lg shadow-lg"
                  />
                  <p className="text-xs text-gray-600 mt-2 font-semibold">
                    Practical Guide by Versia Garden
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-4 sm:mb-6 px-2">
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            {"Most first-time growers make 3 critical mistakes in week one that kill their flowers. Our Head Botanist put together 20 exclusive video lessons to make sure YOUR hibiscus thrives — "}
            <span className="bg-[#66bb6a] text-white px-2 py-1 font-bold inline-block">
              COMPLETELY FREE
            </span>
            . Just hit the button below to unlock instant access:
          </p>
        </div>

        <Button
          onClick={handleAccept}
          disabled={isLoading}
          className="bg-[#66bb6a] hover:bg-[#5cb860] text-white w-full h-12 sm:h-14 text-base sm:text-lg font-bold rounded-lg shadow-lg mb-4 sm:mb-6"
        >
          {isLoading ? "Processing..." : "Yes, I Want It! →"}
        </Button>

        <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 border border-gray-200">
          <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-4 text-center">
            {"What you'll get:"}
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-[#66bb6a] flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">
                Learn the exact watering schedule and sunlight needs for each hibiscus color
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-[#66bb6a] flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">
                {"Discover how to protect your plants through their first winter — even in colder climates"}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="h-5 w-5 text-[#66bb6a] flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">
                {"100% Free — No charges today, no credit card needed for access"}
              </span>
            </li>
          </ul>
        </div>

        <button
          onClick={handleDecline}
          className="w-full text-center text-xs sm:text-sm text-gray-500 hover:text-gray-700 underline px-2"
        >
          {"No thanks, I'll figure it out on my own."}
        </button>

        {errorMessage && (
          <p className="text-red-600 mt-4 text-sm text-center px-2">{errorMessage}</p>
        )}
      </main>
    </div>
  )
}
