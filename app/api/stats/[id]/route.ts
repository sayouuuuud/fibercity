import { NextRequest } from "next/server"

import { deleteStat, updateStat } from "@/lib/db/queries"
import { jsonError, jsonOk } from "@/lib/api/response"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

type Params = { params: Promise<{ id: string }> }

type Body = {
  slug?: string
  value?: number
  suffix_en?: string
  suffix_ar?: string
  label_en?: string
  label_ar?: string
  helper_en?: string
  helper_ar?: string
  sort_order?: number
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params
  try {
    const body = (await request.json()) as Body
    const patch: Record<string, unknown> = {}
    for (const key of [
      "slug",
      "value",
      "suffix_en",
      "suffix_ar",
      "label_en",
      "label_ar",
      "helper_en",
      "helper_ar",
      "sort_order",
    ] as const) {
      if (body[key] !== undefined) patch[key] = body[key]
    }
    const updated = updateStat(id, patch)
    if (!updated) return jsonError("Not found", 404)
    return jsonOk(updated)
  } catch (error) {
    console.error("[api/stats/:id] PUT", error)
    return jsonError("Failed to update stat", 500)
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params
  return deleteStat(id) ? jsonOk({ deleted: true }) : jsonError("Not found", 404)
}
