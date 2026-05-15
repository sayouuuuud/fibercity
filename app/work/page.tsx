import type { Metadata } from "next"
import { ContentCard } from "@/components/content-card"
import { PageShell } from "@/components/page-shell"
import { listWorks, trackVisit } from "@/lib/db/queries"
import { DICTIONARIES } from "@/lib/i18n/dictionaries"
import { getServerLocale } from "@/lib/i18n/server-locale"
import { buildPageMetadata } from "@/lib/seo/metadata"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbLd, workLd } from "@/lib/seo/jsonld"
import { absoluteUrl, getSiteConfig } from "@/lib/seo/site"

export const dynamic = "force-dynamic"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  const t = DICTIONARIES[locale]
  return buildPageMetadata({
    locale,
    path: "/work",
    title: t.meta.workTitle,
    description: t.workPage.description,
  })
}

export default async function WorkPage() {
  const locale = await getServerLocale()
  const t = DICTIONARIES[locale]
  const works = listWorks({ locale, status: "published" })
  const site = getSiteConfig(locale)
  trackVisit("/work")
  const crumbs = breadcrumbLd(locale, [
    { name: t.nav.home, path: "/" },
    { name: t.nav.works, path: "/work" },
  ])
  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${site.url}/work#page`,
    name: t.meta.workTitle,
    description: t.workPage.description,
    inLanguage: locale === "ar" ? "ar-EG" : "en-EG",
    isPartOf: { "@id": `${site.url}#website` },
    hasPart: works.map((w) => ({
      "@type": "Project",
      "@id": absoluteUrl(`/work/${w.slug}#project`, site.url),
      name: w.title,
      url: absoluteUrl(`/work/${w.slug}`, site.url),
    })),
  }

  return (
    <PageShell
      eyebrow={t.workPage.eyebrow}
      title={
        <>
          {t.workPage.title} <span className="italic text-primary">{t.workPage.titleItalic}</span>
        </>
      }
      description={t.workPage.description}
      ctaLabel={t.hero.primaryCTA}
    >
      <section className="paper-texture">
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {works.map((work) => (
              <ContentCard
                key={work.slug}
                href={`/work/${work.slug}`}
                title={work.title}
                eyebrow={work.category}
                excerpt={work.excerpt}
                image={work.image}
                meta={`${work.client} · ${work.location} · ${work.year}`}
              />
            ))}
          </div>
        </div>
      </section>
      <JsonLd id="ld-breadcrumb-work" data={crumbs} />
      <JsonLd id="ld-work-collection" data={collection} />
      {works.slice(0, 6).map((w) => (
        <JsonLd key={`work-${w.id}`} id={`ld-work-${w.id}`} data={workLd(locale, w)} />
      ))}
    </PageShell>
  )
}
