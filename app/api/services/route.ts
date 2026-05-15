import { NextRequest } from "next/server"

import { createService, listServices } from "@/lib/db/queries"
import { jsonError, jsonOk, parseLocale } from "@/lib/api/response"
import type { Status } from "@/lib/db/types"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const locale = parseLocale(searchParams)
  const status = (searchParams.get("status") as Status | "all" | null) ?? "published"
  try {
    return jsonOk(listServices({ locale, status }))
  } catch (error) {
    console.error("[api/services] GET", error)
    return jsonError("Failed to load services", 500)
  }
}

type Body = {
  slug?: string
  icon?: string
  title_en: string
  title_ar?: string
  description_en?: string
  description_ar?: string
  bullets_en?: string[]
  bullets_ar?: string[]
  sort_order?: number
  status?: Status
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Body
    if (!body.title_en) return jsonError("title_en is required")
    const created = createService({
      slug: body.slug,
      icon: body.icon,
      title_en: body.title_en,
      title_ar: body.title_ar,
      description_en: body.description_en,
      description_ar: body.description_ar,
      bullets_en: JSON.stringify(body.bullets_en ?? []),
      bullets_ar: JSON.stringify(body.bullets_ar ?? []),
      sort_order: body.sort_order,
      status: body.status,
    })
    return jsonOk(created, { status: 201 })
  } catch (error) {
    console.error("[api/services] POST", error)
    return jsonError("Failed to create service", 500)
  }
}
