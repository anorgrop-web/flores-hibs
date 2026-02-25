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
    text: "L\u2019atmosph\u00e8re semble plus joyeuse, avec une ambiance tropicale, presque comme un refuge de vacances priv\u00e9. C\u2019est la premi\u00e8re chose que mes amis commentent quand ils me rendent visite.",
  },
  {
    id: 2,
    image: 'https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/Gemini_Generated_Image_4zk4nd4zk4nd4zk4.png',
    text: "L\u2019exub\u00e9rance de ses fleurs me transporte loin du bruit et du b\u00e9ton.",
  },
  {
    id: 3,
    image: 'https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/Gemini_Generated_Image_qczasfqczasfqcza.png',
    text: "Tous mes amis me le demandent \u00e0 chaque fois que je publie une photo. Il n\u2019\u00e9claire pas seulement mon espace, il \u00e9claire mon fil. C\u2019est une beaut\u00e9 qui vaut la peine d\u2019\u00eatre partag\u00e9e.",
  },
  {
    id: 4,
    image: 'https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/Gemini_Generated_Image_4tkvsy4tkvsy4tkv.png',
    text: "Entre le travail, la famille et la course quotidienne, j\u2019ai rarement un moment pour moi. Mon petit coin avec l\u2019Hibiscus est devenu mon sanctuaire. En prendre soin cinq minutes, en voyant la couleur incroyable des fleurs : c\u2019est ma m\u00e9ditation. Cela m\u2019apporte un calme que je ne trouve nulle part ailleurs. C\u2019est mon luxe quotidien de tranquillit\u00e9.",
  },
  {
    id: 5,
    image: 'https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/Gemini_Generated_Image_u2en2du2en2du2en.png',
    text: "Les fleurs sont \u00e9normes, vibrantes et durent toute la journ\u00e9e, changeant de tonalit\u00e9 avec la lumi\u00e8re. Il ne s\u2019agit pas seulement d\u2019avoir une belle plante ; il s\u2019agit d\u2019avoir un rituel quotidien qui vous connecte \u00e0 quelque chose de simple et parfait.",
  },
  {
    id: 6,
    image: 'https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/image%20874.png',
    text: "Les r\u00e9sultats parlent d\u2019eux-m\u00eames : une floraison abondante et spectaculaire. Pour quiconque prend le jardinage au s\u00e9rieux, c\u2019est une valeur s\u00fbre.",
  },
  {
    id: 7,
    image: 'https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/image%20877.png',
    text: "Nous avons d\u00e9m\u00e9nag\u00e9 r\u00e9cemment et je cherchais cet \u00e9l\u00e9ment pour que la maison se sente vraiment comme chez soi. Je l\u2019ai trouv\u00e9 dans cet Hibiscus. Avec son explosion de couleur, il a apport\u00e9 exactement l\u2019\u00e9nergie et la personnalit\u00e9 qui manquaient \u00e0 notre salon.",
  },
  {
    id: 8,
    image: 'https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/image%20878.png',
    text: "Mon mari m\u2019a offert ce plant d\u2019Hibiscus pour notre anniversaire, et c\u2019est le cadeau le plus sp\u00e9cial que j\u2019aie jamais re\u00e7u. Au lieu de fleurs qui meurent en une semaine, j\u2019ai obtenu des fleurs qui s\u2019\u00e9panouissent chaque semaine ! Chaque nouveau bourgeon qui s\u2019ouvre ressemble \u00e0 une petite c\u00e9l\u00e9bration de notre amour et de notre vie. C\u2019est un cadeau qui litt\u00e9ralement continue de fleurir.",
  },
  {
    id: 9,
    image: 'https://dxy4adpuoflk7uxq.public.blob.vercel-storage.com/Versia%20Garden/Kit%20hibiscus/image%20875.png',
    text: "J\u2019ai toujours appr\u00e9ci\u00e9 le design et l\u2019esth\u00e9tique, et pour moi, la fleur d\u2019Hibiscus est une \u0153uvre d\u2019art de la nature. Les d\u00e9tails sont incroyables : la d\u00e9licate texture des p\u00e9tales, le d\u00e9grad\u00e9 de couleur, le contraste du pistil... c\u2019est une structure parfaite.",
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
          {"Approuv\u00e9 par nos clients"}
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
                        alt={`Avis client ${review.id}`}
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
                aria-label={`Aller \u00e0 la diapositive ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
