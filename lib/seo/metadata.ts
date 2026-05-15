import "server-only"
import type { Metadata } from "next"
import { getSiteConfig, absoluteUrl } from "./site"
import type { Locale } from "@/lib/db/types"

export interface BuildMetadataInput {
  locale: Locale
  path: string
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  imageAlt?: string
  type?: "website" | "article"
  noIndex?: boolean
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
}

/**
 * Build a fully-populated Next.js Metadata object for a page.
 *
 * - Sets canonical to the locale-appropriate URL
 * - Provides hreflang `alternates.languages` for /en + /ar
 * - Fills OpenGraph + Twitter cards
 * - Inherits site-wide defaults (title, description, image, keywords)
 */
export function buildPageMetadata(input: BuildMetadataInput): Metadata {
  const site = getSiteConfig(input.locale)
  const path = input.path.startsWith("/") ? input.path : `/${input.path}`
  const canonical = absoluteUrl(path, site.url)

  // If the page already pre-formatted the title with the site name (e.g. the
  // homepage uses "Fiber City — …"), don't append the brand again. Otherwise
  // append " — <brand>" so detail pages all share a consistent suffix.
  const incoming = input.title?.trim()
  const titleHasBrand = incoming
    ? incoming.toLowerCase().includes(site.name.toLowerCase())
    : false
  const title = incoming
    ? titleHasBrand
      ? incoming
      : `${incoming} — ${site.name}`
    : site.title
  const description = input.description || site.description
  const keywords = input.keywords?.length ? input.keywords : site.keywords
  const image = input.image ? absoluteUrl(input.image, site.url) : absoluteUrl(site.ogImage, site.url)
  const imageAlt = input.imageAlt || site.name

  return {
    metadataBase: new URL(site.url),
    title,
    description,
    keywords,
    applicationName: site.name,
    authors: (input.authors || [site.author]).map((name) => ({ name })),
    generator: site.name,
    creator: site.author,
    publisher: site.legalName,
    robots: input.noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-video-preview": -1,
            "max-snippet": -1,
          },
        },
    alternates: {
      canonical,
      languages: {
        "en-EG": absoluteUrl(path, site.url),
        "ar-EG": absoluteUrl(path, site.url),
        "x-default": absoluteUrl(path, site.url),
      },
    },
    openGraph: {
      type: input.type || "website",
      title,
      description,
      url: canonical,
      siteName: site.name,
      locale: input.locale === "ar" ? "ar_EG" : "en_EG",
      alternateLocale: input.locale === "ar" ? ["en_EG"] : ["ar_EG"],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
      ...(input.type === "article"
        ? {
            publishedTime: input.publishedTime,
            modifiedTime: input.modifiedTime,
            authors: input.authors,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: site.twitterHandle,
      creator: site.twitterHandle,
      images: [image],
    },
    icons: {
      icon: [
        { url: "/icon.png", type: "image/png" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      apple: [{ url: "/apple-icon.png", type: "image/png" }],
    },
    verification: {
      google: site.verification.google || undefined,
      other: site.verification.bing
        ? { "msvalidate.01": site.verification.bing }
        : undefined,
    },
    category: "Telecommunications",
  }
}
