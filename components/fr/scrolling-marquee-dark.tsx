"use client"

export function ScrollingMarqueeDark() {
  const messages = ["Garantie de Croissance", "Paiement s\u00e9curis\u00e9", "Livraison suivie"]

  // Duplicate messages for seamless loop
  const allMessages = [...messages, ...messages, ...messages, ...messages]

  return (
    <div className="bg-black text-white py-2 overflow-hidden">
      <div className="flex animate-scroll-left whitespace-nowrap">
        {allMessages.map((message, index) => (
          <span key={index} className="inline-flex items-center px-8 text-sm font-medium">
            {message}
          </span>
        ))}
      </div>
    </div>
  )
}
