"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation'
import Link from "next/link"
import Image from "next/image"
import { CheckCircle, Mail, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { trackHybridEvent } from "@/components/hybrid-tracker"

export default function ThankYouPageES() {
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
            locale: "es",
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
          <Link href="/es">
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
            {"¡Gracias por tu compra!"}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty">
            Tu pedido ha sido confirmado con exito. Recibiras toda la informacion detallada sobre tu pedido y el envio por correo electronico.
          </p>

          {email && (
            <div className="bg-muted/50 border border-border rounded-lg p-6 mb-8 inline-flex items-center gap-3">
              <Mail className="h-5 w-5 text-[#016630] flex-shrink-0" />
              <div className="text-left">
                <p className="text-sm text-muted-foreground mb-1">Confirmacion enviada a:</p>
                <p className="text-base font-medium text-foreground">{email}</p>
              </div>
            </div>
          )}

          {upsellAccepted && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8 text-left">
              <p className="text-base text-emerald-900">
                <strong>{"¡Felicidades!"}</strong> Tu acceso al <strong>Curso Video Maestro de Jardineria</strong> ha sido activado.
                Revisa tu correo electronico para las instrucciones de acceso.
              </p>
            </div>
          )}

          {upsell2Accepted && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
              <p className="text-base text-blue-900">
                <strong>{"¡Oferta Confirmada!"}</strong> Tu Kit de Hibisco extra ha sido anadido a tu envio.
              </p>
            </div>
          )}

          <div className="bg-[#F3F8F4] border border-[#016630]/20 rounded-lg p-6 mb-8 text-left">
            <h2 className="text-lg font-semibold text-foreground mb-3">{"¿Que pasa ahora?"}</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-[#016630] mt-1">{"✓"}</span>
                <span>Recibiras un correo electronico de confirmacion con los detalles de tu pedido</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#016630] mt-1">{"✓"}</span>
                <span>La informacion de seguimiento se enviara en cuanto tu pedido sea enviado</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#016630] mt-1">{"✓"}</span>
                <span>Nuestro equipo de atencion al cliente esta disponible 24/7 para cualquier pregunta</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#016630] hover:bg-[#014d24] text-white">
              <Link href="/es">
                Volver a la pagina principal
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="mailto:support@versiagarden.com">Contactar soporte</Link>
            </Button>
          </div>
        </div>
      </main>

      <footer className="border-t border-border mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground justify-center">
            <Link href="#" className="hover:text-foreground transition-colors">
              Politica de Reembolso
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Envio
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Politica de Privacidad
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Terminos de Servicio
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Contacto
            </Link>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            {"©"} {new Date().getFullYear()} Versia Garden. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
