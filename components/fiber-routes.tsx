"use client"

import { useEffect, useId, useRef, useState } from "react"

/**
 * SVG layer that draws a set of curved fiber-optic "routes" snaking from
 * the left edge of the hero, threading under/through the headline rows,
 * and converging into the fiber endface circle on the right side.
 *
 * Each path is rendered three times:
 *   1. A faint static hairline (the glass strand itself).
 *   2. A glowing primary stroke under-layer.
 *   3. A bright moving "light packet" implemented with stroke-dasharray
 *      + animated stroke-dashoffset.
 *
 * The component uses a 1600x900 viewBox with preserveAspectRatio="none"
 * so it stretches to fill its parent. Routes are tuned so they pass
 * approximately through the rows of a 4-line headline (left col) and
 * end inside the endface (right col).
 */
export function FiberRoutes() {
  const ref = useRef<SVGSVGElement>(null)
  const id = useId().replace(/:/g, "")
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  // Endface convergence point (right column center) in viewBox units
  const ex = 1230
  const ey = 470

  // Routes: each enters from the left edge at a different y, curves
  // through the headline rows on the left half, then converges into the
  // endface on the right.
  // Headline rows roughly at y = 230, 340, 450, 560
  const routes: { d: string; delay: number; dur: number; hue: number }[] = [
    {
      // Row 1 — "Light moves"
      d: `M -40 220
          C 200 200, 360 240, 540 230
          S 820 250, 980 320
          S 1160 420, ${ex} ${ey}`,
      delay: 0,
      dur: 4.2,
      hue: 230,
    },
    {
      // Row 2 — "through glass."
      d: `M -40 340
          C 220 320, 420 360, 620 345
          S 880 335, 1020 380
          S 1170 440, ${ex} ${ey}`,
      delay: 0.6,
      dur: 4.6,
      hue: 220,
    },
    {
      // Row 3 — "We move it"
      d: `M -40 460
          C 200 470, 380 450, 560 460
          S 820 470, 980 470
          S 1140 470, ${ex} ${ey}`,
      delay: 1.2,
      dur: 5.0,
      hue: 230,
    },
    {
      // Row 4 — "across Egypt."
      d: `M -40 580
          C 220 590, 400 570, 600 580
          S 860 600, 1020 560
          S 1170 510, ${ex} ${ey}`,
      delay: 1.8,
      dur: 5.4,
      hue: 200,
    },
    // Two extra ambient routes top/bottom for density
    {
      d: `M -40 90
          C 280 100, 520 140, 760 170
          S 1080 230, ${ex} ${ey}`,
      delay: 2.4,
      dur: 6.2,
      hue: 220,
    },
    {
      d: `M -40 760
          C 260 740, 480 720, 720 700
          S 1040 600, ${ex} ${ey}`,
      delay: 3.0,
      dur: 6.6,
      hue: 230,
    },
  ]

  return (
    <svg
      ref={ref}
      viewBox="0 0 1600 900"
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`endface-glow-${id}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="oklch(0.78 0.16 220)" stopOpacity="0.55" />
          <stop offset="60%" stopColor="oklch(0.66 0.13 230)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="oklch(0.66 0.13 230)" stopOpacity="0" />
        </radialGradient>
        <filter id={`soft-glow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* halo behind the endface where all routes converge */}
      <circle
        cx={ex}
        cy={ey}
        r="180"
        fill={`url(#endface-glow-${id})`}
        opacity="0.7"
      />

      {routes.map((r, i) => (
        <g key={i}>
          {/* faint static glass strand */}
          <path
            d={r.d}
            fill="none"
            stroke="oklch(0.18 0.025 250)"
            strokeOpacity="0.10"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          {/* primary tinted glow under-layer */}
          <path
            d={r.d}
            fill="none"
            stroke="oklch(0.66 0.13 230)"
            strokeOpacity="0.35"
            strokeWidth="1.2"
            strokeLinecap="round"
            filter={`url(#soft-glow-${id})`}
          />
          {/* moving bright packet */}
          {!reduced && (
            <path
              d={r.d}
              fill="none"
              stroke={`oklch(0.95 0.06 ${r.hue})`}
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeDasharray="60 1800"
              filter={`url(#soft-glow-${id})`}
              style={{
                animation: `route-flow-${id} ${r.dur}s linear ${r.delay}s infinite`,
              }}
            />
          )}
        </g>
      ))}

      <style>{`
        @keyframes route-flow-${id} {
          0%   { stroke-dashoffset: 1860; opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
      `}</style>
    </svg>
  )
}
