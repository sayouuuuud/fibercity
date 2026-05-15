"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/components/i18n/language-provider"
import { cn } from "@/lib/utils"

type Variant = "header" | "inline"

export function LanguageToggle({ variant = "header", className }: { variant?: Variant; className?: string }) {
  const { locale, setLocale, t } = useLanguage()
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  const update = (next: "en" | "ar") => {
    if (next === locale) return
    setLocale(next)
    // Trigger server re-render so server-rendered HTML reflects new locale
    startTransition(() => {
      router.refresh()
    })
  }

  if (variant === "inline") {
    return (
      <div className={cn("inline-flex items-center gap-1 rounded-full border border-border bg-card/70 p-0.5", className)}>
        <button
          type="button"
          onClick={() => update("en")}
          aria-pressed={locale === "en"}
          disabled={pending}
          className={cn(
            "rounded-full px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] transition",
            locale === "en" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {t.nav.languageEN}
        </button>
        <button
          type="button"
          onClick={() => update("ar")}
          aria-pressed={locale === "ar"}
          disabled={pending}
          className={cn(
            "rounded-full px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] transition",
            locale === "ar" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {t.nav.languageAR}
        </button>
      </div>
    )
  }

  return (
    <div className={cn("hidden h-9 items-center overflow-hidden rounded-full border border-foreground/15 text-[11px] uppercase tracking-[0.18em] sm:inline-flex", className)}>
      <button
        type="button"
        onClick={() => update("en")}
        aria-pressed={locale === "en"}
        disabled={pending}
        className={cn(
          "px-3 py-1.5 transition",
          locale === "en" ? "bg-foreground text-background" : "text-foreground/60 hover:text-foreground",
        )}
      >
        {t.nav.languageEN}
      </button>
      <span className="h-4 w-px bg-foreground/15" aria-hidden="true" />
      <button
        type="button"
        onClick={() => update("ar")}
        aria-pressed={locale === "ar"}
        disabled={pending}
        className={cn(
          "px-3 py-1.5 transition",
          locale === "ar" ? "bg-foreground text-background" : "text-foreground/60 hover:text-foreground",
        )}
      >
        {t.nav.languageAR}
      </button>
    </div>
  )
}
