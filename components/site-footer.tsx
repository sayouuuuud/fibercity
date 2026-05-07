import Link from "next/link"
import { Logo } from "@/components/logo"
import { FiberStrands } from "@/components/fiber-strands"

const COLS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Sections",
    links: [
      { label: "The Practice", href: "#practice" },
      { label: "The Work", href: "#work" },
      { label: "Field Notes", href: "#projects" },
      { label: "The Network", href: "#network" },
      { label: "Correspondence", href: "#contact" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "Smart Village, Building B12", href: "#contact" },
      { label: "Cairo, Egypt — 30.0444° N", href: "#contact" },
      { label: "+20 2 1234 5678", href: "tel:+20212345678" },
      { label: "projects@fibercity.eg", href: "mailto:projects@fibercity.eg" },
    ],
  },
  {
    title: "Colophon",
    links: [
      { label: "Set in Instrument Serif & Inter", href: "#" },
      { label: "Vol. IX · Cairo Edition", href: "#" },
      { label: "ISO 9001 · 14001 · 45001 aligned", href: "#" },
      { label: "Made in Cairo, for the world", href: "#" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-foreground text-background">
      {/* decorative strands at top */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 opacity-30">
        <svg
          aria-hidden="true"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="footStrand" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="oklch(0.66 0.13 230)" stopOpacity="0" />
              <stop offset="50%" stopColor="oklch(0.66 0.13 230)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="oklch(0.66 0.13 230)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {Array.from({ length: 8 }).map((_, i) => {
            const y = 8 + i * 14
            return (
              <path
                key={i}
                d={`M 0 ${y} C 360 ${y - 20 + (i % 3) * 8}, 800 ${y + 20}, 1200 ${y - 8}`}
                stroke="url(#footStrand)"
                strokeWidth="0.5"
                fill="none"
              />
            )
          })}
        </svg>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 pt-24 sm:px-8">
        {/* Masthead nameplate */}
        <div className="border-b border-background/30 pb-8">
          <div className="folio text-background/60">
            Vol. IX · Cairo Edition · {new Date().getFullYear()}
          </div>
          <h2 className="mt-3 font-display text-[clamp(2.75rem,8vw,6rem)] font-semibold leading-[0.9] tracking-[-0.035em]">
            Fiber <span className="italic">City</span>
          </h2>
          <p className="mt-3 max-w-xl font-display text-lg italic text-background/80 sm:text-xl">
            A journal of fiber optic infrastructure, from Cairo.
          </p>
        </div>

        {/* Columns */}
        <div className="grid gap-10 py-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo className="text-background [&_span]:text-background" />
            <p className="mt-6 max-w-sm text-[15px] leading-[1.7] text-background/75">
              Egypt&apos;s end-to-end fiber optic infrastructure partner. We
              design, supply, install and maintain the optical networks that
              quietly carry the country&apos;s every signal.
            </p>

            <div className="mt-8 inline-flex items-center gap-2 border border-background/30 px-3 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="folio text-background/85">
                Available for new programmes
              </span>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            {COLS.map((col) => (
              <div key={col.title}>
                <div className="folio text-background/60">{col.title}</div>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-background/85 transition hover:text-accent"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom rule */}
        <div className="flex flex-col gap-3 border-t border-background/30 py-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="folio text-background/60">
            © {new Date().getFullYear()} Fiber City — All rights reserved.
          </span>
          <span className="flex items-center gap-6 folio text-background/60">
            <Link href="#" className="hover:text-accent">
              Privacy
            </Link>
            <Link href="#" className="hover:text-accent">
              Terms
            </Link>
            <span>An end-of-issue.</span>
          </span>
        </div>
      </div>

      {/* Background ambient strands behind everything */}
      <div className="pointer-events-none absolute inset-0 -z-0 opacity-10">
        <FiberStrands variant="ambient" density={5} className="h-full w-full" />
      </div>
    </footer>
  )
}
