import { NextRequest } from "next/server"

import { createCustomer, listCustomers } from "@/lib/db/queries"
import type { Status, Tier } from "@/lib/db/types"
import { getBoolean, jsonError, jsonOk, parseLocale } from "@/lib/api/response"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const locale = parseLocale(searchParams)
  const status = (searchParams.get("status") as Status | "all" | null) ?? "published"
  const tier = (searchParams.get("tier") as Tier | "All" | null) ?? "All"
  const featured = getBoolean(searchParams.get("featured"))
  const search = searchParams.get("search") ?? undefined
  try {
    return jsonOk(listCustomers({ locale, status, tier, featured, search }))
  } catch (error) {
    console.error("[api/customers] GET", error)
    return jsonError("Failed to load customers", 500)
  }
}

type Body = {
  slug?: string
  name_en: string
  name_ar?: string
  industry_en?: string
  industry_ar?: string
  tier?: Tier
  region_en?: string
  region_ar?: string
  description_en?: string
  description_ar?: string
  logo_url?: string | null
  since?: string
  projects_count?: number
  health_score?: number
  contact_name?: string
  contact_email?: string
  contact_phone?: string
  featured?: boolean
  status?: Status
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Body
    if (!body.name_en) return jsonError("name_en is required")
    const created = createCustomer({
      slug: body.slug,
      name_en: body.name_en,
      name_ar: body.name_ar,
      industry_en: body.industry_en,
      industry_ar: body.industry_ar,
      tier: body.tier,
      region_en: body.region_en,
      region_ar: body.region_ar,
      description_en: body.description_en,
      description_ar: body.description_ar,
      logo_url: body.logo_url,
      since: body.since,
      projects_count: body.projects_count,
      health_score: body.health_score,
      contact_name: body.contact_name,
      contact_email: body.contact_email,
      contact_phone: body.contact_phone,
      featured: body.featured ? 1 : 0,
      status: body.status,
    })
    return jsonOk(created, { status: 201 })
  } catch (error) {
    console.error("[api/customers] POST", error)
    return jsonError("Failed to create customer", 500)
  }
}
