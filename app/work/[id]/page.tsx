import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { ContentCard } from "@/components/content-card"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { getWork, listWorks, trackVisit } from "@/lib/db/queries"
import { DICTIONARIES } from "@/lib/i18n/dictionaries"
import { getServerLocale } from "@/lib/i18n/server-locale"
import { buildPageMetadata } from "@/lib/seo/metadata"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbLd, workLd } from "@/lib/seo/jsonld"

type WorkDetailPageProps = {
  params: Promise<{ id: string }>
}

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { id } = await params
  const locale = await getServerLocale()
  const work = getWork(id, locale)
  if (!work) {
    return buildPageMetadata({
      locale,
      path: `/work/${id}`,
      title: "Work",
      noIndex: true,
    })
  }
  return buildPageMetadata({
    locale,
    path: `/work/${work.slug}`,
    title: work.title,
    description: work.excerpt,
    image: work.image,
    imageAlt: work.title,
    type: "article",
    publishedTime: work.updatedAt,
    modifiedTime: work.updatedAt,
    keywords: [work.category, work.client, work.location].filter(Boolean),
  })
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { id } = await params
  const locale = await getServerLocale()
  const t = DICTIONARIES[locale]
  const work = getWork(id, locale)
  if (!work) notFound()
  trackVisit(`/work/${work.slug}`)

  const related = listWorks({ locale, status: "published" })
    .filter((w) => w.slug !== work.slug)
    .slice(0, 3)

  const crumbs = breadcrumbLd(locale, [
    { name: t.nav.home, path: "/" },
    { name: t.nav.works, path: "/work" },
    { name: work.title, path: `/work/${work.slug}` },
  ])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <article className="pt-32">
          <section className="border-b border-rule paper-texture">
            <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 sm:py-20">
              <Link
                href="/work"
                className="folio inline-flex items-center gap-2 text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
                {t.workPage.backToWorks}
              </Link>
              <div className="mt-10 grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-8">
                  <div className="eyebrow text-primary">{work.category}</div>
                  <h1 className="mt-4 font-display text-[clamp(2.6rem,7vw,6rem)] leading-[0.95] tracking-[-0.03em]">
                    {work.title}
                  </h1>
                  <p className="mt-6 max-w-2xl font-display text-2xl italic text-foreground/80">{work.excerpt}</p>
                </div>
                <dl className="grid gap-4 self-end lg:col-span-4">
                  {[
                    [t.workPage.detailLabels.client, work.client],
                    [t.workPage.detailLabels.location, work.location],
                    [t.workPage.detailLabels.year, work.year],
                    [t.workPage.detailLabels.discipline, work.category],
                  ].map(([label, value]) => (
                    <div key={label} className="border-t border-rule pt-3">
                      <dt className="folio text-muted-foreground">{label}</dt>
                      <dd className="mt-1 font-display text-xl">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </section>

          {work.image && (
            <div className="relative aspect-[16/8] border-b border-rule bg-secondary">
              <Image
                src={work.image}
                alt={work.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          )}

          <section className="border-b border-rule">
            <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-24">
              <div className="lg:col-span-4">
                <div className="folio text-muted-foreground">{t.workPage.statsTitle}</div>
                <div className="mt-5 grid gap-4">
                  {work.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-3xl border border-border bg-card/80 p-6 shadow-sm dark:bg-card"
                    >
                      <div className="font-display text-4xl text-primary tabular">{stat.value}</div>
                      <div className="folio mt-2 text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-8">
                <div className="folio text-muted-foreground">{t.workPage.overviewTitle}</div>
                <div className="mt-5 space-y-6 text-[17px] leading-[1.85] text-foreground/85">
                  {work.content.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {work.gallery.length > 0 && (
            <section className="border-b border-rule paper-texture">
              <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:py-24">
                <div className="flex items-end justify-between">
                  <h2 className="font-display text-3xl">{t.workPage.galleryTitle}</h2>
                  <span className="folio text-muted-foreground">{work.gallery.length} plates</span>
                </div>
                <div className="mt-8 grid gap-5 md:grid-cols-3">
                  {work.gallery.map((image, i) => (
                    <div
                      key={image}
                      className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-border bg-secondary"
                    >
                      <Image
                        src={image}
                        alt={`${work.title} — ${i + 1}`}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {related.length > 0 && (
            <section className="paper-texture">
              <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-24">
                <div className="flex items-end justify-between">
                  <h2 className="font-display text-3xl">{t.workPage.relatedWorks}</h2>
                  <Link
                    href="/work"
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
                      href={`/work/${r.slug}`}
                      title={r.title}
                      eyebrow={r.category}
                      excerpt={r.excerpt}
                      image={r.image}
                      meta={`${r.client} · ${r.year}`}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}
        </article>
      </main>
      <SiteFooter />
      <JsonLd id={`ld-work-${work.id}-detail`} data={workLd(locale, work)} />
      <JsonLd id={`ld-breadcrumb-work-${work.id}`} data={crumbs} />
    </div>
  )
}
