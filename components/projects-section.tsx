"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

type Project = {
  title: string
  client: string
  category: "Installation" | "Design" | "Maintenance" | "Supply"
  location: string
  year: string
  image: string
  dek: string
  meta: { label: string; value: string }[]
}

const PROJECTS: Project[] = [
  {
    title: "New Cairo FTTH Backbone",
    client: "Vodafone Egypt",
    category: "Installation",
    location: "New Cairo",
    year: "2024",
    image: "/images/project-1.jpg",
    dek: "Greenfield FTTH rollout across fourteen residential clusters — design, splicing, and acceptance testing delivered in eleven months.",
    meta: [
      { label: "Homes Passed", value: "32,500" },
      { label: "Fibre Laid", value: "612 km" },
    ],
  },
  {
    title: "Tier-III Data Centre Build-out",
    client: "WE",
    category: "Supply",
    location: "Smart Village",
    year: "2024",
    image: "/images/project-2.jpg",
    dek: "Full optical supply for a Tier-III facility: structured cabling, MPO trunks, patch panels, and complete test documentation.",
    meta: [
      { label: "Cabinets", value: "240" },
      { label: "MPO Links", value: "4,800" },
    ],
  },
  {
    title: "Nationwide OTDR Audit Programme",
    client: "Huawei",
    category: "Maintenance",
    location: "Eight Governorates",
    year: "2023",
    image: "/images/project-3.jpg",
    dek: "Bi-directional OTDR and OLTS audit of 1,200+ existing links, with documented remediation and re-acceptance.",
    meta: [
      { label: "Links Tested", value: "1,260" },
      { label: "Remediated", value: "97%" },
    ],
  },
  {
    title: "Aerial Backbone Upgrade",
    client: "Orange Egypt",
    category: "Installation",
    location: "Alexandria",
    year: "2023",
    image: "/images/project-4.jpg",
    dek: "Replacement of legacy aerial fibre with ADSS along 84 km of arterial roads, including pole hardware refresh.",
    meta: [
      { label: "Pole Sites", value: "1,420" },
      { label: "Cable", value: "ADSS 96F" },
    ],
  },
  {
    title: "Industrial Park Network Design",
    client: "Confidential",
    category: "Design",
    location: "Suez",
    year: "2024",
    image: "/images/project-5.jpg",
    dek: "Site survey, BOQ, and labelling plan for an industrial park spanning 2.4 km² with redundant ring topology.",
    meta: [
      { label: "Topology", value: "Dual ring" },
      { label: "Tenants", value: "38" },
    ],
  },
  {
    title: "Underground Duct Programme",
    client: "Telecom Egypt",
    category: "Installation",
    location: "Cairo",
    year: "2022",
    image: "/images/project-6.jpg",
    dek: "Trenching, ducting, and pulling of underground fibre across 26 km of dense urban corridor with zero outage hours.",
    meta: [
      { label: "Conduit", value: "26 km" },
      { label: "Outage", value: "0 h" },
    ],
  },
]

const FILTERS = ["All", "Installation", "Design", "Maintenance", "Supply"] as const

export function ProjectsSection() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All")
  const filtered =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)

  return (
    <section
      id="projects"
      className="relative scroll-mt-32 border-b border-rule paper-texture"
    >
      <div className="border-b border-rule">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 items-baseline gap-4 px-5 py-3 sm:px-8">
          <div className="folio col-span-6 text-muted-foreground">
            № 05 — Field Notes
          </div>
          <div className="folio col-span-6 text-right text-muted-foreground">
            Selected, not exhaustive
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid grid-cols-12 gap-6 lg:gap-8">
          <div className="col-span-12 lg:col-span-7">
            <div className="eyebrow text-muted-foreground">Field notes</div>
            <h2 className="mt-3 font-display text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
              Networks already <span className="italic">carrying</span>
              <br className="hidden md:block" /> real traffic.
            </h2>
          </div>
          <div className="col-span-12 max-w-md text-[15px] leading-[1.7] text-foreground/75 lg:col-span-5">
            <p>
              Six entries from a longer ledger. Filter by discipline to see the
              kind of work we tend to be commissioned for. Detailed case studies
              are available on request under NDA.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-rule pt-4">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={filter === f}
                  className={cn(
                    "pb-1 text-sm transition",
                    filter === f
                      ? "border-b-2 border-foreground font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Editorial gallery — alternating large/small layout */}
        <div className="mt-20 space-y-24">
          {filtered.map((p, i) => {
            const reverse = i % 2 === 1
            return (
              <article
                key={p.title}
                className="grid grid-cols-12 items-end gap-6 lg:gap-12"
              >
                <figure
                  className={cn(
                    "col-span-12",
                    reverse
                      ? "lg:order-2 lg:col-span-7 lg:col-start-6"
                      : "lg:col-span-7",
                  )}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={p.image || "/placeholder.svg"}
                      alt={`${p.title} — ${p.client}`}
                      fill
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      className="object-cover duotone-warm transition duration-700 hover:scale-[1.02]"
                    />
                    <div className="folio absolute left-3 top-3 bg-background/85 px-2.5 py-1.5 backdrop-blur-sm">
                      Plate {String(i + 4).padStart(2, "0")}
                    </div>
                    <div className="folio absolute right-3 top-3 bg-background/85 px-2.5 py-1.5 tabular backdrop-blur-sm">
                      {p.year}
                    </div>
                  </div>
                  <figcaption className="mt-3 flex items-baseline justify-between border-t border-rule pt-2">
                    <span className="folio text-muted-foreground">
                      {p.location}
                    </span>
                    <span className="folio italic text-muted-foreground">
                      a {p.category.toLowerCase()}
                    </span>
                  </figcaption>
                </figure>

                <div
                  className={cn(
                    "col-span-12",
                    reverse
                      ? "lg:order-1 lg:col-span-5"
                      : "lg:col-span-5",
                  )}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-5xl italic text-accent leading-none tabular">
                      {String(i + 1).padStart(2, "0")}.
                    </span>
                    <span className="folio text-muted-foreground">
                      {p.client}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-3xl leading-[1.05] tracking-tight sm:text-[2.4rem]">
                    {p.title}
                  </h3>
                  <p className="mt-5 max-w-md text-[15px] leading-[1.7] text-foreground/75">
                    {p.dek}
                  </p>
                  <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-rule pt-4">
                    {p.meta.map((m) => (
                      <div key={m.label}>
                        <dt className="folio text-muted-foreground">
                          {m.label}
                        </dt>
                        <dd className="mt-1 font-display text-2xl tabular leading-none">
                          {m.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
