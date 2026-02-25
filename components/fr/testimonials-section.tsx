"use client"

import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from "react"

const testimonials = [
  {
    name: "Jason R",
    text: "S\u00e9rieusement, ces hibiscus doubles sont de vraies vedettes. \u2b50 Je re\u00e7ois des compliments \u00e0 chaque fois que mes amis viennent me voir. Chaque centime en vaut la peine !",
  },
  {
    name: "Willian M",
    text: "Facile \u00e0 planter et les r\u00e9sultats sont fantastiques ! \uD83C\uDF31 Ils ont transform\u00e9 mon jardin ennuyeux en une oasis vibrante.",
  },
  {
    name: "Linda T",
    text: "Je ne suis pas une jardinière professionnelle, mais ces plants m\u2019ont fait passer pour une ! \uD83C\uDF89 Les p\u00e9tales doubles sont si uniques. Je les adore !",
  },
  {
    name: "Julian N",
    text: "J\u2019ai tent\u00e9 ma chance avec ces plantes rares et je suis ravi. \uD83C\uDF3A Elles ont ajout\u00e9 une touche de magie \u00e0 mon balcon. J\u2019en commanderai d\u2019autres !",
  },
  {
    name: "Nicolas V",
    text: "Ces plantes sont la vraie affaire ! \uD83C\uDF08 Les couleurs sont si vives. Mon jardin est maintenant mon endroit pr\u00e9f\u00e9r\u00e9 pour me d\u00e9tendre.",
  },
  {
    name: "Nathalie P",
    text: "\uD83C\uDF38 Ces plantes rares changent tout ! Je les ai plant\u00e9es dans mon jardin et maintenant c\u2019est un paradis fleuri. Si faciles \u00e0 cultiver \u2014 m\u00eame moi je n\u2019ai pas fait d\u2019erreur !",
  },
  {
    name: "Francesca I",
    text: "Juste re\u00e7u mes plants. \uD83C\uDF3A J\u2019ai h\u00e2te de voir ces beaut\u00e9s dans mon jardin. Mes voisins vont \u00eatre tellement jaloux !",
  },
  {
    name: "Daniel G",
    text: "Wow ! Les fleurs doubles sont magnifiques. \uD83C\uDF0B Elles ont ajout\u00e9 tellement de couleur \u00e0 ma terrasse. Meilleur achat jardinage de l\u2019ann\u00e9e !",
  },
  {
    name: "Laura F",
    text: "Je les ai achet\u00e9s sur un coup de t\u00eate et j\u2019en suis obsess\u00e9e. \uD83D\uDE0D Les regarder pousser a \u00e9t\u00e9 tellement th\u00e9rapeutique. Parfaits pour mon rebord de fen\u00eatre ensoleill\u00e9.",
  },
  {
    name: "Andrea D",
    text: "C\u2019est ma premi\u00e8re fois que je plante, je suis tr\u00e8s heureuse d\u2019y \u00eatre arriv\u00e9e !!",
  },
  {
    name: "Claudia O",
    text: "C\u2019est mon troisi\u00e8me achat et il y a une raison pour laquelle je reviens toujours. Les plantes sont constamment de haute qualit\u00e9 et le taux de croissance est le meilleur que j\u2019aie trouv\u00e9. Fortement recommand\u00e9.",
  },
  {
    name: "Val\u00e9rie G",
    text: "Plantes fantastiques, fleurs magnifiques. D\u00e9j\u00e0 \u00e0 ma troisi\u00e8me commande chez eux.",
  },
]

export function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="relative bg-[#3d4f5c] py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Avis Trustpilot</h2>
          <div className="flex items-center justify-center gap-3">
            <span className="text-lg text-white md:text-xl">Excellent</span>
            <span className="text-2xl font-bold text-white md:text-3xl">4.9 / 5</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-[#00b67a] p-1 flex items-center justify-center">
                  <Star className="h-4 w-4 fill-white text-white" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden gap-6 md:grid md:grid-cols-3">
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <div key={index} className="rounded-2xl bg-white p-6 shadow-lg">
              <div className="mb-4 flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="bg-[#00b67a] p-1 flex items-center justify-center">
                    <Star className="h-4 w-4 fill-white text-white" />
                  </div>
                ))}
              </div>
              <h3 className="mb-3 text-center text-lg font-bold">{testimonial.name}</h3>
              <p className="text-center text-sm leading-relaxed text-gray-700">{testimonial.text}</p>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="relative">
            <button
              onClick={goToPrevSlide}
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-all hover:bg-white active:scale-95"
              aria-label="T\u00e9moignage pr\u00e9c\u00e9dent"
            >
              <ChevronLeft className="h-6 w-6 text-[#3d4f5c]" />
            </button>

            <button
              onClick={goToNextSlide}
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-all hover:bg-white active:scale-95"
              aria-label="T\u00e9moignage suivant"
            >
              <ChevronRight className="h-6 w-6 text-[#3d4f5c]" />
            </button>

            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="rounded-2xl bg-white p-6 shadow-lg">
                      <div className="mb-4 flex justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="bg-[#00b67a] p-1 flex items-center justify-center">
                            <Star className="h-4 w-4 fill-white text-white" />
                          </div>
                        ))}
                      </div>
                      <h3 className="mb-3 text-center text-lg font-bold">{testimonial.name}</h3>
                      <p className="text-center text-sm leading-relaxed text-gray-700">{testimonial.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Carousel Dots */}
          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  currentSlide === index ? "w-6 bg-white" : "bg-white/50"
                }`}
                aria-label={`Aller \u00e0 la diapositive ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-[200%] h-[60px] md:h-[80px] animate-wave"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="fill-[#5a7c8c]"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="fill-[#5a7c8c]"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="fill-white"
          />
        </svg>
      </div>
    </section>
  )
}
