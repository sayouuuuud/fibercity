type Partner = {
  name: string
  tag: string
}

const PARTNERS: Partner[] = [
  { name: "Vodafone", tag: "Tier-1 Operator" },
  { name: "WE", tag: "National Carrier" },
  { name: "Huawei", tag: "OEM Partner" },
  { name: "Orange", tag: "Tier-1 Operator" },
  { name: "Nokia", tag: "OEM Partner" },
  { name: "Ericsson", tag: "OEM Partner" },
  { name: "Etisalat", tag: "Regional Carrier" },
  { name: "Telecom Egypt", tag: "Backbone Operator" },
]

export function PartnersMarquee() {
  return (
    <section
      aria-label="Trusted partners"
      className="relative overflow-hidden border-y border-border bg-card/40"
    >
      {/* Header rail */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 border-b border-border/60 px-4 py-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            Active Partnerships
          </span>
          <span className="hidden text-foreground/30 sm:inline">/</span>
          <span className="hidden text-foreground/70 sm:inline">
            Egypt&apos;s Telecom Backbone
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-foreground/50">SEC.</span>
          <span className="text-foreground">02</span>
          <span className="text-foreground/30">·</span>
          <span>{PARTNERS.length}+ partners</span>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden py-10 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee items-center">
          {[...PARTNERS, ...PARTNERS].map((p, i) => (
            <div
              key={i}
              className="group flex shrink-0 items-center gap-6 px-10"
            >
              <div className="flex flex-col">
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary/80">
                  {p.tag}
                </span>
                <span className="font-display text-3xl font-medium tracking-tight text-foreground transition group-hover:text-primary sm:text-4xl">
                  {p.name}
                </span>
              </div>

              {/* divider chip — fiber strand visualised as a tiny endface */}
              <div className="relative flex h-7 w-7 items-center justify-center">
                <span className="absolute inset-0 rounded-full border border-border" />
                <span className="absolute inset-1.5 rounded-full bg-primary/15" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer caption */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 border-t border-border/60 px-4 py-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:px-6 lg:px-8">
        <span className="flex items-center gap-2">
          <span className="h-px w-8 bg-primary/60" />
          Selected — long-term framework agreements
        </span>
        <span className="hidden text-foreground/70 md:inline">
          MOA · MSA · NDA on file
        </span>
      </div>
    </section>
  )
}
