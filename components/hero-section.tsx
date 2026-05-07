import Image from "next/image"
import Link from "next/link"
import { ArrowDown, ArrowUpRight, Cable, MapPin, Activity } from "lucide-react"
import { FiberCanvas } from "@/components/fiber-canvas"

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-background pt-24"
    >
      {/* aurora orbs */}
      <div className="bg-aurora absolute inset-0 animate-drift" />

      {/* fine grid */}
      <div className="absolute inset-0 bg-grid opacity-100 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      {/* fiber strand animation */}
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_60%_50%,black_40%,transparent_85%)]">
        <FiberCanvas />
      </div>

      {/* top status bar */}
      <div className="relative z-10 mx-auto mt-2 flex w-full max-w-7xl items-center justify-between px-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          <span>System Online · Cairo, EG</span>
        </div>
        <div className="hidden sm:block">EST. 2014 — A Decade of Light</div>
      </div>

      {/* main hero content */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:py-20 lg:pl-8 lg:pr-8">
        {/* Left — copy */}
        <div className="lg:col-span-7">
          <div className="glass-soft inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Fiber Optic Infrastructure
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">B2B</span>
          </div>

          <h1 className="mt-6 font-display text-[14vw] font-semibold leading-[0.88] tracking-tight text-foreground sm:text-[10vw] lg:text-[7.4rem] xl:text-[8.6rem]">
            <span className="block">Light moves</span>
            <span className="block">
              <span className="italic font-light text-muted-foreground">through</span>{" "}
              <span className="text-primary">glass.</span>
            </span>
            <span className="block">We move it</span>
            <span className="block">across Egypt.</span>
          </h1>

          <p className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
            Fiber City designs, supplies, installs and maintains optical
            networks for Egypt&apos;s most demanding telecom operators and
            enterprises. From the first site survey to the last splice — one
            partner, end to end.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:bg-primary"
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
        </div>

        {/* Right — fiber image card */}
        <div className="relative lg:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] border border-border/60 bg-card shadow-[0_30px_80px_-30px_oklch(0.18_0.025_250/0.35)]">
            <Image
              src="/images/fiber-bundle-light.jpg"
              alt="Cross-section macro photograph of fiber optic cable bundle"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
            {/* light beam overlay */}
            <div className="light-beam absolute inset-x-0 top-1/2 h-32 -translate-y-1/2" />

            {/* corner ticks */}
            <div className="pointer-events-none absolute inset-3">
              <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-primary" />
              <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-primary" />
              <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-primary" />
              <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-primary" />
            </div>

            {/* floating glass info card */}
            <div className="glass absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Activity className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Live throughput
                </div>
                <div className="font-display text-base font-medium text-foreground">
                  4.8 Tb/s · 12 governorates
                </div>
              </div>
              <div className="flex h-2 items-end gap-0.5">
                {[6, 12, 4, 16, 9, 14, 7].map((h, i) => (
                  <span
                    key={i}
                    className="w-0.5 rounded-full bg-primary"
                    style={{
                      height: `${h}px`,
                      animation: `pulse-line ${1.5 + i * 0.2}s ease-in-out infinite`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* top label */}
            <div className="absolute left-4 right-4 top-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-background">
              <span className="rounded-full bg-foreground/70 px-2 py-1 backdrop-blur">
                Fiber Bundle · OS2 Single-mode
              </span>
              <span className="rounded-full bg-foreground/70 px-2 py-1 backdrop-blur">
                144F
              </span>
            </div>
          </div>

          {/* small caption */}
          <div className="mt-3 flex items-center gap-2 px-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-px w-6 bg-border" />
            Fig. 01 — Inside a 144-fiber trunk cable
          </div>
        </div>
      </div>

      {/* bottom strip */}
      <div className="relative z-10 border-t border-border/70 bg-background/60 backdrop-blur">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-px bg-border/70 lg:grid-cols-4">
          {[
            { label: "FTTX / GPON", value: "End-to-end", icon: Cable },
            { label: "Active Sites", value: "12 Governorates", icon: MapPin },
            { label: "Tier-1 Clients", value: "Vodafone · WE · Huawei", icon: null },
            { label: "Status", value: "Available for new projects", icon: null },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col gap-1 bg-background px-4 py-4 sm:px-6"
            >
              <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {item.icon ? <item.icon className="h-3 w-3 text-primary" /> : null}
                {item.label}
              </div>
              <div className="font-display text-sm font-medium text-foreground">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
