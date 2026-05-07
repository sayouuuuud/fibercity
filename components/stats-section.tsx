"use client"

import { useEffect, useRef, useState } from "react"
import { FiberStrands } from "@/components/fiber-strands"

const STATS = [
  {
    value: 1240,
    suffix: "+",
    label: "Projects delivered",
    foot: "FTTX · GPON · Backbone",
    folio: "i",
  },
  {
    value: 8500,
    suffix: " km",
    label: "Fibre laid",
    foot: "Aerial · Underground · Indoor",
    folio: "ii",
  },
  {
    value: 12,
    suffix: " yrs",
    label: "Years in practice",
    foot: "Egypt-wide coverage",
    folio: "iii",
  },
  {
    value: 98,
    suffix: "%",
    label: "First-time pass",
    foot: "On OTDR acceptance tests",
    folio: "iv",
  },
]

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

export function StatsSection() {
  return (
    <section
      aria-label="A ledger"
      className="relative scroll-mt-32 overflow-hidden border-b border-rule paper-texture"
    >
      <div className="border-b border-rule">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 items-baseline gap-4 px-5 py-3 sm:px-8">
          <div className="folio col-span-6 text-muted-foreground">
            № 04 — A Ledger
          </div>
          <div className="folio col-span-6 text-right text-muted-foreground">
            As at the present issue
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-24">
        {/* Decorative ambient strands behind */}
        <div className="pointer-events-none absolute inset-0 opacity-50">
          <FiberStrands variant="ambient" density={7} className="h-full w-full" />
        </div>

        <div className="relative grid grid-cols-12 gap-6 lg:gap-8">
          <div className="col-span-12 lg:col-span-4">
            <div className="eyebrow text-muted-foreground">By the numbers</div>
            <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
              Ten years of <span className="italic">light</span>, in figures.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-[1.7] text-foreground/75">
              These are not vanity metrics. Each is reproducible from the
              project ledger we have kept since 2014.
            </p>
          </div>

          <dl className="col-span-12 grid grid-cols-12 lg:col-span-8 lg:gap-0">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`col-span-12 border-t border-rule py-8 sm:col-span-6 ${
                  i % 2 === 1 ? "sm:border-l sm:border-rule sm:pl-8" : "sm:pr-8"
                }`}
              >
                <div className="folio italic text-accent">{s.folio}.</div>
                <dt className="mt-1 font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.02em]">
                  <CountUp to={s.value} suffix={s.suffix} />
                </dt>
                <dd className="mt-3 font-display text-base italic text-foreground/85">
                  {s.label}
                </dd>
                <div className="folio mt-2 text-muted-foreground">{s.foot}</div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
