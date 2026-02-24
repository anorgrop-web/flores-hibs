"use client"

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react'
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export default function Upsell2PageES() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(282)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState("Oferta Especial - Kit Planta Hibisco 4 Colores (Amarillo, Morado, Rojo y Rosa)")
  const [selectedKit, setSelectedKit] = useState("special-offer")
  const [quantity, setQuantity] = useState(1)

  const email = searchParams.get("email")
  const customer = searchParams.get("customer")

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const images = [
    "https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/image%20894.png",
    "https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/Hb%20vermelho.png",
    "https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/Hb%20amarelo.png",
    "https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/Hb%20rosa%201.1.png",
    "https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/Hb%20roxo%201.1.png",
  ]

  const colorOptions = [
    { 
      id: "special-offer", 
      label: "Oferta Especial - Kit Planta Hibisco 4 Colores (Amarillo, Morado, Rojo y Rosa)",
      price: 19.87,
      imageIndex: 0
    },
    { 
      id: "red", 
      label: "Hibisco Rojo - Paquete de 4",
      price: 24.87,
      imageIndex: 1
    },
    { 
      id: "yellow", 
      label: "Hibisco Amarillo - Paquete de 4",
      price: 24.87,
      imageIndex: 2
    },
    { 
      id: "pink", 
      label: "Hibisco Rosa - Paquete de 4",
      price: 24.87,
      imageIndex: 3
    },
    { 
      id: "purple", 
      label: "Hibisco Morado - Paquete de 4",
      price: 24.87,
      imageIndex: 4
    },
  ]

  const getOriginalPrice = () => {
    const option = colorOptions.find(opt => opt.id === selectedKit)
    return option ? option.price * quantity : 0
  }

  const getDiscountedPrice = () => {
    return getOriginalPrice() * 0.5
  }

  const getDiscount = () => {
    return getOriginalPrice() - getDiscountedPrice()
  }

  const handleColorSelect = (optionId: string) => {
    setSelectedKit(optionId)
    const option = colorOptions.find(opt => opt.id === optionId)
    if (option) {
      setSelectedColor(option.label)
      setCurrentImageIndex(option.imageIndex)
    }
  }

  const handleAccept = async () => {
    setIsLoading(true)
    setErrorMessage(null)

    if (!customer) {
      setErrorMessage("ID de cliente no encontrado. Por favor, contacta con soporte.")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/stripe/create-one-time-charge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: customer,
          priceId: "price_EUR_UPSELL2_PLACEHOLDER",
          amountInCents: 994,
          currency: "eur"
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to process payment")
      }

      router.push(`/es/thank-you?email=${encodeURIComponent(email || "")}&upsell2=true`)
    } catch (error) {
      console.error("[v0] Upsell 2 charge error:", error)
      setErrorMessage(error instanceof Error ? error.message : "Se ha producido un error. Intentalo de nuevo.")
      setIsLoading(false)
    }
  }

  const handleDecline = () => {
    router.push(`/es/thank-you?email=${encodeURIComponent(email || "")}`)
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <header className="border-b border-border bg-background">
        <div className="container mx-auto px-4 py-4">
          <Link href="/es">
            <Image src="https://mk6n6kinhajxg1fp.public.blob.vercel-storage.com/Versia/Group%201087.png" alt="Versia Garden" width={160} height={48} className="h-12 w-auto" priority />
          </Link>
        </div>
      </header>

      <main className="w-full max-w-6xl mx-auto py-4 sm:py-8 px-3 sm:px-4">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 text-balance px-2">
            Imagina 8 Colores Vibrantes Floreciendo en Tu Jardin en Lugar de Solo 4.
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-4xl mx-auto text-pretty px-2">
            Tu primer kit llenara tu hogar con 4 colores impresionantes. Ahora imagina duplicar eso — un arcoiris completo de hibiscos recibiendote cada manana. Como agradecimiento por tu pedido, te ofrecemos un segundo Kit de 4 Hibiscos con un 50% DE DESCUENTO. No necesitas volver a introducir tus datos — solo haz clic abajo para anadirlo a tu envio.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 sm:p-4 text-center mb-6 sm:mb-8 max-w-md mx-auto">
          <p className="text-sm sm:text-base text-foreground">
            La oferta expira en: <span className="text-red-600 font-bold">{formatTime(timeLeft)}</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-3 sm:space-y-4">
            <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
              <Image
                src={images[currentImageIndex] || "/placeholder.svg"}
                alt="Kit Planta Hibisco"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 flex-shrink-0"
                onClick={() => setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex gap-2 overflow-x-auto flex-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative w-16 sm:w-20 h-16 sm:h-20 flex-shrink-0 rounded border-2 overflow-hidden ${
                      currentImageIndex === idx ? 'border-primary' : 'border-border'
                    }`}
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`Miniatura ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 flex-shrink-0"
                onClick={() => setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
                Kit de Plantitas de Flores de Hibisco Raras | Multicolor
              </h2>
              <p className="text-xs uppercase text-muted-foreground mb-3 sm:mb-4 tracking-wide">
                OFERTA ESPECIAL - KIT PLANTA HIBISCO 4 COLORES (AMARILLO, MORADO, ROJO Y ROSA)
              </p>
              
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 flex-wrap">
                <span className="text-red-600 line-through text-base sm:text-lg">{"€"} {getOriginalPrice().toFixed(2)}</span>
                <span className="text-xl sm:text-2xl font-bold text-foreground">{"€"} {getDiscountedPrice().toFixed(2)}</span>
                <span className="bg-warning-yellow text-white text-xs font-bold px-2 py-1 rounded whitespace-nowrap">
                  {"🔥 AHORRA 50%"}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold block">Color de la Flor - {selectedColor}</label>
              <div className="space-y-2">
                {colorOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleColorSelect(option.id)}
                    className={cn(
                      "w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-full border text-xs sm:text-sm font-medium text-left transition-all break-words",
                      selectedKit === option.id
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-gray-300 hover:border-gray-400"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Cantidad</label>
              <div className="flex items-center gap-3 sm:gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-10 w-10 rounded-md flex-shrink-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-10 w-10 rounded-md flex-shrink-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="border border-border rounded-lg p-3 sm:p-4 space-y-2">
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{"€"} {getOriginalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-muted-foreground">Descuento (50%)</span>
                <span className="font-medium text-green-600">- {"€"} {getDiscount().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-muted-foreground">Envio</span>
                <span className="font-medium">Gratuito</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between text-base sm:text-lg font-bold">
                <span>Total</span>
                <span>{"€"} {getDiscountedPrice().toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground">{"Impuestos incluidos: € 0,00"}</p>
            </div>

            <Button
              onClick={handleAccept}
              disabled={isLoading}
              className="bg-[#1e73be] hover:bg-[#155a96] w-full h-12 sm:h-14 text-base sm:text-lg font-bold"
            >
              {isLoading ? "Procesando..." : "¡SI, QUIERO ESTA OFERTA!"}
            </Button>

            <Button
              onClick={handleDecline}
              disabled={isLoading}
              variant="outline"
              className="w-full h-10 sm:h-12 text-sm sm:text-base"
            >
              No gracias, 4 colores me bastan
            </Button>

            {errorMessage && (
              <p className="text-red-600 text-sm text-center">{errorMessage}</p>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-border mt-8 sm:mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground justify-center flex-wrap">
            <Link href="#" className="hover:text-foreground transition-colors">
              Politica de Privacidad
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Politica de Cancelacion
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
