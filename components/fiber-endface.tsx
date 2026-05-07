"use client"

import { useEffect, useRef } from "react"

/**
 * Fiber Optic Endface — a canvas-rendered cross-section of a fiber
 * bundle. Hundreds of glowing fiber cores arranged in concentric
 * hexagonal rings, each pulsing with cyan light. This is the iconic
 * "looking down the barrel of a fiber cable" visual.
 */
export function FiberEndface() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0
    let width = 0
    let height = 0
    let dpr = 1

    type Core = {
      x: number
      y: number
      r: number
      // base brightness 0..1
      base: number
      // animation phase
      phase: number
      // animation speed
      speed: number
      // hue (cyan range)
      hue: number
      // distance from center (0..1)
      dist: number
    }

    let cores: Core[] = []
    let cx = 0
    let cy = 0
    let radius = 0

    const setup = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      cx = width / 2
      cy = height / 2
      radius = Math.min(width, height) * 0.46

      cores = []

      // Hexagonal packing of fiber cores inside a circle
      const coreRadius = Math.max(2.4, Math.min(width, height) * 0.011)
      const spacing = coreRadius * 2.55
      const rings = Math.floor(radius / spacing) + 1

      // center core
      cores.push({
        x: cx,
        y: cy,
        r: coreRadius,
        base: 0.6 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.8,
        hue: 200 + Math.random() * 30,
        dist: 0,
      })

      for (let ring = 1; ring <= rings; ring++) {
        const count = ring * 6
        for (let i = 0; i < count; i++) {
          const side = Math.floor(i / ring)
          const t = (i % ring) / ring
          // hexagon corner positions
          const a1 = (side / 6) * Math.PI * 2
          const a2 = ((side + 1) / 6) * Math.PI * 2
          const x1 = cx + Math.cos(a1) * spacing * ring
          const y1 = cy + Math.sin(a1) * spacing * ring
          const x2 = cx + Math.cos(a2) * spacing * ring
          const y2 = cy + Math.sin(a2) * spacing * ring
          const x = x1 + (x2 - x1) * t
          const y = y1 + (y2 - y1) * t
          const dist = Math.hypot(x - cx, y - cy) / radius
          if (dist > 1.0) continue
          cores.push({
            x,
            y,
            r: coreRadius,
            base: 0.4 + Math.random() * 0.6,
            phase: Math.random() * Math.PI * 2,
            speed: 0.3 + Math.random() * 1.2,
            hue: 200 + Math.random() * 30,
            dist,
          })
        }
      }
    }

    // Light pulse waves that ripple outward from the center periodically
    const pulses: { t: number; speed: number }[] = []
    let lastPulse = 0

    const tick = (now: number) => {
      const time = now / 1000

      // schedule new pulses
      if (now - lastPulse > 2200) {
        pulses.push({ t: 0, speed: 0.45 + Math.random() * 0.25 })
        lastPulse = now
      }

      // draw cladding (dark grey ring outside cores)
      ctx.clearRect(0, 0, width, height)

      // Outer black jacket (subtle)
      const jacket = ctx.createRadialGradient(cx, cy, radius * 0.95, cx, cy, radius * 1.25)
      jacket.addColorStop(0, "oklch(0.18 0.02 250 / 0)")
      jacket.addColorStop(0.4, "oklch(0.14 0.015 250 / 0.6)")
      jacket.addColorStop(1, "oklch(0.08 0.01 250 / 0)")
      ctx.fillStyle = jacket
      ctx.beginPath()
      ctx.arc(cx, cy, radius * 1.25, 0, Math.PI * 2)
      ctx.fill()

      // Cladding disk (subtle blueish dark)
      const clad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
      clad.addColorStop(0, "oklch(0.22 0.04 240 / 0.55)")
      clad.addColorStop(0.7, "oklch(0.18 0.03 240 / 0.45)")
      clad.addColorStop(1, "oklch(0.12 0.02 240 / 0.0)")
      ctx.fillStyle = clad
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.fill()

      // update pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i].t += pulses[i].speed * 0.012
        if (pulses[i].t > 1.2) pulses.splice(i, 1)
      }

      // draw cores
      for (const c of cores) {
        // breathing brightness
        const breath = 0.5 + 0.5 * Math.sin(time * c.speed + c.phase)
        let intensity = c.base * (0.35 + 0.65 * breath)

        // pulse effect: a wave travels outward, lights up cores it touches
        for (const p of pulses) {
          const ringWidth = 0.18
          const d = Math.abs(c.dist - p.t)
          if (d < ringWidth) {
            intensity = Math.min(1, intensity + (1 - d / ringWidth) * (1 - p.t) * 1.4)
          }
        }

        // Outer halo
        const haloR = c.r * (3.5 + intensity * 4)
        const halo = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, haloR)
        halo.addColorStop(0, `oklch(0.78 0.16 ${c.hue} / ${0.55 * intensity})`)
        halo.addColorStop(0.4, `oklch(0.66 0.13 ${c.hue} / ${0.18 * intensity})`)
        halo.addColorStop(1, `oklch(0.66 0.13 ${c.hue} / 0)`)
        ctx.fillStyle = halo
        ctx.beginPath()
        ctx.arc(c.x, c.y, haloR, 0, Math.PI * 2)
        ctx.fill()

        // Core body
        const coreGrad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r)
        const coreLight = 0.55 + intensity * 0.4
        coreGrad.addColorStop(0, `oklch(${0.92} 0.08 ${c.hue})`)
        coreGrad.addColorStop(0.6, `oklch(${coreLight} 0.16 ${c.hue})`)
        coreGrad.addColorStop(1, `oklch(${0.3} 0.08 ${c.hue})`)
        ctx.fillStyle = coreGrad
        ctx.beginPath()
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2)
        ctx.fill()

        // bright pin highlight
        ctx.fillStyle = `oklch(0.99 0.02 ${c.hue} / ${0.7 + intensity * 0.3})`
        ctx.beginPath()
        ctx.arc(c.x - c.r * 0.25, c.y - c.r * 0.25, c.r * 0.35, 0, Math.PI * 2)
        ctx.fill()
      }

      // outer rim ring
      ctx.strokeStyle = "oklch(0.66 0.13 230 / 0.4)"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(cx, cy, radius * 1.02, 0, Math.PI * 2)
      ctx.stroke()

      ctx.strokeStyle = "oklch(0.66 0.13 230 / 0.15)"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(cx, cy, radius * 1.12, 0, Math.PI * 2)
      ctx.stroke()

      raf = requestAnimationFrame(tick)
    }

    setup()
    raf = requestAnimationFrame(tick)

    const onResize = () => setup()
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  )
}
