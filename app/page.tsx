import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { PartnersMarquee } from "@/components/partners-marquee"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { StatsSection } from "@/components/stats-section"
import { ProjectsSection } from "@/components/projects-section"
import { PartnersSection } from "@/components/partners-section"
import { ContactSection } from "@/components/contact-section"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <HeroSection />
        <PartnersMarquee />
        <AboutSection />
        <ServicesSection />
        <StatsSection />
        <ProjectsSection />
        <PartnersSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  )
}
