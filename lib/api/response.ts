import { NextResponse } from "next/server"
import type { Locale } from "@/lib/db/types"

export function jsonOk<T>(data: T, init?: ResponseInit) {
  return NextResponse.json({ ok: true, data }, init)
}

export function jsonError(message: string, status = 400, details?: unknown) {
  return NextResponse.json({ ok: false, error: message, details }, { status })
}

export function parseLocale(searchParams: URLSearchParams): Locale {
  const value = searchParams.get("locale")
  return value === "ar" ? "ar" : "en"
}

export function getBoolean(value: string | null | undefined): boolean | undefined {
  if (value === undefined || value === null) return undefined
  if (value === "true" || value === "1") return true
  if (value === "false" || value === "0") return false
  return undefined
}

export function parseJsonField<T>(value: string | undefined | null, fallback: T): T {
  if (value === undefined || value === null || value === "") return fallback
  if (typeof value !== "string") return value as unknown as T
  try {
    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}
