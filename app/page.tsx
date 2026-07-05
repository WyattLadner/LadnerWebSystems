import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { TrustSection } from "@/components/trust-section"
import { ProcessSection } from "@/components/process-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { TestimonialSection } from "@/components/testimonial-section"
import { StatsSection } from "@/components/stats-section"
import { FreeAuditSection } from "@/components/free-audit-section"
import { QuoteFormSection } from "@/components/quote-form-section"
import { Footer } from "@/components/footer"
import { ScrollReveal } from "@/components/scroll-reveal"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <TrustSection />
        <ProcessSection />
        <PortfolioSection />
        <TestimonialSection />
        <StatsSection />
        <FreeAuditSection />
        <QuoteFormSection />
      </main>
      <Footer />
      <ScrollReveal />
    </div>
  )
}
