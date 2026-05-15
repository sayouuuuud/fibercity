import { NextRequest } from "next/server"

import { createWork, listWorks } from "@/lib/db/queries"
import type { WorkCategory, Status } from "@/lib/db/types"
import { jsonError, jsonOk, parseLocale } from "@/lib/api/response"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const locale = parseLocale(searchParams)
  const status = (searchParams.get("status") as Status | "all" | null) ?? "published"
  const category = (searchParams.get("category") as WorkCategory | "All" | null) ?? "All"
  const search = searchParams.get("search") ?? undefined
  const limitParam = searchParams.get("limit")
  const limit = limitParam ? Number.parseInt(limitParam, 10) : undefined

  try {
    const works = listWorks({ locale, status, category, search, limit })
    return jsonOk(works)
  } catch (error) {
    console.error("[api/works] GET", error)
    return jsonError("Failed to load works", 500)
  }
}

type Body = {
  slug?: string
  title_en: string
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

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Body
    if (!body.title_en || body.title_en.trim().length === 0) {
      return jsonError("title_en is required")
    }
    const work = createWork({
      slug: body.slug,
      title_en: body.title_en,
      title_ar: body.title_ar,
      excerpt_en: body.excerpt_en,
      excerpt_ar: body.excerpt_ar,
      content_en: JSON.stringify(body.content_en ?? []),
      content_ar: JSON.stringify(body.content_ar ?? []),
      cover_image: body.cover_image,
      gallery: JSON.stringify(body.gallery ?? []),
      category: body.category,
      client: body.client,
      location_en: body.location_en,
      location_ar: body.location_ar,
      year: body.year,
      stats: JSON.stringify(body.stats ?? []),
      status: body.status,
      sort_order: body.sort_order,
    })
    return jsonOk(work, { status: 201 })
  } catch (error) {
    console.error("[api/works] POST", error)
    return jsonError("Failed to create work", 500)
  }
}
