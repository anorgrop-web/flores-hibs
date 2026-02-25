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
                alt="Helena Viana, fundadora de Versia Garden, en el invernadero"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-balance">Nuestra Historia</h2>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                La historia de Versia Garden comienza con la pasion de nuestra fundadora, la botanica Helena Viana, por el poder de las flores para transformar lo ordinario en extraordinario. Vio que miles de personas compartian este sueno pero se veian frenadas por la frustracion de plantas raras inaccesibles y dificiles de cultivar. Su mision se volvio clara: crear un ecosistema completo para permitir que cualquiera tenga exito, centrandose exclusivamente en la alegria de la jardineria.
              </p>

              <p>
                De esa mision nacio el movimiento 'The Colour Awakening'. Hoy somos mas que una tienda; somos companeros para todos aquellos que desean ser agentes de transformacion cultivando la belleza en sus hogares. Unete a nosotros, planta un hibisco y mira como tu historia de color se despliega.
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
              <span className="text-gray-700 font-medium">(19.329 Resenas)</span>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 max-w-7xl mx-auto">
          <div className="relative w-full rounded-2xl overflow-hidden">
            <Image
              src="/images/design-mode/a8e399fcfcf6a29c3ce0bd1ae5ff2900d1d38aa9.webp"
              alt="Proceso de crecimiento del hibisco"
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
