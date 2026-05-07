const PARTNERS = [
  "Vodafone",
  "WE",
  "Huawei",
  "Orange",
  "Nokia",
  "Ericsson",
  "Etisalat",
  "Telecom Egypt",
]

export function PartnersMarquee() {
  return (
    <section
      aria-label="Trusted by"
      className="relative border-y border-border bg-background py-10"
    >
      <div className="mx-auto mb-6 flex max-w-7xl items-center justify-between px-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:px-6 lg:px-8">
        <span className="flex items-center gap-2">
          <span className="h-px w-8 bg-primary" />
          Trusted by Egypt&apos;s telecom backbone
        </span>
        <span>{PARTNERS.length}+ partners</span>
      </div>

      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-16 px-8">
          {[...PARTNERS, ...PARTNERS].map((p, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center gap-3 font-display text-2xl font-medium tracking-tight text-muted-foreground transition hover:text-foreground sm:text-3xl"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
