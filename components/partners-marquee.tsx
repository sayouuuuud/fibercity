"use client"

import { useLanguage } from "@/components/i18n/language-provider"
import type { PartnerDTO } from "@/lib/db/types"

export function PartnersMarquee({ items }: { items: PartnerDTO[] }) {
  const { t } = useLanguage()
  if (!items.length) return null
  const partners = items.slice(0, 12)

  return (
    <section aria-label={t.partners.sectionLabel} className="relative overflow-hidden border-y border-border bg-card/40">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 border-b border-border/60 px-4 py-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            {t.partners.eyebrow}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-foreground/50">SEC.</span>
          <span className="text-foreground">02</span>
          <span className="text-foreground/30">·</span>
          <span>{partners.length}+ {t.partners.sectionLabel}</span>
        </div>
      </div>

      <div className="relative overflow-hidden py-10 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div
          className="flex w-max items-center hover:[animation-play-state:paused]"
          style={{ animation: "marquee 40s linear infinite" }}
          dir="ltr"
        >
          {[...partners, ...partners, ...partners, ...partners].map((p, i) => (
            <div key={`${p.id}-${i}`} className="group flex shrink-0 items-center gap-6 px-10">
              <div className="flex flex-col">
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary/80">{p.type}</span>
                <span className="font-display text-3xl font-medium tracking-tight text-foreground transition group-hover:text-primary sm:text-4xl">
                  {p.name}
                </span>
              </div>
              <div className="relative flex h-7 w-7 items-center justify-center">
                <span className="absolute inset-0 rounded-full border border-border" />
                <span className="absolute inset-1.5 rounded-full bg-primary/15" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
