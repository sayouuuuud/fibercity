import type { MetadataRoute } from "next"
import { listNews, listWorks, listServices } from "@/lib/db/queries"
import { getSiteConfig } from "@/lib/seo/site"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

/**
 * Sitemap is generated dynamically from the database so every published
 * work / news item / service appears automatically. Each entry advertises
 * the EN and AR alternates via `alternates.languages`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteConfig("en")
  const base = site.url
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/work", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/news", priority: 0.85, changeFrequency: "weekly" as const },
    { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
  ].map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
    alternates: {
      languages: {
        "en-EG": `${base}${r.path}`,
        "ar-EG": `${base}${r.path}`,
        "x-default": `${base}${r.path}`,
      },
    },
  }))

  let dynamicRoutes: MetadataRoute.Sitemap = []
  try {
    const works = listWorks({ status: "published" })
    const news = listNews({ status: "published" })
    const services = listServices({ status: "published" })

    const workRoutes: MetadataRoute.Sitemap = works.map((w) => ({
      url: `${base}/work/${w.slug}`,
      lastModified: w.updatedAt ? new Date(w.updatedAt) : now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
      alternates: {
        languages: {
          "en-EG": `${base}/work/${w.slug}`,
          "ar-EG": `${base}/work/${w.slug}`,
          "x-default": `${base}/work/${w.slug}`,
        },
      },
    }))
    const newsRoutes: MetadataRoute.Sitemap = news.map((n) => ({
      url: `${base}/news/${n.slug}`,
      lastModified: n.updatedAt ? new Date(n.updatedAt) : now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
      alternates: {
        languages: {
          "en-EG": `${base}/news/${n.slug}`,
          "ar-EG": `${base}/news/${n.slug}`,
          "x-default": `${base}/news/${n.slug}`,
        },
      },
    }))
    const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
      url: `${base}/#services-${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
    dynamicRoutes = [...workRoutes, ...newsRoutes, ...serviceRoutes]
  } catch (error) {
    console.error("[sitemap] failed to fetch dynamic routes", error)
  }

  return [...staticRoutes, ...dynamicRoutes]
}
