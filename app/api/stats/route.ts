import { NextRequest } from "next/server"

import { createStat, listStats } from "@/lib/db/queries"
import { jsonError, jsonOk, parseLocale } from "@/lib/api/response"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const locale = parseLocale(searchParams)
  try {
    return jsonOk(listStats({ locale }))
  } catch (error) {
    console.error("[api/stats] GET", error)
    return jsonError("Failed to load stats", 500)
  }
}

type Body = {
  slug?: string
  value?: number
  suffix_en?: string
  suffix_ar?: string
  label_en: string
  label_ar?: string
  helper_en?: string
  helper_ar?: string
  sort_order?: number
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Body
    if (!body.label_en) return jsonError("label_en is required")
    const created = createStat(body)
    return jsonOk(created, { status: 201 })
  } catch (error) {
    console.error("[api/stats] POST", error)
    return jsonError("Failed to create stat", 500)
  }
}
