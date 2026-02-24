import { NextRequest, NextResponse } from "next/server"
import { sendServerEvent } from "@/lib/fb-capi"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { eventName, eventId, eventData, url, userData } = body

    if (!eventName || !eventId) {
      return NextResponse.json(
        { error: "eventName and eventId are required" },
        { status: 400 }
      )
    }

    // Extract cookies for Facebook deduplication
    const fbp = request.cookies.get("_fbp")?.value || ""
    const fbc = request.cookies.get("_fbc")?.value || ""

    // Extract client IP from headers
    const forwardedFor = request.headers.get("x-forwarded-for")
    const realIp = request.headers.get("x-real-ip")
    const clientIp = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : realIp || ""

    // Extract user agent
    const clientUserAgent = request.headers.get("user-agent") || ""

    // Build user data with hashed PII
    const serverUserData: Record<string, string> = {
      client_ip_address: clientIp,
      client_user_agent: clientUserAgent,
    }

    if (fbp) serverUserData.fbp = fbp
    if (fbc) serverUserData.fbc = fbc

    // Pass through user-provided PII (will be hashed by sendServerEvent)
    if (userData?.email) serverUserData.em = userData.email
    if (userData?.phone) serverUserData.ph = userData.phone
    if (userData?.firstName) serverUserData.fn = userData.firstName
    if (userData?.lastName) serverUserData.ln = userData.lastName
    if (userData?.city) serverUserData.ct = userData.city
    if (userData?.country) serverUserData.country = userData.country
    if (userData?.externalId) serverUserData.external_id = userData.externalId

    const result = await sendServerEvent({
      eventName,
      eventId,
      eventData,
      userData: serverUserData,
      url,
    })

    return NextResponse.json({ success: true, result })
  } catch (error) {
    console.error("[fb-events] Error processing event:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
