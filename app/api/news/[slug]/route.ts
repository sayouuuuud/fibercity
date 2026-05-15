import { NextRequest } from "next/server"

import { deleteNews, getNews, getNewsRecord, updateNews } from "@/lib/db/queries"
import { jsonError, jsonOk, parseLocale } from "@/lib/api/response"
import type { Status } from "@/lib/db/types"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

type Params = { params: Promise<{ slug: string }> }

export async function GET(request: NextRequest, { params }: Params) {
  const { slug } = await params
  const { searchParams } = new URL(request.url)
  const locale = parseLocale(searchParams)
  if (searchParams.get("raw") === "1") {
    const row = getNewsRecord(slug)
    if (!row) return jsonError("Not found", 404)
    return jsonOk(row)
  }
  const item = getNews(slug, locale)
  if (!item) return jsonError("Not found", 404)
  return jsonOk(item)
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
  category_en?: string
  category_ar?: string
  author?: string
  read_minutes?: number
  status?: Status
  published_at?: string
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
    if (body.category_en !== undefined) patch.category_en = body.category_en
    if (body.category_ar !== undefined) patch.category_ar = body.category_ar
    if (body.author !== undefined) patch.author = body.author
    if (body.read_minutes !== undefined) patch.read_minutes = body.read_minutes
    if (body.status !== undefined) patch.status = body.status
    if (body.published_at !== undefined) patch.published_at = body.published_at
    const updated = updateNews(slug, patch)
    if (!updated) return jsonError("Not found", 404)
    return jsonOk(updated)
  } catch (error) {
    console.error("[api/news/:slug] PUT", error)
    return jsonError("Failed to update news", 500)
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { slug } = await params
  return deleteNews(slug) ? jsonOk({ deleted: true }) : jsonError("Not found", 404)
}
