import { Flower2 } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      title: "Ready to Bloom This Spring",
      description: "Plant now and enjoy the first flowers within weeks — perfectly timed for the new season.",
    },
    {
      title: "Color That Lasts All Season Long",
      description: "From the first warm days through early fall, your hibiscus will keep blooming non-stop.",
    },
    {
      title: "Thrives Anywhere",
      description: "Pots, garden beds, patios, or walkways — these plants adapt to whatever space you've got.",
    },
    {
      title: "Brings Your Garden to Life",
      description: "Vibrant petals attract butterflies and pollinators, turning your outdoor space into a living display.",
    },
  ]

  return (
    <section className="bg-background py-12 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div className="mb-8 md:mb-12 max-w-4xl mx-auto">
            <div className="relative w-full aspect-video overflow-hidden rounded-lg">
              <iframe
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78%] h-[177.78%] min-w-full min-h-full"
                src="https://www.youtube.com/embed/EbRDLkSlS0M?autoplay=1&mute=1&loop=1&playlist=EbRDLkSlS0M&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0&playsinline=1&enablejsapi=1"
                title="Versia Garden Product Video"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen={false}
                loading="eager"
                style={{ pointerEvents: 'none' }}
              />
              <div className="absolute bottom-0 right-0 w-36 h-12 bg-background z-10" style={{ pointerEvents: 'none' }} />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-balance">
            The Perfect Spring Garden Starts With What You Plant Today.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-4xl mx-auto text-pretty">
            While everyone else waits for spring, smart gardeners are already planting. Get your{" "}
            <span className="font-semibold text-foreground">Double Hibiscus</span> Starter Kit in the ground now and watch them burst into vibrant, layered blooms right when the warm weather hits — the perfect window to start is closing fast.
          </p>
        </div>

        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">{"Features You'll Love"}</h3>

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
