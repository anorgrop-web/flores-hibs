'use client'

import { useState, useEffect } from 'react'
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

const reviews = [
  {
    id: 1,
    image: 'https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/Gemini_Generated_Image_ltnw6mltnw6mltnw.png',
    text: "El ambiente parece mas alegre, con una atmosfera tropical, casi como un refugio vacacional privado. Es lo primero que mis amigos comentan cuando me visitan.",
  },
  {
    id: 2,
    image: 'https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/Gemini_Generated_Image_4zk4nd4zk4nd4zk4.png',
    text: "La exuberancia de sus flores me transporta lejos del ruido y del cemento.",
  },
  {
    id: 3,
    image: 'https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/Gemini_Generated_Image_qczasfqczasfqcza.png',
    text: "Todos mis amigos me lo preguntan cada vez que publico una foto. No solo ilumina mi espacio, ilumina mi feed. Es una belleza que vale la pena compartir.",
  },
  {
    id: 4,
    image: 'https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/Gemini_Generated_Image_4tkvsy4tkvsy4tkv.png',
    text: "Entre el trabajo, la familia y el dia a dia, raramente tengo un momento para mi. Mi pequeno rincon con el Hibisco se ha convertido en mi santuario. Cuidarlo durante cinco minutos, viendo el color increible de las flores: esa es mi meditacion. Me aporta una calma que no encuentro en ningun otro lugar. Es mi lujo diario de tranquilidad.",
  },
  {
    id: 5,
    image: 'https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/Gemini_Generated_Image_u2en2du2en2du2en.png',
    text: "Las flores son enormes, vibrantes y duran todo el dia, cambiando de tono con la luz. No se trata solo de tener una planta bonita; se trata de tener un ritual diario que te conecta con algo simple y perfecto.",
  },
  {
    id: 6,
    image: 'https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/image%20874.png',
    text: "Los resultados hablan por si solos: una floracion abundante y espectacular. Para cualquiera que se tome en serio la jardineria, esta es una apuesta segura.",
  },
  {
    id: 7,
    image: 'https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/image%20877.png',
    text: "Nos mudamos recientemente y estaba buscando esa pieza para que la casa se sintiera realmente como un hogar. La encontre en este Hibisco. Con su explosion de color, aporto exactamente la energia y personalidad que faltaba en nuestro salon.",
  },
  {
    id: 8,
    image: 'https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/image%20878.png',
    text: "Mi marido me regalo esta plantita de Hibisco por nuestro aniversario, y es el regalo mas especial que he recibido jamas. En lugar de flores que mueren en una semana, ¡tengo flores que florecen cada semana! Cada nuevo capullo que se abre parece una pequena celebracion de nuestro amor y nuestra vida. Es un regalo que literalmente sigue floreciendo.",
  },
  {
    id: 9,
    image: 'https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/image%20875.png',
    text: "Siempre he apreciado el diseno y la estetica, y para mi, la flor de Hibisco es una obra de arte de la naturaleza. Los detalles son increibles: la delicada textura de los petalos, el degradado de color, el contraste del pistilo... es una estructura perfecta.",
  },
]

export function CustomerReviewsSection() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Aprobado por nuestros clientes
        </h2>
        
        <div className="relative px-4 md:px-16">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {reviews.map((review) => (
                <CarouselItem key={review.id} className="md:basis-1/3">
                  <div className="flex flex-col h-full">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-4">
                      <Image
                        src={review.image || "https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/Gemini_Generated_Image_u2en2du2en2du2en.png"}
                        alt={`Resena de cliente ${review.id}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm flex-1">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {review.text}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />

            {/* Mobile Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-4 md:hidden">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
          
          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-all ${
                  index === current
                    ? 'w-8 bg-gray-800'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ir a la slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
