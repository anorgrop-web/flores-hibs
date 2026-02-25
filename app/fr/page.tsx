import { Header } from "@/components/fr/header"
import { ProductSection } from "@/components/fr/product-section"
import { ScrollingMarquee } from "@/components/fr/scrolling-marquee"
import { AlertBar } from "@/components/fr/alert-bar"
import { FeaturesSection } from "@/components/fr/features-section"
import { ScrollingMarqueeDark } from "@/components/fr/scrolling-marquee-dark"
import { SuccessSection } from "@/components/fr/success-section"
import { GerminationSection } from "@/components/fr/germination-section"
import { TechnicalDataSection } from "@/components/fr/technical-data-section"
import { ComparisonSection } from "@/components/fr/comparison-section"
import { CustomerReviewsSection } from "@/components/fr/customer-reviews-section"
import { TestimonialsSection } from "@/components/fr/testimonials-section"
import { OurStorySection } from "@/components/fr/our-story-section"
import { Footer } from "@/components/fr/footer"
import { FaqSection } from "@/components/fr/faq-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Versia Garden - Plantes d'Hibiscus Premium",
  description: "Plantes d'hibiscus de haute qualit\u00e9 avec floraison garantie",
}

export default function FrenchPage() {
  return (
    <>
      <ScrollingMarquee />
      <AlertBar />
      <Header />
      <main>
        <ProductSection />
        <FeaturesSection />
        <ScrollingMarqueeDark />
        <SuccessSection />
        <GerminationSection />
        <TechnicalDataSection />
        <ComparisonSection />
        <CustomerReviewsSection />
        <TestimonialsSection />
        <OurStorySection />
        <FaqSection />
      </main>
      <Footer />
    </>
  )
}
