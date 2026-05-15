import { NextRequest } from "next/server"

import { deleteService, getServiceRecord, updateService } from "@/lib/db/queries"
import { jsonError, jsonOk } from "@/lib/api/response"
import type { Status } from "@/lib/db/types"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

type Params = { params: Promise<{ slug: string }> }

export async function GET(_request: NextRequest, { params }: Params) {
  const { slug } = await params
  const row = getServiceRecord(slug)
  if (!row) return jsonError("Not found", 404)
  return jsonOk(row)
}

type Body = {
  slug?: string
  icon?: string
  title_en?: string
  title_ar?: string
  description_en?: string
  description_ar?: string
  bullets_en?: string[]
  bullets_ar?: string[]
  sort_order?: number
  status?: Status
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { slug } = await params
  try {
    const body = (await request.json()) as Body
    const patch: Record<string, unknown> = {}
    if (body.slug !== undefined) patch.slug = body.slug
    if (body.icon !== undefined) patch.icon = body.icon
    if (body.title_en !== undefined) patch.title_en = body.title_en
    if (body.title_ar !== undefined) patch.title_ar = body.title_ar
    if (body.description_en !== undefined) patch.description_en = body.description_en
    if (body.description_ar !== undefined) patch.description_ar = body.description_ar
    if (body.bullets_en !== undefined) patch.bullets_en = JSON.stringify(body.bullets_en)
    if (body.bullets_ar !== undefined) patch.bullets_ar = JSON.stringify(body.bullets_ar)
    if (body.sort_order !== undefined) patch.sort_order = body.sort_order
    if (body.status !== undefined) patch.status = body.status
    const updated = updateService(slug, patch)
    if (!updated) return jsonError("Not found", 404)
    return jsonOk(updated)
  } catch (error) {
    console.error("[api/services/:slug] PUT", error)
    return jsonError("Failed to update service", 500)
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { slug } = await params
  return deleteService(slug) ? jsonOk({ deleted: true }) : jsonError("Not found", 404)
}
