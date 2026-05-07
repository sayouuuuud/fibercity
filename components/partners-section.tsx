import { FiberStrands } from "@/components/fiber-strands"

const GROUPS: {
  title: string
  short: string
  partners: { name: string; type: string }[]
}[] = [
  {
    title: "Operators",
    short: "I.",
    partners: [
      { name: "Vodafone Egypt", type: "Mobile · FTTH" },
      { name: "WE", type: "Fixed · FTTX" },
      { name: "Orange Egypt", type: "Mobile · Backhaul" },
      { name: "Telecom Egypt", type: "Backbone · Wholesale" },
    ],
  },
  {
    title: "Vendors",
    short: "II.",
    partners: [
      { name: "Huawei", type: "OLT · ONT · DWDM" },
      { name: "Nokia", type: "Access · Optical" },
      { name: "Ericsson", type: "Transport" },
      { name: "ZTE", type: "GPON · OTN" },
    ],
  },
  {
    title: "Enterprise",
    short: "III.",
    partners: [
      { name: "Smart Village", type: "Tech park" },
      { name: "Madinaty", type: "Real estate" },
      { name: "ITIDA", type: "Government" },
      { name: "TE Data", type: "ISP" },
    ],
  },
]

export function PartnersSection() {
  return (
    <section
      id="network"
      className="relative scroll-mt-32 overflow-hidden border-b border-rule paper-texture"
    >
      <div className="border-b border-rule">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 items-baseline gap-4 px-5 py-3 sm:px-8">
          <div className="folio col-span-6 text-muted-foreground">
            № 06 — The Network
          </div>
          <div className="folio col-span-6 text-right text-muted-foreground">
            A credits page
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
        {/* Background strands */}
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <FiberStrands variant="ambient" density={6} className="h-full w-full" />
        </div>

        <div className="relative grid grid-cols-12 gap-6 lg:gap-8">
          <div className="col-span-12 lg:col-span-5">
            <div className="eyebrow text-muted-foreground">The network</div>
            <h2 className="mt-3 font-display text-[clamp(2.2rem,5vw,4rem)] leading-[0.98] tracking-[-0.02em]">
              The companies we <span className="italic">build with.</span>
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-[1.7] text-foreground/75">
              A practice of this size lives or dies by the people upstream and
              downstream of it. These are ours.
            </p>
          </div>
        </div>

        <div className="relative mt-16">
          <div className="rule-double mb-6 flex items-baseline justify-between">
            <span className="font-display text-2xl italic">A credits page.</span>
            <span className="folio text-muted-foreground">
              Three groups · twelve names
            </span>
          </div>

          <div className="grid grid-cols-12 gap-0">
            {GROUPS.map((g, gi) => (
              <div
                key={g.title}
                className={`col-span-12 border-b border-rule py-8 md:col-span-4 ${
                  gi < GROUPS.length - 1 ? "md:border-r md:border-rule md:pr-8" : ""
                } ${gi > 0 ? "md:pl-8" : ""}`}
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-3xl italic text-accent">
                    {g.short}
                  </span>
                  <h3 className="font-display text-2xl tracking-tight">
                    {g.title}
                  </h3>
                </div>
                <ul className="mt-6 divide-y divide-rule border-t border-rule">
                  {g.partners.map((p) => (
                    <li
                      key={p.name}
                      className="flex items-baseline justify-between gap-4 py-3.5"
                    >
                      <span className="font-display text-lg leading-tight tracking-tight">
                        {p.name}
                      </span>
                      <span className="folio shrink-0 text-muted-foreground">
                        {p.type}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
