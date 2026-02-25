"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { loadStripe } from "@stripe/stripe-js"
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown, Search, Info, Lock, ShoppingBag, X } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import Script from "next/script"
import { cn } from "@/lib/utils"
import { trackHybridEvent } from "@/components/hybrid-tracker"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

const countryCurrencyMap: { [key: string]: string } = {
  IT: "EUR",
  GB: "EUR",
  PT: "EUR",
  ES: "EUR",
  FR: "EUR",
  DE: "EUR",
  US: "EUR",
}

declare global {
  interface Window {
    google: any
    fbq?: (action: string, eventName: string, params?: any) => void
  }
}

function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const { items, getSubtotal } = useCart()
  const [detectedBrand, setDetectedBrand] = useState<string | null>(null)
  const [postcode, setPostcode] = useState("")
  const [selectedShipping, setSelectedShipping] = useState("standard")
  const [showOrderSummary, setShowOrderSummary] = useState(false)
  const [showBottomSummary, setShowBottomSummary] = useState(false)
  const [timeLeft, setTimeLeft] = useState(4 * 60 + 50)

  const [selectedCountry, setSelectedCountry] = useState("FR")

  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false)
  const autocompleteService = useRef<any>(null)
  const placesService = useRef<any>(null)
  const addressInputRef = useRef<HTMLInputElement>(null)

  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [nameOnCard, setNameOnCard] = useState("")

  const [useShippingAsBilling, setUseShippingAsBilling] = useState(true)

  const [phoneNumber, setPhoneNumber] = useState("")

  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [paymentRequest, setPaymentRequest] = useState<any>(null)

  const currency = countryCurrencyMap[selectedCountry] || "EUR"
  const currencySymbol = "€"

  const getCountryCode = (countryValue: string): string | string[] => {
    return countryValue.toLowerCase()
  }

  const getPhonePrefix = (countryValue: string): string => {
    const phonePrefixMap: { [key: string]: string } = {
      IT: "+39",
      GB: "+44",
      US: "+1",
      PT: "+351",
      ES: "+34",
      FR: "+33",
      DE: "+49",
    }
    return phonePrefixMap[countryValue] || "+33"
  }

  const formatPhoneNumber = (value: string, countryValue: string): string => {
    const digits = value.replace(/\D/g, "")

    switch (countryValue) {
      case "IT":
      case "PT":
      case "ES":
      case "FR":
      case "DE":
        const euDigits = digits.slice(0, 9)
        if (euDigits.length <= 3) return euDigits
        if (euDigits.length <= 6) return `${euDigits.slice(0, 3)} ${euDigits.slice(3)}`
        return `${euDigits.slice(0, 3)} ${euDigits.slice(3, 6)} ${euDigits.slice(6)}`

      case "GB":
        const ukDigits = digits.slice(0, 10)
        if (ukDigits.length <= 4) return ukDigits
        return `${ukDigits.slice(0, 4)} ${ukDigits.slice(4)}`

      case "US":
        const usDigits = digits.slice(0, 10)
        if (usDigits.length <= 3) return usDigits
        if (usDigits.length <= 6) return `(${usDigits.slice(0, 3)}) ${usDigits.slice(3)}`
        return `(${usDigits.slice(0, 3)}) ${usDigits.slice(3, 6)}-${usDigits.slice(6)}`

      default:
        return digits.slice(0, 15)
    }
  }

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value, selectedCountry)
    setPhoneNumber(formatted)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!stripe || !elements) return

    setIsLoading(true)
    setErrorMessage(null)

    const cardNumberElement = elements.getElement(CardNumberElement)
    if (!cardNumberElement) {
      setErrorMessage("Les informations de la carte sont incompl\u00e8tes")
      setIsLoading(false)
      return
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement,
      billing_details: { name: nameOnCard, email },
    })

    if (error) {
      setErrorMessage(error.message || "Une erreur inattendue s'est produite.")
      setIsLoading(false)
      return
    }

    const response = await fetch("/api/stripe/create-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paymentMethodId: paymentMethod.id,
        amountInCents: Math.round(total * 100),
        currency: 'eur',
        locale: 'fr',
        customerData: {
          email,
          firstName,
          lastName,
          address,
          city,
          postcode,
          country: selectedCountry,
        },
      }),
    })

    const session = await response.json()

    if (session.error) {
      setErrorMessage(session.error)
      setIsLoading(false)
    } else if (session.success && session.redirectUrl) {
      sessionStorage.setItem(
        "orderData",
        JSON.stringify({
          value: total,
          currency: currency,
          content_ids: items.map((item) => item.id),
          contents: items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            item_price: item.price,
          })),
          num_items: items.reduce((sum, item) => sum + item.quantity, 0),
        }),
      )
      window.location.href = session.redirectUrl
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (isGoogleMapsLoaded && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService()
      const mapDiv = document.createElement("div")
      placesService.current = new window.google.maps.places.PlacesService(mapDiv)
    }
  }, [isGoogleMapsLoaded])

  const handleAddressChange = (value: string) => {
    setAddress(value)

    if (value.length > 2 && autocompleteService.current) {
      const countryCode = 'fr'

      autocompleteService.current.getPlacePredictions(
        {
          input: value,
          componentRestrictions: { country: countryCode },
        },
        (predictions: any, status: any) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
            setSuggestions(predictions)
            setShowSuggestions(true)
          } else {
            setSuggestions([])
            setShowSuggestions(false)
          }
        },
      )
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion: any) => {
    setShowSuggestions(false)

    if (placesService.current) {
      placesService.current.getDetails(
        {
          placeId: suggestion.place_id,
          fields: ["address_components", "formatted_address"],
        },
        (place: any, status: any) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
            let streetNumber = ""
            let route = ""
            let locality = ""
            let postalCode = ""

            place.address_components.forEach((component: any) => {
              const types = component.types

              if (types.includes("street_number")) {
                streetNumber = component.long_name
              }
              if (types.includes("route")) {
                route = component.long_name
              }
              if (types.includes("postal_town") || types.includes("locality")) {
                locality = component.long_name
              }
              if (types.includes("postal_code")) {
                postalCode = component.long_name
              }
            })

            const fullAddress = `${streetNumber} ${route}`.trim()
            setAddress(fullAddress || place.formatted_address)

            if (locality) {
              setCity(locality)
            }
            if (postalCode) {
              setPostcode(postalCode)
            }
          }
        },
      )
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const subtotal = getSubtotal()
  const shippingCost = postcode ? (selectedShipping === "standard" ? 0 : 14.55) : 0
  const total = subtotal + shippingCost
  const hasCompleteAddress = address.trim().length > 0 && city.trim().length > 0 && postcode.trim().length > 0

  useEffect(() => {
    if (items.length > 0) {
      trackHybridEvent(
        "InitiateCheckout",
        {
          value: total,
          currency: currency,
          locale: "fr",
          content_ids: items.map((item) => item.id),
          contents: items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            item_price: item.price,
          })),
          num_items: items.reduce((sum, item) => sum + item.quantity, 0),
        },
        { email, firstName, lastName }
      )
    }
  }, [])

  const stripeElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#000",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        "::placeholder": {
          color: "#9ca3af",
        },
      },
      invalid: {
        color: "#ef4444",
      },
    },
  }

  const cardNumberOptions = {
    ...stripeElementOptions,
    placeholder: "Num\u00e9ro de carte",
  }

  const OrderSummaryContent = () => (
    <>
      {items.length === 0 && (
        <div className="text-center py-8">
          <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-lg font-semibold mb-2">Votre panier est vide</p>
          <p className="text-sm text-muted-foreground mb-4">Ajoutez des articles pour commencer</p>
          <Link href="/fr" className="text-sm font-medium underline text-[#2d5f4f]">
            Retour à la boutique
          </Link>
        </div>
      )}

      {/* Cart Reserved Timer */}
      {items.length > 0 && (
        <div className="bg-black text-white text-center py-3 rounded-lg mb-6">
          <p className="text-sm font-medium">{"Panier r\u00e9serv\u00e9 pendant "}{formatTime(timeLeft)}</p>
          <p className="text-xs text-gray-300 mt-1">{"Commandez maintenant et votre hibiscus fleurira d\u00e8s les premiers jours du printemps."}</p>
        </div>
      )}

      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 rounded-lg border border-border overflow-hidden bg-muted">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              {item.quantity > 1 && (
                <span className="absolute -top-2 -right-2 bg-foreground text-background text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {item.quantity}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium leading-tight mb-1">{"Kit Fleurs d\u2019Hibiscus Rares | Multicolore"}</h3>
              <p className="text-xs text-muted-foreground">
                {item.color} / {item.kitLabel}
              </p>
              {item.price === 0 && (
                <span className="inline-block text-xs font-semibold text-foreground bg-muted px-2 py-0.5 rounded mt-1">
                  GRATUIT
                </span>
              )}
            </div>
            <div className="text-right">
              {item.originalPrice > item.price && (
                <p className="text-xs text-muted-foreground line-through">
                  {"\u20AC"}{(item.originalPrice * item.quantity).toFixed(2)}
                </p>
              )}
              <p className="text-sm font-semibold">
                {"\u20AC"}{(item.price * item.quantity).toFixed(2)}
              </p>
              {item.originalPrice > item.price && (
                <p className="text-xs text-[#0d5c3d] font-medium">
                  {"(\u00C9conomisez \u20AC"}{((item.originalPrice - item.price) * item.quantity).toFixed(2)}{")"}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Discount Code */}
      <div className="flex gap-2 mb-6">
        <Input type="text" placeholder="Code de r\u00e9duction" className="h-12" />
        <Button type="button" variant="outline" className="h-12 px-6 font-medium bg-transparent">
          Appliquer
        </Button>
      </div>

      {/* Totals */}
      <div className="space-y-3 border-t border-border pt-4">
        <div className="flex justify-between text-sm">
          <span>Sous-total</span>
          <span className="font-medium">
            {"\u20AC"}{subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <div className="flex items-center gap-1">
            <span>Livraison</span>
            <Info className="h-3 w-3 text-muted-foreground" />
          </div>
          <span className="font-medium">
            {hasCompleteAddress ? `\u20AC${shippingCost.toFixed(2)}` : "Entrez l\u2019adresse de livraison"}
          </span>
        </div>
        <div className="flex justify-between text-lg font-semibold pt-3 border-t border-border">
          <span>Total</span>
          <div className="text-right">
            <span className="text-xs text-muted-foreground font-normal mr-2">{currency}</span>
            <span>
              {"\u20AC"}{total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </>
  )

  useEffect(() => {
    if (stripe && total > 0) {
      const pr = stripe.paymentRequest({
        country: selectedCountry,
        currency: currency.toLowerCase(),
        total: {
          label: "Total Achat",
          amount: Math.round(total * 100),
        },
        requestPayerName: true,
        requestPayerEmail: true,
      })

      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr)
        }
      })
    }
  }, [stripe, selectedCountry, currency, total])

  useEffect(() => {
    if (paymentRequest) {
      paymentRequest.on("paymentmethod", async (ev: any) => {
        setIsLoading(true)

        const response = await fetch("/api/stripe/create-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentMethodId: ev.paymentMethod.id,
            amountInCents: Math.round(total * 100),
            currency: 'eur',
            locale: 'fr',
            customerData: {
              email: ev.payerEmail,
              firstName: ev.payerName?.split(" ")[0] || "",
              lastName: ev.payerName?.split(" ").slice(1).join(" ") || "",
              address,
              city,
              postcode,
              country: selectedCountry,
            },
          }),
        })

        const session = await response.json()

        if (session.error) {
          ev.complete("fail")
          setErrorMessage(session.error)
          setIsLoading(false)
        } else if (session.success && session.redirectUrl) {
          sessionStorage.setItem(
            "orderData",
            JSON.stringify({
              value: total,
              currency: currency,
              content_ids: items.map((item) => item.id),
              contents: items.map((item) => ({
                id: item.id,
                quantity: item.quantity,
                item_price: item.price,
              })),
              num_items: items.reduce((sum, item) => sum + item.quantity, 0),
            }),
          )
          ev.complete("success")
          window.location.href = session.redirectUrl
        }
      })
    }
  }, [paymentRequest, total, currency, address, city, postcode, selectedCountry])

  return (
    <>
      <Script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDqvHKN8KCXLdBQISQPUUg2aDFuJ0AdYsg&libraries=places&language=fr"
        onLoad={() => setIsGoogleMapsLoaded(true)}
      />

      <form onSubmit={handleSubmit} className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-background sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/fr">
              <img
                src="https://mk6n6kinhajxg1fp.public.blob.vercel-storage.com/Versia/Group%201087.png"
                alt="Versia Garden"
                className="h-12 w-auto"
              />
            </Link>
            <Button variant="ghost" size="icon" className="relative" type="button">
              <ShoppingBag className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Button>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6 lg:py-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Form */}
            <div className="order-2 lg:order-1">
              {/* Mobile Order Summary Toggle */}
              <button
                type="button"
                onClick={() => setShowOrderSummary(!showOrderSummary)}
                className="lg:hidden w-full flex items-center justify-between py-4 border-b border-border mb-6"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{"R\u00e9capitulatif de la commande"}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${showOrderSummary ? "rotate-180" : ""}`} />
                </div>
                <span className="text-lg font-semibold">
                  {"\u20AC"}{total.toFixed(2)}
                </span>
              </button>

              {paymentRequest && (
                <div className="mb-8">
                  <p className="text-center text-sm text-muted-foreground mb-4">Paiement rapide</p>
                  <div className="flex justify-center mb-4">
                    <PaymentRequestButtonElement options={{ paymentRequest }} className="h-12 w-80" />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">OU</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Email or Phone */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-base font-semibold">{"E-mail ou T\u00e9l\u00e9phone"}</Label>
                  <Link href="#" className="text-sm text-primary hover:underline">
                    Se connecter
                  </Link>
                </div>
                <Input
                  type="email"
                  placeholder={"E-mail ou num\u00e9ro de t\u00e9l\u00e9phone"}
                  className="h-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="flex items-start gap-2 mt-3">
                  <Checkbox id="tracking" defaultChecked className="mt-0.5 checkout-checkbox" />
                  <label htmlFor="tracking" className="text-sm leading-tight cursor-pointer">
                    {"M\u2019envoyer le suivi en temps r\u00e9el et les mises \u00e0 jour de la commande"}
                  </label>
                </div>
              </div>

              {/* Delivery */}
              <div className="mb-6">
                <h2 className="text-base font-semibold mb-4">Livraison</h2>

                <div className="space-y-4">
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1.5 block">{"Pays/R\u00e9gion"}</Label>
                    <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                      <SelectTrigger className="h-12 w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FR">France</SelectItem>
                        <SelectItem value="IT">Italie</SelectItem>
                        <SelectItem value="PT">Portugal</SelectItem>
                        <SelectItem value="ES">Espagne</SelectItem>
                        <SelectItem value="DE">Allemagne</SelectItem>
                        <SelectItem value="GB">Royaume-Uni</SelectItem>
                        <SelectItem value="US">{"\u00C9tats-Unis"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Input
                        type="text"
                        placeholder={"Pr\u00e9nom"}
                        className="h-12"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="text"
                        placeholder="Nom"
                        className="h-12"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <Input
                      ref={addressInputRef}
                      type="text"
                      placeholder="Adresse"
                      value={address}
                      onChange={(e) => handleAddressChange(e.target.value)}
                      onFocus={() => {
                        if (suggestions.length > 0) {
                          setShowSuggestions(true)
                        }
                      }}
                      className="h-12 pr-10"
                      required
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />

                    {showSuggestions && suggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#016630] rounded-lg shadow-lg z-50 overflow-hidden">
                        <div className="py-2">
                          <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase">
                            Suggestions
                          </div>
                          {suggestions.map((suggestion) => {
                            const parts = suggestion.structured_formatting
                            return (
                              <button
                                type="button"
                                key={suggestion.place_id}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors"
                              >
                                <div className="text-sm">
                                  <span className="font-bold">{parts.main_text}</span>
                                  {parts.secondary_text && (
                                    <span className="text-muted-foreground">, {parts.secondary_text}</span>
                                  )}
                                </div>
                              </button>
                            )
                          })}
                        </div>
                        <div className="border-t border-border px-4 py-2.5 bg-white">
                          <p className="text-[10px] text-muted-foreground font-normal">
                            Powered by <span className="font-semibold">Google</span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <Input type="text" placeholder="Appartement, suite, etc. (optionnel)" className="h-12" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Input
                        type="text"
                        placeholder="Ville"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="h-12"
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="text"
                        placeholder="Code postal"
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                        className="h-12"
                        required
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-muted-foreground pointer-events-none">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                        <line x1="12" y1="18" x2="12.01" y2="18" />
                      </svg>
                      <span className="text-sm font-medium text-foreground">{getPhonePrefix(selectedCountry)}</span>
                    </div>
                    <Input
                      type="tel"
                      placeholder={"T\u00e9l\u00e9phone"}
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                      className="h-12 pl-[4.5rem]"
                      required
                    />
                  </div>

                  <div className="flex items-start gap-2">
                    <Checkbox id="news" className="mt-0.5 checkout-checkbox" />
                    <label htmlFor="news" className="text-sm leading-tight cursor-pointer">
                      {"M\u2019envoyer des nouvelles et offres par SMS"}
                    </label>
                  </div>
                </div>
              </div>

              {/* Shipping method */}
              <div className="mb-6">
                <h2 className="text-base font-semibold mb-4">{"M\u00e9thode de livraison"}</h2>
                {!hasCompleteAddress ? (
                  <div className="bg-[#F8F8F8] border border-border rounded-lg p-4">
                    <p className="text-sm text-[#8B6914]">
                      {"Entrez votre adresse de livraison pour voir les m\u00e9thodes de livraison disponibles."}
                    </p>
                  </div>
                ) : (
                  <RadioGroup value={selectedShipping} onValueChange={setSelectedShipping}>
                    <div className="border border-border rounded-lg overflow-hidden">
                      <div
                        className={`flex items-center justify-between p-4 transition-colors border-b border-border ${
                          selectedShipping === "standard" ? "bg-[#f0f8f0]" : "hover:bg-muted/30"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="standard" id="standard" className="border-[#016630]" />
                          <Label htmlFor="standard" className="cursor-pointer">
                            <div className="font-normal">Standard</div>
                            <div className="text-xs text-muted-foreground mt-0.5">7-10 jours</div>
                          </Label>
                        </div>
                        <span className="font-semibold text-[#016630]">GRATUIT</span>
                      </div>
                      <div
                        className={`flex items-center justify-between p-4 transition-colors ${
                          selectedShipping === "express" ? "bg-[#f0f8f0]" : "hover:bg-muted/30"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="express" id="express" className="border-[#016630]" />
                          <Label htmlFor="express" className="cursor-pointer">
                            <div className="font-normal">Express</div>
                            <div className="text-xs text-muted-foreground mt-0.5">3-4 jours</div>
                          </Label>
                        </div>
                        <span className="font-semibold">{"\u20AC14.55"}</span>
                      </div>
                    </div>
                  </RadioGroup>
                )}
              </div>

              {/* Secure Checkout */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">{"Paiement S\u00e9curis\u00e9"}</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  {"Toutes les transactions sont s\u00e9curis\u00e9es et crypt\u00e9es. Votre commande est prot\u00e9g\u00e9e par notre garantie de satisfaction de 30 jours."}
                </p>

                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3.5 bg-[#F3F8F4] border border-[#014B22] rounded-t-lg">
                    <span className="font-medium text-sm">{"Carte de cr\u00e9dit"}</span>
                    <div className="flex gap-1.5 bg-[#F3F8F4] px-2.5 py-1.5 rounded-md">
                      <Image
                        src="https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/visa.sxIq5Dot.svg"
                        alt="Visa"
                        width={38}
                        height={24}
                        className={cn("h-6 w-auto transition-opacity duration-300", detectedBrand && detectedBrand !== "visa" ? "opacity-20 grayscale" : "opacity-100")}
                      />
                      <Image
                        src="https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/mastercard.1c4_lyMp.svg"
                        alt="Mastercard"
                        width={38}
                        height={24}
                        className={cn("h-6 w-auto transition-opacity duration-300", detectedBrand && detectedBrand !== "mastercard" ? "opacity-20 grayscale" : "opacity-100")}
                      />
                      <Image
                        src="https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/maestro.ByfUQi1c.svg"
                        alt="Maestro"
                        width={38}
                        height={24}
                        className={cn("h-6 w-auto transition-opacity duration-300", detectedBrand && detectedBrand !== "maestro" ? "opacity-20 grayscale" : "opacity-100")}
                      />
                      <Image
                        src="https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/amex.Csr7hRoy.svg"
                        alt="American Express"
                        width={38}
                        height={24}
                        className={cn("h-6 w-auto transition-opacity duration-300", detectedBrand && detectedBrand !== "amex" ? "opacity-20 grayscale" : "opacity-100")}
                      />
                    </div>
                  </div>

                  <div className="bg-[#F8F8F8] p-4 space-y-4">
                    <div className="relative">
                      <div className="flex h-12 w-full rounded-md border border-input bg-white px-3 py-2 text-sm">
                        <CardNumberElement 
                          options={cardNumberOptions} 
                          className="flex-1 pt-2" 
                          onChange={(e) => {
                            setDetectedBrand(e.brand && e.brand !== 'unknown' ? e.brand : null)
                          }}
                        />
                      </div>
                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex h-12 w-full rounded-md border border-input bg-white px-3 py-2 text-sm">
                        <CardExpiryElement options={stripeElementOptions} className="flex-1 pt-2" />
                      </div>
                      <div className="relative">
                        <div className="flex h-12 w-full rounded-md border border-input bg-white px-3 py-2 text-sm pr-10">
                          <CardCvcElement options={stripeElementOptions} className="flex-1 pt-2" />
                        </div>
                        <Info className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>

                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Nom sur la carte"
                        value={nameOnCard}
                        onChange={(e) => setNameOnCard(e.target.value.toUpperCase())}
                        className="h-12 pr-10 bg-white"
                        required
                      />
                      {nameOnCard && (
                        <button
                          type="button"
                          onClick={() => setNameOnCard("")}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="billing"
                        checked={useShippingAsBilling}
                        onCheckedChange={(checked) => setUseShippingAsBilling(checked as boolean)}
                        className="mt-0.5 checkout-checkbox"
                      />
                      <label htmlFor="billing" className="text-sm leading-tight cursor-pointer">
                        {"Utiliser l\u2019adresse de livraison comme adresse de facturation"}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {hasCompleteAddress && !useShippingAsBilling && (
                <div className="mb-6">
                  <h2 className="text-base font-semibold mb-4">Adresse de facturation</h2>
                  <RadioGroup defaultValue="same" className="space-y-3">
                    <div className="flex items-center justify-between border border-[#016630] rounded-lg p-4 bg-[#f0f8f0]">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="same" id="same" className="border-[#016630]" />
                        <Label htmlFor="same" className="cursor-pointer font-normal">
                          {"Identique \u00e0 l\u2019adresse de livraison"}
                        </Label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border border-border rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="different" id="different" />
                        <Label htmlFor="different" className="cursor-pointer font-normal">
                          {"Utiliser une adresse de facturation diff\u00e9rente"}
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-base font-semibold mb-4">Se souvenir de moi</h2>
                <div className="flex items-start gap-2 mb-4">
                  <Checkbox id="remember" defaultChecked className="mt-0.5 checkout-checkbox" />
                  <label htmlFor="remember" className="text-sm leading-tight cursor-pointer">
                    {"Sauvegarder mes informations pour un paiement plus rapide avec un compte Shop"}
                  </label>
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-muted-foreground pointer-events-none">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                      <line x1="12" y1="18" x2="12.01" y2="18" />
                    </svg>
                    <span className="text-sm font-medium text-foreground">{getPhonePrefix(selectedCountry)}</span>
                  </div>
                  <Input
                    type="tel"
                    placeholder={"Num\u00e9ro de t\u00e9l\u00e9phone portable"}
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    className="h-12 pl-[4.5rem]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <div className="flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5" />
                  <span>{"S\u00e9curis\u00e9 et crypt\u00e9"}</span>
                </div>
                <span className="font-semibold text-sm">shop</span>
              </div>

              <div className="lg:hidden mb-4">
                <button
                  type="button"
                  onClick={() => setShowBottomSummary(!showBottomSummary)}
                  className="w-full flex items-center justify-between py-4 border-y border-border mb-4"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{"R\u00e9capitulatif de la commande"}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${showBottomSummary ? "rotate-180" : ""}`} />
                  </div>
                  <span className="text-lg font-semibold">
                    {"\u20AC"}{total.toFixed(2)}
                  </span>
                </button>

                {showBottomSummary && (
                  <div className="mb-4">
                    <OrderSummaryContent />
                  </div>
                )}
              </div>

              {errorMessage && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{errorMessage}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={!stripe || isLoading}
                className="w-full h-14 bg-[#016630] hover:bg-[#014d24] text-white text-base font-semibold mb-4"
                size="lg"
              >
                {isLoading ? "Traitement en cours..." : `Finaliser la Commande (\u20AC${total.toFixed(2)})`}
              </Button>

              {/* Footer Links */}
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-primary justify-center">
                <Link href="#" className="hover:underline">
                  Politique de remboursement
                </Link>
                <Link href="#" className="hover:underline">
                  Livraison
                </Link>
                <Link href="#" className="hover:underline">
                  {"Politique de confidentialit\u00e9"}
                </Link>
                <Link href="#" className="hover:underline">
                  Conditions de service
                </Link>
                <Link href="#" className="hover:underline">
                  {"Mentions l\u00e9gales"}
                </Link>
                <Link href="#" className="hover:underline">
                  Contact
                </Link>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className={`order-1 lg:order-2 ${showOrderSummary ? "block" : "hidden lg:block"}`}>
              <div className="lg:sticky lg:top-24">
                <OrderSummaryContent />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default function CheckoutPageWrapper() {
  return (
    <Elements stripe={stripePromise} options={{ locale: 'fr' }}>
      <CheckoutForm />
    </Elements>
  )
}
