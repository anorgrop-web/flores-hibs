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
          {"Questions Fr\u00e9quentes"}
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>{"Quelle est la taille des plants ?"}</AccordionTrigger>
            <AccordionContent>
              {"Nos plantes sont exp\u00e9di\u00e9es avec une hauteur robuste entre"}{" "}
              <strong>10cm et 15cm</strong>{", avec un syst\u00e8me racinaire bien d\u00e9velopp\u00e9 et pr\u00eat pour une croissance rapide."}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>{"Est-ce une plante vivace ?"}</AccordionTrigger>
            <AccordionContent>
              {"Oui, ce sont des plantes vivaces. Elles offrent g\u00e9n\u00e9ralement une floraison spectaculaire de la"}{" "}
              <strong>
                {"fin du printemps tout au long de l\u2019\u00e9t\u00e9 jusqu\u2019\u00e0 l\u2019automne avanc\u00e9"}
              </strong>
              {". Dans les climats plus chauds, elles peuvent fleurir presque toute l\u2019ann\u00e9e."}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>{"Puis-je les planter en automne ou en hiver ?"}</AccordionTrigger>
            <AccordionContent>
              {"Absolument ! Elles peuvent \u00eatre plant\u00e9es toute l\u2019ann\u00e9e. Pendant les mois les plus froids, nous recommandons de commencer en pot \u00e0 l\u2019int\u00e9rieur ou dans une serre pr\u00e8s d\u2019une fen\u00eatre ensoleill\u00e9e, en les d\u00e9pla\u00e7ant \u00e0 l\u2019ext\u00e9rieur une fois le risque de gel pass\u00e9."}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>{"N\u00e9cessitent-elles beaucoup d\u2019entretien ?"}</AccordionTrigger>
            <AccordionContent>
              {"Pas du tout. Ce sont des plantes simples qui prosp\u00e8rent facilement. Conseils cl\u00e9s : assurez-vous qu\u2019elles re\u00e7oivent"}{" "}
              <strong>{"4 \u00e0 6 heures de soleil direct"}</strong>{" par jour, maintenez le sol constamment humide (mais pas d\u00e9tremp\u00e9) et utilisez un engrais \u00e9quilibr\u00e9 pendant la saison de floraison."}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}
