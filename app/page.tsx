import type { Metadata } from "next"
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
import { getSiteContent } from "@/lib/data/site-content"
import { getServerLocale } from "@/lib/i18n/server-locale"
import { trackVisit } from "@/lib/db/queries"
import { buildPageMetadata } from "@/lib/seo/metadata"
import { JsonLd } from "@/components/seo/json-ld"
import { serviceLd, workLd } from "@/lib/seo/jsonld"
import { DICTIONARIES } from "@/lib/i18n/dictionaries"

export const dynamic = "force-dynamic"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  const t = DICTIONARIES[locale]
  return buildPageMetadata({
    locale,
    path: "/",
    title: t.meta.homeTitle,
    description: t.meta.homeDescription,
  })
}

export default async function Page() {
  const locale = await getServerLocale()
  const content = getSiteContent(locale)
  trackVisit("/")

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <HeroSection />
        <PartnersMarquee items={content.partners} />
        <AboutSection />
        <ServicesSection items={content.services} />
        <StatsSection items={content.stats} />
        <ProjectsSection items={content.featuredWorks} />
        <PartnersSection items={content.partners} />
        <ContactSection />
      </main>
      <SiteFooter />
      {content.services.map((s) => (
        <JsonLd key={`svc-${s.id}`} id={`ld-service-${s.id}`} data={serviceLd(locale, s)} />
      ))}
      {content.featuredWorks.slice(0, 3).map((w) => (
        <JsonLd key={`work-${w.id}`} id={`ld-work-${w.id}`} data={workLd(locale, w)} />
      ))}
    </div>
  )
}
