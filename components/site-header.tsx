"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/i18n/language-toggle"
import { useLanguage } from "@/components/i18n/language-provider"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const nav = useMemo(
    () => [
      { label: t.nav.home, href: "/", num: "01" },
      { label: t.nav.about, href: "/about", num: "02" },
      { label: t.nav.services, href: "/#services", num: "03" },
      { label: t.nav.works, href: "/work", num: "04" },
      { label: t.nav.news, href: "/news", num: "05" },
      { label: t.nav.contact, href: "/contact", num: "06" },
    ],
    [t],
  )

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6">
      <div
        className={cn(
          "mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full px-3 transition-all duration-300 sm:px-4",
          scrolled ? "glass" : "glass-soft",
        )}
      >
        <Link href="/" aria-label="Fiber City — Home" className="pl-2">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="font-mono text-[10px] text-primary mr-1.5">{item.num}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />

          <Link
            href="/contact"
            className="hidden items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:bg-primary sm:inline-flex"
          >
            {t.nav.getQuote}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 text-foreground lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="glass mx-auto mt-2 max-w-7xl rounded-2xl p-2 lg:hidden">
          <nav className="flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-foreground transition hover:bg-foreground/5"
              >
                <span className="flex items-center gap-3">
                  <span className="font-mono text-xs text-primary">{item.num}</span>
                  <span className="font-display text-lg">{item.label}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-between rounded-xl bg-foreground px-4 py-3 text-background"
            >
              <span className="font-display text-lg">{t.nav.getQuote}</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <div className="mt-2 flex items-center justify-between rounded-xl border border-border bg-background/40 px-3 py-2">
              <LanguageToggle variant="inline" />
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
