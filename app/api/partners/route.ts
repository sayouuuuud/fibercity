import { NextRequest } from "next/server"

import { createPartner, listPartners } from "@/lib/db/queries"
import { jsonError, jsonOk, parseLocale } from "@/lib/api/response"
import type { Status } from "@/lib/db/types"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const locale = parseLocale(searchParams)
  const status = (searchParams.get("status") as Status | "all" | null) ?? "published"
  try {
    return jsonOk(listPartners({ locale, status }))
  } catch (error) {
    console.error("[api/partners] GET", error)
    return jsonError("Failed to load partners", 500)
  }
}

type Body = {
  name_en: string
  name_ar?: string
  group_en?: string
  group_ar?: string
  type_en?: string
  type_ar?: string
  logo_url?: string | null
  website_url?: string | null
  sort_order?: number
  status?: Status
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Body
    if (!body.name_en) return jsonError("name_en is required")
    const created = createPartner(body)
    return jsonOk(created, { status: 201 })
  } catch (error) {
    console.error("[api/partners] POST", error)
    return jsonError("Failed to create partner", 500)
  }
}
