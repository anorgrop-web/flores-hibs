import { Header } from "@/components/us/header"
import { ProductSection } from "@/components/us/product-section"
import { ScrollingMarquee } from "@/components/us/scrolling-marquee"
import { AlertBar } from "@/components/us/alert-bar"
import { FeaturesSection } from "@/components/us/features-section"
import { ScrollingMarqueeDark } from "@/components/us/scrolling-marquee-dark"
import { SuccessSection } from "@/components/us/success-section"
import { GerminationSection } from "@/components/us/germination-section"
import { TechnicalDataSection } from "@/components/us/technical-data-section"
import { ComparisonSection } from "@/components/us/comparison-section"
import { CustomerReviewsSection } from "@/components/us/customer-reviews-section"
import { TestimonialsSection } from "@/components/us/testimonials-section"
import { OurStorySection } from "@/components/us/our-story-section"
import { Footer } from "@/components/us/footer"
import { FaqSection } from "@/components/us/faq-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Versia Garden - Premium Hibiscus Plants",
  description: "High-quality hibiscus plants with guaranteed blooming",
}

export default function Home() {
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
