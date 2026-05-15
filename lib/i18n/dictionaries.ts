import type { Locale } from "@/lib/db/types"

// All static UI copy lives here so it can be translated without touching components.
// Server components read this via `getDictionary`, client components via the LanguageProvider hook.

export type Dictionary = {
  meta: {
    homeTitle: string
    homeDescription: string
    workTitle: string
    newsTitle: string
    aboutTitle: string
    contactTitle: string
    adminTitle: string
  }
  nav: {
    home: string
    about: string
    services: string
    works: string
    news: string
    contact: string
    getQuote: string
    primaryNav: string
    openMenu: string
    closeMenu: string
    languageEN: string
    languageAR: string
    toggleTheme: string
  }
  hero: {
    pill: string
    pillRegion: string
    line1: string
    line2a: string
    line2b: string
    line3: string
    line4a: string
    line4b: string
    description: string
    primaryCTA: string
    secondaryCTA: string
    scrollHint: string
  }
  about: {
    folio: string
    sectionLabel: string
    heading: string
    headingHighlight: string
    body: string
    eyebrow: string
    differentiatorsTitle: string
    headingTail: string
    pillars: { title: string; body: string }[]
    differentiators: string[]
    isoLabel: string
    isoValue: string
    hqLabel: string
    hqValue: string
  }
  services: {
    folio: string
    sectionLabel: string
    heading: string
    headingHighlight: string
    description: string
  }
  stats: {
    folio: string
    sectionLabel: string
    eyebrow: string
    heading: string
    headingItalic: string
    headingTail: string
    description: string
  }
  projects: {
    folio: string
    sectionLabel: string
    headingTop: string
    headingItalic: string
    headingBottom: string
    description: string
    filterAll: string
    viewAll: string
    viewProject: string
  }
  partners: {
    folio: string
    sectionLabel: string
    eyebrow: string
    heading: string
    headingItalic: string
    description: string
    groupCount: string
    groupOperators: string
    groupVendors: string
    groupEnterprise: string
  }
  contact: {
    folio: string
    sectionLabel: string
    eyebrow: string
    heading: string
    headingItalic: string
    salutation: string
    body1: string
    body2: string
    closing: string
    formBadge: string
    formNumber: string
    fullName: string
    company: string
    workEmail: string
    phone: string
    serviceRequired: string
    projectBrief: string
    placeholderName: string
    placeholderCompany: string
    placeholderEmail: string
    placeholderPhone: string
    placeholderMessage: string
    legal: string
    submit: string
    sending: string
    success: string
    successHeadline: string
    successBody: string
    submitAnother: string
    operations: string
    enquiries: string
    headquarters: string
    hours: string
    failedHeadline: string
    failedBody: string
    serviceOptions: { value: string; label: string }[]
  }
  workPage: {
    eyebrow: string
    title: string
    titleItalic: string
    description: string
    backToWorks: string
    detailLabels: { client: string; location: string; year: string; discipline: string }
    relatedWorks: string
    galleryTitle: string
    statsTitle: string
    overviewTitle: string
  }
  newsPage: {
    eyebrow: string
    title: string
    titleItalic: string
    description: string
    backToNews: string
    relatedArticles: string
    readMin: string
    publishedOn: string
  }
  aboutPage: {
    eyebrow: string
    title: string
    titleItalic: string
    description: string
    missionLabel: string
    missionHeading: string
    missionBody: string
    valueProps: string[]
    values: { title: string; body: string }[]
  }
  contactPage: {
    eyebrow: string
    title: string
    titleItalic: string
    description: string
  }
  footer: {
    nameplate: string
    tagline: string
    description: string
    available: string
    sections: string
    studio: string
    colophon: string
    rights: string
    sectionsLinks: { label: string; href: string }[]
    studioLinks: { label: string; href: string }[]
    colophonLinks: { label: string; href: string }[]
  }
  admin: {
    appName: string
    overview: string
    content: string
    pages: string
    works: string
    news: string
    customers: string
    services: string
    partners: string
    stats: string
    media: string
    messages: string
    analytics: string
    settings: string
    collapse: string
    expand: string
    search: string
    newItem: string
    save: string
    saving: string
    cancel: string
    edit: string
    delete: string
    publish: string
    draft: string
    published: string
    confirm: string
    confirmDelete: string
    saved: string
    saveFailed: string
    deleted: string
    deleteFailed: string
    notFound: string
    visitsThisWeek: string
    contentHealth: string
    monthlyVisits: string
    publishedWorks: string
    publishedNews: string
    clientRecords: string
    avgHealth: string
    pendingMessages: string
    fibreLaid: string
    completionRate: string
    seoMetadata: string
    arabicCoverage: string
    imageCoverage: string
    publishRate: string
    topPages: string
    recentMessages: string
    recentWorks: string
    recentNews: string
    quickActions: string
    addWork: string
    addNews: string
    inboxTitle: string
    markRead: string
    markArchived: string
    markNew: string
    reply: string
    tierEnterprise: string
    totalInbox: string
    refresh: string
    visits: string
    views: string
    records: string
    titleCol: string
    detailsCol: string
    tagCol: string
    statusCol: string
    viewsCol: string
    searchHint: string
    quickActionsBody: string
    empty: string
    from: string
    subject: string
    date: string
    actions: string
    statusCell: string
    fields: {
      titleEN: string
      titleAR: string
      excerptEN: string
      excerptAR: string
      contentEN: string
      contentAR: string
      coverImage: string
      gallery: string
      category: string
      client: string
      locationEN: string
      locationAR: string
      year: string
      stats: string
      status: string
      sortOrder: string
      slug: string
      nameEN: string
      nameAR: string
      industryEN: string
      industryAR: string
      tier: string
      regionEN: string
      regionAR: string
      descriptionEN: string
      descriptionAR: string
      since: string
      projectsCount: string
      healthScore: string
      contactName: string
      contactEmail: string
      contactPhone: string
      featured: string
      icon: string
      bulletsEN: string
      bulletsAR: string
      group: string
      groupAR: string
      type: string
      typeAR: string
      website: string
      value: string
      suffixEN: string
      suffixAR: string
      labelEN: string
      labelAR: string
      helperEN: string
      helperAR: string
      author: string
      readMinutes: string
      publishedAt: string
      categoryEN: string
      categoryAR: string
    }
    settingsGroups?: {
      brand: string
      contact: string
      social: string
      seo: string
      general: string
      brandHint: string
      contactHint: string
      socialHint: string
      seoHint: string
    }
  }
}

const en: Dictionary = {
  meta: {
    homeTitle: "Fiber City — Fiber Optic Infrastructure Solutions in Egypt",
    homeDescription:
      "Fiber City designs, supplies, installs and maintains fiber optic networks across Egypt. Trusted by Vodafone, WE, Orange and Huawei for end-to-end FTTX & GPON deployments.",
    workTitle: "Works — Fiber City",
    newsTitle: "News — Fiber City",
    aboutTitle: "About — Fiber City",
    contactTitle: "Contact — Fiber City",
    adminTitle: "Admin Dashboard — Fiber City",
  },
  nav: {
    home: "Home",
    about: "About",
    services: "Services",
    works: "Works",
    news: "News",
    contact: "Contact",
    getQuote: "Get a Quote",
    primaryNav: "Primary",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageEN: "EN",
    languageAR: "AR",
    toggleTheme: "Toggle dark mode",
  },
  hero: {
    pill: "Fiber Optic Infrastructure",
    pillRegion: "B2B · Egypt",
    line1: "Light moves",
    line2a: "through ",
    line2b: "glass.",
    line3: "We move it",
    line4a: "across ",
    line4b: "Egypt.",
    description:
      "Fiber City designs, supplies, installs and maintains optical networks for Egypt's most demanding telecom operators and enterprises. From the first site survey to the last splice — one partner, end to end.",
    primaryCTA: "Start a Project",
    secondaryCTA: "View Capabilities",
    scrollHint: "Scroll for details",
  },
  about: {
    folio: "№ 02 — About",
    sectionLabel: "About Fiber City",
    heading: "We build the",
    headingHighlight: "invisible backbone",
    headingTail: "of modern Egypt.",
    body: "Fiber City is an Egyptian engineering firm specialised in fiber optic infrastructure. We partner with telecom operators, ISPs, data centers, and large developers to roll out reliable, scalable optical networks — from greenfield FTTH estates to nationwide backbone upgrades.",
    eyebrow: "Sr. Optical Engineer",
    differentiatorsTitle: "Why teams pick us",
    pillars: [
      { title: "End-to-End", body: "Design, supply, installation, testing, and maintenance handled by one accountable team. No handoffs, no finger-pointing." },
      { title: "Field-Hardened", body: "Every project is led by senior engineers who have pulled cable, fused splices, and read OTDR traces in real conditions." },
      { title: "Telecom-Grade", body: "We meet the QA, documentation, and labelling standards demanded by Tier-1 operators across the region." },
    ],
    differentiators: [
      "Dedicated FTTX & GPON specialists",
      "Certified fusion splicing crews",
      "Bilingual project documentation (EN/AR)",
      "OTDR + OLTS testing on every link",
      "BOQ engineered to optimise cost",
      "Nationwide field coverage",
    ],
    isoLabel: "ISO",
    isoValue: "9001 · 14001 · 45001 aligned",
    hqLabel: "HQ",
    hqValue: "Cairo, Egypt",
  },
  services: {
    folio: "№ 03 — Capabilities",
    sectionLabel: "Capabilities",
    heading: "Five disciplines.",
    headingHighlight: "One contract.",
    description:
      "Engage us for a single phase — or hand over the entire programme. Our delivery model is modular, but the accountability is singular.",
  },
  stats: {
    folio: "№ 04 — A Ledger",
    sectionLabel: "As at the present issue",
    eyebrow: "By the numbers",
    heading: "Ten years of ",
    headingItalic: "light",
    headingTail: ", in figures.",
    description:
      "These are not vanity metrics. Each is reproducible from the project ledger we have kept since 2014.",
  },
  projects: {
    folio: "№ 05 — Field Notes",
    sectionLabel: "Selected, not exhaustive",
    headingTop: "Networks already",
    headingItalic: "carrying",
    headingBottom: "real traffic.",
    description:
      "A live ledger of programmes we have delivered. Filter by discipline to see the kind of work we tend to be commissioned for. Detailed case studies are available on request under NDA.",
    filterAll: "All",
    viewAll: "View all works",
    viewProject: "View project",
  },
  partners: {
    folio: "№ 06 — The Network",
    sectionLabel: "A credits page",
    eyebrow: "The network",
    heading: "The companies we ",
    headingItalic: "build with.",
    description:
      "A practice of this size lives or dies by the people upstream and downstream of it. These are ours.",
    groupCount: "Three groups · twelve names",
    groupOperators: "Operators",
    groupVendors: "Vendors",
    groupEnterprise: "Enterprise",
  },
  contact: {
    folio: "№ 07 — Correspondence",
    sectionLabel: "Replies within one business day",
    eyebrow: "Correspond",
    heading: "Write to ",
    headingItalic: "the desk.",
    salutation: "Dear engineer,",
    body1:
      "Send a brief — site survey requests, BOQs, audits, and full FTTX programmes are all welcome. The note that follows will land on the desk of a senior optical engineer, not a sales inbox.",
    body2:
      "If you prefer, you can reach us by post, by phone, or in person at the addresses below.",
    closing: "— The Editor.",
    formBadge: "A project brief.",
    formNumber: "Form №.07",
    fullName: "Full name",
    company: "Company",
    workEmail: "Work email",
    phone: "Phone",
    serviceRequired: "Service required",
    projectBrief: "Project brief",
    placeholderName: "Ahmed Hassan",
    placeholderCompany: "Vodafone Egypt",
    placeholderEmail: "ahmed@vodafone.com",
    placeholderPhone: "+20 100 000 0000",
    placeholderMessage: "Tell us about scope, locations, timelines, and technical constraints…",
    legal: "Encrypted in transit · No marketing list",
    submit: "Send brief",
    sending: "Sending…",
    success: "thank you.",
    successHeadline: "Brief received.",
    successBody: "A senior engineer will reply within one business day. In the meantime, drawings may be sent to projects@fibercity.eg.",
    submitAnother: "Submit another →",
    operations: "Operations",
    enquiries: "Project enquiries",
    headquarters: "Headquarters",
    hours: "Hours",
    failedHeadline: "Could not send.",
    failedBody: "Please retry in a moment or email projects@fibercity.eg directly.",
    serviceOptions: [
      { value: "Design", label: "Design" },
      { value: "Supply", label: "Supply" },
      { value: "Installation", label: "Installation" },
      { value: "Testing & Maintenance", label: "Testing & Maintenance" },
      { value: "Consultancy", label: "Consultancy" },
      { value: "Other", label: "Other" },
    ],
  },
  workPage: {
    eyebrow: "Selected works",
    title: "Programmes already ",
    titleItalic: "carrying traffic.",
    description:
      "A curated project ledger covering FTTH rollouts, data-centre optical layers, OTDR audit programmes, aerial upgrades, and underground corridors.",
    backToWorks: "Back to works",
    detailLabels: { client: "Client", location: "Location", year: "Year", discipline: "Discipline" },
    relatedWorks: "Related programmes",
    galleryTitle: "Field photography",
    statsTitle: "By the numbers",
    overviewTitle: "Programme overview",
  },
  newsPage: {
    eyebrow: "News & field notes",
    title: "Updates from ",
    titleItalic: "the field.",
    description:
      "Company announcements, engineering notes, and practical guidance from fibre-optic delivery teams working across Egypt.",
    backToNews: "Back to news",
    relatedArticles: "Related field notes",
    readMin: "min read",
    publishedOn: "Published on",
  },
  aboutPage: {
    eyebrow: "About Fiber City",
    title: "The team building Egypt's ",
    titleItalic: "optical backbone.",
    description:
      "Fiber City is a specialist fibre-optic infrastructure partner for telecom operators, enterprises, real-estate developers, data centres, and government programmes.",
    missionLabel: "Mission",
    missionHeading: "Turn complex fibre programmes into predictable, measurable delivery.",
    missionBody:
      "We design routes, source materials, supervise civil readiness, pull and splice cable, test optical performance, and deliver the documentation needed for operators to activate, maintain, and scale their networks.",
    valueProps: ["ISO-aligned QA", "Egypt-wide coverage", "Bilingual documentation"],
    values: [
      {
        title: "Engineering accountability",
        body: "One team owns survey, design, installation, testing, documentation, and maintenance handover.",
      },
      {
        title: "Telecom-grade delivery",
        body: "OTDR traces, splice ledgers, labelling packs, material evidence, and acceptance notes are part of the build.",
      },
      {
        title: "Field-proven teams",
        body: "Senior engineers lead the field crews, not just the proposal. Every plan is checked against real installation constraints.",
      },
    ],
  },
  contactPage: {
    eyebrow: "Contact",
    title: "Tell us where the ",
    titleItalic: "light needs to go.",
    description:
      "Send a project brief, audit request, maintenance ticket, or BOQ requirement. A senior engineer will reply within one business day.",
  },
  footer: {
    nameplate: "Fiber",
    tagline: "A journal of fiber optic infrastructure, from Cairo.",
    description:
      "Egypt's end-to-end fiber optic infrastructure partner. We design, supply, install and maintain the optical networks that quietly carry the country's every signal.",
    available: "Available for new programmes",
    sections: "Sections",
    studio: "Studio",
    colophon: "Colophon",
    rights: "© Fiber City Egypt. All rights reserved.",
    sectionsLinks: [
      { label: "About", href: "/about" },
      { label: "Works", href: "/work" },
      { label: "News", href: "/news" },
      { label: "Services", href: "/#services" },
      { label: "Contact", href: "/contact" },
    ],
    studioLinks: [
      { label: "Smart Village, Building B12", href: "/contact" },
      { label: "Cairo, Egypt — 30.0444° N", href: "/contact" },
      { label: "+20 2 1234 5678", href: "tel:+20212345678" },
      { label: "projects@fibercity.eg", href: "mailto:projects@fibercity.eg" },
    ],
    colophonLinks: [
      { label: "Admin Dashboard", href: "/admin" },
      { label: "Vol. IX · Cairo Edition", href: "/" },
      { label: "ISO 9001 · 14001 · 45001 aligned", href: "/about" },
      { label: "Made in Cairo, for the world", href: "/about" },
    ],
  },
  admin: {
    appName: "Fiber City CMS",
    overview: "Overview",
    content: "Site content",
    pages: "Pages",
    works: "Works",
    news: "News",
    customers: "Customers",
    services: "Services",
    partners: "Partners",
    stats: "Statistics",
    media: "Media",
    messages: "Messages",
    analytics: "Analytics",
    settings: "Settings",
    collapse: "Collapse",
    expand: "Expand",
    search: "Search content...",
    newItem: "New item",
    save: "Save",
    saving: "Saving…",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    publish: "Publish",
    draft: "Draft",
    published: "Published",
    confirm: "Confirm",
    confirmDelete: "Delete this item?",
    saved: "Saved",
    saveFailed: "Could not save",
    deleted: "Deleted",
    deleteFailed: "Could not delete",
    notFound: "Not found",
    visitsThisWeek: "Visits — last 7 days",
    contentHealth: "Content health",
    monthlyVisits: "Monthly visits",
    publishedWorks: "Published works",
    publishedNews: "Published news",
    clientRecords: "Client records",
    avgHealth: "Avg client health",
    pendingMessages: "Pending messages",
    fibreLaid: "Fibre laid",
    completionRate: "First-time pass",
    seoMetadata: "SEO metadata",
    arabicCoverage: "Arabic coverage",
    imageCoverage: "Image coverage",
    publishRate: "Published rate",
    topPages: "Top pages",
    recentMessages: "Recent messages",
    recentWorks: "Recently updated works",
    recentNews: "Recently updated news",
    quickActions: "Quick actions",
    addWork: "Add a project",
    addNews: "Add a news post",
    inboxTitle: "Project briefs inbox",
    markRead: "Mark as read",
    markArchived: "Archive",
    markNew: "Mark as new",
    reply: "Reply",
    tierEnterprise: "enterprise",
    totalInbox: "total inbox",
    refresh: "Refresh",
    visits: "visits",
    views: "views",
    records: "records",
    titleCol: "Title",
    detailsCol: "Details",
    tagCol: "Category",
    statusCol: "Status",
    viewsCol: "Views",
    searchHint: "Filtering by",
    quickActionsBody: "Common moves at your fingertips",
    empty: "No records yet",
    from: "From",
    subject: "Subject",
    date: "Received",
    actions: "Actions",
    statusCell: "Status",
    fields: {
      titleEN: "Title (EN)",
      titleAR: "Title (AR)",
      excerptEN: "Excerpt (EN)",
      excerptAR: "Excerpt (AR)",
      contentEN: "Content (EN) — one paragraph per line",
      contentAR: "Content (AR) — one paragraph per line",
      coverImage: "Cover image",
      gallery: "Gallery — one URL per line",
      category: "Category",
      client: "Client",
      locationEN: "Location (EN)",
      locationAR: "Location (AR)",
      year: "Year",
      stats: "Stats — one per line as label_en | label_ar | value",
      status: "Status",
      sortOrder: "Sort order",
      slug: "Slug",
      nameEN: "Name (EN)",
      nameAR: "Name (AR)",
      industryEN: "Industry (EN)",
      industryAR: "Industry (AR)",
      tier: "Tier",
      regionEN: "Region (EN)",
      regionAR: "Region (AR)",
      descriptionEN: "Description (EN)",
      descriptionAR: "Description (AR)",
      since: "Customer since",
      projectsCount: "Projects count",
      healthScore: "Health score (0-100)",
      contactName: "Primary contact",
      contactEmail: "Contact email",
      contactPhone: "Contact phone",
      featured: "Featured",
      icon: "Icon (lucide-react name)",
      bulletsEN: "Bullets (EN) — one per line",
      bulletsAR: "Bullets (AR) — one per line",
      group: "Group (EN)",
      groupAR: "Group (AR)",
      type: "Type (EN)",
      typeAR: "Type (AR)",
      website: "Website URL",
      value: "Value",
      suffixEN: "Suffix (EN)",
      suffixAR: "Suffix (AR)",
      labelEN: "Label (EN)",
      labelAR: "Label (AR)",
      helperEN: "Helper text (EN)",
      helperAR: "Helper text (AR)",
      author: "Author",
      readMinutes: "Read minutes",
      publishedAt: "Published at",
      categoryEN: "Category (EN)",
      categoryAR: "Category (AR)",
    },
    settingsGroups: {
      brand: "Brand",
      contact: "Contact",
      social: "Social",
      seo: "SEO",
      general: "General",
      brandHint: "Brand name and tagline used across the site.",
      contactHint: "Contact info shown publicly and in JSON-LD schema.",
      socialHint: "Social profile URLs surfaced in schema.org sameAs.",
      seoHint: "Site-wide SEO defaults: title, description, keywords, OG image, verification IDs and JSON-LD signals.",
    },
  },
}

const ar: Dictionary = {
  meta: {
    homeTitle: "فايبر سيتي — حلول بنية تحتية للألياف الضوئية في مصر",
    homeDescription:
      "فايبر سيتي تصمّم وتورّد وتركّب وتصون شبكات الألياف الضوئية في مصر. شريك موثوق لفودافون وWE وأورانج وهواوي في تنفيذ FTTX وGPON من البداية للنهاية.",
    workTitle: "أعمالنا — فايبر سيتي",
    newsTitle: "الأخبار — فايبر سيتي",
    aboutTitle: "من نحن — فايبر سيتي",
    contactTitle: "اتصل بنا — فايبر سيتي",
    adminTitle: "لوحة التحكم — فايبر سيتي",
  },
  nav: {
    home: "الرئيسية",
    about: "من نحن",
    services: "الخدمات",
    works: "أعمالنا",
    news: "الأخبار",
    contact: "اتصل بنا",
    getQuote: "اطلب عرض سعر",
    primaryNav: "القائمة الرئيسية",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    languageEN: "EN",
    languageAR: "AR",
    toggleTheme: "تبديل الوضع الداكن",
  },
  hero: {
    pill: "بنية تحتية للألياف الضوئية",
    pillRegion: "B2B · مصر",
    line1: "الضوء يسري",
    line2a: "عبر ",
    line2b: "الزجاج.",
    line3: "ونحن ننقله",
    line4a: "في كل ",
    line4b: "أنحاء مصر.",
    description:
      "فايبر سيتي تصمّم وتورّد وتركّب وتصون الشبكات الضوئية لأكثر مشغلي الاتصالات والشركات تطلباً في مصر. من أول مسح ميداني إلى آخر لحام — شريك واحد يغطّي الدورة بالكامل.",
    primaryCTA: "ابدأ مشروعاً",
    secondaryCTA: "تصفّح خدماتنا",
    scrollHint: "مرّر للأسفل لمزيد من التفاصيل",
  },
  about: {
    folio: "№ 02 — من نحن",
    sectionLabel: "عن فايبر سيتي",
    heading: "نبني",
    headingHighlight: "العمود الفقري غير المرئي",
    headingTail: "لمصر الحديثة.",
    body: "فايبر سيتي شركة هندسية مصرية متخصصة في البنية التحتية للألياف الضوئية. نتشارك مع مشغّلي الاتصالات ومزوّدي الإنترنت ومراكز البيانات وكبرى شركات التطوير لتنفيذ شبكات ضوئية موثوقة وقابلة للتوسع — من تجمعات FTTH الجديدة إلى تحديث العمود الفقري على مستوى الجمهورية.",
    eyebrow: "مهندس بصري كبير",
    differentiatorsTitle: "لماذا تختارنا الفِرَق",
    pillars: [
      { title: "تكامل من البداية للنهاية", body: "التصميم والتوريد والتركيب والاختبار والصيانة على عاتق فريق واحد مسؤول. لا تحويلات بين أطراف ولا تنصُّل من الالتزام." },
      { title: "خبرة ميدانية صلبة", body: "كل مشروع يقوده مهندسون كبار خاضوا سحب الكوابل ولحام الألياف وقراءة آثار OTDR في ظروف حقيقية." },
      { title: "بمعايير قطاع الاتصالات", body: "نلتزم بمتطلبات الجودة والتوثيق والتعليم التي يطلبها مشغلو الفئة الأولى في الإقليم." },
    ],
    differentiators: [
      "متخصصون في شبكات FTTX وGPON",
      "فِرَق لحام ألياف معتمدة",
      "توثيق مشروعات ثنائي اللغة (عربي/إنجليزي)",
      "اختبارات OTDR وOLTS على كل وصلة",
      "BOQ مهندسة لتقليل التكلفة",
      "تغطية ميدانية على مستوى الجمهورية",
    ],
    isoLabel: "ISO",
    isoValue: "متوافق مع ISO 9001 · 14001 · 45001",
    hqLabel: "المقر",
    hqValue: "القاهرة، مصر",
  },
  services: {
    folio: "№ 03 — الإمكانيات",
    sectionLabel: "الإمكانيات",
    heading: "خمس تخصصات.",
    headingHighlight: "عقد واحد.",
    description:
      "اعتمد علينا في مرحلة واحدة فقط — أو سلّمنا البرنامج كاملاً. نموذجنا للتسليم مرن، لكن المسؤولية موحدة.",
  },
  stats: {
    folio: "№ 04 — السجل",
    sectionLabel: "حتى الإصدار الحالي",
    eyebrow: "بالأرقام",
    heading: "عشر سنوات من ",
    headingItalic: "الضوء",
    headingTail: "، في أرقام.",
    description:
      "هذه ليست مقاييس استعراضية. كل رقم قابل لإعادة الإنتاج من سجل المشاريع الذي نحتفظ به منذ 2014.",
  },
  projects: {
    folio: "№ 05 — ملاحظات ميدانية",
    sectionLabel: "مختارات، وليست حصراً",
    headingTop: "شبكات تحمل بالفعل",
    headingItalic: "حركة المرور",
    headingBottom: "الفعلية.",
    description:
      "سجل حي للبرامج التي نفّذناها. فلتر بالاختصاص لترى نوع الأعمال التي نُكلَّف بها. تتوفر دراسات الحالة التفصيلية عند الطلب وضمن اتفاقية سرية.",
    filterAll: "الكل",
    viewAll: "تصفّح كل الأعمال",
    viewProject: "عرض المشروع",
  },
  partners: {
    folio: "№ 06 — الشبكة",
    sectionLabel: "صفحة الشركاء",
    eyebrow: "الشبكة",
    heading: "الشركات التي ",
    headingItalic: "نبني معها.",
    description: "ممارسة بهذا الحجم تعيش بمن يقف خلفها وأمامها. هؤلاء هم شركاؤنا.",
    groupCount: "ثلاث مجموعات · اثنا عشر اسماً",
    groupOperators: "مشغّلون",
    groupVendors: "موردون",
    groupEnterprise: "شركات",
  },
  contact: {
    folio: "№ 07 — المراسلات",
    sectionLabel: "الردود خلال يوم عمل واحد",
    eyebrow: "تواصل معنا",
    heading: "اكتب إلى ",
    headingItalic: "المكتب.",
    salutation: "عزيزي المهندس،",
    body1:
      "أرسل ملخّص مشروعك — طلبات المسح، حصر الكميات، التدقيق، وبرامج FTTX الكاملة كلها مرحب بها. الرسالة التالية ستصل مباشرة لمكتب مهندس بصري كبير، وليس بريداً للمبيعات.",
    body2: "إذا فضّلت، يمكنك الوصول إلينا بالبريد أو الهاتف أو شخصياً على العناوين أدناه.",
    closing: "— المحرر.",
    formBadge: "ملخّص مشروع.",
    formNumber: "نموذج №.07",
    fullName: "الاسم بالكامل",
    company: "الشركة",
    workEmail: "البريد الإلكتروني للعمل",
    phone: "رقم الهاتف",
    serviceRequired: "الخدمة المطلوبة",
    projectBrief: "ملخّص المشروع",
    placeholderName: "أحمد حسن",
    placeholderCompany: "فودافون مصر",
    placeholderEmail: "ahmed@vodafone.com",
    placeholderPhone: "+20 100 000 0000",
    placeholderMessage: "اشرح لنا النطاق والمواقع والمواعيد والقيود الفنية…",
    legal: "مشفّر أثناء النقل · بدون قوائم تسويق",
    submit: "أرسل الملخّص",
    sending: "جاري الإرسال…",
    success: "شكراً لك.",
    successHeadline: "تم استلام الملخّص.",
    successBody: "سيرد عليك مهندس كبير خلال يوم عمل واحد. ويمكن إرسال الرسومات على projects@fibercity.eg.",
    submitAnother: "أرسل ملخّصاً آخر →",
    operations: "العمليات",
    enquiries: "استفسارات المشاريع",
    headquarters: "المقر الرئيسي",
    hours: "ساعات العمل",
    failedHeadline: "تعذّر الإرسال.",
    failedBody: "حاول مرة أخرى أو راسلنا مباشرة على projects@fibercity.eg.",
    serviceOptions: [
      { value: "Design", label: "تصميم" },
      { value: "Supply", label: "توريد" },
      { value: "Installation", label: "تركيب" },
      { value: "Testing & Maintenance", label: "اختبار وصيانة" },
      { value: "Consultancy", label: "استشارات" },
      { value: "Other", label: "أخرى" },
    ],
  },
  workPage: {
    eyebrow: "مختارات من أعمالنا",
    title: "برامج تحمل بالفعل ",
    titleItalic: "حركة المرور.",
    description:
      "سجل مشاريع منتقى يشمل تنفيذ FTTH، والطبقة البصرية لمراكز البيانات، وبرامج تدقيق OTDR، وتحديثات الكابلات الهوائية، والممرات تحت الأرض.",
    backToWorks: "العودة للأعمال",
    detailLabels: { client: "العميل", location: "الموقع", year: "السنة", discipline: "التخصص" },
    relatedWorks: "أعمال ذات صلة",
    galleryTitle: "صور ميدانية",
    statsTitle: "بالأرقام",
    overviewTitle: "نظرة عامة على البرنامج",
  },
  newsPage: {
    eyebrow: "أخبار وملاحظات ميدانية",
    title: "تحديثات من ",
    titleItalic: "الميدان.",
    description:
      "إعلانات الشركة، وملاحظات هندسية، وإرشادات عملية من فِرَق تنفيذ الألياف الضوئية في مختلف أنحاء مصر.",
    backToNews: "العودة للأخبار",
    relatedArticles: "ملاحظات ذات صلة",
    readMin: "دقائق قراءة",
    publishedOn: "نُشر في",
  },
  aboutPage: {
    eyebrow: "عن فايبر سيتي",
    title: "الفريق الذي يبني ",
    titleItalic: "العمود الفقري البصري لمصر.",
    description:
      "فايبر سيتي شريك متخصص في البنية التحتية للألياف الضوئية لمشغّلي الاتصالات والشركات وكبرى التطوير العقاري ومراكز البيانات والبرامج الحكومية.",
    missionLabel: "المهمة",
    missionHeading: "نحوّل برامج الألياف المعقّدة إلى تسليم قابل للتنبؤ والقياس.",
    missionBody:
      "نصمّم المسارات ونوفّر المواد ونشرف على جاهزية الأعمال المدنية ونسحب الكابلات ونلحمها ونختبر الأداء البصري ونسلّم الوثائق اللازمة للمشغّلين لتشغيل شبكاتهم وصيانتها وتوسعتها.",
    valueProps: ["مطابق لمعايير ISO", "تغطية على مستوى الجمهورية", "وثائق ثنائية اللغة"],
    values: [
      {
        title: "مسؤولية هندسية",
        body: "فريق واحد يتولى المسح والتصميم والتركيب والاختبار والتوثيق وتسليم الصيانة.",
      },
      {
        title: "تسليم بمعايير قطاع الاتصالات",
        body: "آثار OTDR وسجلات اللحام وحزم التعريف وشهادات المواد ومحاضر القبول جزء أصيل من التنفيذ.",
      },
      {
        title: "فِرَق ميدانية مُختبَرة",
        body: "يقود المهندسون الكبار الفِرَق ميدانياً لا في الورق فقط، وتُختبر كل خطة على القيود الفعلية للتركيب.",
      },
    ],
  },
  contactPage: {
    eyebrow: "اتصل بنا",
    title: "أخبرنا إلى أين يجب أن يصل ",
    titleItalic: "الضوء.",
    description:
      "أرسل ملخّص مشروع، أو طلب تدقيق، أو تذكرة صيانة، أو طلب حصر كميات. سيرد عليك مهندس كبير خلال يوم عمل واحد.",
  },
  footer: {
    nameplate: "فايبر",
    tagline: "مجلة بنية تحتية للألياف الضوئية، من القاهرة.",
    description:
      "شريك مصر المتكامل في البنية التحتية للألياف الضوئية. نصمّم ونورّد ونركّب ونصون الشبكات الضوئية التي تحمل بهدوء كل إشارة في البلاد.",
    available: "متاحون لمشاريع جديدة",
    sections: "أقسام الموقع",
    studio: "الاستوديو",
    colophon: "معلومات",
    rights: "© فايبر سيتي مصر. جميع الحقوق محفوظة.",
    sectionsLinks: [
      { label: "من نحن", href: "/about" },
      { label: "أعمالنا", href: "/work" },
      { label: "الأخبار", href: "/news" },
      { label: "الخدمات", href: "/#services" },
      { label: "اتصل بنا", href: "/contact" },
    ],
    studioLinks: [
      { label: "القرية الذكية، مبنى B12", href: "/contact" },
      { label: "القاهرة، مصر — 30.0444° شمالاً", href: "/contact" },
      { label: "+20 2 1234 5678", href: "tel:+20212345678" },
      { label: "projects@fibercity.eg", href: "mailto:projects@fibercity.eg" },
    ],
    colophonLinks: [
      { label: "لوحة التحكم", href: "/admin" },
      { label: "العدد التاسع · إصدار القاهرة", href: "/" },
      { label: "متوافقون مع ISO 9001 · 14001 · 45001", href: "/about" },
      { label: "صُنع في القاهرة، للعالم", href: "/about" },
    ],
  },
  admin: {
    appName: "نظام إدارة فايبر سيتي",
    overview: "نظرة عامة",
    content: "محتوى الموقع",
    pages: "الصفحات",
    works: "الأعمال",
    news: "الأخبار",
    customers: "العملاء",
    services: "الخدمات",
    partners: "الشركاء",
    stats: "الإحصائيات",
    media: "الوسائط",
    messages: "الرسائل",
    analytics: "التحليلات",
    settings: "الإعدادات",
    collapse: "طيّ",
    expand: "توسيع",
    search: "ابحث في المحتوى...",
    newItem: "عنصر جديد",
    save: "حفظ",
    saving: "جاري الحفظ…",
    cancel: "إلغاء",
    edit: "تعديل",
    delete: "حذف",
    publish: "نشر",
    draft: "مسودة",
    published: "منشور",
    confirm: "تأكيد",
    confirmDelete: "هل تريد حذف هذا العنصر؟",
    saved: "تم الحفظ",
    saveFailed: "فشل الحفظ",
    deleted: "تم الحذف",
    deleteFailed: "فشل الحذف",
    notFound: "غير موجود",
    visitsThisWeek: "الزيارات — آخر 7 أيام",
    contentHealth: "صحة المحتوى",
    monthlyVisits: "الزيارات الشهرية",
    publishedWorks: "أعمال منشورة",
    publishedNews: "أخبار منشورة",
    clientRecords: "سجلات العملاء",
    avgHealth: "متوسط صحة العملاء",
    pendingMessages: "رسائل غير مقروءة",
    fibreLaid: "ألياف ممدودة",
    completionRate: "اجتياز من المرة الأولى",
    seoMetadata: "بيانات SEO",
    arabicCoverage: "تغطية اللغة العربية",
    imageCoverage: "تغطية الصور",
    publishRate: "نسبة المنشور",
    topPages: "أعلى الصفحات",
    recentMessages: "آخر الرسائل",
    recentWorks: "أعمال محدّثة مؤخراً",
    recentNews: "أخبار محدّثة مؤخراً",
    quickActions: "إجراءات سريعة",
    addWork: "أضف مشروعاً",
    addNews: "أضف خبراً",
    inboxTitle: "صندوق ملخّصات المشاريع",
    markRead: "تعليم كمقروء",
    markArchived: "أرشفة",
    markNew: "تعليم كجديد",
    reply: "رد",
    tierEnterprise: "مؤسسات",
    totalInbox: "إجمالي الصندوق",
    refresh: "تحديث",
    visits: "زيارة",
    views: "مشاهدة",
    records: "سجل",
    titleCol: "العنوان",
    detailsCol: "التفاصيل",
    tagCol: "الفئة",
    statusCol: "الحالة",
    viewsCol: "المشاهدات",
    searchHint: "تصفية حسب",
    quickActionsBody: "أوامر سريعة في متناول يدك",
    empty: "لا توجد سجلات بعد",
    from: "المرسل",
    subject: "الموضوع",
    date: "تاريخ الوصول",
    actions: "إجراءات",
    statusCell: "الحالة",
    fields: {
      titleEN: "العنوان (EN)",
      titleAR: "العنوان (AR)",
      excerptEN: "مقتطف (EN)",
      excerptAR: "مقتطف (AR)",
      contentEN: "المحتوى (EN) — فقرة بكل سطر",
      contentAR: "المحتوى (AR) — فقرة بكل سطر",
      coverImage: "صورة الغلاف",
      gallery: "المعرض — رابط بكل سطر",
      category: "الفئة",
      client: "العميل",
      locationEN: "الموقع (EN)",
      locationAR: "الموقع (AR)",
      year: "السنة",
      stats: "إحصائيات — كل سطر: label_en | label_ar | value",
      status: "الحالة",
      sortOrder: "الترتيب",
      slug: "المعرّف (slug)",
      nameEN: "الاسم (EN)",
      nameAR: "الاسم (AR)",
      industryEN: "القطاع (EN)",
      industryAR: "القطاع (AR)",
      tier: "الفئة",
      regionEN: "المنطقة (EN)",
      regionAR: "المنطقة (AR)",
      descriptionEN: "الوصف (EN)",
      descriptionAR: "الوصف (AR)",
      since: "عميل منذ",
      projectsCount: "عدد المشاريع",
      healthScore: "نتيجة الصحة (0-100)",
      contactName: "جهة الاتصال",
      contactEmail: "بريد جهة الاتصال",
      contactPhone: "هاتف جهة الاتصال",
      featured: "مميز",
      icon: "الأيقونة (اسم من lucide-react)",
      bulletsEN: "نقاط (EN) — سطر بكل نقطة",
      bulletsAR: "نقاط (AR) — سطر بكل نقطة",
      group: "المجموعة (EN)",
      groupAR: "المجموعة (AR)",
      type: "النوع (EN)",
      typeAR: "النوع (AR)",
      website: "رابط الموقع",
      value: "القيمة",
      suffixEN: "اللاحقة (EN)",
      suffixAR: "اللاحقة (AR)",
      labelEN: "التسمية (EN)",
      labelAR: "التسمية (AR)",
      helperEN: "نص توضيحي (EN)",
      helperAR: "نص توضيحي (AR)",
      author: "الكاتب",
      readMinutes: "دقائق القراءة",
      publishedAt: "تاريخ النشر",
      categoryEN: "الفئة (EN)",
      categoryAR: "الفئة (AR)",
    },
    settingsGroups: {
      brand: "العلامة",
      contact: "التواصل",
      social: "السوشيال",
      seo: "SEO",
      general: "عام",
      brandHint: "اسم وشعار العلامة المستخدمة في الموقع.",
      contactHint: "بيانات التواصل التي تظهر للزوار وفي مخططات JSON-LD.",
      socialHint: "روابط حسابات السوشيال للموقع.",
      seoHint: "إعدادات SEO العامة: العناوين، الوصف، الكلمات الدلالية، صورة المشاركة، وتحقق محركات البحث، وإشارات JSON-LD.",
    },
  },
}

export const DICTIONARIES: Record<Locale, Dictionary> = { en, ar }

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale] ?? DICTIONARIES.en
}

export const DEFAULT_LOCALE: Locale = "en"
