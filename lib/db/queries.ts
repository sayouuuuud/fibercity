import { randomUUID } from "node:crypto"
import type Database from "better-sqlite3"

import { getDb } from "./client"
import type {
  ContactMessageRecord,
  CustomerDTO,
  CustomerRecord,
  DashboardSnapshot,
  Locale,
  NewsDTO,
  NewsRecord,
  PartnerDTO,
  PartnerRecord,
  ServiceDTO,
  ServiceRecord,
  SettingsDTO,
  StatDTO,
  StatRecord,
  Status,
  WorkCategory,
  WorkDTO,
  WorkRecord,
  PageRecord,
} from "./types"

// --- helpers ---------------------------------------------------------------

const now = () => new Date().toISOString()

function pick<T>(en: T, ar: T, locale: Locale): T {
  return locale === "ar" && (ar as unknown) ? ar : en
}

function parseJSON<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback
  try {
    const parsed = JSON.parse(value)
    if (parsed == null) return fallback
    return parsed as T
  } catch {
    return fallback
  }
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 80)
}

function ensureUniqueSlug(
  db: Database.Database,
  table: string,
  base: string,
  ignoreId?: string,
): string {
  const baseSlug = base || `item-${Date.now()}`
  let slug = baseSlug
  let counter = 1
  // limit attempts
  while (counter < 100) {
    const stmt = db.prepare(`SELECT id FROM ${table} WHERE slug = ?`)
    const existing = stmt.get(slug) as { id: string } | undefined
    if (!existing || existing.id === ignoreId) return slug
    counter += 1
    slug = `${baseSlug}-${counter}`
  }
  return `${baseSlug}-${Date.now()}`
}

// --- works ------------------------------------------------------------------

export function mapWork(row: WorkRecord, locale: Locale = "en"): WorkDTO {
  return {
    id: row.id,
    slug: row.slug,
    title: pick(row.title_en, row.title_ar, locale),
    excerpt: pick(row.excerpt_en, row.excerpt_ar, locale),
    content: parseJSON<string[]>(pick(row.content_en, row.content_ar, locale), []),
    client: row.client,
    category: row.category as WorkCategory,
    location: pick(row.location_en, row.location_ar, locale),
    year: row.year,
    image: row.cover_image || "/images/project-1.jpg",
    gallery: parseJSON<string[]>(row.gallery, []),
    stats: parseJSON<{ label_en: string; label_ar: string; value: string }[]>(row.stats, []).map(
      (s) => ({ label: pick(s.label_en, s.label_ar, locale), value: s.value }),
    ),
    status: row.status as Status,
    views: row.views,
    sortOrder: row.sort_order,
    updatedAt: row.updated_at,
  }
}

export function listWorks(options: {
  locale?: Locale
  status?: Status | "all"
  category?: WorkCategory | "All"
  search?: string
  limit?: number
} = {}): WorkDTO[] {
  const db = getDb()
  const filters: string[] = []
  const params: unknown[] = []
  const status = options.status ?? "published"
  if (status !== "all") {
    filters.push("status = ?")
    params.push(status)
  }
  if (options.category && options.category !== "All") {
    filters.push("category = ?")
    params.push(options.category)
  }
  if (options.search) {
    filters.push("(LOWER(title_en) LIKE ? OR LOWER(title_ar) LIKE ? OR LOWER(client) LIKE ?)")
    const term = `%${options.search.toLowerCase()}%`
    params.push(term, term, term)
  }
  const where = filters.length ? `WHERE ${filters.join(" AND ")}` : ""
  let sql = `SELECT * FROM works ${where} ORDER BY sort_order ASC, created_at DESC`
  if (options.limit) sql += ` LIMIT ${Math.max(1, Math.floor(options.limit))}`
  const rows = db.prepare(sql).all(...params) as WorkRecord[]
  return rows.map((r) => mapWork(r, options.locale ?? "en"))
}

export function getWorkRecord(slugOrId: string): WorkRecord | null {
  const db = getDb()
  return (db
    .prepare("SELECT * FROM works WHERE slug = ? OR id = ? LIMIT 1")
    .get(slugOrId, slugOrId) as WorkRecord | undefined) ?? null
}

export function getWork(slugOrId: string, locale: Locale = "en"): WorkDTO | null {
  const row = getWorkRecord(slugOrId)
  return row ? mapWork(row, locale) : null
}

export type WorkInput = Partial<Omit<WorkRecord, "id" | "created_at" | "updated_at">> & {
  title_en: string
}

export function createWork(input: WorkInput): WorkRecord {
  const db = getDb()
  const id = randomUUID()
  const slug = ensureUniqueSlug(db, "works", input.slug || slugify(input.title_en))
  const stmt = db.prepare(`
    INSERT INTO works (id, slug, title_en, title_ar, excerpt_en, excerpt_ar, content_en, content_ar,
      cover_image, gallery, category, client, location_en, location_ar, year, stats, status, sort_order, views, created_at, updated_at)
    VALUES (@id,@slug,@title_en,@title_ar,@excerpt_en,@excerpt_ar,@content_en,@content_ar,@cover_image,@gallery,
      @category,@client,@location_en,@location_ar,@year,@stats,@status,@sort_order,0,@created_at,@updated_at)
  `)
  stmt.run({
    id,
    slug,
    title_en: input.title_en,
    title_ar: input.title_ar ?? "",
    excerpt_en: input.excerpt_en ?? "",
    excerpt_ar: input.excerpt_ar ?? "",
    content_en: input.content_en ?? "[]",
    content_ar: input.content_ar ?? "[]",
    cover_image: input.cover_image ?? "",
    gallery: input.gallery ?? "[]",
    category: input.category ?? "Installation",
    client: input.client ?? "",
    location_en: input.location_en ?? "",
    location_ar: input.location_ar ?? "",
    year: input.year ?? "",
    stats: input.stats ?? "[]",
    status: input.status ?? "published",
    sort_order: input.sort_order ?? 99,
    created_at: now(),
    updated_at: now(),
  })
  return db.prepare("SELECT * FROM works WHERE id = ?").get(id) as WorkRecord
}

export function updateWork(slugOrId: string, input: Partial<WorkRecord>): WorkRecord | null {
  const db = getDb()
  const existing = getWorkRecord(slugOrId)
  if (!existing) return null
  const updatable: (keyof WorkRecord)[] = [
    "slug",
    "title_en",
    "title_ar",
    "excerpt_en",
    "excerpt_ar",
    "content_en",
    "content_ar",
    "cover_image",
    "gallery",
    "category",
    "client",
    "location_en",
    "location_ar",
    "year",
    "stats",
    "status",
    "sort_order",
    "views",
  ]
  const sets: string[] = []
  const params: Record<string, unknown> = { id: existing.id, updated_at: now() }
  for (const key of updatable) {
    if (key in input) {
      let value: unknown = input[key]
      if (key === "slug" && typeof value === "string") {
        value = ensureUniqueSlug(db, "works", slugify(value), existing.id)
      }
      sets.push(`${key} = @${key}`)
      params[key] = value as unknown
    }
  }
  if (sets.length === 0) return existing
  const sql = `UPDATE works SET ${sets.join(", ")}, updated_at = @updated_at WHERE id = @id`
  db.prepare(sql).run(params)
  return db.prepare("SELECT * FROM works WHERE id = ?").get(existing.id) as WorkRecord
}

export function deleteWork(slugOrId: string): boolean {
  const db = getDb()
  const existing = getWorkRecord(slugOrId)
  if (!existing) return false
  db.prepare("DELETE FROM works WHERE id = ?").run(existing.id)
  return true
}

// --- news ------------------------------------------------------------------

export function mapNews(row: NewsRecord, locale: Locale = "en"): NewsDTO {
  return {
    id: row.id,
    slug: row.slug,
    title: pick(row.title_en, row.title_ar, locale),
    excerpt: pick(row.excerpt_en, row.excerpt_ar, locale),
    content: parseJSON<string[]>(pick(row.content_en, row.content_ar, locale), []),
    category: pick(row.category_en, row.category_ar, locale),
    author: row.author,
    date: row.published_at,
    readMinutes: row.read_minutes,
    image: row.cover_image || "/images/editorial-hero.jpg",
    status: row.status as Status,
    views: row.views,
    updatedAt: row.updated_at,
  }
}

export function listNews(options: {
  locale?: Locale
  status?: Status | "all"
  search?: string
  limit?: number
} = {}): NewsDTO[] {
  const db = getDb()
  const filters: string[] = []
  const params: unknown[] = []
  const status = options.status ?? "published"
  if (status !== "all") {
    filters.push("status = ?")
    params.push(status)
  }
  if (options.search) {
    filters.push("(LOWER(title_en) LIKE ? OR LOWER(title_ar) LIKE ?)")
    const term = `%${options.search.toLowerCase()}%`
    params.push(term, term)
  }
  const where = filters.length ? `WHERE ${filters.join(" AND ")}` : ""
  let sql = `SELECT * FROM news ${where} ORDER BY published_at DESC`
  if (options.limit) sql += ` LIMIT ${Math.max(1, Math.floor(options.limit))}`
  const rows = db.prepare(sql).all(...params) as NewsRecord[]
  return rows.map((r) => mapNews(r, options.locale ?? "en"))
}

export function getNewsRecord(slugOrId: string): NewsRecord | null {
  const db = getDb()
  return (db
    .prepare("SELECT * FROM news WHERE slug = ? OR id = ? LIMIT 1")
    .get(slugOrId, slugOrId) as NewsRecord | undefined) ?? null
}

export function getNews(slugOrId: string, locale: Locale = "en"): NewsDTO | null {
  const row = getNewsRecord(slugOrId)
  return row ? mapNews(row, locale) : null
}

export type NewsInput = Partial<Omit<NewsRecord, "id" | "created_at" | "updated_at">> & {
  title_en: string
}

export function createNews(input: NewsInput): NewsRecord {
  const db = getDb()
  const id = randomUUID()
  const slug = ensureUniqueSlug(db, "news", input.slug || slugify(input.title_en))
  db.prepare(
    `INSERT INTO news (id, slug, title_en, title_ar, excerpt_en, excerpt_ar, content_en, content_ar, cover_image,
      category_en, category_ar, author, read_minutes, status, published_at, views, created_at, updated_at)
     VALUES (@id,@slug,@title_en,@title_ar,@excerpt_en,@excerpt_ar,@content_en,@content_ar,@cover_image,
       @category_en,@category_ar,@author,@read_minutes,@status,@published_at,0,@created_at,@updated_at)`,
  ).run({
    id,
    slug,
    title_en: input.title_en,
    title_ar: input.title_ar ?? "",
    excerpt_en: input.excerpt_en ?? "",
    excerpt_ar: input.excerpt_ar ?? "",
    content_en: input.content_en ?? "[]",
    content_ar: input.content_ar ?? "[]",
    cover_image: input.cover_image ?? "",
    category_en: input.category_en ?? "Field Notes",
    category_ar: input.category_ar ?? "ملاحظات ميدانية",
    author: input.author ?? "Fiber City Editorial",
    read_minutes: input.read_minutes ?? 5,
    status: input.status ?? "published",
    published_at: input.published_at ?? now(),
    created_at: now(),
    updated_at: now(),
  })
  return db.prepare("SELECT * FROM news WHERE id = ?").get(id) as NewsRecord
}

export function updateNews(slugOrId: string, input: Partial<NewsRecord>): NewsRecord | null {
  const db = getDb()
  const existing = getNewsRecord(slugOrId)
  if (!existing) return null
  const updatable: (keyof NewsRecord)[] = [
    "slug",
    "title_en",
    "title_ar",
    "excerpt_en",
    "excerpt_ar",
    "content_en",
    "content_ar",
    "cover_image",
    "category_en",
    "category_ar",
    "author",
    "read_minutes",
    "status",
    "published_at",
    "views",
  ]
  const sets: string[] = []
  const params: Record<string, unknown> = { id: existing.id, updated_at: now() }
  for (const key of updatable) {
    if (key in input) {
      let value: unknown = input[key]
      if (key === "slug" && typeof value === "string") {
        value = ensureUniqueSlug(db, "news", slugify(value), existing.id)
      }
      sets.push(`${key} = @${key}`)
      params[key] = value as unknown
    }
  }
  if (sets.length === 0) return existing
  db.prepare(`UPDATE news SET ${sets.join(", ")}, updated_at = @updated_at WHERE id = @id`).run(params)
  return db.prepare("SELECT * FROM news WHERE id = ?").get(existing.id) as NewsRecord
}

export function deleteNews(slugOrId: string): boolean {
  const db = getDb()
  const existing = getNewsRecord(slugOrId)
  if (!existing) return false
  db.prepare("DELETE FROM news WHERE id = ?").run(existing.id)
  return true
}

// --- customers --------------------------------------------------------------

export function mapCustomer(row: CustomerRecord, locale: Locale = "en"): CustomerDTO {
  return {
    id: row.id,
    slug: row.slug,
    name: pick(row.name_en, row.name_ar, locale),
    industry: pick(row.industry_en, row.industry_ar, locale),
    tier: row.tier,
    region: pick(row.region_en, row.region_ar, locale),
    description: pick(row.description_en, row.description_ar, locale),
    logo: row.logo_url,
    since: row.since,
    projectsCount: row.projects_count,
    healthScore: row.health_score,
    contact: row.contact_name,
    email: row.contact_email,
    phone: row.contact_phone,
    featured: row.featured === 1,
    status: row.status as Status,
    updatedAt: row.updated_at,
  }
}

export function listCustomers(options: {
  locale?: Locale
  status?: Status | "all"
  tier?: "Enterprise" | "Growth" | "Starter" | "All"
  featured?: boolean
  search?: string
  limit?: number
} = {}): CustomerDTO[] {
  const db = getDb()
  const filters: string[] = []
  const params: unknown[] = []
  const status = options.status ?? "published"
  if (status !== "all") {
    filters.push("status = ?")
    params.push(status)
  }
  if (options.tier && options.tier !== "All") {
    filters.push("tier = ?")
    params.push(options.tier)
  }
  if (typeof options.featured === "boolean") {
    filters.push("featured = ?")
    params.push(options.featured ? 1 : 0)
  }
  if (options.search) {
    filters.push("(LOWER(name_en) LIKE ? OR LOWER(name_ar) LIKE ?)")
    const term = `%${options.search.toLowerCase()}%`
    params.push(term, term)
  }
  const where = filters.length ? `WHERE ${filters.join(" AND ")}` : ""
  let sql = `SELECT * FROM customers ${where} ORDER BY featured DESC, health_score DESC`
  if (options.limit) sql += ` LIMIT ${Math.max(1, Math.floor(options.limit))}`
  const rows = db.prepare(sql).all(...params) as CustomerRecord[]
  return rows.map((r) => mapCustomer(r, options.locale ?? "en"))
}

export function getCustomerRecord(slugOrId: string): CustomerRecord | null {
  const db = getDb()
  return (db
    .prepare("SELECT * FROM customers WHERE slug = ? OR id = ? LIMIT 1")
    .get(slugOrId, slugOrId) as CustomerRecord | undefined) ?? null
}

export type CustomerInput = Partial<Omit<CustomerRecord, "id" | "created_at" | "updated_at">> & {
  name_en: string
}

export function createCustomer(input: CustomerInput): CustomerRecord {
  const db = getDb()
  const id = randomUUID()
  const slug = ensureUniqueSlug(db, "customers", input.slug || slugify(input.name_en))
  db.prepare(
    `INSERT INTO customers (id, slug, name_en, name_ar, industry_en, industry_ar, tier, region_en, region_ar,
       description_en, description_ar, logo_url, since, projects_count, health_score, contact_name, contact_email,
       contact_phone, featured, status, created_at, updated_at)
     VALUES (@id,@slug,@name_en,@name_ar,@industry_en,@industry_ar,@tier,@region_en,@region_ar,
       @description_en,@description_ar,@logo_url,@since,@projects_count,@health_score,@contact_name,@contact_email,
       @contact_phone,@featured,@status,@created_at,@updated_at)`,
  ).run({
    id,
    slug,
    name_en: input.name_en,
    name_ar: input.name_ar ?? "",
    industry_en: input.industry_en ?? "",
    industry_ar: input.industry_ar ?? "",
    tier: input.tier ?? "Growth",
    region_en: input.region_en ?? "",
    region_ar: input.region_ar ?? "",
    description_en: input.description_en ?? "",
    description_ar: input.description_ar ?? "",
    logo_url: input.logo_url ?? null,
    since: input.since ?? String(new Date().getFullYear()),
    projects_count: input.projects_count ?? 0,
    health_score: input.health_score ?? 85,
    contact_name: input.contact_name ?? "",
    contact_email: input.contact_email ?? "",
    contact_phone: input.contact_phone ?? "",
    featured: input.featured ?? 0,
    status: input.status ?? "published",
    created_at: now(),
    updated_at: now(),
  })
  return db.prepare("SELECT * FROM customers WHERE id = ?").get(id) as CustomerRecord
}

export function updateCustomer(slugOrId: string, input: Partial<CustomerRecord>): CustomerRecord | null {
  const db = getDb()
  const existing = getCustomerRecord(slugOrId)
  if (!existing) return null
  const updatable: (keyof CustomerRecord)[] = [
    "slug",
    "name_en",
    "name_ar",
    "industry_en",
    "industry_ar",
    "tier",
    "region_en",
    "region_ar",
    "description_en",
    "description_ar",
    "logo_url",
    "since",
    "projects_count",
    "health_score",
    "contact_name",
    "contact_email",
    "contact_phone",
    "featured",
    "status",
  ]
  const sets: string[] = []
  const params: Record<string, unknown> = { id: existing.id, updated_at: now() }
  for (const key of updatable) {
    if (key in input) {
      let value: unknown = input[key]
      if (key === "slug" && typeof value === "string") {
        value = ensureUniqueSlug(db, "customers", slugify(value), existing.id)
      }
      sets.push(`${key} = @${key}`)
      params[key] = value as unknown
    }
  }
  if (sets.length === 0) return existing
  db.prepare(`UPDATE customers SET ${sets.join(", ")}, updated_at = @updated_at WHERE id = @id`).run(params)
  return db.prepare("SELECT * FROM customers WHERE id = ?").get(existing.id) as CustomerRecord
}

export function deleteCustomer(slugOrId: string): boolean {
  const db = getDb()
  const existing = getCustomerRecord(slugOrId)
  if (!existing) return false
  db.prepare("DELETE FROM customers WHERE id = ?").run(existing.id)
  return true
}

// --- services ---------------------------------------------------------------

export function mapService(row: ServiceRecord, locale: Locale = "en"): ServiceDTO {
  return {
    id: row.id,
    slug: row.slug,
    icon: row.icon,
    title: pick(row.title_en, row.title_ar, locale),
    description: pick(row.description_en, row.description_ar, locale),
    bullets: parseJSON<string[]>(pick(row.bullets_en, row.bullets_ar, locale), []),
    sortOrder: row.sort_order,
    status: row.status as Status,
  }
}

export function listServices(options: { locale?: Locale; status?: Status | "all" } = {}): ServiceDTO[] {
  const db = getDb()
  const status = options.status ?? "published"
  const filters: string[] = []
  const params: unknown[] = []
  if (status !== "all") {
    filters.push("status = ?")
    params.push(status)
  }
  const where = filters.length ? `WHERE ${filters.join(" AND ")}` : ""
  const rows = db
    .prepare(`SELECT * FROM services ${where} ORDER BY sort_order ASC`)
    .all(...params) as ServiceRecord[]
  return rows.map((r) => mapService(r, options.locale ?? "en"))
}

export function getServiceRecord(slugOrId: string): ServiceRecord | null {
  const db = getDb()
  return (db
    .prepare("SELECT * FROM services WHERE slug = ? OR id = ? LIMIT 1")
    .get(slugOrId, slugOrId) as ServiceRecord | undefined) ?? null
}

export type ServiceInput = Partial<Omit<ServiceRecord, "id" | "created_at" | "updated_at">> & {
  title_en: string
}

export function createService(input: ServiceInput): ServiceRecord {
  const db = getDb()
  const id = randomUUID()
  const slug = ensureUniqueSlug(db, "services", input.slug || slugify(input.title_en))
  db.prepare(
    `INSERT INTO services (id, slug, icon, title_en, title_ar, description_en, description_ar,
       bullets_en, bullets_ar, sort_order, status, created_at, updated_at)
     VALUES (@id,@slug,@icon,@title_en,@title_ar,@description_en,@description_ar,
       @bullets_en,@bullets_ar,@sort_order,@status,@created_at,@updated_at)`,
  ).run({
    id,
    slug,
    icon: input.icon ?? "Sparkles",
    title_en: input.title_en,
    title_ar: input.title_ar ?? "",
    description_en: input.description_en ?? "",
    description_ar: input.description_ar ?? "",
    bullets_en: input.bullets_en ?? "[]",
    bullets_ar: input.bullets_ar ?? "[]",
    sort_order: input.sort_order ?? 99,
    status: input.status ?? "published",
    created_at: now(),
    updated_at: now(),
  })
  return db.prepare("SELECT * FROM services WHERE id = ?").get(id) as ServiceRecord
}

export function updateService(slugOrId: string, input: Partial<ServiceRecord>): ServiceRecord | null {
  const db = getDb()
  const existing = getServiceRecord(slugOrId)
  if (!existing) return null
  const updatable: (keyof ServiceRecord)[] = [
    "slug",
    "icon",
    "title_en",
    "title_ar",
    "description_en",
    "description_ar",
    "bullets_en",
    "bullets_ar",
    "sort_order",
    "status",
  ]
  const sets: string[] = []
  const params: Record<string, unknown> = { id: existing.id, updated_at: now() }
  for (const key of updatable) {
    if (key in input) {
      let value: unknown = input[key]
      if (key === "slug" && typeof value === "string") {
        value = ensureUniqueSlug(db, "services", slugify(value), existing.id)
      }
      sets.push(`${key} = @${key}`)
      params[key] = value as unknown
    }
  }
  if (sets.length === 0) return existing
  db.prepare(`UPDATE services SET ${sets.join(", ")}, updated_at = @updated_at WHERE id = @id`).run(params)
  return db.prepare("SELECT * FROM services WHERE id = ?").get(existing.id) as ServiceRecord
}

export function deleteService(slugOrId: string): boolean {
  const db = getDb()
  const existing = getServiceRecord(slugOrId)
  if (!existing) return false
  db.prepare("DELETE FROM services WHERE id = ?").run(existing.id)
  return true
}

// --- partners ---------------------------------------------------------------

export function mapPartner(row: PartnerRecord, locale: Locale = "en"): PartnerDTO {
  return {
    id: row.id,
    name: pick(row.name_en, row.name_ar, locale),
    group: pick(row.group_en, row.group_ar, locale),
    type: pick(row.type_en, row.type_ar, locale),
    logo: row.logo_url,
    website: row.website_url,
    sortOrder: row.sort_order,
    status: row.status as Status,
  }
}

export function listPartners(options: { locale?: Locale; status?: Status | "all" } = {}): PartnerDTO[] {
  const db = getDb()
  const status = options.status ?? "published"
  const filters: string[] = []
  const params: unknown[] = []
  if (status !== "all") {
    filters.push("status = ?")
    params.push(status)
  }
  const where = filters.length ? `WHERE ${filters.join(" AND ")}` : ""
  const rows = db
    .prepare(`SELECT * FROM partners ${where} ORDER BY sort_order ASC`)
    .all(...params) as PartnerRecord[]
  return rows.map((r) => mapPartner(r, options.locale ?? "en"))
}

export type PartnerInput = Partial<Omit<PartnerRecord, "id" | "created_at">> & { name_en: string }

export function createPartner(input: PartnerInput): PartnerRecord {
  const db = getDb()
  const id = randomUUID()
  db.prepare(
    `INSERT INTO partners (id, name_en, name_ar, group_en, group_ar, type_en, type_ar, logo_url, website_url, sort_order, status, created_at)
     VALUES (@id,@name_en,@name_ar,@group_en,@group_ar,@type_en,@type_ar,@logo_url,@website_url,@sort_order,@status,@created_at)`,
  ).run({
    id,
    name_en: input.name_en,
    name_ar: input.name_ar ?? "",
    group_en: input.group_en ?? "Operators",
    group_ar: input.group_ar ?? "مشغّلون",
    type_en: input.type_en ?? "",
    type_ar: input.type_ar ?? "",
    logo_url: input.logo_url ?? null,
    website_url: input.website_url ?? null,
    sort_order: input.sort_order ?? 99,
    status: input.status ?? "published",
    created_at: now(),
  })
  return db.prepare("SELECT * FROM partners WHERE id = ?").get(id) as PartnerRecord
}

export function updatePartner(id: string, input: Partial<PartnerRecord>): PartnerRecord | null {
  const db = getDb()
  const existing = db.prepare("SELECT * FROM partners WHERE id = ?").get(id) as PartnerRecord | undefined
  if (!existing) return null
  const updatable: (keyof PartnerRecord)[] = [
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
  ]
  const sets: string[] = []
  const params: Record<string, unknown> = { id }
  for (const key of updatable) {
    if (key in input) {
      sets.push(`${key} = @${key}`)
      params[key] = input[key] as unknown
    }
  }
  if (sets.length === 0) return existing
  db.prepare(`UPDATE partners SET ${sets.join(", ")} WHERE id = @id`).run(params)
  return db.prepare("SELECT * FROM partners WHERE id = ?").get(id) as PartnerRecord
}

export function deletePartner(id: string): boolean {
  const db = getDb()
  const result = db.prepare("DELETE FROM partners WHERE id = ?").run(id)
  return result.changes > 0
}

// --- stats ------------------------------------------------------------------

export function mapStat(row: StatRecord, locale: Locale = "en"): StatDTO {
  return {
    id: row.id,
    slug: row.slug,
    value: row.value,
    suffix: pick(row.suffix_en, row.suffix_ar, locale),
    label: pick(row.label_en, row.label_ar, locale),
    helper: pick(row.helper_en, row.helper_ar, locale),
    sortOrder: row.sort_order,
  }
}

export function listStats(options: { locale?: Locale } = {}): StatDTO[] {
  const db = getDb()
  const rows = db.prepare("SELECT * FROM stats ORDER BY sort_order ASC").all() as StatRecord[]
  return rows.map((r) => mapStat(r, options.locale ?? "en"))
}

export type StatInput = Partial<Omit<StatRecord, "id" | "created_at">> & { label_en: string }

export function createStat(input: StatInput): StatRecord {
  const db = getDb()
  const id = randomUUID()
  const slug = ensureUniqueSlug(db, "stats", input.slug || slugify(input.label_en))
  db.prepare(
    `INSERT INTO stats (id, slug, value, suffix_en, suffix_ar, label_en, label_ar, helper_en, helper_ar, sort_order, created_at)
     VALUES (@id,@slug,@value,@suffix_en,@suffix_ar,@label_en,@label_ar,@helper_en,@helper_ar,@sort_order,@created_at)`,
  ).run({
    id,
    slug,
    value: input.value ?? 0,
    suffix_en: input.suffix_en ?? "",
    suffix_ar: input.suffix_ar ?? "",
    label_en: input.label_en,
    label_ar: input.label_ar ?? "",
    helper_en: input.helper_en ?? "",
    helper_ar: input.helper_ar ?? "",
    sort_order: input.sort_order ?? 99,
    created_at: now(),
  })
  return db.prepare("SELECT * FROM stats WHERE id = ?").get(id) as StatRecord
}

export function updateStat(id: string, input: Partial<StatRecord>): StatRecord | null {
  const db = getDb()
  const existing = db.prepare("SELECT * FROM stats WHERE id = ?").get(id) as StatRecord | undefined
  if (!existing) return null
  const updatable: (keyof StatRecord)[] = [
    "slug",
    "value",
    "suffix_en",
    "suffix_ar",
    "label_en",
    "label_ar",
    "helper_en",
    "helper_ar",
    "sort_order",
  ]
  const sets: string[] = []
  const params: Record<string, unknown> = { id }
  for (const key of updatable) {
    if (key in input) {
      let value: unknown = input[key]
      if (key === "slug" && typeof value === "string") {
        value = ensureUniqueSlug(db, "stats", slugify(value), id)
      }
      sets.push(`${key} = @${key}`)
      params[key] = value as unknown
    }
  }
  if (sets.length === 0) return existing
  db.prepare(`UPDATE stats SET ${sets.join(", ")} WHERE id = @id`).run(params)
  return db.prepare("SELECT * FROM stats WHERE id = ?").get(id) as StatRecord
}

export function deleteStat(id: string): boolean {
  const db = getDb()
  const result = db.prepare("DELETE FROM stats WHERE id = ?").run(id)
  return result.changes > 0
}

// --- contact messages -------------------------------------------------------

export function listMessages(options: { status?: "all" | "new" | "read" | "archived"; search?: string; limit?: number } = {}): ContactMessageRecord[] {
  const db = getDb()
  const filters: string[] = []
  const params: unknown[] = []
  const status = options.status ?? "all"
  if (status !== "all") {
    filters.push("status = ?")
    params.push(status)
  }
  if (options.search) {
    filters.push(
      "(LOWER(name) LIKE ? OR LOWER(email) LIKE ? OR LOWER(company) LIKE ? OR LOWER(subject) LIKE ?)",
    )
    const term = `%${options.search.toLowerCase()}%`
    params.push(term, term, term, term)
  }
  const where = filters.length ? `WHERE ${filters.join(" AND ")}` : ""
  let sql = `SELECT * FROM contact_messages ${where} ORDER BY created_at DESC`
  if (options.limit) sql += ` LIMIT ${Math.max(1, Math.floor(options.limit))}`
  return db.prepare(sql).all(...params) as ContactMessageRecord[]
}

export function getMessage(id: string): ContactMessageRecord | null {
  const db = getDb()
  return (db.prepare("SELECT * FROM contact_messages WHERE id = ?").get(id) as
    | ContactMessageRecord
    | undefined) ?? null
}

export type MessageInput = {
  name: string
  email: string
  phone?: string
  company?: string
  service?: string
  subject?: string
  message: string
}

export function createMessage(input: MessageInput): ContactMessageRecord {
  const db = getDb()
  const id = randomUUID()
  db.prepare(
    `INSERT INTO contact_messages (id, name, email, phone, company, service, subject, message, status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'new', ?)`,
  ).run(
    id,
    input.name,
    input.email,
    input.phone ?? "",
    input.company ?? "",
    input.service ?? "",
    input.subject ?? "Project brief",
    input.message,
    now(),
  )
  return db.prepare("SELECT * FROM contact_messages WHERE id = ?").get(id) as ContactMessageRecord
}

export function updateMessageStatus(id: string, status: "new" | "read" | "archived"): ContactMessageRecord | null {
  const db = getDb()
  const result = db.prepare("UPDATE contact_messages SET status = ? WHERE id = ?").run(status, id)
  if (result.changes === 0) return null
  return getMessage(id)
}

export function deleteMessage(id: string): boolean {
  const db = getDb()
  const r = db.prepare("DELETE FROM contact_messages WHERE id = ?").run(id)
  return r.changes > 0
}

// --- settings ---------------------------------------------------------------

export function getSettings(): SettingsDTO {
  const db = getDb()
  const rows = db.prepare("SELECT key, value FROM settings").all() as {
    key: string
    value: string
  }[]
  const out: SettingsDTO = {}
  for (const r of rows) out[r.key] = r.value
  return out
}

export function getSetting(key: string, fallback = ""): string {
  const db = getDb()
  const row = db.prepare("SELECT value FROM settings WHERE key = ?").get(key) as
    | { value: string }
    | undefined
  return row?.value ?? fallback
}

export function setSetting(key: string, value: string): void {
  const db = getDb()
  const updated = now()
  db.prepare(
    `INSERT INTO settings (key, value, updated_at)
     VALUES (?, ?, ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`,
  ).run(key, value, updated)
}

export function setSettings(values: Record<string, string>): void {
  const db = getDb()
  const stmt = db.prepare(
    `INSERT INTO settings (key, value, updated_at)
     VALUES (@key, @value, @updated_at)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`,
  )
  const trx = db.transaction((entries: { key: string; value: string }[]) => {
    const stamp = now()
    for (const e of entries) stmt.run({ key: e.key, value: e.value, updated_at: stamp })
  })
  trx(Object.entries(values).map(([key, value]) => ({ key, value })))
}

// --- pages ------------------------------------------------------------------

export function listPages(): PageRecord[] {
  const db = getDb()
  return db.prepare("SELECT * FROM pages ORDER BY key ASC").all() as PageRecord[]
}

export function getPage(key: string): PageRecord | null {
  const db = getDb()
  return (db.prepare("SELECT * FROM pages WHERE key = ?").get(key) as PageRecord | undefined) ?? null
}

export function upsertPage(input: { key: string; title_en?: string; title_ar?: string; status?: Status; sections?: string }): PageRecord {
  const db = getDb()
  const existing = getPage(input.key)
  const updated = now()
  if (existing) {
    const sets: string[] = ["updated_at = @updated_at"]
    const params: Record<string, unknown> = { key: input.key, updated_at: updated }
    if (input.title_en !== undefined) { sets.push("title_en = @title_en"); params.title_en = input.title_en }
    if (input.title_ar !== undefined) { sets.push("title_ar = @title_ar"); params.title_ar = input.title_ar }
    if (input.status !== undefined) { sets.push("status = @status"); params.status = input.status }
    if (input.sections !== undefined) { sets.push("sections = @sections"); params.sections = input.sections }
    db.prepare(`UPDATE pages SET ${sets.join(", ")} WHERE key = @key`).run(params)
  } else {
    db.prepare(
      "INSERT INTO pages (key, title_en, title_ar, status, sections, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
    ).run(
      input.key,
      input.title_en ?? input.key,
      input.title_ar ?? "",
      input.status ?? "published",
      input.sections ?? "[]",
      updated,
    )
  }
  return getPage(input.key) as PageRecord
}

// --- visits & analytics -----------------------------------------------------

export function trackVisit(path: string): void {
  const db = getDb()
  db.prepare("INSERT INTO visits (id, path, created_at) VALUES (?, ?, ?)").run(
    randomUUID(),
    path,
    now(),
  )
}

export function getDashboardSnapshot(): DashboardSnapshot {
  const db = getDb()

  const totalsRow = db
    .prepare(
      `SELECT
        (SELECT COUNT(*) FROM works) AS works,
        (SELECT COUNT(*) FROM works WHERE status = 'published') AS works_published,
        (SELECT COUNT(*) FROM works WHERE status = 'draft') AS works_draft,
        (SELECT COUNT(*) FROM news) AS news,
        (SELECT COUNT(*) FROM news WHERE status = 'published') AS news_published,
        (SELECT COUNT(*) FROM news WHERE status = 'draft') AS news_draft,
        (SELECT COUNT(*) FROM customers) AS customers,
        (SELECT COUNT(*) FROM customers WHERE tier = 'Enterprise') AS customers_enterprise,
        (SELECT COUNT(*) FROM services) AS services,
        (SELECT COUNT(*) FROM partners) AS partners,
        (SELECT COUNT(*) FROM stats) AS stats,
        (SELECT COUNT(*) FROM contact_messages) AS messages,
        (SELECT COUNT(*) FROM contact_messages WHERE status = 'new') AS messages_new,
        (SELECT COUNT(*) FROM contact_messages WHERE status = 'read') AS messages_read,
        (SELECT COUNT(*) FROM contact_messages WHERE status = 'archived') AS messages_archived`,
    )
    .get() as DashboardSnapshot["totals"]

  // Visits aggregated by date for last 30 days (we'll display 7 in the chart, but return 30 for completeness).
  const visitsByDay = db
    .prepare(
      `SELECT substr(created_at, 1, 10) AS date, COUNT(*) AS value
         FROM visits
        WHERE created_at >= datetime('now', '-30 day')
        GROUP BY substr(created_at, 1, 10)
        ORDER BY date ASC`,
    )
    .all() as { date: string; value: number }[]

  // 7-day windowed totals for change calc
  const currentWeek = db
    .prepare(
      "SELECT COUNT(*) AS c FROM visits WHERE created_at >= datetime('now', '-7 day')",
    )
    .get() as { c: number }
  const previousWeek = db
    .prepare(
      "SELECT COUNT(*) AS c FROM visits WHERE created_at >= datetime('now', '-14 day') AND created_at < datetime('now', '-7 day')",
    )
    .get() as { c: number }

  const change = previousWeek.c === 0 ? 0 : Math.round(((currentWeek.c - previousWeek.c) / previousWeek.c) * 1000) / 10

  const monthly = db
    .prepare(
      "SELECT COUNT(*) AS c FROM visits WHERE created_at >= datetime('now', '-30 day')",
    )
    .get() as { c: number }

  const topPages = db
    .prepare(
      `SELECT path, COUNT(*) AS visits FROM visits
         WHERE created_at >= datetime('now', '-30 day')
         GROUP BY path
         ORDER BY visits DESC
         LIMIT 6`,
    )
    .all() as { path: string; visits: number }[]

  const recentMessages = db
    .prepare(
      "SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 6",
    )
    .all() as ContactMessageRecord[]

  const recentWorks = db
    .prepare(
      "SELECT id, slug, title_en, status, updated_at, views FROM works ORDER BY updated_at DESC LIMIT 6",
    )
    .all() as { id: string; slug: string; title_en: string; status: Status; updated_at: string; views: number }[]

  const recentNews = db
    .prepare(
      "SELECT id, slug, title_en, status, updated_at, views FROM news ORDER BY updated_at DESC LIMIT 6",
    )
    .all() as { id: string; slug: string; title_en: string; status: Status; updated_at: string; views: number }[]

  const avgHealthRow = db
    .prepare("SELECT IFNULL(AVG(health_score), 0) AS avg FROM customers")
    .get() as { avg: number }

  // Health metrics — calculated from data
  const arabicCoverage = db
    .prepare(
      `SELECT
        (CAST(SUM(CASE WHEN title_ar != '' THEN 1 ELSE 0 END) AS REAL) /
         CASE WHEN COUNT(*) = 0 THEN 1 ELSE COUNT(*) END) AS coverage
         FROM (
            SELECT title_ar FROM works
            UNION ALL
            SELECT title_ar FROM news
            UNION ALL
            SELECT title_ar FROM services
            UNION ALL
            SELECT name_ar AS title_ar FROM customers
         )`,
    )
    .get() as { coverage: number | null }

  const imageCoverage = db
    .prepare(
      `SELECT
        (CAST(SUM(CASE WHEN cover_image != '' THEN 1 ELSE 0 END) AS REAL) /
         CASE WHEN COUNT(*) = 0 THEN 1 ELSE COUNT(*) END) AS coverage
         FROM (SELECT cover_image FROM works UNION ALL SELECT cover_image FROM news)`,
    )
    .get() as { coverage: number | null }

  const publishRate = db
    .prepare(
      `SELECT
        (CAST(SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END) AS REAL) /
         CASE WHEN COUNT(*) = 0 THEN 1 ELSE COUNT(*) END) AS rate
         FROM (
            SELECT status FROM works
            UNION ALL
            SELECT status FROM news
            UNION ALL
            SELECT status FROM customers
            UNION ALL
            SELECT status FROM services
         )`,
    )
    .get() as { rate: number | null }

  // SEO metadata = how many works/news have excerpts + content
  const seoCoverage = db
    .prepare(
      `SELECT
        (CAST(SUM(CASE WHEN excerpt_en != '' AND content_en != '[]' THEN 1 ELSE 0 END) AS REAL) /
         CASE WHEN COUNT(*) = 0 THEN 1 ELSE COUNT(*) END) AS coverage
         FROM (SELECT excerpt_en, content_en FROM works UNION ALL SELECT excerpt_en, content_en FROM news)`,
    )
    .get() as { coverage: number | null }

  // total fibre km from stats
  const fibreRow = db.prepare("SELECT value FROM stats WHERE slug = 'fibre-laid'").get() as { value: number } | undefined

  // completion rate = first-time-pass
  const firstPassRow = db.prepare("SELECT value FROM stats WHERE slug = 'first-time-pass'").get() as { value: number } | undefined

  return {
    totals: totalsRow,
    metrics: {
      monthly_visits: monthly.c,
      monthly_visits_change_pct: change,
      avg_health: Math.round(avgHealthRow.avg),
      fibre_km: fibreRow?.value ?? 0,
      completion_rate: firstPassRow?.value ?? 0,
    },
    visits_by_day: visitsByDay.slice(-7).map((row) => {
      const d = new Date(row.date)
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      return { day: dayNames[d.getUTCDay()], date: row.date, value: row.value }
    }),
    top_pages: topPages,
    recent_messages: recentMessages,
    recent_works: recentWorks,
    recent_news: recentNews,
    health: {
      seo_metadata_pct: Math.round((seoCoverage.coverage ?? 0) * 100),
      arabic_coverage_pct: Math.round((arabicCoverage.coverage ?? 0) * 100),
      image_coverage_pct: Math.round((imageCoverage.coverage ?? 0) * 100),
      publish_rate_pct: Math.round((publishRate.rate ?? 0) * 100),
    },
  }
}

// --- export helpers ---------------------------------------------------------

export { slugify }
