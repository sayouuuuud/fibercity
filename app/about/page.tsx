import type { Metadata } from "next"
import Image from "next/image"
import { CheckCircle2, ShieldCheck, Workflow, Wrench } from "lucide-react"
import { PageShell } from "@/components/page-shell"
import { trackVisit } from "@/lib/db/queries"
import { DICTIONARIES } from "@/lib/i18n/dictionaries"
import { getServerLocale } from "@/lib/i18n/server-locale"
import { buildPageMetadata } from "@/lib/seo/metadata"
import { JsonLd } from "@/components/seo/json-ld"
import { breadcrumbLd } from "@/lib/seo/jsonld"

const ICONS = [Workflow, ShieldCheck, Wrench]

export const dynamic = "force-dynamic"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  const t = DICTIONARIES[locale]
  return buildPageMetadata({
    locale,
    path: "/about",
    title: t.meta.aboutTitle,
    description: t.aboutPage.description,
  })
}

export default async function AboutPage() {
  const locale = await getServerLocale()
  const t = DICTIONARIES[locale]
  trackVisit("/about")
  const crumbs = breadcrumbLd(locale, [
    { name: t.nav.home, path: "/" },
    { name: t.nav.about, path: "/about" },
  ])

  return (
    <PageShell
      eyebrow={t.aboutPage.eyebrow}
      title={
        <>
          {t.aboutPage.title}
          <span className="italic text-primary">{t.aboutPage.titleItalic}</span>
        </>
      }
      description={t.aboutPage.description}
      ctaLabel={t.hero.primaryCTA}
    >
      <section className="border-b border-rule">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border bg-secondary">
              <Image
                src="/images/editorial-engineer.jpg"
                alt="Fiber City engineer"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="eyebrow text-muted-foreground">{t.aboutPage.missionLabel}</div>
            <h2 className="mt-4 max-w-3xl font-display text-[clamp(2.4rem,5vw,4.5rem)] leading-none tracking-tight">
              {t.aboutPage.missionHeading}
            </h2>
            <p className="mt-6 max-w-2xl text-[17px] leading-[1.8] text-muted-foreground">
              {t.aboutPage.missionBody}
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {t.aboutPage.valueProps.map((item) => (
                <div key={item} className="glass-soft rounded-2xl p-4">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <div className="mt-3 font-display text-lg">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="paper-texture">
        <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:py-28">
          <div className="grid gap-6 lg:grid-cols-3">
            {t.aboutPage.values.map((value, i) => {
              const Icon = ICONS[i] ?? Workflow
              return (
                <article
                  key={value.title}
                  className="rounded-[2rem] border border-border bg-card/80 p-7 shadow-sm dark:bg-card"
                >
                  <Icon className="h-7 w-7 text-primary" />
                  <h3 className="mt-8 font-display text-2xl">{value.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{value.body}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>
      <JsonLd id="ld-breadcrumb-about" data={crumbs} />
    </PageShell>
  )
}
