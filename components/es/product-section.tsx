"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import { Heart, Shield, Truck, Star, Check, Minus, Plus, ChevronLeft, ChevronRight, ShoppingCart, Package } from 'lucide-react'
import useEmblaCarousel from "embla-carousel-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { UpsellModal } from "@/components/upsell-modal"
import { useCart } from "@/lib/cart-context"

const PRODUCT_IMAGES = [
  "https://mk6n6kinhajxg1fp.public.blob.vercel-storage.com/Versia/vg1.png",
  "https://mk6n6kinhajxg1fp.public.blob.vercel-storage.com/Versia/vg2.png",
  "https://mk6n6kinhajxg1fp.public.blob.vercel-storage.com/Versia/vg3.png",
  "https://mk6n6kinhajxg1fp.public.blob.vercel-storage.com/Versia/vg5.png",
  "https://mk6n6kinhajxg1fp.public.blob.vercel-storage.com/Versia/vg6.png",
  "https://mk6n6kinhajxg1fp.public.blob.vercel-storage.com/Versia/vg7.png",
  "https://mk6n6kinhajxg1fp.public.blob.vercel-storage.com/Versia/vg8.png",
  "https://mk6n6kinhajxg1fp.public.blob.vercel-storage.com/Versia/vg9.png",
  "https://mk6n6kinhajxg1fp.public.blob.vercel-storage.com/Versia/vg10.png",
  "https://mk6n6kinhajxg1fp.public.blob.vercel-storage.com/Versia/vg11.png",
  "https://mk6n6kinhajxg1fp.public.blob.vercel-storage.com/Versia/vg12.png",
]

const COLOR_IMAGE_MAP: Record<string, number> = {
  "Colores Mixtos": 0,
  Rojo: 2,
  Amarillo: 3,
  Rosa: 4,
  Morado: 5,
}

const KIT_COLOR_MAP: Record<string, { color: string; imageIndex: number }> = {
  "20-seeds": { color: "Colores Mixtos", imageIndex: 0 },
  "75-seeds": { color: "Rojo", imageIndex: 2 },
  "50-seeds": { color: "Amarillo", imageIndex: 3 },
  "silver-kit": { color: "Rosa", imageIndex: 4 },
  "gold-kit": { color: "Morado", imageIndex: 5 },
}

export function ProductSection() {
  const [selectedColor, setSelectedColor] = useState("Colores Mixtos")
  const [selectedKit, setSelectedKit] = useState("20-seeds")
  const [quantity, setQuantity] = useState(1)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showStickyBar, setShowStickyBar] = useState(false)
  const [showUpsellModal, setShowUpsellModal] = useState(false)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const offersRef = useRef<HTMLDivElement>(null)

  const { addItem } = useCart()

  const kits = [
    { id: "20-seeds", label: "OFERTA ESPECIAL - Kit 4 Plantitas (Amarillo, Morado, Rojo y Rosa)", price: 19.87, originalPrice: 39.74 },
    { id: "75-seeds", label: "Hibisco Rojo - Paquete de 4 Plantitas", price: 24.87, originalPrice: 49.74 },
    { id: "50-seeds", label: "Hibisco Amarillo - Paquete de 4 Plantitas", price: 24.87, originalPrice: 49.74 },
    {
      id: "silver-kit",
      label: "Hibisco Rosa - Paquete de 4 Plantitas",
      price: 24.87,
      originalPrice: 49.74,
    },
    {
      id: "gold-kit",
      label: "Hibisco Morado - Paquete de 4 Plantitas",
      price: 24.87,
      originalPrice: 49.74,
    },
  ]

  const getCurrentPrice = () => {
    const kit = kits.find((k) => k.id === selectedKit)
    return kit ? kit.price : 0
  }

  const getOriginalPrice = () => {
    const kit = kits.find((k) => k.id === selectedKit)
    return kit ? kit.originalPrice : 39.74
  }

  const getDiscountPercentage = () => {
    const currentPrice = getCurrentPrice()
    const originalPrice = getOriginalPrice()
    if (currentPrice === 0) return 100
    const discount = Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    return discount
  }

  const handleAddToCart = () => {
    const kit = kits.find((k) => k.id === selectedKit)
    if (kit) {
      const cartItem = {
        id: `${selectedColor}-${selectedKit}`,
        name: "Kit Flores de Hibisco Raras | Multicolor",
        color: selectedColor,
        kit: selectedKit,
        kitLabel: kit.label,
        price: kit.price,
        originalPrice: kit.originalPrice,
        image: PRODUCT_IMAGES[COLOR_IMAGE_MAP[selectedColor] || 0],
        quantity: quantity,
      }
      addItem(cartItem)

      if (typeof window !== "undefined" && (window as any).fbq) {
        ;(window as any).fbq("track", "AddToCart", {
          content_name: cartItem.name,
          content_ids: [cartItem.id],
          content_type: "product",
          value: cartItem.price * quantity,
          currency: "EUR",
        })
      }
    }
  }

  const handleAcceptUpsell = () => {
    setShowUpsellModal(false)
  }

  const handleDeclineUpsell = () => {
    setShowUpsellModal(false)
  }

  const handleKitSelect = (kitId: string) => {
    setSelectedKit(kitId)
    const mapping = KIT_COLOR_MAP[kitId]
    if (mapping) {
      setSelectedColor(mapping.color)
      if (emblaApi) {
        emblaApi.scrollTo(mapping.imageIndex, true)
      }
    }
  }

  const nextSlide = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const prevSlide = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const goToSlide = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi],
  )

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setCurrentSlide(emblaApi.selectedScrollSnap())
    }

    emblaApi.on("select", onSelect)
    onSelect()

    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi])

  const scrollToOffers = () => {
    offersRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const getLondonDate = (daysOffset = 0) => {
    const date = new Date()
    date.setDate(date.getDate() + daysOffset)

    const londonDate = new Date(date.toLocaleString("en-US", { timeZone: "Europe/London" }))
    return londonDate
  }

  const formatDate = (date: Date) => {
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
    const day = date.getDate()
    const month = months[date.getMonth()]

    return `${day} ${month}`
  }

  const formatDateRange = (startDate: Date, endDate: Date) => {
    const startMonth = startDate.toLocaleString("es-ES", { month: "short", timeZone: "Europe/London" })
    const endMonth = endDate.toLocaleString("es-ES", { month: "short", timeZone: "Europe/London" })
    const startDay = startDate.getDate()
    const endDay = endDate.getDate()

    if (startMonth === endMonth) {
      return `${startDay} - ${endDay} ${startMonth}`
    }
    return `${startDay} ${startMonth} - ${endDay} ${endMonth}`
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowStickyBar(true)
      } else {
        setShowStickyBar(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide()
      if (e.key === "ArrowRight") nextSlide()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [prevSlide, nextSlide])

  return (
    <div className="w-full bg-white">
      <UpsellModal
        isOpen={showUpsellModal}
        onClose={() => setShowUpsellModal(false)}
        onAccept={handleAcceptUpsell}
        onDecline={handleDeclineUpsell}
      />

      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="relative aspect-square w-full rounded-lg border border-gray-200 group">
              <div className="overflow-hidden h-full rounded-lg" ref={emblaRef}>
                <div className="flex h-full touch-pan-y">
                  {PRODUCT_IMAGES.map((image, index) => (
                    <div key={index} className="flex-[0_0_100%] min-w-0 h-full relative">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Imagen del producto ${index + 1}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="w-6 h-6 text-gray-800" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                aria-label="Imagen siguiente"
              >
                <ChevronRight className="w-6 h-6 text-gray-800" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {PRODUCT_IMAGES.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      currentSlide === index ? "bg-white w-6" : "bg-white/50 hover:bg-white/75",
                    )}
                    aria-label={`Ir a la slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="hidden lg:flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {PRODUCT_IMAGES.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "flex-shrink-0 w-20 h-20 rounded-md border-2 overflow-hidden transition-all",
                    currentSlide === index ? "border-black" : "border-gray-200 hover:border-gray-300",
                  )}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Miniatura ${index + 1}`}
                    width={80}
                    height={80}
                    sizes="80px"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-balance leading-tight">
              Coleccion Exclusiva Hibisco Raro | Multicolor
            </h1>

            <div className="flex flex-nowrap gap-2 sm:gap-6 lg:gap-8 justify-center mx-1 sm:mx-10">
              <div className="flex flex-col items-center gap-2">
                <Heart className="w-8 h-8 text-gray-700" />
                <span className="text-xs font-semibold text-center">Colores Vibrantes</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Shield className="w-8 h-8 text-gray-700" />
                <span className="text-xs font-semibold text-center">
                  Arraigo
                  <br />
                  Garantizado
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Truck className="w-8 h-8 text-gray-700" />
                <span className="text-xs font-semibold text-center">Envio Protegido</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-semibold">4.9 | Excelente | 19.329+ resenas</span>
            </div>

            <div className="space-y-3">
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
                <p className="text-base">
                  <strong>Exito Garantizado:</strong> Tus plantitas jovenes llegaran sanas y tienen la garantia de crecer exuberantemente, o te devolvemos el dinero.
                </p>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
                <p className="text-base">
                  Recibe un kit GRATUITO de fertilizante y fungicida para nutrir y proteger tus nuevas plantas.
                </p>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
                <p className="text-base">Empieza con Ventaja: Disfruta de plantas sanas y verdes desde el momento de su llegada.</p>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
                <p className="text-base">Disfruta de un Jardin Lleno de Flores Vibrantes y Hermosas.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold">{"€"}{getCurrentPrice().toFixed(2).replace(".", ",")}</span>
              <span className="text-lg text-gray-500 line-through">
                {"€"}{getOriginalPrice().toFixed(2).replace(".", ",")}
              </span>
              <span className="bg-warning-yellow text-white text-xs font-bold px-2 py-1 rounded">
                {"🔥 AHORRA"} {getDiscountPercentage()}%
              </span>
            </div>

            <div ref={offersRef} className="space-y-3">
              <label className="text-sm font-semibold">
                Opciones Kit - {kits.find((k) => k.id === selectedKit)?.label}
              </label>
              <div className="space-y-2">
                {kits.map((kit) => (
                  <button
                    key={kit.id}
                    onClick={() => handleKitSelect(kit.id)}
                    className={cn(
                      "w-full px-4 py-3 rounded-full border text-sm font-medium text-left transition-all",
                      selectedKit === kit.id
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-gray-300 hover:border-gray-400",
                    )}
                  >
                    {kit.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">Cantidad</label>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-10 w-10 rounded-md"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="h-10 w-10 rounded-md"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              className="w-full h-14 text-base font-bold rounded-md"
              style={{ backgroundColor: "#2d5f4f", color: "white" }}
            >
              ANADIR AL CARRITO
            </Button>

            <div className="pt-6 pb-4">
              <div className="flex items-center justify-between max-w-md mx-auto">
                <div className="flex flex-col items-center flex-1">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute top-6 left-12 w-20 sm:w-24 h-0.5 bg-gray-900" />
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-sm font-bold">{formatDate(getLondonDate(0))}</p>
                    <p className="text-xs text-gray-600">Pedido</p>
                  </div>
                </div>

                <div className="flex flex-col items-center flex-1">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center">
                      <Truck className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute top-6 left-12 w-20 sm:w-24 h-0.5 bg-gray-900" />
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-sm font-bold">{formatDateRange(getLondonDate(1), getLondonDate(2))}</p>
                    <p className="text-xs text-gray-600">Pedido Listo</p>
                  </div>
                </div>

                <div className="flex flex-col items-center flex-1">
                  <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-sm font-bold">{formatDateRange(getLondonDate(5), getLondonDate(7))}</p>
                    <p className="text-xs text-gray-600">Entregado</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Image
                src="/images/design-mode/Pagamento%20seguro.webp"
                alt="Metodos de Pago Seguros"
                width={448}
                height={40}
                sizes="(max-width: 448px) 100vw, 448px"
                className="max-w-full h-auto w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg transition-transform duration-300 z-50",
          showStickyBar ? "translate-y-0" : "translate-y-full",
        )}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold truncate">
                Coleccion Exclusiva Hibisco Raro | Multicolor
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-lg font-bold">{"€"}{getCurrentPrice().toFixed(2).replace(".", ",")}</span>
                <span className="text-sm text-gray-500 line-through">
                  {"€"}{getOriginalPrice().toFixed(2).replace(".", ",")}
                </span>
              </div>
            </div>
            <Button
              onClick={selectedKit === "20-seeds" ? scrollToOffers : handleAddToCart}
              className="h-12 px-6 text-sm font-bold rounded-md whitespace-nowrap"
              style={{ backgroundColor: "#2d5f4f", color: "white" }}
            >
              Elige Mi Kit
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
