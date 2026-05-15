import type { Locale } from "@/lib/db/types"

export const LOCALE_COOKIE = "fibercity-locale"

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr"
}
