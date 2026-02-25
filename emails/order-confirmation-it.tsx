import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components"
import * as React from "react"

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

interface OrderConfirmationItProps {
  customerName: string
  customerEmail: string
  items: OrderItem[]
  totalAmountCents: number
  currency: string
  shippingAddress: ShippingAddress
}

const formatCurrency = (amountCents: number, currency: string) => {
  const amount = amountCents / 100
  const upper = currency.toUpperCase()
  const symbol = upper === "GBP" ? "\u00A3" : upper === "USD" ? "$" : "\u20AC"
  return `${symbol}${amount.toFixed(2)}`
}

const countryNames: Record<string, string> = {
  GB: "Regno Unito",
  IT: "Italia",
  FR: "Francia",
  DE: "Germania",
  ES: "Spagna",
  PT: "Portogallo",
}

// Italian item name mapping
const itemNameIt: Record<string, string> = {
  "Hibiscus Kit": "Kit Ibisco",
  "Versia App Subscription": "Abbonamento App Versia",
  "Gardening Course": "Corso di Giardinaggio",
}

export const OrderConfirmationIt = ({
  customerName = "Cliente",
  customerEmail = "",
  items = [],
  totalAmountCents = 0,
  currency = "EUR",
  shippingAddress = { line1: "", city: "", postal_code: "", country: "" },
}: OrderConfirmationItProps) => {
  const previewText = `Grazie per il tuo ordine, ${customerName}!`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with Logo */}
          <Section style={headerSection}>
            <Img
              src="https://mk6n6kinhajxg1fp.public.blob.vercel-storage.com/Versia/Group%201087.png"
              width="160"
              height="66"
              alt="Versia Garden"
              style={logo}
            />
          </Section>

          <Hr style={divider} />

          {/* Thank You Message */}
          <Section style={contentSection}>
            <Heading style={heading}>Grazie per il tuo acquisto!</Heading>
            <Text style={paragraph}>
              Ciao {customerName}, siamo felici di darti il benvenuto nella
              famiglia Versia Garden. Il tuo ordine &egrave; stato confermato e
              viene preparato con cura.
            </Text>
          </Section>

          {/* Order Summary */}
          <Section style={contentSection}>
            <Heading as="h2" style={subheading}>
              Riepilogo Ordine
            </Heading>
            <Section style={orderTable}>
              {/* Table Header */}
              <Row style={tableHeaderRow}>
                <Column style={tableHeaderCellLeft}>
                  <Text style={tableHeaderText}>Articolo</Text>
                </Column>
                <Column style={tableHeaderCellRight}>
                  <Text style={tableHeaderText}>Prezzo</Text>
                </Column>
              </Row>

              {/* Items */}
              {items.map((item, index) => (
                <Row key={index} style={tableRow}>
                  <Column style={tableCellLeft}>
                    <Text style={itemNameStyle}>
                      {itemNameIt[item.name] || item.name}
                    </Text>
                    {item.trial && (
                      <Text style={trialBadge}>
                        Prova gratuita: {item.trial === "29 days" ? "29 giorni" : item.trial === "1 day" ? "1 giorno" : item.trial}
                      </Text>
                    )}
                  </Column>
                  <Column style={tableCellRight}>
                    <Text style={itemPrice}>
                      {item.price > 0
                        ? formatCurrency(item.price, currency)
                        : "Incluso"}
                    </Text>
                  </Column>
                </Row>
              ))}

              {/* Total */}
              <Row style={totalRow}>
                <Column style={tableCellLeft}>
                  <Text style={totalLabel}>Totale</Text>
                </Column>
                <Column style={tableCellRight}>
                  <Text style={totalAmount}>
                    {formatCurrency(totalAmountCents, currency)}
                  </Text>
                </Column>
              </Row>
            </Section>
          </Section>

          <Hr style={divider} />

          {/* Shipping Address */}
          <Section style={contentSection}>
            <Heading as="h2" style={subheading}>
              Indirizzo di Spedizione
            </Heading>
            <Text style={addressText}>
              {customerName}
              <br />
              {shippingAddress.line1}
              <br />
              {shippingAddress.city}, {shippingAddress.postal_code}
              <br />
              {countryNames[shippingAddress.country] ||
                shippingAddress.country}
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Next Steps */}
          <Section style={contentSection}>
            <Heading as="h2" style={subheading}>
              Prossimi Passi
            </Heading>
            <Section style={stepsContainer}>
              <Row style={stepRow}>
                <Column style={stepNumberCol}>
                  <Text style={stepNumber}>1</Text>
                </Column>
                <Column style={stepTextCol}>
                  <Text style={stepTitle}>Elaborazione Ordine</Text>
                  <Text style={stepDescription}>
                    Stiamo preparando il tuo Kit Ibisco con cura.
                  </Text>
                </Column>
              </Row>
              <Row style={stepRow}>
                <Column style={stepNumberCol}>
                  <Text style={stepNumber}>2</Text>
                </Column>
                <Column style={stepTextCol}>
                  <Text style={stepTitle}>Conferma Spedizione</Text>
                  <Text style={stepDescription}>
                    Riceverai un numero di tracciamento via email una volta
                    spedito il tuo ordine.
                  </Text>
                </Column>
              </Row>
              <Row style={stepRow}>
                <Column style={stepNumberCol}>
                  <Text style={stepNumber}>3</Text>
                </Column>
                <Column style={stepTextCol}>
                  <Text style={stepTitle}>Consegna</Text>
                  <Text style={stepDescription}>
                    Il tuo kit verr&agrave; consegnato entro 5-7 giorni
                    lavorativi.
                  </Text>
                </Column>
              </Row>
            </Section>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footerSection}>
            <Text style={footerText}>
              Se hai domande, rispondi semplicemente a questa email o contattaci
              a{" "}
              <a href="mailto:info@versiagarden.com" style={footerLink}>
                info@versiagarden.com
              </a>
            </Text>
            <Text style={footerCopyright}>
              &copy; {new Date().getFullYear()} Versia Garden. Tutti i diritti
              riservati.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default OrderConfirmationIt

// --- Styles ---

const main: React.CSSProperties = {
  backgroundColor: "#f6f9f6",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
}

const container: React.CSSProperties = {
  margin: "0 auto",
  padding: "0",
  maxWidth: "600px",
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  overflow: "hidden",
  marginTop: "32px",
  marginBottom: "32px",
}

const headerSection: React.CSSProperties = {
  backgroundColor: "#016630",
  padding: "32px 40px",
  textAlign: "center" as const,
}

const logo: React.CSSProperties = {
  margin: "0 auto",
}

const divider: React.CSSProperties = {
  borderColor: "#e5e7eb",
  margin: "0",
}

const contentSection: React.CSSProperties = {
  padding: "28px 40px",
}

const heading: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#016630",
  lineHeight: "1.4",
  margin: "0 0 12px 0",
}

const subheading: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#1a1a1a",
  lineHeight: "1.4",
  margin: "0 0 16px 0",
}

const paragraph: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#4b5563",
  margin: "0",
}

const orderTable: React.CSSProperties = {
  width: "100%",
}

const tableHeaderRow: React.CSSProperties = {
  backgroundColor: "#f9fafb",
  borderRadius: "6px",
}

const tableHeaderCellLeft: React.CSSProperties = {
  padding: "10px 14px",
  width: "70%",
}

const tableHeaderCellRight: React.CSSProperties = {
  padding: "10px 14px",
  width: "30%",
  textAlign: "right" as const,
}

const tableHeaderText: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: "600",
  color: "#6b7280",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  margin: "0",
}

const tableRow: React.CSSProperties = {
  borderBottom: "1px solid #f3f4f6",
}

const tableCellLeft: React.CSSProperties = {
  padding: "14px 14px",
  verticalAlign: "top" as const,
}

const tableCellRight: React.CSSProperties = {
  padding: "14px 14px",
  textAlign: "right" as const,
  verticalAlign: "top" as const,
}

const itemNameStyle: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "500",
  color: "#1a1a1a",
  margin: "0",
}

const trialBadge: React.CSSProperties = {
  fontSize: "12px",
  color: "#016630",
  backgroundColor: "#ecfdf5",
  padding: "2px 8px",
  borderRadius: "4px",
  display: "inline-block",
  marginTop: "4px",
  margin: "4px 0 0 0",
}

const itemPrice: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "500",
  color: "#1a1a1a",
  margin: "0",
}

const totalRow: React.CSSProperties = {
  backgroundColor: "#f9fafb",
  borderRadius: "6px",
}

const totalLabel: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: "700",
  color: "#1a1a1a",
  margin: "0",
}

const totalAmount: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: "700",
  color: "#016630",
  margin: "0",
}

const addressText: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: "1.8",
  color: "#4b5563",
  margin: "0",
  backgroundColor: "#f9fafb",
  padding: "16px",
  borderRadius: "6px",
}

const stepsContainer: React.CSSProperties = {
  width: "100%",
}

const stepRow: React.CSSProperties = {
  marginBottom: "12px",
}

const stepNumberCol: React.CSSProperties = {
  width: "36px",
  verticalAlign: "top" as const,
}

const stepNumber: React.CSSProperties = {
  width: "28px",
  height: "28px",
  borderRadius: "50%",
  backgroundColor: "#016630",
  color: "#ffffff",
  fontSize: "13px",
  fontWeight: "600",
  textAlign: "center" as const,
  lineHeight: "28px",
  margin: "0",
}

const stepTextCol: React.CSSProperties = {
  verticalAlign: "top" as const,
  paddingLeft: "8px",
}

const stepTitle: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#1a1a1a",
  margin: "0 0 2px 0",
}

const stepDescription: React.CSSProperties = {
  fontSize: "13px",
  color: "#6b7280",
  margin: "0 0 12px 0",
  lineHeight: "1.5",
}

const footerSection: React.CSSProperties = {
  padding: "24px 40px",
  backgroundColor: "#f9fafb",
  textAlign: "center" as const,
}

const footerText: React.CSSProperties = {
  fontSize: "13px",
  color: "#6b7280",
  lineHeight: "1.6",
  margin: "0 0 8px 0",
}

const footerLink: React.CSSProperties = {
  color: "#016630",
  textDecoration: "underline",
}

const footerCopyright: React.CSSProperties = {
  fontSize: "12px",
  color: "#9ca3af",
  margin: "0",
}
