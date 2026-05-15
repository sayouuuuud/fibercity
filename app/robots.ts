import type { MetadataRoute } from "next"
import { getSiteConfig } from "@/lib/seo/site"

export const dynamic = "force-static"

export default function robots(): MetadataRoute.Robots {
  const site = getSiteConfig("en")
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/admin", "/admin/*", "/api", "/api/*", "/_next/", "/private/"],
      },
      {
        // Be explicit for the big crawlers.
        userAgent: ["Googlebot", "Bingbot", "DuckDuckBot"],
        allow: ["/"],
        disallow: ["/admin", "/admin/*", "/api", "/api/*"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  }
}
