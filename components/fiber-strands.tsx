"use client"

import { useId } from "react"
import { cn } from "@/lib/utils"

type Variant = "hero" | "divider" | "corner" | "ambient"

export function FiberStrands({
  variant = "ambient",
  className,
  density = 6,
}: {
  variant?: Variant
  className?: string
  density?: number
}) {
  const uid = useId().replace(/:/g, "")
  const gradId = `fc-grad-${uid}`
  const glowId = `fc-glow-${uid}`

  // Procedurally generate elegant curves
  const strands = Array.from({ length: density }).map((_, i) => {
    const seed = i / Math.max(density - 1, 1)
    if (variant === "hero") {
      const y1 = 120 + seed * 360
      const y2 = 80 + (1 - seed) * 380
      const cx1 = 280 + seed * 120
      const cx2 = 920 - seed * 140
      return `M -40 ${y1} C ${cx1} ${y1 - 60}, ${cx2} ${y2 + 80}, 1240 ${y2}`
    }
    if (variant === "divider") {
      const y = 28 + seed * 24
      return `M -20 ${y + Math.sin(seed * 6) * 10} C 320 ${y - 18}, 760 ${y + 22}, 1240 ${y - Math.cos(seed * 5) * 8}`
    }
    if (variant === "corner") {
      return `M ${-20 + seed * 20} ${20 + seed * 30} Q ${120 + seed * 60} ${
        80 + seed * 30
      }, ${280 + seed * 30} ${260 - seed * 40}`
    }
    // ambient
    const start = -40
    const end = 1240
    const y = 60 + seed * 380
    return `M ${start} ${y} C 320 ${y - 70 + seed * 30}, 760 ${y + 90 - seed * 40}, ${end} ${y - 20 + seed * 50}`
  })

  const viewBox =
    variant === "divider"
      ? "0 0 1200 60"
      : variant === "corner"
      ? "0 0 320 320"
      : "0 0 1200 480"

  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none select-none", className)}
      viewBox={viewBox}
      preserveAspectRatio={variant === "corner" ? "xMidYMid meet" : "none"}
      fill="none"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="oklch(0.18 0.035 250)" stopOpacity="0" />
          <stop offset="20%" stopColor="oklch(0.18 0.035 250)" stopOpacity="0.85" />
          <stop offset="50%" stopColor="oklch(0.66 0.13 230)" stopOpacity="1" />
          <stop offset="80%" stopColor="oklch(0.18 0.035 250)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="oklch(0.18 0.035 250)" stopOpacity="0" />
        </linearGradient>
        <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {strands.map((d, i) => (
        <g key={i}>
          {/* The thin ink hairline */}
          <path
            d={d}
            stroke={`url(#${gradId})`}
            strokeWidth={i % 3 === 0 ? 0.7 : 0.45}
            className={variant === "ambient" ? "strand-pulse" : "strand-draw"}
            style={{ animationDelay: `${i * 120}ms` }}
            filter={`url(#${glowId})`}
          />
          {/* Cyan light dot traveling along the strand */}
          {variant !== "corner" && (
            <circle
              r="2.4"
              fill="oklch(0.66 0.13 230)"
              filter={`url(#${glowId})`}
              style={{
                offsetPath: `path('${d}')`,
                animation: `lightDot ${7 + (i % 4)}s linear infinite`,
                animationDelay: `${i * 600}ms`,
                opacity: 0,
              }}
            />
          )}
        </g>
      ))}
    </svg>
  )
}
