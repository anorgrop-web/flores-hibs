import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function FaqSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-8">
          Preguntas Frecuentes
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>¿Cual es el tamano de las plantitas?</AccordionTrigger>
            <AccordionContent>
              Nuestras plantas se envian con una altura robusta entre{" "}
              <strong>10cm y 15cm</strong>, con un sistema radicular bien desarrollado y
              listo para un crecimiento rapido.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>¿Es una planta perenne?</AccordionTrigger>
            <AccordionContent>
              Si, son plantas perennes. Generalmente ofrecen una floracion
              espectacular desde{" "}
              <strong>
                finales de primavera durante todo el verano hasta bien entrado el otono
              </strong>
              . En climas mas calidos, pueden florecer casi todo el ano.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>¿Puedo plantarlas en otono o invierno?</AccordionTrigger>
            <AccordionContent>
              ¡Por supuesto! Pueden plantarse durante todo el ano. En los meses mas
              frios, recomendamos empezar en maceta en interior o en un invernadero
              cerca de una ventana soleada, trasladandolas al exterior una vez
              pasado el riesgo de heladas.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>¿Requieren mucho mantenimiento?</AccordionTrigger>
            <AccordionContent>
              En absoluto. Son plantas sencillas que prosperan facilmente. Consejos
              clave: asegurate de que reciban{" "}
              <strong>4-6 horas de sol directo</strong> al dia, manten el
              suelo constantemente humedo (pero no encharcado) y usa un fertilizante
              equilibrado durante la temporada de floracion.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}
