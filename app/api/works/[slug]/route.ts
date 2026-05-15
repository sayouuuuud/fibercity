import { NextRequest } from "next/server"

import { deleteWork, getWork, getWorkRecord, updateWork } from "@/lib/db/queries"
import { jsonError, jsonOk, parseLocale } from "@/lib/api/response"
import type { WorkCategory, Status } from "@/lib/db/types"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

type Params = { params: Promise<{ slug: string }> }

export async function GET(request: NextRequest, { params }: Params) {
  const { slug } = await params
  const { searchParams } = new URL(request.url)
  const locale = parseLocale(searchParams)
  const includeRaw = searchParams.get("raw") === "1"
  if (includeRaw) {
    const row = getWorkRecord(slug)
    if (!row) return jsonError("Not found", 404)
    return jsonOk(row)
  }
  const work = getWork(slug, locale)
  if (!work) return jsonError("Not found", 404)
  return jsonOk(work)
}

type Body = {
  slug?: string
  title_en?: string
  title_ar?: string
  excerpt_en?: string
  excerpt_ar?: string
  content_en?: string[]
  content_ar?: string[]
  cover_image?: string
  gallery?: string[]
  category?: WorkCategory
  client?: string
  location_en?: string
  location_ar?: string
  year?: string
  stats?: { label_en: string; label_ar: string; value: string }[]
  status?: Status
  sort_order?: number
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { slug } = await params
  try {
    const body = (await request.json()) as Body
    const patch: Record<string, unknown> = {}
    if (body.slug !== undefined) patch.slug = body.slug
    if (body.title_en !== undefined) patch.title_en = body.title_en
    if (body.title_ar !== undefined) patch.title_ar = body.title_ar
    if (body.excerpt_en !== undefined) patch.excerpt_en = body.excerpt_en
    if (body.excerpt_ar !== undefined) patch.excerpt_ar = body.excerpt_ar
    if (body.content_en !== undefined) patch.content_en = JSON.stringify(body.content_en)
    if (body.content_ar !== undefined) patch.content_ar = JSON.stringify(body.content_ar)
    if (body.cover_image !== undefined) patch.cover_image = body.cover_image
    if (body.gallery !== undefined) patch.gallery = JSON.stringify(body.gallery)
    if (body.category !== undefined) patch.category = body.category
    if (body.client !== undefined) patch.client = body.client
    if (body.location_en !== undefined) patch.location_en = body.location_en
    if (body.location_ar !== undefined) patch.location_ar = body.location_ar
    if (body.year !== undefined) patch.year = body.year
    if (body.stats !== undefined) patch.stats = JSON.stringify(body.stats)
    if (body.status !== undefined) patch.status = body.status
    if (body.sort_order !== undefined) patch.sort_order = body.sort_order
    const updated = updateWork(slug, patch)
    if (!updated) return jsonError("Not found", 404)
    return jsonOk(updated)
  } catch (error) {
    console.error("[api/works/:slug] PUT", error)
    return jsonError("Failed to update work", 500)
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { slug } = await params
  const removed = deleteWork(slug)
  if (!removed) return jsonError("Not found", 404)
  return jsonOk({ deleted: true })
}
