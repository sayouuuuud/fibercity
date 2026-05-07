import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative h-7 w-7" aria-hidden="true">
        <svg viewBox="0 0 32 32" className="h-full w-full">
          <circle cx="16" cy="16" r="3" fill="oklch(0.7 0.14 230)" />
          <circle
            cx="16"
            cy="16"
            r="7"
            stroke="oklch(0.7 0.14 230)"
            strokeWidth="1.5"
            fill="none"
            opacity="0.7"
          />
          <circle
            cx="16"
            cy="16"
            r="11.5"
            stroke="oklch(0.7 0.14 230)"
            strokeWidth="1"
            fill="none"
            opacity="0.35"
          />
          <circle
            cx="16"
            cy="16"
            r="15"
            stroke="oklch(0.7 0.14 230)"
            strokeWidth="0.75"
            fill="none"
            opacity="0.15"
          />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-bold tracking-tight">
          FIBER<span className="text-primary">/</span>CITY
        </span>
        <span className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
          Optical Infrastructure
        </span>
      </div>
    </div>
  )
}
