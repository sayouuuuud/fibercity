import Link from "next/link"
import { ArrowDown, ArrowUpRight, Activity } from "lucide-react"
import { FiberEndface } from "@/components/fiber-endface"
import { FiberRoutes } from "@/components/fiber-routes"

/**
 * Hero — light fiber-optic theme.
 * The fiber routes (FiberRoutes) are the main visual: curved SVG paths
 * that originate from the left edge, thread through the rows of the
 * headline, and converge into the fiber endface on the right. Light
 * packets travel along these paths so the headline is literally tied
 * into the fiber lines.
 *
 * Animation philosophy: a single calm light sweep + slow drifting
 * routes. No pings, no rotating rings, no scan lines. Just enough
 * motion to suggest light moving through glass.
 */
export function HeroSection() {
  return (
    <section
      id="home"
      className="bg-background relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-16 text-foreground"
    >
      {/* aurora wash + light grid */}
      <div className="pointer-events-none absolute inset-0 bg-aurora opacity-90" />
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />

      {/* Fiber routes — paths that connect headline to endface */}
      <div className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(180deg,transparent,black_8%,black_92%,transparent)]">
        <FiberRoutes />
      </div>

      {/* === Main hero === */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-10 px-4 pb-12 pt-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:pb-20 lg:pt-6">
        {/* Left — copy */}
        <div className="lg:col-span-7">
          <div className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Fiber Optic Infrastructure
            <span className="text-foreground/30">·</span>
            <span className="text-muted-foreground">B2B · Egypt</span>
          </div>

          {/* Display headline */}
          <h1
            className="mt-5 font-display font-semibold tracking-[-0.03em] text-foreground"
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
                className="word-rise light-sweep"
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
              <span className="word-rise" style={{ animationDelay: "0.6s" }}>
                across{" "}
              </span>
              <span
                className="word-rise text-primary"
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
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:brightness-110"
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
          <div className="relative mx-auto aspect-square w-full max-w-[440px]">
            {/* slow rotating tick ring — calm, no pulse */}
            <div className="pointer-events-none absolute -inset-8 animate-slow-rotate">
              <svg
                viewBox="0 0 200 200"
                className="h-full w-full"
                aria-hidden="true"
              >
                {/* outer dashed track */}
                <circle
                  cx="100"
                  cy="100"
                  r="98"
                  fill="none"
                  stroke="oklch(0.45 0.04 240 / 0.55)"
                  strokeWidth="0.5"
                  strokeDasharray="1 3"
                />
                {/* inner solid hairline */}
                <circle
                  cx="100"
                  cy="100"
                  r="92"
                  fill="none"
                  stroke="oklch(0.66 0.13 230 / 0.4)"
                  strokeWidth="0.4"
                />
                {/* compass ticks every 30° */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const a = (i * 30 * Math.PI) / 180
                  const x1 = 100 + Math.cos(a) * 98
                  const y1 = 100 + Math.sin(a) * 98
                  const x2 = 100 + Math.cos(a) * (i % 3 === 0 ? 90 : 94)
                  const y2 = 100 + Math.sin(a) * (i % 3 === 0 ? 90 : 94)
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="oklch(0.66 0.13 230 / 0.7)"
                      strokeWidth="0.6"
                    />
                  )
                })}
                {/* a single bright marker at the top */}
                <circle
                  cx="100"
                  cy="2"
                  r="1.4"
                  fill="oklch(0.66 0.13 230)"
                />
              </svg>
            </div>

            {/* the fiber endface — kept dark since it's a true fiber view */}
            <div className="endface-ring relative overflow-hidden rounded-full">
              <FiberEndface />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="relative h-px w-10 bg-white/30" />
                <div className="absolute h-10 w-px bg-white/30" />
              </div>
            </div>

            {/* corner technical readouts */}
            <div className="absolute -left-2 -top-2 font-mono text-[9px] uppercase leading-tight tracking-[0.22em] text-muted-foreground">
              <div className="text-foreground">144F · OS2</div>
              <div>Single-mode</div>
              <div>9 / 125 µm</div>
            </div>

            <div className="absolute -right-2 -top-2 text-right font-mono text-[9px] uppercase leading-tight tracking-[0.22em] text-muted-foreground">
              <div className="text-primary">λ 1550 nm</div>
              <div>0.18 dB/km</div>
              <div>OTDR · OK</div>
            </div>

            {/* floating live throughput card */}
            <div className="glass absolute -bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 rounded-2xl px-4 py-3 shadow-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Activity className="h-4 w-4" />
              </div>
              <div className="flex-1 whitespace-nowrap">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  Live throughput
                </div>
                <div className="font-display text-base font-medium text-foreground">
                  4.8 Tb/s · 12 governorates
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
