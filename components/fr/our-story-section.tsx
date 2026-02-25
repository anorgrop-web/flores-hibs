import { Star } from 'lucide-react'
import Image from "next/image"

export function OurStorySection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center max-w-7xl mx-auto">
          {/* Image */}
          <div className="w-full md:w-1/2">
            <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden">
              <Image
                src="/images/design-mode/Gemini_Generated_Image_bh8t6jbh8t6jbh8t.png"
                alt="Helena Viana, fondatrice de Versia Garden, en serre"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">Notre Histoire</h2>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                {"L\u2019histoire de Versia Garden commence avec la passion de notre fondatrice, la botaniste Helena Viana, pour le pouvoir des fleurs de transformer l\u2019ordinaire en extraordinaire. Elle a vu que des milliers de personnes partageaient ce r\u00eave mais \u00e9taient frein\u00e9es par la frustration de plantes rares inaccessibles et difficiles \u00e0 cultiver. Sa mission est devenue claire : cr\u00e9er un \u00e9cosyst\u00e8me complet pour permettre \u00e0 chacun de r\u00e9ussir, en se concentrant exclusivement sur la joie du jardinage."}
              </p>

              <p>
                {"De cette mission est n\u00e9 le mouvement \u2018The Colour Awakening\u2019. Aujourd\u2019hui, nous sommes plus qu\u2019un magasin ; nous sommes partenaires de tous ceux qui souhaitent \u00eatre des agents de transformation en cultivant la beaut\u00e9 dans leurs maisons. Rejoignez-nous, plantez un hibiscus et regardez votre histoire de couleur se d\u00e9ployer."}
              </p>
            </div>

            {/* Trustpilot Rating */}
            <div className="flex items-center gap-2 pt-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-[#00b67a] p-1 flex items-center justify-center">
                    <Star className="w-4 h-4 fill-white text-white" />
                  </div>
                ))}
              </div>
              <span className="text-gray-700 font-medium">(19.329 Avis)</span>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 max-w-7xl mx-auto">
          <div className="relative w-full rounded-2xl overflow-hidden">
            <Image
              src="/images/design-mode/a8e399fcfcf6a29c3ce0bd1ae5ff2900d1d38aa9.webp"
              alt="Processus de croissance de l'hibiscus"
              width={1200}
              height={600}
              sizes="100vw"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
