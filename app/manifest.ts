import type { MetadataRoute } from "next"
import { getSiteConfig } from "@/lib/seo/site"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export default function manifest(): MetadataRoute.Manifest {
  const site = getSiteConfig("en")
  return {
    name: site.name,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0B1220",
    theme_color: "#1A9FD4",
    orientation: "portrait-primary",
    lang: "en-EG",
    dir: "ltr",
    categories: ["business", "engineering", "telecommunications"],
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/logo-fc.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  }
}
