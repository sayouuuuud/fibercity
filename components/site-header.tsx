"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { Logo } from "@/components/logo"
import { cn } from "@/lib/utils"

const NAV = [
  { label: "Home", href: "#home", num: "01" },
  { label: "About", href: "#about", num: "02" },
  { label: "Services", href: "#services", num: "03" },
  { label: "Projects", href: "#projects", num: "04" },
  { label: "Partners", href: "#partners", num: "05" },
  { label: "Contact", href: "#contact", num: "06" },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useState<"EN" | "AR">("EN")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6">
      <div
        className={cn(
          "mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full px-3 transition-all duration-300 sm:px-4",
          scrolled ? "glass" : "glass-soft",
        )}
      >
        <Link
          href="#home"
          aria-label="Fiber City — Home"
          className="pl-2"
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="font-mono text-[10px] text-primary mr-1.5">
                {item.num}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center rounded-full border border-border bg-background/60 p-0.5 font-mono text-[11px] sm:flex">
            <button
              type="button"
              onClick={() => setLang("EN")}
              aria-pressed={lang === "EN"}
              className={cn(
                "rounded-full px-2.5 py-1 transition",
                lang === "EN"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang("AR")}
              aria-pressed={lang === "AR"}
              className={cn(
                "rounded-full px-2.5 py-1 transition",
                lang === "AR"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              AR
            </button>
          </div>

          <Link
            href="#contact"
            className="hidden items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:bg-primary sm:inline-flex"
          >
            Get a Quote
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 text-foreground lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="glass mx-auto mt-2 max-w-7xl rounded-2xl p-2 lg:hidden">
          <nav className="flex flex-col">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-foreground transition hover:bg-foreground/5"
              >
                <span className="flex items-center gap-3">
                  <span className="font-mono text-xs text-primary">
                    {item.num}
                  </span>
                  <span className="font-display text-lg">{item.label}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-foreground px-4 py-3 text-sm font-medium text-background"
            >
              Get a Quote <ArrowUpRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
