import "server-only"
import { getSiteConfig, absoluteUrl } from "./site"
import type { Locale } from "@/lib/db/types"
import type { NewsDTO, ServiceDTO, WorkDTO } from "@/lib/db/types"

type JsonLd = Record<string, unknown>

/**
 * The site itself. Stamped on every page of the site.
 * (We render it from layout.tsx so search engines always see it.)
 */
export function organizationLd(locale: Locale): JsonLd {
  const site = getSiteConfig(locale)
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}#organization`,
    name: site.name,
    legalName: site.legalName,
    alternateName: locale === "ar" ? "Fiber City" : "فايبر سيتي",
    url: site.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/logo-fc.png", site.url),
      width: 512,
      height: 512,
    },
    image: absoluteUrl(site.ogImage, site.url),
    foundingDate: site.foundingYear,
    description: site.description,
    email: site.email,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: "Cairo",
      addressCountry: "EG",
    },
    areaServed: {
      "@type": "Country",
      name: "Egypt",
    },
    sameAs: [site.socials.linkedin, site.socials.x, site.socials.youtube].filter(Boolean),
    knowsAbout: [
      "Fiber optic infrastructure",
      "FTTX deployment",
      "GPON",
      "OTDR testing",
      "Fusion splicing",
      "Network design",
      "Telecom engineering",
    ],
    naics: "517311",
  }
}

/**
 * Website object — gives Google the Sitelinks search box if we wire it later.
 */
export function websiteLd(locale: Locale): JsonLd {
  const site = getSiteConfig(locale)
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: locale === "ar" ? "ar-EG" : "en-EG",
    publisher: { "@id": `${site.url}#organization` },
  }
}

/**
 * Breadcrumb trail. Items is an array of `{ name, path }` from root → leaf.
 */
export function breadcrumbLd(
  locale: Locale,
  items: { name: string; path: string }[],
): JsonLd {
  const site = getSiteConfig(locale)
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: absoluteUrl(item.path, site.url),
    })),
  }
}

/**
 * Article — for /news/[id] pages.
 */
export function newsArticleLd(locale: Locale, news: NewsDTO): JsonLd {
  const site = getSiteConfig(locale)
  const url = absoluteUrl(`/news/${news.slug}`, site.url)
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${url}#article`,
    mainEntityOfPage: url,
    headline: news.title,
    description: news.excerpt,
    image: news.image ? [absoluteUrl(news.image, site.url)] : [absoluteUrl(site.ogImage, site.url)],
    datePublished: news.date,
    dateModified: news.updatedAt,
    author: {
      "@type": "Organization",
      name: news.author || site.author,
    },
    publisher: { "@id": `${site.url}#organization` },
    inLanguage: locale === "ar" ? "ar-EG" : "en-EG",
    isAccessibleForFree: true,
    articleSection: news.category,
  }
}

/**
 * Service — for /api/services and the /#services section.
 */
export function serviceLd(locale: Locale, service: ServiceDTO): JsonLd {
  const site = getSiteConfig(locale)
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}/services/${service.slug}`,
    name: service.title,
    description: service.description,
    serviceType: service.title,
    provider: { "@id": `${site.url}#organization` },
    areaServed: {
      "@type": "Country",
      name: "Egypt",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.title,
      itemListElement: service.bullets.map((feature, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: feature,
      })),
    },
  }
}

/**
 * CreativeWork — for /work/[id] case studies.
 */
export function workLd(locale: Locale, work: WorkDTO): JsonLd {
  const site = getSiteConfig(locale)
  const url = absoluteUrl(`/work/${work.slug}`, site.url)
  return {
    "@context": "https://schema.org",
    "@type": "Project",
    "@id": `${url}#project`,
    name: work.title,
    description: work.excerpt,
    image: work.image ? absoluteUrl(work.image, site.url) : absoluteUrl(site.ogImage, site.url),
    url,
    inLanguage: locale === "ar" ? "ar-EG" : "en-EG",
    creator: { "@id": `${site.url}#organization` },
    locationCreated: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: work.location || "Cairo",
        addressCountry: "EG",
      },
    },
    dateCreated: work.year,
    dateModified: work.updatedAt,
    keywords: [work.category, work.client].filter(Boolean).join(", "),
  }
}

/**
 * Local business — improves local map / knowledge panel results.
 */
export function localBusinessLd(locale: Locale): JsonLd {
  const site = getSiteConfig(locale)
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}#localBusiness`,
    name: site.name,
    image: absoluteUrl("/logo-fc.png", site.url),
    url: site.url,
    telephone: site.phone,
    email: site.email,
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: "Cairo",
      addressCountry: "EG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 30.0444,
      longitude: 31.2357,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    areaServed: { "@type": "Country", name: "Egypt" },
  }
}

/**
 * Serialise an LD object into a JSON string safe for `<script type="application/ld+json">`.
 * Escapes `</` so it cannot break out of the tag.
 */
export function ldJson(data: JsonLd | JsonLd[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c")
}
