export type WorkItem = {
  slug: string
  title: string
  excerpt: string
  content: string[]
  client: string
  category: "Installation" | "Design" | "Maintenance" | "Supply"
  location: string
  year: string
  image: string
  gallery: string[]
  stats: { label: string; value: string }[]
}

export type NewsItem = {
  slug: string
  title: string
  excerpt: string
  content: string[]
  category: string
  author: string
  date: string
  readMinutes: number
  image: string
}

export type Customer = {
  slug: string
  name: string
  industry: string
  tier: "Enterprise" | "Growth" | "Starter"
  region: string
  description: string
  since: string
  projectsCount: number
  healthScore: number
  contact: string
  email: string
  phone: string
  featured: boolean
}

export const siteStats = [
  { label: "Projects delivered", value: "340+", helper: "FTTX, GPON, backbone and data-center programmes" },
  { label: "Fibre laid", value: "12,400 km", helper: "Aerial, underground, indoor and OPGW routes" },
  { label: "Acceptance pass rate", value: "99.1%", helper: "OTDR and OLTS handover packages" },
  { label: "Active clients", value: "62", helper: "Telecom, government, enterprise and real estate" },
]

export const works: WorkItem[] = [
  {
    slug: "new-cairo-ftth-backbone",
    title: "New Cairo FTTH Backbone",
    excerpt:
      "Greenfield FTTH rollout across fourteen residential clusters with design, splicing, and acceptance testing delivered in eleven months.",
    content: [
      "Fiber City delivered a turnkey FTTH backbone for a high-density residential programme in New Cairo, covering design validation, route surveys, duct readiness, cable pulling, fusion splicing, OTDR testing, and handover packs.",
      "The operating model combined a central PMO with distributed field teams, enabling phased releases without delaying civil works or customer activation windows.",
      "Every link was submitted with trace files, splice sheets, labelling schedules, and as-built drawings so the operator could move directly into acceptance and activation.",
    ],
    client: "Vodafone Egypt",
    category: "Installation",
    location: "New Cairo",
    year: "2024",
    image: "/images/project-1.jpg",
    gallery: ["/images/project-1.jpg", "/images/fiber-strand-macro.jpg", "/images/glass-strands.jpg"],
    stats: [
      { label: "Homes passed", value: "32,500" },
      { label: "Fibre laid", value: "612 km" },
      { label: "Clusters", value: "14" },
    ],
  },
  {
    slug: "tier-iii-data-centre-buildout",
    title: "Tier-III Data Centre Build-out",
    excerpt:
      "Structured optical supply and installation for a Tier-III facility, including MPO trunks, patch panels, and full test documentation.",
    content: [
      "The project required a controlled delivery process for high-density optical links in a live data centre environment where documentation and cleanliness were as critical as installation speed.",
      "Fiber City supplied and installed MPO trunks, single-mode and multimode patching, labelled distribution panels, and acceptance-ready trace reports.",
      "The final package gave the operations team a clean, traceable network layer that can scale as halls and tenants expand.",
    ],
    client: "WE — Telecom Egypt",
    category: "Supply",
    location: "Smart Village",
    year: "2024",
    image: "/images/project-2.jpg",
    gallery: ["/images/project-2.jpg", "/images/glass-detail.jpg", "/images/engineer.jpg"],
    stats: [
      { label: "Cabinets", value: "240" },
      { label: "MPO links", value: "4,800" },
      { label: "Handover files", value: "100%" },
    ],
  },
  {
    slug: "nationwide-otdr-audit-programme",
    title: "Nationwide OTDR Audit Programme",
    excerpt:
      "Bi-directional OTDR and OLTS audit of existing links across eight governorates with documented remediation and re-acceptance.",
    content: [
      "A nationwide audit programme was commissioned to identify hidden attenuation, splice loss, and documentation gaps across an ageing fibre estate.",
      "Fiber City deployed multiple senior teams to test each route, classify defects, produce remediation plans, and verify repaired links against operator thresholds.",
      "The resulting asset ledger became the client reference for future maintenance, route upgrades, and SLA reporting.",
    ],
    client: "Huawei",
    category: "Maintenance",
    location: "Eight Governorates",
    year: "2023",
    image: "/images/project-3.jpg",
    gallery: ["/images/project-3.jpg", "/images/editorial-engineer.jpg", "/images/fiber-bundle-light.jpg"],
    stats: [
      { label: "Links tested", value: "1,260" },
      { label: "Remediated", value: "97%" },
      { label: "Governorates", value: "8" },
    ],
  },
  {
    slug: "aerial-backbone-upgrade",
    title: "Aerial Backbone Upgrade",
    excerpt:
      "Replacement of legacy aerial fibre with ADSS along strategic arterial roads, including pole hardware refresh and acceptance testing.",
    content: [
      "The upgrade replaced ageing aerial routes with ADSS cable and new pole hardware while maintaining operator continuity during constrained work windows.",
      "Crews coordinated traffic, pole access, cable dressing, splicing, and final measurements under a single daily production plan.",
      "The route now supports higher capacity and easier maintenance across a key corridor in Alexandria.",
    ],
    client: "Orange Egypt",
    category: "Installation",
    location: "Alexandria",
    year: "2023",
    image: "/images/project-4.jpg",
    gallery: ["/images/project-4.jpg", "/images/hero-fiber.jpg", "/images/editorial-hero.jpg"],
    stats: [
      { label: "Pole sites", value: "1,420" },
      { label: "Route length", value: "84 km" },
      { label: "Outage hours", value: "0" },
    ],
  },
  {
    slug: "industrial-park-network-design",
    title: "Industrial Park Network Design",
    excerpt:
      "Survey, BOQ, labelling, and resilient ring topology for an industrial park spanning 2.4 km² with multi-tenant requirements.",
    content: [
      "Fiber City designed the optical network for a mixed-use industrial park requiring redundant connectivity, clear tenant demarcation, and practical installation packages.",
      "The team produced survey reports, route drawings, BOQs, labelling rules, and a deployment plan aligned with phased tenant handover.",
      "The final design reduces future operational ambiguity while keeping the build cost optimized.",
    ],
    client: "Confidential Developer",
    category: "Design",
    location: "Suez",
    year: "2024",
    image: "/images/project-5.jpg",
    gallery: ["/images/project-5.jpg", "/images/fiber-strand-macro.jpg", "/images/project-2.jpg"],
    stats: [
      { label: "Topology", value: "Dual ring" },
      { label: "Tenants", value: "38" },
      { label: "Area", value: "2.4 km²" },
    ],
  },
  {
    slug: "underground-duct-programme",
    title: "Underground Duct Programme",
    excerpt:
      "Trenching, ducting, and pulling underground fibre across a dense urban corridor with coordinated civil and telecom delivery.",
    content: [
      "This programme combined civil coordination, duct readiness checks, cable pulling, closures, and final acceptance across a sensitive urban route.",
      "Fiber City managed daily permits, safety controls, cable protection, and documentation so the client could activate without rework.",
      "The resulting corridor strengthened fixed broadband coverage while preserving service continuity.",
    ],
    client: "Telecom Egypt",
    category: "Installation",
    location: "Cairo",
    year: "2022",
    image: "/images/project-6.jpg",
    gallery: ["/images/project-6.jpg", "/images/glass-strands.jpg", "/images/engineer.jpg"],
    stats: [
      { label: "Conduit", value: "26 km" },
      { label: "Outage", value: "0 h" },
      { label: "Handover", value: "As-built" },
    ],
  },
]

export const newsItems: NewsItem[] = [
  {
    slug: "fiber-city-opens-cairo-network-operations-desk",
    title: "Fiber City opens Cairo network operations desk",
    excerpt:
      "A dedicated operations function now centralizes project reporting, maintenance requests, and emergency dispatch for nationwide fibre programmes.",
    content: [
      "Fiber City has launched a Cairo-based network operations desk to give enterprise and telecom clients a single point of control for active projects and maintenance requests.",
      "The desk combines dispatch coordination, incident triage, documentation control, and daily field reporting across live programmes.",
      "The initiative is part of the company mission to make fibre delivery more transparent, measurable, and accountable.",
    ],
    category: "Company",
    author: "Fiber City Editorial",
    date: "2026-04-18",
    readMinutes: 4,
    image: "/images/editorial-hero.jpg",
  },
  {
    slug: "how-to-prepare-fttx-handover-documents",
    title: "How to prepare FTTX handover documents operators can actually use",
    excerpt:
      "A practical field note on splice sheets, OTDR traces, labelling schedules, and the acceptance files that reduce operational ambiguity.",
    content: [
      "Useful handover documentation is not paperwork after the project. It is the operating manual for the next decade of maintenance and expansion.",
      "At minimum, every FTTX handover should include route drawings, splice sheets, port schedules, OTDR traces, power budgets, material certificates, and photo evidence.",
      "The biggest improvement comes from agreeing the document structure before work starts so field teams capture the correct information as they build.",
    ],
    category: "Field Notes",
    author: "Engineering Team",
    date: "2026-03-27",
    readMinutes: 6,
    image: "/images/editorial-engineer.jpg",
  },
  {
    slug: "adss-backbone-upgrades-in-coastal-cities",
    title: "ADSS backbone upgrades in coastal cities",
    excerpt:
      "Lessons from upgrading exposed aerial routes where wind, salt, traffic, and narrow work windows all shape the installation plan.",
    content: [
      "Coastal aerial routes demand more than simple cable replacement. Hardware selection, sag calculations, pole readiness, and working windows all determine long-term reliability.",
      "Fiber City teams use pre-survey scoring to classify poles, identify route hazards, and reduce stoppages during installation.",
      "The result is a safer build and a network that stays accessible for future inspection and repair.",
    ],
    category: "Infrastructure",
    author: "Outside Plant Unit",
    date: "2026-02-12",
    readMinutes: 5,
    image: "/images/project-4.jpg",
  },
]

export const customers: Customer[] = [
  {
    slug: "vodafone-egypt",
    name: "Vodafone Egypt",
    industry: "Telecom",
    tier: "Enterprise",
    region: "Nationwide",
    description: "Tier-1 mobile operator and long-term framework partner across FTTX and backhaul programmes.",
    since: "2016",
    projectsCount: 184,
    healthScore: 96,
    contact: "Network Engineering Office",
    email: "network@vodafone.example",
    phone: "+20 2 0000 1101",
    featured: true,
  },
  {
    slug: "we-telecom-egypt",
    name: "WE — Telecom Egypt",
    industry: "Telecom",
    tier: "Enterprise",
    region: "Nationwide",
    description: "National fixed-line carrier for long-haul backbone, GPON, ODN, and data-centre programmes.",
    since: "2015",
    projectsCount: 220,
    healthScore: 94,
    contact: "Outside Plant Directorate",
    email: "osp@te.example",
    phone: "+20 2 0000 1102",
    featured: true,
  },
  {
    slug: "orange-egypt",
    name: "Orange Egypt",
    industry: "Telecom",
    tier: "Enterprise",
    region: "Lower & Upper Egypt",
    description: "Carrier network partner for ADSS aerial migrations and microwave-to-fibre backhaul projects.",
    since: "2018",
    projectsCount: 96,
    healthScore: 91,
    contact: "Transmission Delivery",
    email: "transmission@orange.example",
    phone: "+20 2 0000 1103",
    featured: false,
  },
  {
    slug: "smart-village",
    name: "Smart Village",
    industry: "Real Estate",
    tier: "Growth",
    region: "Giza",
    description: "Campus-wide FTTO, tenant-grade splicing, and secure dark-fibre routes for business park tenants.",
    since: "2020",
    projectsCount: 32,
    healthScore: 88,
    contact: "Facilities Technology",
    email: "facilities@smartvillage.example",
    phone: "+20 2 0000 1104",
    featured: false,
  },
  {
    slug: "madinaty",
    name: "Madinaty",
    industry: "Real Estate",
    tier: "Growth",
    region: "Cairo East",
    description: "Premium FTTH delivery and maintenance for a master-planned community with high activation volume.",
    since: "2019",
    projectsCount: 58,
    healthScore: 93,
    contact: "Digital Infrastructure",
    email: "digital@madinaty.example",
    phone: "+20 2 0000 1105",
    featured: true,
  },
]

export const adminMetrics = [
  { label: "Monthly visits", value: "18,420", change: "+14.2%" },
  { label: "Published works", value: works.length.toString(), change: "+2 this quarter" },
  { label: "Published news", value: newsItems.length.toString(), change: "1 draft pending" },
  { label: "Client records", value: customers.length.toString(), change: "+3 updates" },
]

export const editablePages = [
  {
    key: "home",
    title: "Home page",
    status: "Published",
    sections: ["Hero", "Stats", "Services", "Works", "Partners", "Contact CTA"],
  },
  {
    key: "about",
    title: "About us",
    status: "Published",
    sections: ["Mission", "Timeline", "Capabilities", "Certifications"],
  },
  {
    key: "contact",
    title: "Contact",
    status: "Published",
    sections: ["Contact info", "Lead form", "Map", "Service options"],
  },
]
