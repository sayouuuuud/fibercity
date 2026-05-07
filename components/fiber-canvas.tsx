"use client"

import { useEffect, useRef } from "react"

/**
 * Animated fiber-optic strands flowing across a light background.
 * Strands are drawn as faint dark hairlines, with cyan light "packets"
 * that travel along them — evoking light moving through glass fiber.
 */
export function FiberCanvas() {
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

    type Strand = {
      y: number
      amp: number
      speed: number
      phase: number
      opacity: number
      width: number
    }
    type Packet = {
      strand: number
      t: number
      speed: number
      hue: number
    }

    let strands: Strand[] = []
    let packets: Packet[] = []

    const setup = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.max(16, Math.floor(width / 55))
      strands = Array.from({ length: count }).map((_, i) => ({
        y: (i + 0.5) * (height / count) + (Math.random() - 0.5) * 14,
        amp: 22 + Math.random() * 60,
        speed: 0.0005 + Math.random() * 0.0014,
        phase: Math.random() * Math.PI * 2,
        // dark hairlines on light bg
        opacity: 0.05 + Math.random() * 0.08,
        width: 0.5 + Math.random() * 0.6,
      }))

      packets = Array.from({ length: Math.floor(count * 0.7) }).map(() => ({
        strand: Math.floor(Math.random() * count),
        t: Math.random(),
        speed: 0.0014 + Math.random() * 0.0035,
        hue: Math.random() > 0.85 ? 200 : 230,
      }))
    }

    const drawStrand = (s: Strand, time: number) => {
      ctx.beginPath()
      const segs = 64
      for (let i = 0; i <= segs; i++) {
        const x = (i / segs) * width
        const y =
          s.y +
          Math.sin((x * 0.005) + time * s.speed * 1000 + s.phase) * s.amp +
          Math.sin((x * 0.013) + time * s.speed * 700 + s.phase) * (s.amp * 0.3)
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      // dark ink hairline on light bg
      ctx.strokeStyle = `oklch(0.18 0.025 250 / ${s.opacity})`
      ctx.lineWidth = s.width
      ctx.stroke()
    }

    const strandPoint = (s: Strand, t: number, time: number) => {
      const x = t * width
      const y =
        s.y +
        Math.sin((x * 0.005) + time * s.speed * 1000 + s.phase) * s.amp +
        Math.sin((x * 0.013) + time * s.speed * 700 + s.phase) * (s.amp * 0.3)
      return { x, y }
    }

    const drawPacket = (p: Packet, time: number) => {
      const s = strands[p.strand]
      if (!s) return
      const { x, y } = strandPoint(s, p.t, time)

      // Outer halo (large soft glow)
      const halo = ctx.createRadialGradient(x, y, 0, x, y, 28)
      halo.addColorStop(0, `oklch(0.7 0.14 ${p.hue} / 0.55)`)
      halo.addColorStop(0.4, `oklch(0.7 0.14 ${p.hue} / 0.18)`)
      halo.addColorStop(1, `oklch(0.7 0.14 ${p.hue} / 0)`)
      ctx.fillStyle = halo
      ctx.beginPath()
      ctx.arc(x, y, 28, 0, Math.PI * 2)
      ctx.fill()

      // Inner glow
      const inner = ctx.createRadialGradient(x, y, 0, x, y, 8)
      inner.addColorStop(0, `oklch(0.95 0.1 ${p.hue} / 1)`)
      inner.addColorStop(1, `oklch(0.7 0.14 ${p.hue} / 0)`)
      ctx.fillStyle = inner
      ctx.beginPath()
      ctx.arc(x, y, 8, 0, Math.PI * 2)
      ctx.fill()

      // Bright core
      ctx.fillStyle = `oklch(0.99 0.02 ${p.hue})`
      ctx.beginPath()
      ctx.arc(x, y, 1.6, 0, Math.PI * 2)
      ctx.fill()
    }

    let last = performance.now()
    const tick = (now: number) => {
      const dt = now - last
      last = now
      ctx.clearRect(0, 0, width, height)

      for (const s of strands) drawStrand(s, now)

      for (const p of packets) {
        p.t += p.speed * (dt / 16.6)
        if (p.t > 1.05) {
          p.t = -0.05
          p.strand = Math.floor(Math.random() * strands.length)
          p.speed = 0.0014 + Math.random() * 0.0035
        }
        drawPacket(p, now)
      }

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
