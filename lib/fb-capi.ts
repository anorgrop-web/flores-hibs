import crypto from "crypto"
import { FB_PIXEL_ID } from "./fpixel"

const META_API_TOKEN = process.env.META_API_TOKEN

function hashData(data: string): string {
  return crypto
    .createHash("sha256")
    .update(data.trim().toLowerCase())
    .digest("hex")
}

interface UserData {
  em?: string
  ph?: string
  fn?: string
  ln?: string
  ct?: string
  country?: string
  external_id?: string
  client_ip_address?: string
  client_user_agent?: string
  fbp?: string
  fbc?: string
}

interface ServerEventOptions {
  eventName: string
  eventId: string
  eventData?: Record<string, unknown>
  userData?: UserData
  url?: string
}

export async function sendServerEvent({
  eventName,
  eventId,
  eventData = {},
  userData = {},
  url,
}: ServerEventOptions) {
  if (!META_API_TOKEN) {
    console.error("[fb-capi] META_API_TOKEN is not set. Skipping server event.")
    return null
  }

  const hashedUserData: Record<string, string | undefined> = {}

  // Hash PII fields
  if (userData.em) hashedUserData.em = hashData(userData.em)
  if (userData.ph) hashedUserData.ph = hashData(userData.ph)
  if (userData.fn) hashedUserData.fn = hashData(userData.fn)
  if (userData.ln) hashedUserData.ln = hashData(userData.ln)
  if (userData.ct) hashedUserData.ct = hashData(userData.ct)
  if (userData.country) hashedUserData.country = hashData(userData.country)
  if (userData.external_id)
    hashedUserData.external_id = hashData(userData.external_id)

  // Do NOT hash these fields
  if (userData.client_ip_address)
    hashedUserData.client_ip_address = userData.client_ip_address
  if (userData.client_user_agent)
    hashedUserData.client_user_agent = userData.client_user_agent
  if (userData.fbp) hashedUserData.fbp = userData.fbp
  if (userData.fbc) hashedUserData.fbc = userData.fbc

  const eventPayload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: url,
        action_source: "website",
        user_data: hashedUserData,
        custom_data: eventData,
      },
    ],
  }

  const apiUrl = `https://graph.facebook.com/v19.0/${FB_PIXEL_ID}/events?access_token=${META_API_TOKEN}`

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventPayload),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error("[fb-capi] Error sending server event:", result)
    }

    return result
  } catch (error) {
    console.error("[fb-capi] Failed to send server event:", error)
    return null
  }
}
