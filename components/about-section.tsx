"use client"

import Image from "next/image"
import { CircleCheck } from "lucide-react"
import { useLanguage } from "@/components/i18n/language-provider"

export function AboutSection() {
  const { t } = useLanguage()
  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden bg-background py-24 sm:py-32">
      <div className="bg-aurora-soft pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
          <span className="text-muted-foreground">/ 02</span>
          <span className="h-px w-8 bg-primary/50" />
          {t.about.sectionLabel}
        </div>

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-4xl font-semibold leading-[1] tracking-tight text-balance sm:text-5xl lg:text-[4.25rem]">
              {t.about.heading} <span className="text-primary">{t.about.headingHighlight}</span> {t.about.headingTail}
            </h2>

            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t.about.body}
            </p>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-card sm:col-span-2">
                <Image
                  src="/images/engineer.jpg"
                  alt="Senior optical engineer"
                  fill
                  sizes="(min-width: 640px) 30vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-3 bottom-3">
                  <div className="glass rounded-xl px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground">
                    {t.about.eyebrow}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:col-span-3 sm:grid-cols-1">
                {t.about.pillars.map((p) => (
                  <div
                    key={p.title}
                    className="glass-soft rounded-2xl p-5 transition hover:bg-card/90 dark:hover:bg-card"
                  >
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {p.title}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-foreground/80">{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="glass-tint relative overflow-hidden rounded-3xl p-6 sm:p-8">
              <svg
                aria-hidden="true"
                viewBox="0 0 400 400"
                className="pointer-events-none absolute -right-12 -top-12 h-72 w-72 opacity-50"
              >
                <defs>
                  <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.66 0.13 230)" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="oklch(0.66 0.13 230)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {Array.from({ length: 12 }).map((_, i) => (
                  <path
                    key={i}
                    d={`M ${-20 + i * 8} 0 Q 200 ${120 + i * 10} 420 ${300 + i * 6}`}
                    stroke="url(#g1)"
                    strokeWidth="1"
                    fill="none"
                  />
                ))}
              </svg>

              <div className="relative flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <span>{t.about.differentiatorsTitle}</span>
                <span className="text-primary">/ key.differentiators</span>
              </div>
              <h3 className="relative mt-3 font-display text-2xl font-semibold tracking-tight">
                {t.about.differentiatorsTitle}
              </h3>
              <ul className="relative mt-6 space-y-3">
                {t.about.differentiators.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <CircleCheck className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-foreground/90">{d}</span>
                  </li>
                ))}
              </ul>

              <div className="relative mt-8 grid grid-cols-2 gap-4 border-t border-foreground/10 pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                <div>
                  <div className="font-display text-2xl font-semibold tracking-tight text-foreground">
                    {t.about.isoLabel}
                  </div>
                  <div className="mt-1">{t.about.isoValue}</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-semibold tracking-tight text-foreground">
                    {t.about.hqLabel}
                  </div>
                  <div className="mt-1">{t.about.hqValue}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
