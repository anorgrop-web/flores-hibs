import Image from "next/image"

export function GerminationSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:gap-12 lg:gap-16">
          {/* Text Content - Shows first on mobile, left on desktop */}
          <div className="md:w-1/2 md:order-1">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              NUESTRO CUIDADO EXPERTO GARANTIZA QUE TUS PLANTAS PROSPEREN
            </h2>

            <div className="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                Cada una de nuestras plantitas jovenes es cuidada por cultivadores expertos para desarrollar un sistema radicular robusto, haciendola fuerte y resistente.
              </p>

              <p>
                Las enviamos directamente desde nuestro vivero a tu puerta en embalajes a medida y seguros. Esto asegura que tu planta llegue sana y lista para prosperar, saltando completamente la fase fragil e incierta de la germinacion.
              </p>
            </div>
          </div>

          {/* Image - Shows second on mobile, right on desktop */}
          <div className="mt-8 md:mt-0 md:w-1/2 md:order-2">
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="https://mk6n6kinhajxg1fp.public.blob.vercel-storage.com/Versia/_prompt_professional_2k_202602241415.jpeg"
                alt="Bandeja de germinacion con plantulas y mano abriendo la tapa"
                width={800}
                height={600}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
