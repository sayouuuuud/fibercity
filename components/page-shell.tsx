import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

type PageShellProps = {
  eyebrow: string
  title: ReactNode
  description: string
  ctaLabel?: string
  children: ReactNode
}

export function PageShell({ eyebrow, title, description, ctaLabel = "Start a Project", children }: PageShellProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden border-b border-rule paper-texture pt-32">
          <div className="pointer-events-none absolute inset-0 bg-aurora-soft" />
          <div className="relative mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24">
            <div className="eyebrow text-primary">{eyebrow}</div>
            <div className="mt-6 grid gap-8 lg:grid-cols-12">
              <h1 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-[-0.04em] lg:col-span-8">
                {title}
              </h1>
              <div className="lg:col-span-4">
                <p className="text-[17px] leading-[1.75] text-muted-foreground">{description}</p>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:brightness-110"
                >
                  {ctaLabel}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}
