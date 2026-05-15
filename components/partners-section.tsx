"use client"

import { FiberStrands } from "@/components/fiber-strands"
import { useLanguage } from "@/components/i18n/language-provider"
import type { PartnerDTO } from "@/lib/db/types"

const ROMAN = ["I.", "II.", "III.", "IV.", "V."]

export function PartnersSection({ items }: { items: PartnerDTO[] }) {
  const { t } = useLanguage()
  if (!items.length) return null

  // Group partners by their group label (already localized) so we render the journal's "credits page" layout.
  const groupMap = new Map<string, PartnerDTO[]>()
  items.forEach((p) => {
    const key = p.group || "Partners"
    const arr = groupMap.get(key) ?? []
    arr.push(p)
    groupMap.set(key, arr)
  })
  const groups = Array.from(groupMap.entries()).map(([title, partners]) => ({ title, partners }))

  return (
    <section id="network" className="relative scroll-mt-32 overflow-hidden border-b border-rule paper-texture">
      <div className="border-b border-rule">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 items-baseline gap-4 px-5 py-3 sm:px-8">
          <div className="folio col-span-6 text-muted-foreground">{t.partners.folio}</div>
          <div className="folio col-span-6 text-right text-muted-foreground">{t.partners.sectionLabel}</div>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <FiberStrands variant="ambient" density={6} className="h-full w-full" />
        </div>

        <div className="relative grid grid-cols-12 gap-6 lg:gap-8">
          <div className="col-span-12 lg:col-span-5">
            <div className="eyebrow text-muted-foreground">{t.partners.eyebrow}</div>
            <h2 className="mt-3 font-display text-[clamp(2.2rem,5vw,4rem)] leading-[0.98] tracking-[-0.02em]">
              {t.partners.heading} <span className="italic">{t.partners.headingItalic}</span>
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-[1.7] text-foreground/75">{t.partners.description}</p>
          </div>
        </div>

        <div className="relative mt-16">
          <div className="rule-double mb-6 flex items-baseline justify-between">
            <span className="font-display text-2xl italic">{t.partners.sectionLabel}</span>
            <span className="folio text-muted-foreground">
              {t.partners.groupCount.replace("{groups}", String(groups.length)).replace("{partners}", String(items.length))}
            </span>
          </div>

          <div className="grid grid-cols-12 gap-0">
            {groups.map((g, gi) => (
              <div
                key={g.title}
                className={`col-span-12 border-b border-rule py-8 md:col-span-4 ${
                  gi < groups.length - 1 ? "md:border-r md:border-rule md:pr-8" : ""
                } ${gi > 0 ? "md:pl-8" : ""}`}
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-3xl italic text-accent">{ROMAN[gi] ?? `${gi + 1}.`}</span>
                  <h3 className="font-display text-2xl tracking-tight">{g.title}</h3>
                </div>
                <ul className="mt-6 divide-y divide-rule border-t border-rule">
                  {g.partners.map((p) => (
                    <li key={p.id} className="flex items-baseline justify-between gap-4 py-3.5">
                      <span className="font-display text-lg leading-tight tracking-tight">{p.name}</span>
                      <span className="folio shrink-0 text-muted-foreground">{p.type}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
