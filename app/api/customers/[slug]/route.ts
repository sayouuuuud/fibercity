import { NextRequest } from "next/server"

import { deleteCustomer, getCustomerRecord, mapCustomer, updateCustomer } from "@/lib/db/queries"
import { jsonError, jsonOk, parseLocale } from "@/lib/api/response"
import type { Status, Tier } from "@/lib/db/types"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

type Params = { params: Promise<{ slug: string }> }

export async function GET(request: NextRequest, { params }: Params) {
  const { slug } = await params
  const { searchParams } = new URL(request.url)
  const locale = parseLocale(searchParams)
  const row = getCustomerRecord(slug)
  if (!row) return jsonError("Not found", 404)
  if (searchParams.get("raw") === "1") return jsonOk(row)
  return jsonOk(mapCustomer(row, locale))
}

type Body = {
  slug?: string
  name_en?: string
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

export async function PUT(request: NextRequest, { params }: Params) {
  const { slug } = await params
  try {
    const body = (await request.json()) as Body
    const patch: Record<string, unknown> = {}
    if (body.slug !== undefined) patch.slug = body.slug
    if (body.name_en !== undefined) patch.name_en = body.name_en
    if (body.name_ar !== undefined) patch.name_ar = body.name_ar
    if (body.industry_en !== undefined) patch.industry_en = body.industry_en
    if (body.industry_ar !== undefined) patch.industry_ar = body.industry_ar
    if (body.tier !== undefined) patch.tier = body.tier
    if (body.region_en !== undefined) patch.region_en = body.region_en
    if (body.region_ar !== undefined) patch.region_ar = body.region_ar
    if (body.description_en !== undefined) patch.description_en = body.description_en
    if (body.description_ar !== undefined) patch.description_ar = body.description_ar
    if (body.logo_url !== undefined) patch.logo_url = body.logo_url
    if (body.since !== undefined) patch.since = body.since
    if (body.projects_count !== undefined) patch.projects_count = body.projects_count
    if (body.health_score !== undefined) patch.health_score = body.health_score
    if (body.contact_name !== undefined) patch.contact_name = body.contact_name
    if (body.contact_email !== undefined) patch.contact_email = body.contact_email
    if (body.contact_phone !== undefined) patch.contact_phone = body.contact_phone
    if (body.featured !== undefined) patch.featured = body.featured ? 1 : 0
    if (body.status !== undefined) patch.status = body.status
    const updated = updateCustomer(slug, patch)
    if (!updated) return jsonError("Not found", 404)
    return jsonOk(updated)
  } catch (error) {
    console.error("[api/customers/:slug] PUT", error)
    return jsonError("Failed to update customer", 500)
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { slug } = await params
  return deleteCustomer(slug) ? jsonOk({ deleted: true }) : jsonError("Not found", 404)
}
