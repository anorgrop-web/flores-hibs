import Image from "next/image"

export function GerminationSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="md:w-1/2 md:order-1">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {"NOTRE EXPERTISE GARANTIT QUE VOS PLANTES PROSP\u00c8RENT"}
            </h2>

            <div className="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                {"Chacune de nos jeunes plantes est cultiv\u00e9e par des experts pour d\u00e9velopper un syst\u00e8me racinaire robuste, la rendant forte et r\u00e9siliente."}
              </p>

              <p>
                {"Nous les exp\u00e9dions directement de notre p\u00e9pini\u00e8re chez vous dans des emballages sur mesure et s\u00e9curis\u00e9s. Cela garantit que votre plante arrive saine et pr\u00eate \u00e0 prosp\u00e9rer, en sautant compl\u00e8tement la phase fragile et incertaine de la germination."}
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="mt-8 md:mt-0 md:w-1/2 md:order-2">
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="https://mk6n6kinhajxg1fp.public.blob.vercel-storage.com/Versia/_prompt_professional_2k_202602241415.jpeg"
                alt="Plateau de germination avec semis et main ouvrant le couvercle"
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
