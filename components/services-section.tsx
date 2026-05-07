import Image from "next/image"
import {
  PencilRuler,
  PackageOpen,
  HardHat,
  Activity,
  Compass,
  ArrowUpRight,
} from "lucide-react"

const SERVICES = [
  {
    num: "01",
    title: "Design",
    icon: PencilRuler,
    description:
      "From the first survey to the final BOQ — we plan networks that actually deploy on schedule.",
    bullets: [
      "FTTX / GPON network design",
      "Route planning & site surveys",
      "Bill of Quantities (BOQ)",
      "Labelling plans & studies",
    ],
  },
  {
    num: "02",
    title: "Supply",
    icon: PackageOpen,
    description:
      "Vetted optical and copper supply chain — sourced for reliability, priced for scale.",
    bullets: [
      "Indoor / outdoor / aerial cables",
      "Patch panels, pigtails, adapters",
      "Termination & joint closures",
      "SFP, media converters, switches",
    ],
  },
  {
    num: "03",
    title: "Installation",
    icon: HardHat,
    description:
      "Certified crews pulling, splicing, and dressing cable to telecom-grade standards.",
    bullets: [
      "Cable laying, pulling, installation",
      "Fusion splicing & termination",
      "FTTX / GPON deployment",
      "Conduit, duct & cable dressing",
    ],
  },
  {
    num: "04",
    title: "Testing & Maintenance",
    icon: Activity,
    description:
      "OTDR-traced, OLTS-verified — every link signed off with documentation you can audit.",
    bullets: [
      "OTDR testing & traces",
      "Optical loss testing (OLTS)",
      "Fault allocation & tracing",
      "Inspection & maintenance",
    ],
  },
  {
    num: "05",
    title: "Consultancy",
    icon: Compass,
    description:
      "Independent technical advice — for feasibility studies, vendor selection, and audits.",
    bullets: [
      "FTTH/FTTX feasibility studies",
      "Technical audits of networks",
      "Vendor & equipment selection",
      "Cost optimization & supervision",
    ],
  },
]

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative scroll-mt-24 overflow-hidden bg-secondary/40 py-24 sm:py-32"
    >
      {/* aurora wash */}
      <div className="bg-aurora-soft pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
              <span className="text-muted-foreground">/ 03</span>
              <span className="h-px w-8 bg-primary/50" />
              Capabilities
            </div>
            <h2 className="mt-6 max-w-2xl font-display text-4xl font-semibold leading-[1] tracking-tight text-balance sm:text-5xl lg:text-[4.25rem]">
              Five disciplines.{" "}
              <span className="text-primary">One contract.</span>
            </h2>
          </div>
          <p className="max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
            Engage us for a single phase — or hand over the entire programme.
            Our delivery model is modular, but the accountability is singular.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, idx) => (
            <article
              key={s.num}
              className={
                "group glass-soft relative flex flex-col rounded-3xl p-6 transition duration-300 hover:bg-card sm:p-7 " +
                (idx === 0 ? "lg:col-span-2" : "")
              }
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background text-primary transition group-hover:border-primary/60 group-hover:shadow-[0_0_30px_-8px_oklch(0.66_0.13_230/0.6)]">
                  <s.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <span className="font-mono text-[11px] tracking-widest text-muted-foreground">
                  {s.num}
                </span>
              </div>

              <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.description}
              </p>

              <ul className="mt-5 space-y-2 border-t border-border pt-5">
                {s.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground"
                  >
                    <span className="mt-1.5 h-px w-3 shrink-0 bg-primary" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center justify-between text-sm">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  Read brief
                </span>
                <ArrowUpRight className="h-4 w-4 text-primary transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>

              {/* corner ticks */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-primary/0 transition group-hover:border-primary"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-primary/0 transition group-hover:border-primary"
              />
            </article>
          ))}

          {/* CTA tile with fiber strands image */}
          <article className="group relative overflow-hidden rounded-3xl bg-foreground p-6 text-background sm:p-8">
            <Image
              src="/images/glass-strands.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="absolute inset-0 object-cover opacity-30 mix-blend-screen"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/80 via-foreground/60 to-primary/40" />
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-background/70">
                  Need something specific?
                </div>
                <h3 className="mt-4 font-display text-2xl font-semibold leading-tight tracking-tight">
                  Talk to an engineer about your network.
                </h3>
              </div>
              <a
                href="#contact"
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-background px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-primary hover:text-primary-foreground"
              >
                Request a callback
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
