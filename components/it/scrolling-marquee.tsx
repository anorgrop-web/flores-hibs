"use client"

export function ScrollingMarquee() {
  const messages = [
    "Garanzia di Crescita",
    "Pagamento Sicuro e Spedizione Tracciata Veloce",
    "La primavera inizia il 20 marzo — Pianta ora, fioritura tutta la stagione | Spedizione gratuita su tutti i kit",
    "Garanzia di Crescita",
    "Pagamento Sicuro e Spedizione Tracciata Veloce",
  ]

  return (
    <div className="sticky top-0 z-50 bg-amber-400 text-black py-2 overflow-hidden relative">
      <div className="flex animate-marquee whitespace-nowrap">
        {/* First set of messages */}
        {messages.map((message, index) => (
          <span key={`first-${index}`} className="mx-8 text-sm font-medium">
            {message}
          </span>
        ))}
        {/* Duplicate set for seamless loop */}
        {messages.map((message, index) => (
          <span key={`second-${index}`} className="mx-8 text-sm font-medium">
            {message}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  )
}
