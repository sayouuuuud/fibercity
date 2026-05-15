import Image from "next/image"
import { cn } from "@/lib/utils"

export function Logo({ className, showWordmark = true }: { className?: string; showWordmark?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative h-9 w-9 shrink-0" aria-hidden="true">
        <Image
          src="/logo-fc.png"
          alt="Fiber City"
          fill
          sizes="36px"
          className="object-contain"
          priority
        />
      </div>
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span className="font-display text-[15px] font-bold tracking-tight">
            FIBER<span className="text-primary">/</span>CITY
          </span>
          <span className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
            Optical Infrastructure
          </span>
        </div>
      )}
    </div>
  )
}
