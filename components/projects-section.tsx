"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useLanguage } from "@/components/i18n/language-provider"
import type { WorkCategory, WorkDTO } from "@/lib/db/types"
import { cn } from "@/lib/utils"

const FILTERS: (WorkCategory | "All")[] = ["All", "Installation", "Design", "Maintenance", "Supply"]

export function ProjectsSection({ items }: { items: WorkDTO[] }) {
  const { t } = useLanguage()
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All")
  const filtered = useMemo(
    () => (filter === "All" ? items : items.filter((p) => p.category === filter)),
    [filter, items],
  )

  if (!items.length) return null

  return (
    <section id="projects" className="relative scroll-mt-32 border-b border-rule paper-texture">
      <div className="border-b border-rule">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 items-baseline gap-4 px-5 py-3 sm:px-8">
          <div className="folio col-span-6 text-muted-foreground">{t.projects.folio}</div>
          <div className="folio col-span-6 text-right text-muted-foreground">{t.projects.sectionLabel}</div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          <div className="col-span-12 lg:col-span-7">
            <div className="eyebrow text-muted-foreground">{t.projects.sectionLabel}</div>
            <h2 className="mt-3 font-display text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[0.98] tracking-[-0.02em]">
              {t.projects.headingTop} <span className="italic">{t.projects.headingItalic}</span>
              <br className="hidden md:block" /> {t.projects.headingBottom}
            </h2>
          </div>
          <div className="col-span-12 max-w-md text-[15px] leading-[1.7] text-foreground/75 lg:col-span-5">
            <p>{t.projects.description}</p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-rule pt-4">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={filter === f}
                  className={cn(
                    "pb-1 text-sm transition",
                    filter === f
                      ? "border-b-2 border-foreground font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {f === "All" ? t.projects.filterAll : f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 space-y-24">
          {filtered.map((p, i) => {
            const reverse = i % 2 === 1
            return (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className="grid grid-cols-12 items-end gap-6 lg:gap-12"
              >
                <figure
                  className={cn(
                    "col-span-12",
                    reverse ? "lg:order-2 lg:col-span-7 lg:col-start-6" : "lg:col-span-7",
                  )}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={p.image || "/placeholder.svg"}
                      alt={`${p.title} — ${p.client}`}
                      fill
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      className="object-cover duotone-warm transition duration-700 hover:scale-[1.02]"
                    />
                    <div className="folio absolute left-3 top-3 bg-background/85 px-2.5 py-1.5 backdrop-blur-sm">
                      Plate {String(i + 4).padStart(2, "0")}
                    </div>
                    <div className="folio absolute right-3 top-3 bg-background/85 px-2.5 py-1.5 tabular backdrop-blur-sm">
                      {p.year}
                    </div>
                  </div>
                  <figcaption className="mt-3 flex items-baseline justify-between border-t border-rule pt-2">
                    <span className="folio text-muted-foreground">{p.location}</span>
                    <span className="folio italic text-muted-foreground">
                      a {p.category.toLowerCase()}
                    </span>
                  </figcaption>
                </figure>

                <div
                  className={cn(
                    "col-span-12",
                    reverse ? "lg:order-1 lg:col-span-5" : "lg:col-span-5",
                  )}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-5xl italic text-accent leading-none tabular">
                      {String(i + 1).padStart(2, "0")}.
                    </span>
                    <span className="folio text-muted-foreground">{p.client}</span>
                  </div>
                  <h3 className="mt-4 font-display text-3xl leading-[1.05] tracking-tight sm:text-[2.4rem]">
                    {p.title}
                  </h3>
                  <p className="mt-5 max-w-md text-[15px] leading-[1.7] text-foreground/75">{p.excerpt}</p>
                  <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-rule pt-4">
                    {p.stats.slice(0, 2).map((m) => (
                      <div key={m.label}>
                        <dt className="folio text-muted-foreground">{m.label}</dt>
                        <dd className="mt-1 font-display text-2xl tabular leading-none">{m.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.18em] text-foreground/70">
                    {t.projects.viewProject}
                    <ArrowUpRight className="h-4 w-4 text-primary" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-16 flex justify-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-5 py-3 text-sm font-medium transition hover:border-primary hover:text-primary"
          >
            {t.projects.viewAll}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
