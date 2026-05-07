import Image from "next/image"
import { CircleCheck } from "lucide-react"

const PILLARS = [
  {
    title: "End-to-End",
    body: "Design, supply, installation, testing, and maintenance — handled by one accountable team. No handoffs, no finger-pointing.",
  },
  {
    title: "Field-Hardened",
    body: "Every project is led by senior engineers who've pulled cable, fused splices, and read OTDR traces in real conditions.",
  },
  {
    title: "Telecom-Grade",
    body: "We meet the QA, documentation, and labelling standards demanded by Tier-1 operators across the region.",
  },
]

const DIFFERENTIATORS = [
  "Dedicated FTTX & GPON specialists",
  "Certified fusion splicing crews",
  "Bilingual project documentation (EN/AR)",
  "OTDR + OLTS testing on every link",
  "BOQ engineered to optimise cost",
  "Nationwide field coverage",
]

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 overflow-hidden bg-background py-24 sm:py-32"
    >
      {/* subtle aurora */}
      <div className="bg-aurora-soft pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
          <span className="text-muted-foreground">/ 02</span>
          <span className="h-px w-8 bg-primary/50" />
          About Fiber City
        </div>

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h2 className="font-display text-4xl font-semibold leading-[1] tracking-tight text-balance sm:text-5xl lg:text-[4.25rem]">
              We build the{" "}
              <span className="text-primary">invisible backbone</span> of modern
              Egypt.
            </h2>

            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Fiber City is an Egyptian engineering firm specialised in fiber
              optic infrastructure. We partner with telecom operators, ISPs,
              data centers, and large developers to roll out reliable, scalable
              optical networks — from greenfield FTTH estates to nationwide
              backbone upgrades.
            </p>

            {/* Image + caption — Corning-style editorial */}
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-card sm:col-span-2">
                <Image
                  src="/images/engineer.jpg"
                  alt="Fiber City senior field engineer with splicing equipment"
                  fill
                  sizes="(min-width: 640px) 30vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-3 bottom-3">
                  <div className="glass rounded-xl px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground">
                    Sr. Optical Engineer
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:col-span-3 sm:grid-cols-1">
                {PILLARS.map((p) => (
                  <div
                    key={p.title}
                    className="glass-soft rounded-2xl p-5 transition hover:bg-card"
                  >
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {p.title}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {p.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="glass-tint relative overflow-hidden rounded-3xl p-6 sm:p-8">
              {/* decorative strands */}
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
                <span>Why Fiber City</span>
                <span className="text-primary">/ key.differentiators</span>
              </div>
              <h3 className="relative mt-3 font-display text-2xl font-semibold tracking-tight">
                What makes our deployments different.
              </h3>
              <ul className="relative mt-6 space-y-3">
                {DIFFERENTIATORS.map((d) => (
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
                    ISO
                  </div>
                  <div className="mt-1">9001 · 14001 · 45001 aligned</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-semibold tracking-tight text-foreground">
                    HQ
                  </div>
                  <div className="mt-1">Cairo, Egypt</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
