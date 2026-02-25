import { Header } from "@/components/es/header"
import { ProductSection } from "@/components/es/product-section"
import { ScrollingMarquee } from "@/components/es/scrolling-marquee"
import { AlertBar } from "@/components/es/alert-bar"
import { FeaturesSection } from "@/components/es/features-section"
import { ScrollingMarqueeDark } from "@/components/es/scrolling-marquee-dark"
import { SuccessSection } from "@/components/es/success-section"
import { GerminationSection } from "@/components/es/germination-section"
import { TechnicalDataSection } from "@/components/es/technical-data-section"
import { ComparisonSection } from "@/components/es/comparison-section"
import { CustomerReviewsSection } from "@/components/es/customer-reviews-section"
import { TestimonialsSection } from "@/components/es/testimonials-section"
import { OurStorySection } from "@/components/es/our-story-section"
import { Footer } from "@/components/es/footer"
import { FaqSection } from "@/components/es/faq-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Versia Garden - Plantas de Hibisco Premium",
  description: "Plantas de hibisco de alta calidad con floracion garantizada",
}

export default function SpanishPage() {
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
