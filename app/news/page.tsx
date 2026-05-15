import type { Metadata } from "next"
import { ContentCard } from "@/components/content-card"
import { PageShell } from "@/components/page-shell"
import { listNews, trackVisit } from "@/lib/db/queries"
import { DICTIONARIES } from "@/lib/i18n/dictionaries"
import { getServerLocale } from "@/lib/i18n/server-locale"
import { buildPageMetadata } from "@/lib/seo/metadata"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbLd, newsArticleLd } from "@/lib/seo/jsonld"
import { absoluteUrl, getSiteConfig } from "@/lib/seo/site"

export const dynamic = "force-dynamic"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  const t = DICTIONARIES[locale]
  return buildPageMetadata({
    locale,
    path: "/news",
    title: t.meta.newsTitle,
    description: t.newsPage.description,
  })
}

export default async function NewsPage() {
  const locale = await getServerLocale()
  const t = DICTIONARIES[locale]
  const newsItems = listNews({ locale, status: "published" })
  const site = getSiteConfig(locale)
  trackVisit("/news")
  const dateLocale = locale === "ar" ? "ar-EG" : "en"
  const crumbs = breadcrumbLd(locale, [
    { name: t.nav.home, path: "/" },
    { name: t.nav.news, path: "/news" },
  ])
  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${site.url}/news#page`,
    name: t.meta.newsTitle,
    description: t.newsPage.description,
    inLanguage: locale === "ar" ? "ar-EG" : "en-EG",
    isPartOf: { "@id": `${site.url}#website` },
    hasPart: newsItems.map((n) => ({
      "@type": "NewsArticle",
      "@id": absoluteUrl(`/news/${n.slug}#article`, site.url),
      headline: n.title,
      url: absoluteUrl(`/news/${n.slug}`, site.url),
      datePublished: n.date,
    })),
  }

  return (
    <PageShell
      eyebrow={t.newsPage.eyebrow}
      title={
        <>
          {t.newsPage.title} <span className="italic text-primary">{t.newsPage.titleItalic}</span>
        </>
      }
      description={t.newsPage.description}
      ctaLabel={t.hero.primaryCTA}
    >
      <section className="paper-texture">
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {newsItems.map((item) => (
              <ContentCard
                key={item.slug}
                href={`/news/${item.slug}`}
                title={item.title}
                eyebrow={item.category}
                excerpt={item.excerpt}
                image={item.image}
                meta={`${new Date(item.date).toLocaleDateString(dateLocale, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })} · ${item.readMinutes} ${t.newsPage.readMin}`}
              />
            ))}
          </div>
        </div>
      </section>
      <JsonLd id="ld-breadcrumb-news" data={crumbs} />
      <JsonLd id="ld-news-collection" data={collection} />
      {newsItems.slice(0, 6).map((n) => (
        <JsonLd key={`news-${n.id}`} id={`ld-news-${n.id}`} data={newsArticleLd(locale, n)} />
      ))}
    </PageShell>
  )
}
