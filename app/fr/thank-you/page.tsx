"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation'
import Link from "next/link"
import Image from "next/image"
import { CheckCircle, Mail, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { trackHybridEvent } from "@/components/hybrid-tracker"

export default function ThankYouPageFR() {
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
            locale: "fr",
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
      {/* Header */}
      <header className="border-b border-border bg-background">
        <div className="container mx-auto px-4 py-4">
          <Link href="/fr">
            <Image src="https://mk6n6kinhajxg1fp.public.blob.vercel-storage.com/Versia/Group%201087.png" alt="Versia Garden" width={120} height={50} className="h-12 w-auto" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-[#016630]/10 p-4">
              <CheckCircle className="h-16 w-16 text-[#016630]" strokeWidth={1.5} />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            {"Merci pour votre achat !"}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty">
            {"Votre commande a \u00e9t\u00e9 confirm\u00e9e avec succ\u00e8s. Vous recevrez toutes les informations d\u00e9taill\u00e9es sur votre commande et la livraison par e-mail."}
          </p>

          {email && (
            <div className="bg-muted/50 border border-border rounded-lg p-6 mb-8 inline-flex items-center gap-3">
              <Mail className="h-5 w-5 text-[#016630] flex-shrink-0" />
              <div className="text-left">
                <p className="text-sm text-muted-foreground mb-1">{"Confirmation envoy\u00e9e \u00e0 :"}</p>
                <p className="text-base font-medium text-foreground">{email}</p>
              </div>
            </div>
          )}

          {upsellAccepted && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8 text-left">
              <p className="text-base text-emerald-900">
                <strong>{"F\u00e9licitations !"}</strong>{" Votre acc\u00e8s au "}<strong>{"Cours Vid\u00e9o Ma\u00eetre en Jardinage"}</strong>{" a \u00e9t\u00e9 activ\u00e9. Consultez votre e-mail pour les instructions d\u2019acc\u00e8s."}
              </p>
            </div>
          )}

          {upsell2Accepted && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
              <p className="text-base text-blue-900">
                <strong>{"Offre Confirm\u00e9e !"}</strong>{" Votre Kit d\u2019Hibiscus suppl\u00e9mentaire a \u00e9t\u00e9 ajout\u00e9 \u00e0 votre livraison."}
              </p>
            </div>
          )}

          <div className="bg-[#F3F8F4] border border-[#016630]/20 rounded-lg p-6 mb-8 text-left">
            <h2 className="text-lg font-semibold text-foreground mb-3">{"Que se passe-t-il maintenant ?"}</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-[#016630] mt-1">{"\u2713"}</span>
                <span>{"Vous recevrez un e-mail de confirmation avec les d\u00e9tails de votre commande"}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#016630] mt-1">{"\u2713"}</span>
                <span>{"Les informations de suivi seront envoy\u00e9es d\u00e8s que votre commande sera exp\u00e9di\u00e9e"}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#016630] mt-1">{"\u2713"}</span>
                <span>{"Notre \u00e9quipe de service client est disponible 24h/24 et 7j/7 pour toute question"}</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#016630] hover:bg-[#014d24] text-white">
              <Link href="/fr">
                {"Retour \u00e0 la page d\u2019accueil"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="mailto:support@versiagarden.com">Contacter le support</Link>
            </Button>
          </div>
        </div>
      </main>

      <footer className="border-t border-border mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground justify-center">
            <Link href="#" className="hover:text-foreground transition-colors">
              Politique de Remboursement
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Livraison
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              {"Politique de Confidentialit\u00e9"}
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              {"Conditions G\u00e9n\u00e9rales de Vente"}
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            {"\u00a9 "}{new Date().getFullYear()}{" Versia Garden. Tous droits r\u00e9serv\u00e9s."}
          </p>
        </div>
      </footer>
    </div>
  )
}
