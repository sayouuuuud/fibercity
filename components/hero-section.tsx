import Link from "next/link"
import { ArrowDown, ArrowUpRight, Activity, Radio, Waves } from "lucide-react"
import { FiberEndface } from "@/components/fiber-endface"
import { FiberRoutes } from "@/components/fiber-routes"

/**
 * Hero — light fiber-optic theme.
 * The fiber routes (FiberRoutes) are the main visual: curved SVG paths
 * that originate from the left edge, thread through the rows of the
 * headline, and converge into the fiber endface on the right. Light
 * packets travel along these paths so the headline is literally tied
 * into the fiber lines.
 */
export function HeroSection() {
  return (
    <section
      id="home"
      className="bg-background relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-20 text-foreground"
    >
      {/* aurora wash + light grid */}
      <div className="pointer-events-none absolute inset-0 bg-aurora opacity-90" />
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />

      {/* Fiber routes — paths that connect headline to endface */}
      <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(180deg,transparent,black_8%,black_92%,transparent)]">
        <FiberRoutes />
      </div>

      {/* === Main hero === */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-12 px-4 pb-12 pt-6 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:pb-20 lg:pt-10">
        {/* Left — copy */}
        <div className="lg:col-span-7">
          <div className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            Fiber Optic Infrastructure
            <span className="text-foreground/30">·</span>
            <span className="text-muted-foreground">B2B · Egypt</span>
          </div>

          {/* Display headline */}
          <h1
            className="mt-8 font-display font-semibold tracking-[-0.03em] text-foreground"
            style={{
              fontSize: "clamp(2.25rem, 6vw, 5.25rem)",
              lineHeight: 0.95,
            }}
          >
            <span className="block overflow-hidden">
              <span className="word-rise" style={{ animationDelay: "0.05s" }}>
                Light moves
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                className="word-rise italic font-light text-muted-foreground"
                style={{ animationDelay: "0.18s" }}
              >
                through{" "}
              </span>
              <span
                className="word-rise light-sweep strand-underline"
                style={{ animationDelay: "0.32s" }}
              >
                glass.
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="word-rise" style={{ animationDelay: "0.46s" }}>
                We move it
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                className="word-rise"
                style={{ animationDelay: "0.6s" }}
              >
                across{" "}
              </span>
              <span
                className="word-rise strand-underline"
                style={{ animationDelay: "0.72s" }}
              >
                Egypt.
              </span>
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Fiber City designs, supplies, installs and maintains optical
            networks for Egypt&apos;s most demanding telecom operators and
            enterprises. From the first site survey to the last splice — one
            partner, end to end.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="#contact"
              className="group glow-cyan inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:brightness-110"
            >
              Start a Project
              <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#services"
              className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-foreground transition hover:text-primary"
            >
              View Capabilities
              <ArrowDown className="h-4 w-4" />
            </Link>
          </div>

          {/* Inline mini-spec rail */}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="h-px w-6 bg-primary/60" />
              FTTX · GPON · DWDM
            </div>
            <div className="flex items-center gap-2">
              <span className="h-px w-6 bg-primary/60" />
              OTDR · Splicing · OSP
            </div>
            <div className="flex items-center gap-2">
              <span className="h-px w-6 bg-primary/60" />
              Civil Works · M&amp;E
            </div>
          </div>
        </div>

        {/* Right — fiber endface centerpiece (the convergence point) */}
        <div className="relative lg:col-span-5">
          <div className="relative mx-auto aspect-square w-full max-w-[460px]">
            {/* one-shot glow burst that fires when the endface boots */}
            <div
              aria-hidden="true"
              className="animate-glow-burst pointer-events-none absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at center, oklch(0.66 0.13 230 / 0.55), transparent 65%)",
                filter: "blur(20px)",
              }}
            />

            {/* outer dashed rotating ring */}
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              className="animate-fade-up absolute inset-0 h-full w-full animate-slow-rotate"
              style={{ animationDelay: "0.5s" }}
            >
              <circle
                cx="50"
                cy="50"
                r="49"
                fill="none"
                stroke="oklch(0.66 0.13 230 / 0.45)"
                strokeWidth="0.2"
                className="dash-flow"
              />
            </svg>

            {/* tick marks around the rim */}
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              className="animate-fade-up absolute inset-0 h-full w-full"
              style={{ animationDelay: "0.6s" }}
            >
              {Array.from({ length: 60 }).map((_, i) => {
                const angle = (i / 60) * Math.PI * 2
                const inner = i % 5 === 0 ? 44.5 : 46
                const outer = 47.5
                const x1 = 50 + Math.cos(angle) * inner
                const y1 = 50 + Math.sin(angle) * inner
                const x2 = 50 + Math.cos(angle) * outer
                const y2 = 50 + Math.sin(angle) * outer
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="oklch(0.18 0.025 250)"
                    strokeOpacity={i % 5 === 0 ? 0.55 : 0.18}
                    strokeWidth="0.15"
                  />
                )
              })}
            </svg>

            {/* the fiber endface — kept dark since it's a true fiber view */}
            <div className="animate-endface-enter endface-ring absolute inset-[6%] overflow-hidden rounded-full">
              <FiberEndface />
              <div className="scan-line absolute inset-x-0 top-0 h-24" />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="relative h-px w-10 bg-white/40" />
                <div className="absolute h-10 w-px bg-white/40" />
              </div>
            </div>

            {/* corner technical readouts */}
            <div
              className="animate-fade-up absolute -left-2 -top-2 font-mono text-[9px] uppercase leading-tight tracking-[0.22em] text-muted-foreground"
              style={{ animationDelay: "1.1s" }}
            >
              <div className="text-foreground">144F · OS2</div>
              <div>Single-mode</div>
              <div>9 / 125 µm</div>
            </div>

            <div
              className="animate-fade-up absolute -right-2 -top-2 text-right font-mono text-[9px] uppercase leading-tight tracking-[0.22em] text-muted-foreground"
              style={{ animationDelay: "1.2s" }}
            >
              <div className="text-primary">λ 1550 nm</div>
              <div>0.18 dB/km</div>
              <div>OTDR · OK</div>
            </div>

            <div
              className="animate-fade-up absolute -bottom-2 left-0 right-0 flex items-end justify-between font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground"
              style={{ animationDelay: "1.3s" }}
            >
              <div>
                <div className="text-foreground">Fig. 01</div>
                <div>Endface · Live</div>
              </div>
              <div className="text-right">
                <div className="text-foreground">CAI · 30.04 N</div>
                <div>31.23 E</div>
              </div>
            </div>

            {/* floating live throughput card */}
            <div
              className="glass animate-fade-up absolute -bottom-10 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-2xl px-4 py-3 shadow-xl"
              style={{ animationDelay: "1.4s" }}
            >
              <div className="glow-cyan flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Activity className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Live throughput
                </div>
                <div className="font-display text-base font-medium text-foreground">
                  4.8 Tb/s · 12 governorates
                </div>
              </div>
              <div className="flex h-3 items-end gap-0.5">
                {[6, 12, 4, 16, 9, 14, 7, 11].map((h, i) => (
                  <span
                    key={i}
                    className="w-0.5 rounded-full bg-primary"
                    style={{
                      height: `${h}px`,
                      animation: `pulse-line ${1.5 + i * 0.18}s ease-in-out infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === Bottom ticker === */}
      <div className="relative z-10 border-t border-border bg-card/60 backdrop-blur">
        <div className="overflow-hidden">
          <div className="flex w-max animate-ticker items-center gap-10 whitespace-nowrap py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            {Array.from({ length: 2 }).map((_, dup) => (
              <div key={dup} className="flex items-center gap-10">
                <TickerItem icon={<Waves className="h-3 w-3 text-primary" />} label="OTDR Trace" value="OK · 0.18 dB/km" />
                <TickerDot />
                <TickerItem icon={<Radio className="h-3 w-3 text-primary" />} label="DWDM Channels" value="80 × 100G" />
                <TickerDot />
                <TickerItem label="Splice Loss" value="≤ 0.05 dB" />
                <TickerDot />
                <TickerItem label="Active Sites" value="12 Governorates" />
                <TickerDot />
                <TickerItem label="Tier-1 Clients" value="Vodafone · WE · Huawei · Orange" />
                <TickerDot />
                <TickerItem label="Reach" value="OS2 · 1550 nm · 80 km" />
                <TickerDot />
                <TickerItem label="Status" value="Available for new projects" />
                <TickerDot />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TickerItem({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-muted-foreground/70">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  )
}

function TickerDot() {
  return <span className="h-1 w-1 rounded-full bg-primary/60" />
}
