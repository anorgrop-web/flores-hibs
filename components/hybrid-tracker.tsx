"use client"

import { useEffect } from "react"
import { event as pixelEvent, pageview } from "@/lib/fpixel"

/**
 * HybridTracker component - fires a PageView on mount.
 * For custom events, use the exported `trackHybridEvent` function.
 */
export function HybridTracker() {
  useEffect(() => {
    pageview()
  }, [])

  return null
}

/**
 * Sends a hybrid event: fires the Facebook Pixel on the client side
 * AND sends the same event to the Conversions API via /api/fb-events.
 * Both use the same eventId for Facebook deduplication.
 */
export async function trackHybridEvent(
  eventName: string,
  eventData: Record<string, unknown> = {},
  userData: {
    email?: string
    phone?: string
    firstName?: string
    lastName?: string
    city?: string
    country?: string
    externalId?: string
  } = {},
  eventId?: string
) {
  const id = eventId || crypto.randomUUID()

  // 1. Fire the client-side pixel event with the eventID for deduplication
  pixelEvent(eventName, eventData, id)

  // 2. Send the server-side event simultaneously
  try {
    await fetch("/api/fb-events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName,
        eventId: id,
        eventData,
        url: typeof window !== "undefined" ? window.location.href : "",
        userData,
      }),
    })
  } catch (error) {
    console.error("[hybrid-tracker] Failed to send server event:", error)
  }
}
