import { ImageResponse } from "next/og"
import { getSettings } from "@/lib/db/queries"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export const alt = "Fiber City — Fiber Optic Infrastructure in Egypt"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/**
 * Default OpenGraph image rendered with `next/og`.
 *
 * Uses brand colours, the wordmark, and the active tagline from the DB so
 * social shares always reflect the latest content.
 */
export default async function OpenGraphImage() {
  const settings = getSettings()
  const tagline = settings["brand.tagline_en"] || "Light moves through glass. We move it across Egypt."
  const headline = settings["seo.defaultTitle_en"] || "Fiber Optic Infrastructure"

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(circle at 20% 30%, #0c2438 0%, #07101b 60%, #050a13 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background:
                "linear-gradient(135deg, #1A9FD4 0%, #0A6E97 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 800,
              fontSize: 28,
              letterSpacing: "-0.02em",
            }}
          >
            FC
          </div>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <div style={{ display: "flex", fontSize: 28, fontWeight: 800, letterSpacing: "-0.01em" }}>
              <span>FIBER</span>
              <span style={{ color: "#1A9FD4" }}>/</span>
              <span>CITY</span>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 8,
                fontSize: 14,
                color: "#8AA0B8",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
              }}
            >
              Optical Infrastructure · Egypt
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#ffffff",
              maxWidth: 950,
            }}
          >
            {headline}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 28,
              color: "#B6CADD",
              lineHeight: 1.3,
              maxWidth: 900,
            }}
          >
            {tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#5A7392",
            fontSize: 18,
            fontFamily: "ui-monospace, monospace",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex" }}>FTTX · GPON · DWDM · OTDR</div>
          <div style={{ display: "flex" }}>fibercity.eg</div>
        </div>
      </div>
    ),
    { ...size },
  )
}
