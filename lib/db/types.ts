// Shared DB / API types.
// All "content" entities expose bilingual fields and a public/admin payload.

export type Locale = "en" | "ar"

export type Status = "draft" | "published"

export type Tier = "Enterprise" | "Growth" | "Starter"

export type MessageStatus = "new" | "read" | "archived"

export type WorkCategory = "Installation" | "Design" | "Maintenance" | "Supply"

export type WorkRecord = {
  id: string
  slug: string
  title_en: string
  title_ar: string
  excerpt_en: string
  excerpt_ar: string
  content_en: string // JSON array stringified
  content_ar: string
  cover_image: string
  gallery: string // JSON array stringified
  category: WorkCategory
  client: string
  location_en: string
  location_ar: string
  year: string
  stats: string // JSON array stringified
  status: Status
  sort_order: number
  views: number
  created_at: string
  updated_at: string
}

export type NewsRecord = {
  id: string
  slug: string
  title_en: string
  title_ar: string
  excerpt_en: string
  excerpt_ar: string
  content_en: string // JSON array stringified
  content_ar: string
  cover_image: string
  category_en: string
  category_ar: string
  author: string
  read_minutes: number
  status: Status
  published_at: string
  views: number
  created_at: string
  updated_at: string
}

export type CustomerRecord = {
  id: string
  slug: string
  name_en: string
  name_ar: string
  industry_en: string
  industry_ar: string
  tier: Tier
  region_en: string
  region_ar: string
  description_en: string
  description_ar: string
  logo_url: string | null
  since: string
  projects_count: number
  health_score: number
  contact_name: string
  contact_email: string
  contact_phone: string
  featured: number // 0 or 1
  status: Status
  created_at: string
  updated_at: string
}

export type ServiceRecord = {
  id: string
  slug: string
  icon: string
  title_en: string
  title_ar: string
  description_en: string
  description_ar: string
  bullets_en: string // JSON array stringified
  bullets_ar: string
  sort_order: number
  status: Status
  created_at: string
  updated_at: string
}

export type PartnerRecord = {
  id: string
  name_en: string
  name_ar: string
  group_en: string
  group_ar: string
  type_en: string
  type_ar: string
  logo_url: string | null
  website_url: string | null
  sort_order: number
  status: Status
  created_at: string
}

export type StatRecord = {
  id: string
  slug: string
  value: number
  suffix_en: string
  suffix_ar: string
  label_en: string
  label_ar: string
  helper_en: string
  helper_ar: string
  sort_order: number
  created_at: string
}

export type ContactMessageRecord = {
  id: string
  name: string
  email: string
  phone: string
  company: string
  service: string
  subject: string
  message: string
  status: MessageStatus
  created_at: string
}

export type SettingRecord = {
  key: string
  value: string
  updated_at: string
}

export type PageRecord = {
  key: string
  title_en: string
  title_ar: string
  status: Status
  sections: string // JSON array stringified
  updated_at: string
}

export type VisitRecord = {
  id: string
  path: string
  created_at: string
}

// Public-facing localized DTOs (resolved to single locale)

export type WorkDTO = {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string[]
  client: string
  category: WorkCategory
  location: string
  year: string
  image: string
  gallery: string[]
  stats: { label: string; value: string }[]
  status: Status
  views: number
  sortOrder: number
  updatedAt: string
}

export type NewsDTO = {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string[]
  category: string
  author: string
  date: string
  readMinutes: number
  image: string
  status: Status
  views: number
  updatedAt: string
}

export type CustomerDTO = {
  id: string
  slug: string
  name: string
  industry: string
  tier: Tier
  region: string
  description: string
  logo: string | null
  since: string
  projectsCount: number
  healthScore: number
  contact: string
  email: string
  phone: string
  featured: boolean
  status: Status
  updatedAt: string
}

export type ServiceDTO = {
  id: string
  slug: string
  icon: string
  title: string
  description: string
  bullets: string[]
  sortOrder: number
  status: Status
}

export type PartnerDTO = {
  id: string
  name: string
  group: string
  type: string
  logo: string | null
  website: string | null
  sortOrder: number
  status: Status
}

export type StatDTO = {
  id: string
  slug: string
  value: number
  suffix: string
  label: string
  helper: string
  sortOrder: number
}

export type SettingsDTO = Record<string, string>

export type DashboardSnapshot = {
  totals: {
    works: number
    works_published: number
    works_draft: number
    news: number
    news_published: number
    news_draft: number
    customers: number
    customers_enterprise: number
    services: number
    partners: number
    stats: number
    messages: number
    messages_new: number
    messages_read: number
    messages_archived: number
  }
  metrics: {
    monthly_visits: number
    monthly_visits_change_pct: number
    avg_health: number
    fibre_km: number
    completion_rate: number
  }
  visits_by_day: { day: string; date: string; value: number }[]
  top_pages: { path: string; visits: number }[]
  recent_messages: ContactMessageRecord[]
  recent_works: { id: string; slug: string; title_en: string; status: Status; updated_at: string; views: number }[]
  recent_news: { id: string; slug: string; title_en: string; status: Status; updated_at: string; views: number }[]
  health: {
    seo_metadata_pct: number
    arabic_coverage_pct: number
    image_coverage_pct: number
    publish_rate_pct: number
  }
}
