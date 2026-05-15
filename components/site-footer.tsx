"use client"

import Link from "next/link"
import { Logo } from "@/components/logo"
import { FiberStrands } from "@/components/fiber-strands"
import { useLanguage } from "@/components/i18n/language-provider"

export function SiteFooter() {
  const { t } = useLanguage()

  const cols = [
    { title: t.footer.sections, links: t.footer.sectionsLinks },
    { title: t.footer.studio, links: t.footer.studioLinks },
    { title: t.footer.colophon, links: t.footer.colophonLinks },
  ]

  return (
    <footer className="relative overflow-hidden bg-foreground text-background">
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
        <div className="border-b border-background/30 pb-8">
          <div className="folio text-background/60">
            {t.footer.colophon} · {new Date().getFullYear()}
          </div>
          <h2 className="mt-3 font-display text-[clamp(3.5rem,11vw,11rem)] leading-[0.85] tracking-[-0.04em]">
            {t.footer.nameplate}
          </h2>
          <p className="mt-3 font-display text-2xl italic text-background/80">{t.footer.tagline}</p>
        </div>

        <div className="grid gap-10 py-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo className="text-background [&_span]:text-background" />
            <p className="mt-6 max-w-sm text-[15px] leading-[1.7] text-background/75">{t.footer.description}</p>

            <div className="mt-8 inline-flex items-center gap-2 border border-background/30 px-3 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="folio text-background/85">{t.footer.available}</span>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            {cols.map((col) => (
              <div key={col.title}>
                <div className="folio text-background/60">{col.title}</div>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={`${col.title}-${l.label}`}>
                      <Link href={l.href} className="text-sm text-background/85 transition hover:text-accent">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-background/30 py-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="folio text-background/60">{t.footer.rights.replace("{year}", String(new Date().getFullYear()))}</span>
          <span className="flex items-center gap-6 folio text-background/60">
            <Link href="#" className="hover:text-accent">
              Privacy
            </Link>
            <Link href="#" className="hover:text-accent">
              Terms
            </Link>
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 -z-0 opacity-10">
        <FiberStrands variant="ambient" density={5} className="h-full w-full" />
      </div>
    </footer>
  )
}
