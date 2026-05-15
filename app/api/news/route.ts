import { NextRequest } from "next/server"

import { createNews, listNews } from "@/lib/db/queries"
import type { Status } from "@/lib/db/types"
import { jsonError, jsonOk, parseLocale } from "@/lib/api/response"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const locale = parseLocale(searchParams)
  const status = (searchParams.get("status") as Status | "all" | null) ?? "published"
  const search = searchParams.get("search") ?? undefined
  const limitParam = searchParams.get("limit")
  const limit = limitParam ? Number.parseInt(limitParam, 10) : undefined
  try {
    return jsonOk(listNews({ locale, status, search, limit }))
  } catch (error) {
    console.error("[api/news] GET", error)
    return jsonError("Failed to load news", 500)
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
  category_en?: string
  category_ar?: string
  author?: string
  read_minutes?: number
  status?: Status
  published_at?: string
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Body
    if (!body.title_en) return jsonError("title_en is required")
    const news = createNews({
      slug: body.slug,
      title_en: body.title_en,
      title_ar: body.title_ar,
      excerpt_en: body.excerpt_en,
      excerpt_ar: body.excerpt_ar,
      content_en: JSON.stringify(body.content_en ?? []),
      content_ar: JSON.stringify(body.content_ar ?? []),
      cover_image: body.cover_image,
      category_en: body.category_en,
      category_ar: body.category_ar,
      author: body.author,
      read_minutes: body.read_minutes,
      status: body.status,
      published_at: body.published_at,
    })
    return jsonOk(news, { status: 201 })
  } catch (error) {
    console.error("[api/news] POST", error)
    return jsonError("Failed to create news", 500)
  }
}
