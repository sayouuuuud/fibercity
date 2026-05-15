import type { Metadata } from "next"
import { ContactSection } from "@/components/contact-section"
import { PageShell } from "@/components/page-shell"
import { trackVisit } from "@/lib/db/queries"
import { DICTIONARIES } from "@/lib/i18n/dictionaries"
import { getServerLocale } from "@/lib/i18n/server-locale"
import { buildPageMetadata } from "@/lib/seo/metadata"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbLd } from "@/lib/seo/jsonld"
import { getSiteConfig } from "@/lib/seo/site"

export const dynamic = "force-dynamic"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  const t = DICTIONARIES[locale]
  return buildPageMetadata({
    locale,
    path: "/contact",
    title: t.meta.contactTitle,
    description: t.contactPage.description,
  })
}

export default async function ContactPage() {
  const locale = await getServerLocale()
  const t = DICTIONARIES[locale]
  const site = getSiteConfig(locale)
  trackVisit("/contact")
  const crumbs = breadcrumbLd(locale, [
    { name: t.nav.home, path: "/" },
    { name: t.nav.contact, path: "/contact" },
  ])
  const contactPage = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${site.url}/contact#page`,
    name: t.meta.contactTitle,
    description: t.contactPage.description,
    inLanguage: locale === "ar" ? "ar-EG" : "en-EG",
    mainEntity: { "@id": `${site.url}#organization` },
    isPartOf: { "@id": `${site.url}#website` },
  }

  return (
    <PageShell
      eyebrow={t.contactPage.eyebrow}
      title={
        <>
          {t.contactPage.title}
          <span className="italic text-primary">{t.contactPage.titleItalic}</span>
        </>
      }
      description={t.contactPage.description}
      ctaLabel={t.hero.primaryCTA}
    >
      <ContactSection />
      <JsonLd id="ld-breadcrumb-contact" data={crumbs} />
      <JsonLd id="ld-contact-page" data={contactPage} />
    </PageShell>
  )
}
