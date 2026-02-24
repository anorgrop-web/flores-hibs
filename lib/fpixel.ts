export const FB_PIXEL_ID = "1147357797261967"

declare global {
  interface Window {
    fbq: (
      action: string,
      eventName: string,
      params?: Record<string, unknown>,
      options?: { eventID: string }
    ) => void
  }
}

export const pageview = () => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "PageView")
  }
}

export const event = (
  name: string,
  params: Record<string, unknown> = {},
  eventID?: string
) => {
  if (typeof window !== "undefined" && window.fbq) {
    if (eventID) {
      window.fbq("track", name, params, { eventID })
    } else {
      window.fbq("track", name, params)
    }
  }
}
