import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, Clock, User } from "lucide-react"
import { ContentCard } from "@/components/content-card"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { getNews, listNews, trackVisit } from "@/lib/db/queries"
import { DICTIONARIES } from "@/lib/i18n/dictionaries"
import { getServerLocale } from "@/lib/i18n/server-locale"
import { buildPageMetadata } from "@/lib/seo/metadata"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbLd, newsArticleLd } from "@/lib/seo/jsonld"

type NewsDetailPageProps = {
  params: Promise<{ id: string }>
}

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const locale = await getServerLocale()
  const item = getNews(id, locale)
  if (!item) {
    return buildPageMetadata({
      locale,
      path: `/news/${id}`,
      title: "News",
      noIndex: true,
    })
  }
  return buildPageMetadata({
    locale,
    path: `/news/${item.slug}`,
    title: item.title,
    description: item.excerpt,
    image: item.image,
    imageAlt: item.title,
    type: "article",
    publishedTime: item.date,
    modifiedTime: item.updatedAt,
    authors: [item.author],
    keywords: [item.category].filter(Boolean),
  })
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { id } = await params
  const locale = await getServerLocale()
  const t = DICTIONARIES[locale]
  const item = getNews(id, locale)
  if (!item) notFound()
  trackVisit(`/news/${item.slug}`)

  const related = listNews({ locale, status: "published" })
    .filter((n) => n.slug !== item.slug)
    .slice(0, 3)

  const crumbs = breadcrumbLd(locale, [
    { name: t.nav.home, path: "/" },
    { name: t.nav.news, path: "/news" },
    { name: item.title, path: `/news/${item.slug}` },
  ])

  const dateLocale = locale === "ar" ? "ar-EG" : "en"
  const formattedDate = new Date(item.date).toLocaleDateString(dateLocale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <article className="pt-32">
          <section className="border-b border-rule paper-texture">
            <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-20">
              <Link
                href="/news"
                className="folio inline-flex items-center gap-2 text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
                {t.newsPage.backToNews}
              </Link>
              <div className="mt-10">
                <div className="eyebrow text-primary">{item.category}</div>
                <h1 className="mt-4 font-display text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.95] tracking-[-0.03em]">
                  {item.title}
                </h1>
                <p className="mt-6 max-w-3xl text-xl leading-relaxed text-muted-foreground">{item.excerpt}</p>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {item.author}
                  </span>
                  <span>{formattedDate}</span>
                  <span className="inline-flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {item.readMinutes} {t.newsPage.readMin}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {item.image && (
            <div className="relative aspect-[16/8] border-b border-rule bg-secondary">
              <Image
                src={item.image}
                alt={item.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          )}

          <section>
            <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-24">
              <div className="space-y-7 text-[18px] leading-[1.9] text-foreground/85">
                {item.content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </section>

          {related.length > 0 && (
            <section className="border-t border-rule paper-texture">
              <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:py-24">
                <div className="flex items-end justify-between">
                  <h2 className="font-display text-3xl">{t.newsPage.relatedArticles}</h2>
                  <Link
                    href="/news"
                    className="folio inline-flex items-center gap-2 text-primary hover:text-primary/80"
                  >
                    {t.projects.viewAll}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="mt-8 grid gap-6 md:grid-cols-3">
                  {related.map((r) => (
                    <ContentCard
                      key={r.slug}
                      href={`/news/${r.slug}`}
                      title={r.title}
                      eyebrow={r.category}
                      excerpt={r.excerpt}
                      image={r.image}
                      meta={`${new Date(r.date).toLocaleDateString(dateLocale, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })} · ${r.readMinutes} ${t.newsPage.readMin}`}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}
        </article>
      </main>
      <SiteFooter />
      <JsonLd id={`ld-news-${item.id}-detail`} data={newsArticleLd(locale, item)} />
      <JsonLd id={`ld-breadcrumb-news-${item.id}`} data={crumbs} />
    </div>
  )
}
