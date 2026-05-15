"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import type { Locale } from "@/lib/db/types"
import { DICTIONARIES, type Dictionary, DEFAULT_LOCALE } from "@/lib/i18n/dictionaries"
import { LOCALE_COOKIE } from "@/lib/i18n/locale"

type LanguageContextValue = {
  locale: Locale
  dir: "ltr" | "rtl"
  t: Dictionary
  setLocale: (locale: Locale) => void
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

export function LanguageProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale
  children: React.ReactNode
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    // Persist as cookie so server components on next navigation reflect the choice
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`
    if (typeof document !== "undefined") {
      const root = document.documentElement
      root.setAttribute("lang", next)
      root.setAttribute("dir", next === "ar" ? "rtl" : "ltr")
    }
  }, [])

  // Ensure DOM attrs match on hydration
  useEffect(() => {
    if (typeof document !== "undefined") {
      const root = document.documentElement
      root.setAttribute("lang", locale)
      root.setAttribute("dir", locale === "ar" ? "rtl" : "ltr")
    }
  }, [locale])

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      dir: locale === "ar" ? "rtl" : "ltr",
      t: DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE],
      setLocale,
    }),
    [locale, setLocale],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    // Fallback so non-wrapped components still render the EN dictionary
    return {
      locale: DEFAULT_LOCALE,
      dir: "ltr",
      t: DICTIONARIES[DEFAULT_LOCALE],
      setLocale: () => {},
    }
  }
  return ctx
}

export function useTranslations(): Dictionary {
  return useLanguage().t
}
