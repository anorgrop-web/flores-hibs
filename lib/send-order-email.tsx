import { Resend } from "resend"
import { OrderConfirmationEn } from "@/emails/order-confirmation-en"
import { OrderConfirmationIt } from "@/emails/order-confirmation-it"

const resend = new Resend(process.env.RESEND_API_KEY)

interface OrderItem {
  name: string
  type: string
  price: number
  trial?: string
}

interface ShippingAddress {
  line1: string
  city: string
  postal_code: string
  country: string
}

interface SendOrderEmailParams {
  locale: "en" | "it"
  customerName: string
  customerEmail: string
  items: OrderItem[]
  totalAmountCents: number
  currency: string
  shippingAddress: ShippingAddress
}

export async function sendOrderConfirmationEmail({
  locale,
  customerName,
  customerEmail,
  items,
  totalAmountCents,
  currency,
  shippingAddress,
}: SendOrderEmailParams) {
  const isItalian = locale === "it"

  const subject = isItalian
    ? `Conferma Ordine - Versia Garden`
    : `Order Confirmation - Versia Garden`

  const emailProps = {
    customerName,
    customerEmail,
    items,
    totalAmountCents,
    currency,
    shippingAddress,
  }

  const { data, error } = await resend.emails.send({
    from: "Versia Garden <info@versiagarden.com>",
    to: [customerEmail],
    subject,
    react: isItalian
      ? OrderConfirmationIt(emailProps)
      : OrderConfirmationEn(emailProps),
  })

  if (error) {
    throw new Error(`Resend error: ${error.message}`)
  }

  return data
}
