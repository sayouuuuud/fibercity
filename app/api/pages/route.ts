import { NextRequest } from "next/server"

import { listPages, upsertPage } from "@/lib/db/queries"
import { jsonError, jsonOk } from "@/lib/api/response"
import type { Status } from "@/lib/db/types"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET() {
  try {
    return jsonOk(listPages())
  } catch (error) {
    console.error("[api/pages] GET", error)
    return jsonError("Failed to load pages", 500)
  }
}

type Body = {
  key: string
  title_en?: string
  title_ar?: string
  status?: Status
  sections?: string[]
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Body
    if (!body.key) return jsonError("key is required")
    const updated = upsertPage({
      key: body.key,
      title_en: body.title_en,
      title_ar: body.title_ar,
      status: body.status,
      sections: body.sections ? JSON.stringify(body.sections) : undefined,
    })
    return jsonOk(updated)
  } catch (error) {
    console.error("[api/pages] POST", error)
    return jsonError("Failed to update page", 500)
  }
}
