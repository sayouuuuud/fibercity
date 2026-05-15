import "server-only"
import { cookies } from "next/headers"
import type { Locale } from "@/lib/db/types"
import { DEFAULT_LOCALE } from "./dictionaries"
import { LOCALE_COOKIE } from "./locale"

export async function getServerLocale(): Promise<Locale> {
  const store = await cookies()
  const raw = store.get(LOCALE_COOKIE)?.value
  if (raw === "ar" || raw === "en") return raw
  return DEFAULT_LOCALE
}
