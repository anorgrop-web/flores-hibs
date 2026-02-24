import { Flower2 } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      title: "Pronti a Fiorire per la Primavera",
      description:
        "Pianta ora e goditi i primi fiori in poche settimane — perfettamente in tempo per la nuova stagione.",
    },
    {
      title: "Colore Che Dura Tutta la Stagione",
      description:
        "Dai primi giorni caldi fino all'inizio dell'autunno, il tuo ibisco continuerà a fiorire senza sosta.",
    },
    {
      title: "Cresce Ovunque",
      description:
        "Vasi, aiuole, balconi o vialetti — queste piante si adattano a qualsiasi spazio tu abbia.",
    },
    {
      title: "Dà Vita al Tuo Giardino",
      description:
        "I petali vibranti attirano farfalle e impollinatori, trasformando il tuo spazio esterno in uno spettacolo vivente.",
    },
  ]

  return (
    <section className="bg-background py-12 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12 md:mb-16">
          <div className="mb-8 md:mb-12 max-w-4xl mx-auto">
            <video autoPlay loop muted playsInline className="w-full rounded-lg">
              <source
                src="https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/video%20hibiscus%20pg.mp4"
                type="video/mp4"
              />
              Il tuo browser non supporta il tag video.
            </video>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-balance">
            Il Giardino Primaverile Perfetto Inizia Con Quello Che Pianti Oggi.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-4xl mx-auto text-pretty">
            Mentre gli altri aspettano la primavera, i giardinieri furbi stanno già piantando. Metti il tuo Kit di{" "}
            <span className="font-semibold text-foreground">Ibisco Doppio</span> nel terreno ora e guardali esplodere in fioriture vibranti e stratificate proprio quando arrivano le giornate calde — la finestra perfetta per iniziare si sta chiudendo.
          </p>
        </div>

        {/* Features Section */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">Caratteristiche che Amerai</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-10 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 text-emerald-600">
                    <Flower2 className="w-full h-full" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-bold mb-2">{feature.title}</h4>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
