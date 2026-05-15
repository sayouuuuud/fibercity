import "server-only"
import { getSettings } from "@/lib/db/queries"
import type { Locale } from "@/lib/db/types"

export interface SiteConfig {
  url: string
  name: string
  legalName: string
  description: string
  title: string
  keywords: string[]
  ogImage: string
  twitterHandle: string
  author: string
  foundingYear: string
  locale: Locale
  alternateLocale: Locale
  phone: string
  email: string
  address: string
  socials: { linkedin?: string; x?: string; youtube?: string }
  verification: { google?: string; bing?: string }
}

const DEFAULT_URL = "https://fibercity.eg"

function getEnvSiteUrl(): string | undefined {
  // Prefer explicit env override (production builds set NEXT_PUBLIC_SITE_URL).
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL
  if (envUrl && envUrl.startsWith("http")) return envUrl
  return undefined
}

export function getSiteConfig(locale: Locale = "en"): SiteConfig {
  const s = getSettings()
  const isAr = locale === "ar"
  const url = getEnvSiteUrl() ?? s["seo.siteUrl"] ?? DEFAULT_URL

  return {
    url: url.replace(/\/$/, ""),
    name: (isAr ? s["brand.name_ar"] : s["brand.name_en"]) || "Fiber City",
    legalName: s["brand.name_en"] || "Fiber City Egypt",
    description:
      (isAr ? s["seo.defaultDescription_ar"] : s["seo.defaultDescription_en"]) ||
      "Fiber City designs, supplies, installs and maintains fiber optic networks across Egypt.",
    title:
      (isAr ? s["seo.defaultTitle_ar"] : s["seo.defaultTitle_en"]) ||
      "Fiber City — Fiber Optic Infrastructure in Egypt",
    keywords: ((isAr ? s["seo.keywords_ar"] : s["seo.keywords_en"]) || "")
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
    ogImage: s["seo.ogImage"] || "/og.png",
    twitterHandle: s["seo.twitterHandle"] || "@fibercity",
    author: s["seo.author"] || "Fiber City Engineering",
    foundingYear: s["seo.foundingYear"] || "2014",
    locale,
    alternateLocale: isAr ? "en" : "ar",
    phone: s["contact.phone"] || "",
    email: s["contact.email"] || "",
    address: (isAr ? s["contact.address_ar"] : s["contact.address_en"]) || "",
    socials: {
      linkedin: s["social.linkedin"],
      x: s["social.x"],
      youtube: s["social.youtube"],
    },
    verification: {
      google: s["seo.googleSiteVerification"] || undefined,
      bing: s["seo.bingSiteVerification"] || undefined,
    },
  }
}

export function absoluteUrl(path: string, baseUrl?: string): string {
  const base = (baseUrl ?? getEnvSiteUrl() ?? DEFAULT_URL).replace(/\/$/, "")
  if (!path) return base
  if (path.startsWith("http")) return path
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`
}
