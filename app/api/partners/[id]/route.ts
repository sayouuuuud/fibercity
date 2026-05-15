import { NextRequest } from "next/server"

import { deletePartner, updatePartner } from "@/lib/db/queries"
import { jsonError, jsonOk } from "@/lib/api/response"
import type { Status } from "@/lib/db/types"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

type Params = { params: Promise<{ id: string }> }

type Body = {
  name_en?: string
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

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params
  try {
    const body = (await request.json()) as Body
    const patch: Record<string, unknown> = {}
    for (const key of [
      "name_en",
      "name_ar",
      "group_en",
      "group_ar",
      "type_en",
      "type_ar",
      "logo_url",
      "website_url",
      "sort_order",
      "status",
    ] as const) {
      if (body[key] !== undefined) patch[key] = body[key]
    }
    const updated = updatePartner(id, patch)
    if (!updated) return jsonError("Not found", 404)
    return jsonOk(updated)
  } catch (error) {
    console.error("[api/partners/:id] PUT", error)
    return jsonError("Failed to update partner", 500)
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params
  return deletePartner(id) ? jsonOk({ deleted: true }) : jsonError("Not found", 404)
}
