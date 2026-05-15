"use client"

import { useEffect, useRef, useState } from "react"
import { FiberStrands } from "@/components/fiber-strands"
import { useLanguage } from "@/components/i18n/language-provider"
import type { StatDTO } from "@/lib/db/types"

const ROMAN = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"]

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    if (!ref.current || seen) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          obs.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [seen])
  return [ref, seen] as const
}

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const [ref, seen] = useInView<HTMLSpanElement>()
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!seen) return
    const duration = 1800
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(Math.floor(eased * to))
      if (t < 1) raf = requestAnimationFrame(tick)
      else setVal(to)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [seen, to])

  return (
    <span ref={ref} className="tabular">
      {val.toLocaleString()}
      {suffix}
    </span>
  )
}

export function StatsSection({ items }: { items: StatDTO[] }) {
  const { t } = useLanguage()
  if (!items.length) return null
  return (
    <section
      aria-label={t.stats.sectionLabel}
      className="relative scroll-mt-32 overflow-hidden border-b border-rule paper-texture"
    >
      <div className="border-b border-rule">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 items-baseline gap-4 px-5 py-3 sm:px-8">
          <div className="folio col-span-6 text-muted-foreground">{t.stats.folio}</div>
          <div className="folio col-span-6 text-right text-muted-foreground">{t.stats.sectionLabel}</div>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-24">
        <div className="pointer-events-none absolute inset-0 opacity-50">
          <FiberStrands variant="ambient" density={7} className="h-full w-full" />
        </div>

        <div className="relative grid grid-cols-12 gap-6 lg:gap-8">
          <div className="col-span-12 lg:col-span-4">
            <div className="eyebrow text-muted-foreground">{t.stats.eyebrow}</div>
            <h2 className="mt-3 font-display text-[clamp(2rem,4.4vw,3.4rem)] leading-[0.98] tracking-[-0.02em]">
              {t.stats.heading}
              <span className="italic">{t.stats.headingItalic}</span>
              {t.stats.headingTail}
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-[1.7] text-foreground/75">{t.stats.description}</p>
          </div>

          <dl className="col-span-12 grid grid-cols-12 lg:col-span-8 lg:gap-0">
            {items.map((s, i) => (
              <div
                key={s.id}
                className={`col-span-12 border-t border-rule py-8 sm:col-span-6 ${
                  i % 2 === 1 ? "sm:border-l sm:border-rule sm:pl-8" : "sm:pr-8"
                }`}
              >
                <div className="folio italic text-accent">{ROMAN[i] ?? String(i + 1)}.</div>
                <dt className="mt-1 font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.95] tracking-[-0.02em]">
                  <CountUp to={s.value} suffix={s.suffix} />
                </dt>
                <dd className="mt-3 font-display text-base italic text-foreground/85">{s.label}</dd>
                {s.helper && <div className="folio mt-2 text-muted-foreground">{s.helper}</div>}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
