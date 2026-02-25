import { Flower2 } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      title: "Pr\u00eats \u00e0 Fleurir au Printemps",
      description:
        "Plantez maintenant et profitez des premi\u00e8res fleurs en quelques semaines \u2014 parfaitement synchronis\u00e9 avec la nouvelle saison.",
    },
    {
      title: "Des Couleurs Qui Durent Toute la Saison",
      description:
        "Des premiers beaux jours jusqu\u2019au d\u00e9but de l\u2019automne, votre hibiscus continuera de fleurir sans interruption.",
    },
    {
      title: "S\u2019\u00c9panouit Partout",
      description:
        "Pots, parterres, balcons ou all\u00e9es \u2014 ces plantes s\u2019adaptent \u00e0 tous les espaces dont vous disposez.",
    },
    {
      title: "Donne Vie \u00e0 Votre Jardin",
      description:
        "Les p\u00e9tales \u00e9clatants attirent papillons et pollinisateurs, transformant votre espace ext\u00e9rieur en un spectacle vivant.",
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
              {"Votre navigateur ne prend pas en charge la balise vid\u00e9o."}
            </video>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-balance">
            {"Le Jardin Printanier Parfait Commence Par Ce Que Vous Plantez Aujourd\u2019hui."}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-4xl mx-auto text-pretty">
            {"Pendant que les autres attendent le printemps, les jardiniers avis\u00e9s plantent d\u00e9j\u00e0. Mettez votre Kit d\u2019"}<span className="font-semibold text-foreground">{"Hibiscus Double"}</span>{" en terre maintenant et regardez-les \u00e9clore en floraisons vibrantes et opulentes d\u00e8s l\u2019arriv\u00e9e des beaux jours \u2014 la fen\u00eatre id\u00e9ale pour commencer se referme."}
          </p>
        </div>

        {/* Features Section */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">{"Caract\u00e9ristiques que Vous Aimerez"}</h3>

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
