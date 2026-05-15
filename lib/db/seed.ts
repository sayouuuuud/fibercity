import type Database from "better-sqlite3"
import { randomUUID } from "node:crypto"

// Helper to generate stable id from slug
function id(prefix: string, slug: string): string {
  return `${prefix}_${slug.replace(/[^a-z0-9]/gi, "_").slice(0, 40)}`
}

const now = () => new Date().toISOString()

const WORKS = [
  {
    slug: "new-cairo-ftth-backbone",
    title_en: "New Cairo FTTH Backbone",
    title_ar: "العمود الفقري للألياف الضوئية في القاهرة الجديدة",
    excerpt_en:
      "Greenfield FTTH rollout across fourteen residential clusters with design, splicing, and acceptance testing delivered in eleven months.",
    excerpt_ar:
      "تنفيذ شبكة ألياف ضوئية حتى المنزل في أربعة عشر تجمعاً سكنياً، شامل التصميم واللحام واختبارات القبول خلال أحد عشر شهراً.",
    content_en: [
      "Fiber City delivered a turnkey FTTH backbone for a high-density residential programme in New Cairo, covering design validation, route surveys, duct readiness, cable pulling, fusion splicing, OTDR testing, and handover packs.",
      "The operating model combined a central PMO with distributed field teams, enabling phased releases without delaying civil works or customer activation windows.",
      "Every link was submitted with trace files, splice sheets, labelling schedules, and as-built drawings so the operator could move directly into acceptance and activation.",
    ],
    content_ar: [
      "قدّمت فايبر سيتي عموداً فقرياً متكاملاً للألياف الضوئية لبرنامج سكني عالي الكثافة في القاهرة الجديدة، شاملاً التحقق من التصميم ومسوحات المسارات وجاهزية القنوات وسحب الكابلات واللحام بالاندماج واختبارات OTDR وحزم التسليم.",
      "اعتمد نموذج التشغيل على مكتب إدارة مشاريع مركزي وفِرَق ميدانية موزعة، مما أتاح إصدارات تدريجية دون تأخير الأعمال المدنية أو نوافذ تنشيط العملاء.",
      "كل وصلة تم تسليمها بملفات تتبع وسجلات لحام وجداول ترقيم ورسومات تنفيذية حتى يستطيع المشغل الانتقال مباشرة إلى القبول والتشغيل.",
    ],
    client: "Vodafone Egypt",
    category: "Installation",
    location_en: "New Cairo",
    location_ar: "القاهرة الجديدة",
    year: "2024",
    cover_image: "/images/project-1.jpg",
    gallery: ["/images/project-1.jpg", "/images/fiber-strand-macro.jpg", "/images/glass-strands.jpg"],
    stats: [
      { label_en: "Homes passed", label_ar: "وحدات مغطاة", value: "32,500" },
      { label_en: "Fibre laid", label_ar: "ألياف ممدودة", value: "612 km" },
      { label_en: "Clusters", label_ar: "تجمعات سكنية", value: "14" },
    ],
  },
  {
    slug: "tier-iii-data-centre-buildout",
    title_en: "Tier-III Data Centre Build-out",
    title_ar: "إنشاء مركز بيانات من فئة Tier-III",
    excerpt_en:
      "Structured optical supply and installation for a Tier-III facility, including MPO trunks, patch panels, and full test documentation.",
    excerpt_ar:
      "توريد وتركيب بصري منظم لمنشأة Tier-III، شاملاً كابلات MPO ولوحات التوصيل وكامل وثائق الاختبار.",
    content_en: [
      "The project required a controlled delivery process for high-density optical links in a live data centre environment where documentation and cleanliness were as critical as installation speed.",
      "Fiber City supplied and installed MPO trunks, single-mode and multimode patching, labelled distribution panels, and acceptance-ready trace reports.",
      "The final package gave the operations team a clean, traceable network layer that can scale as halls and tenants expand.",
    ],
    content_ar: [
      "تطلّب المشروع عملية تسليم محكمة لوصلات بصرية عالية الكثافة داخل بيئة مركز بيانات تشغيلية حيث كانت التوثيق والنظافة بنفس أهمية سرعة التركيب.",
      "وفّرت فايبر سيتي وثبّتت كابلات MPO ووصلات أحادية ومتعددة الأوضاع، ولوحات توزيع مرقّمة، وتقارير تتبع جاهزة للقبول.",
      "أعطت الحزمة النهائية لفريق العمليات طبقة شبكة نظيفة وقابلة للتتبع تتوسع مع نمو الصالات والمستأجرين.",
    ],
    client: "WE — Telecom Egypt",
    category: "Supply",
    location_en: "Smart Village",
    location_ar: "القرية الذكية",
    year: "2024",
    cover_image: "/images/project-2.jpg",
    gallery: ["/images/project-2.jpg", "/images/glass-detail.jpg", "/images/engineer.jpg"],
    stats: [
      { label_en: "Cabinets", label_ar: "خزائن", value: "240" },
      { label_en: "MPO links", value: "4,800", label_ar: "وصلات MPO" },
      { label_en: "Handover files", value: "100%", label_ar: "ملفات التسليم" },
    ],
  },
  {
    slug: "nationwide-otdr-audit-programme",
    title_en: "Nationwide OTDR Audit Programme",
    title_ar: "برنامج تدقيق OTDR على المستوى الوطني",
    excerpt_en:
      "Bi-directional OTDR and OLTS audit of existing links across eight governorates with documented remediation and re-acceptance.",
    excerpt_ar:
      "تدقيق ثنائي الاتجاه بأجهزة OTDR وOLTS لشبكات قائمة عبر ثماني محافظات، مع توثيق الإصلاحات وإعادة القبول.",
    content_en: [
      "A nationwide audit programme was commissioned to identify hidden attenuation, splice loss, and documentation gaps across an ageing fibre estate.",
      "Fiber City deployed multiple senior teams to test each route, classify defects, produce remediation plans, and verify repaired links against operator thresholds.",
      "The resulting asset ledger became the client reference for future maintenance, route upgrades, and SLA reporting.",
    ],
    content_ar: [
      "تم تكليفنا ببرنامج تدقيق وطني للكشف عن التوهين الخفي وفقد اللحام والثغرات الوثائقية في شبكة ألياف متقادمة.",
      "نشرت فايبر سيتي فِرَق هندسية كبرى لاختبار كل مسار وتصنيف العيوب وإعداد خطط الإصلاح والتحقق من الوصلات المُعالَجة وفق حدود المشغل.",
      "أصبح سجل الأصول الناتج هو المرجع الرسمي للعميل لأعمال الصيانة المستقبلية وترقيات المسارات وتقارير اتفاقيات الخدمة.",
    ],
    client: "Huawei",
    category: "Maintenance",
    location_en: "Eight Governorates",
    location_ar: "ثماني محافظات",
    year: "2023",
    cover_image: "/images/project-3.jpg",
    gallery: ["/images/project-3.jpg", "/images/editorial-engineer.jpg", "/images/fiber-bundle-light.jpg"],
    stats: [
      { label_en: "Links tested", value: "1,260", label_ar: "وصلات تم اختبارها" },
      { label_en: "Remediated", value: "97%", label_ar: "تم إصلاحها" },
      { label_en: "Governorates", value: "8", label_ar: "محافظات" },
    ],
  },
  {
    slug: "aerial-backbone-upgrade",
    title_en: "Aerial Backbone Upgrade",
    title_ar: "تحديث العمود الفقري الهوائي",
    excerpt_en:
      "Replacement of legacy aerial fibre with ADSS along strategic arterial roads, including pole hardware refresh and acceptance testing.",
    excerpt_ar:
      "استبدال الألياف الهوائية القديمة بكابلات ADSS على طرق رئيسية، شامل تحديث معدات الأعمدة واختبارات القبول.",
    content_en: [
      "The upgrade replaced ageing aerial routes with ADSS cable and new pole hardware while maintaining operator continuity during constrained work windows.",
      "Crews coordinated traffic, pole access, cable dressing, splicing, and final measurements under a single daily production plan.",
      "The route now supports higher capacity and easier maintenance across a key corridor in Alexandria.",
    ],
    content_ar: [
      "استبدل التحديث المسارات الهوائية القديمة بكابلات ADSS ومعدات أعمدة جديدة مع الحفاظ على استمرارية تشغيل المشغّل خلال نوافذ عمل ضيقة.",
      "نسّقت الفِرَق المرور والوصول للأعمدة وتنظيم الكابلات واللحام والقياسات النهائية ضمن خطة إنتاج يومية موحّدة.",
      "أصبح المسار يدعم سعات أكبر وصيانة أسهل عبر ممر رئيسي في الإسكندرية.",
    ],
    client: "Orange Egypt",
    category: "Installation",
    location_en: "Alexandria",
    location_ar: "الإسكندرية",
    year: "2023",
    cover_image: "/images/project-4.jpg",
    gallery: ["/images/project-4.jpg", "/images/hero-fiber.jpg", "/images/editorial-hero.jpg"],
    stats: [
      { label_en: "Pole sites", value: "1,420", label_ar: "مواقع أعمدة" },
      { label_en: "Route length", value: "84 km", label_ar: "طول المسار" },
      { label_en: "Outage hours", value: "0", label_ar: "ساعات انقطاع" },
    ],
  },
  {
    slug: "industrial-park-network-design",
    title_en: "Industrial Park Network Design",
    title_ar: "تصميم شبكة لمجمع صناعي",
    excerpt_en:
      "Survey, BOQ, labelling, and resilient ring topology for an industrial park spanning 2.4 km² with multi-tenant requirements.",
    excerpt_ar:
      "مسح ميداني وحصر كميات وترقيم وطوبولوجيا حلقية مرنة لمجمع صناعي مساحته 2.4 كم² بمتطلبات متعددة المستأجرين.",
    content_en: [
      "Fiber City designed the optical network for a mixed-use industrial park requiring redundant connectivity, clear tenant demarcation, and practical installation packages.",
      "The team produced survey reports, route drawings, BOQs, labelling rules, and a deployment plan aligned with phased tenant handover.",
      "The final design reduces future operational ambiguity while keeping the build cost optimized.",
    ],
    content_ar: [
      "صمّمت فايبر سيتي الشبكة البصرية لمجمع صناعي متعدد الاستخدامات يتطلّب اتصالاً احتياطياً وفصلاً واضحاً بين المستأجرين وحزم تنفيذ عملية.",
      "أنجز الفريق تقارير المسح ورسومات المسار وحصر الكميات وقواعد الترقيم وخطة نشر متوافقة مع تسليم المستأجرين على مراحل.",
      "يقلل التصميم النهائي الغموض التشغيلي مستقبلاً مع الإبقاء على تكلفة البناء مُحسَّنة.",
    ],
    client: "Confidential Developer",
    category: "Design",
    location_en: "Suez",
    location_ar: "السويس",
    year: "2024",
    cover_image: "/images/project-5.jpg",
    gallery: ["/images/project-5.jpg", "/images/fiber-strand-macro.jpg", "/images/project-2.jpg"],
    stats: [
      { label_en: "Topology", value: "Dual ring", label_ar: "طوبولوجيا" },
      { label_en: "Tenants", value: "38", label_ar: "مستأجرين" },
      { label_en: "Area", value: "2.4 km²", label_ar: "المساحة" },
    ],
  },
  {
    slug: "underground-duct-programme",
    title_en: "Underground Duct Programme",
    title_ar: "برنامج القنوات تحت الأرض",
    excerpt_en:
      "Trenching, ducting, and pulling underground fibre across a dense urban corridor with coordinated civil and telecom delivery.",
    excerpt_ar:
      "حفر وخطوط قنوات وسحب ألياف تحت الأرض عبر ممر حضري مزدحم بتنسيق مدني واتصالات متكامل.",
    content_en: [
      "This programme combined civil coordination, duct readiness checks, cable pulling, closures, and final acceptance across a sensitive urban route.",
      "Fiber City managed daily permits, safety controls, cable protection, and documentation so the client could activate without rework.",
      "The resulting corridor strengthened fixed broadband coverage while preserving service continuity.",
    ],
    content_ar: [
      "جمع البرنامج بين التنسيق المدني والتحقق من جاهزية القنوات وسحب الكابلات والإغلاقات والقبول النهائي عبر مسار حضري حسّاس.",
      "أدارت فايبر سيتي التصاريح اليومية وضوابط السلامة وحماية الكابلات والتوثيق حتى يتمكن العميل من التشغيل دون أعمال إعادة.",
      "عزّز الممر الناتج تغطية النطاق العريض الثابت مع الحفاظ على استمرارية الخدمة.",
    ],
    client: "Telecom Egypt",
    category: "Installation",
    location_en: "Cairo",
    location_ar: "القاهرة",
    year: "2022",
    cover_image: "/images/project-6.jpg",
    gallery: ["/images/project-6.jpg", "/images/glass-strands.jpg", "/images/engineer.jpg"],
    stats: [
      { label_en: "Conduit", value: "26 km", label_ar: "قنوات" },
      { label_en: "Outage", value: "0 h", label_ar: "انقطاع" },
      { label_en: "Handover", value: "As-built", label_ar: "التسليم" },
    ],
  },
] as const

const NEWS = [
  {
    slug: "fiber-city-opens-cairo-network-operations-desk",
    title_en: "Fiber City opens Cairo network operations desk",
    title_ar: "فايبر سيتي تفتتح مكتب عمليات الشبكة في القاهرة",
    excerpt_en:
      "A dedicated operations function now centralizes project reporting, maintenance requests, and emergency dispatch for nationwide fibre programmes.",
    excerpt_ar:
      "وحدة عمليات مخصصة تركّز الآن تقارير المشاريع وطلبات الصيانة وإيفاد الطوارئ لكافة برامج الألياف على المستوى الوطني.",
    content_en: [
      "Fiber City has launched a Cairo-based network operations desk to give enterprise and telecom clients a single point of control for active projects and maintenance requests.",
      "The desk combines dispatch coordination, incident triage, documentation control, and daily field reporting across live programmes.",
      "The initiative is part of the company mission to make fibre delivery more transparent, measurable, and accountable.",
    ],
    content_ar: [
      "أطلقت فايبر سيتي مكتب عمليات شبكة في القاهرة ليمنح عملاء الشركات والاتصالات نقطة تحكم واحدة في المشاريع النشطة وطلبات الصيانة.",
      "يجمع المكتب بين تنسيق الإيفاد وفرز الحوادث وضبط التوثيق والتقارير اليومية الميدانية لكل البرامج الحية.",
      "تأتي المبادرة ضمن مهمة الشركة لجعل تنفيذ الألياف أكثر شفافية وقياساً ومحاسبة.",
    ],
    category_en: "Company",
    category_ar: "أخبار الشركة",
    author: "Fiber City Editorial",
    published_at: "2026-04-18T08:00:00.000Z",
    read_minutes: 4,
    cover_image: "/images/editorial-hero.jpg",
  },
  {
    slug: "how-to-prepare-fttx-handover-documents",
    title_en: "How to prepare FTTX handover documents operators can actually use",
    title_ar: "كيف تُجهِّز وثائق تسليم FTTX يستطيع المشغّل فعلاً استخدامها",
    excerpt_en:
      "A practical field note on splice sheets, OTDR traces, labelling schedules, and the acceptance files that reduce operational ambiguity.",
    excerpt_ar:
      "ملاحظة ميدانية عملية حول سجلات اللحام وتتبع OTDR وجداول الترقيم وملفات القبول التي تقلل الغموض التشغيلي.",
    content_en: [
      "Useful handover documentation is not paperwork after the project. It is the operating manual for the next decade of maintenance and expansion.",
      "At minimum, every FTTX handover should include route drawings, splice sheets, port schedules, OTDR traces, power budgets, material certificates, and photo evidence.",
      "The biggest improvement comes from agreeing the document structure before work starts so field teams capture the correct information as they build.",
    ],
    content_ar: [
      "وثائق التسليم المفيدة ليست أوراقاً بعد المشروع. إنها دليل التشغيل لعقد كامل من الصيانة والتوسعة.",
      "كل تسليم FTTX يجب أن يشمل كحد أدنى رسومات المسار وسجلات اللحام وجداول المنافذ وتتبع OTDR وميزانية الطاقة وشهادات المواد وأدلة الصور.",
      "أكبر تحسّن يأتي من الاتفاق على بنية الوثائق قبل بدء العمل لتجمع الفِرَق المعلومات الصحيحة أثناء التنفيذ.",
    ],
    category_en: "Field Notes",
    category_ar: "ملاحظات ميدانية",
    author: "Engineering Team",
    published_at: "2026-03-27T08:00:00.000Z",
    read_minutes: 6,
    cover_image: "/images/editorial-engineer.jpg",
  },
  {
    slug: "adss-backbone-upgrades-in-coastal-cities",
    title_en: "ADSS backbone upgrades in coastal cities",
    title_ar: "تحديثات العمود الفقري ADSS في المدن الساحلية",
    excerpt_en:
      "Lessons from upgrading exposed aerial routes where wind, salt, traffic, and narrow work windows all shape the installation plan.",
    excerpt_ar:
      "دروس من تحديث المسارات الهوائية المكشوفة حيث تشكّل الرياح والملوحة والمرور ونوافذ العمل الضيقة خطة التركيب.",
    content_en: [
      "Coastal aerial routes demand more than simple cable replacement. Hardware selection, sag calculations, pole readiness, and working windows all determine long-term reliability.",
      "Fiber City teams use pre-survey scoring to classify poles, identify route hazards, and reduce stoppages during installation.",
      "The result is a safer build and a network that stays accessible for future inspection and repair.",
    ],
    content_ar: [
      "تحتاج المسارات الساحلية الهوائية أكثر من مجرّد استبدال كابل. اختيار المعدات وحسابات الترخي وجاهزية الأعمدة ونوافذ العمل كلها تحدد الموثوقية على المدى الطويل.",
      "تستخدم فِرَق فايبر سيتي تقييماً قبلياً لتصنيف الأعمدة وتحديد مخاطر المسار وتقليل التوقفات أثناء التركيب.",
      "النتيجة هي بناء أكثر أماناً وشبكة تظل متاحة للفحص والإصلاح مستقبلاً.",
    ],
    category_en: "Infrastructure",
    category_ar: "البنية التحتية",
    author: "Outside Plant Unit",
    published_at: "2026-02-12T08:00:00.000Z",
    read_minutes: 5,
    cover_image: "/images/project-4.jpg",
  },
] as const

const CUSTOMERS = [
  {
    slug: "vodafone-egypt",
    name_en: "Vodafone Egypt",
    name_ar: "فودافون مصر",
    industry_en: "Telecom",
    industry_ar: "اتصالات",
    tier: "Enterprise",
    region_en: "Nationwide",
    region_ar: "على مستوى الجمهورية",
    description_en:
      "Tier-1 mobile operator and long-term framework partner across FTTX and backhaul programmes.",
    description_ar:
      "مشغّل اتصالات Tier-1 وشريك إطاري طويل المدى عبر برامج FTTX والبنية الخلفية.",
    since: "2016",
    projects_count: 184,
    health_score: 96,
    contact_name: "Network Engineering Office",
    contact_email: "network@vodafone.example",
    contact_phone: "+20 2 0000 1101",
    featured: 1,
  },
  {
    slug: "we-telecom-egypt",
    name_en: "WE — Telecom Egypt",
    name_ar: "المصرية للاتصالات WE",
    industry_en: "Telecom",
    industry_ar: "اتصالات",
    tier: "Enterprise",
    region_en: "Nationwide",
    region_ar: "على مستوى الجمهورية",
    description_en:
      "National fixed-line carrier for long-haul backbone, GPON, ODN, and data-centre programmes.",
    description_ar:
      "شركة الاتصالات الوطنية للخطوط الثابتة لبرامج العمود الفقري طويل المدى وGPON وODN ومراكز البيانات.",
    since: "2015",
    projects_count: 220,
    health_score: 94,
    contact_name: "Outside Plant Directorate",
    contact_email: "osp@te.example",
    contact_phone: "+20 2 0000 1102",
    featured: 1,
  },
  {
    slug: "orange-egypt",
    name_en: "Orange Egypt",
    name_ar: "أورانج مصر",
    industry_en: "Telecom",
    industry_ar: "اتصالات",
    tier: "Enterprise",
    region_en: "Lower & Upper Egypt",
    region_ar: "الوجهين القبلي والبحري",
    description_en:
      "Carrier network partner for ADSS aerial migrations and microwave-to-fibre backhaul projects.",
    description_ar:
      "شريك شبكات لعمليات تحويل ADSS الهوائية ومشاريع تحويل الميكروويف إلى ألياف.",
    since: "2018",
    projects_count: 96,
    health_score: 91,
    contact_name: "Transmission Delivery",
    contact_email: "transmission@orange.example",
    contact_phone: "+20 2 0000 1103",
    featured: 0,
  },
  {
    slug: "smart-village",
    name_en: "Smart Village",
    name_ar: "القرية الذكية",
    industry_en: "Real Estate",
    industry_ar: "عقارات",
    tier: "Growth",
    region_en: "Giza",
    region_ar: "الجيزة",
    description_en:
      "Campus-wide FTTO, tenant-grade splicing, and secure dark-fibre routes for business park tenants.",
    description_ar:
      "شبكة FTTO على مستوى الحرم، ولحام بمستوى المستأجر، ومسارات ألياف مظلمة آمنة لمستأجري مجمع الأعمال.",
    since: "2020",
    projects_count: 32,
    health_score: 88,
    contact_name: "Facilities Technology",
    contact_email: "facilities@smartvillage.example",
    contact_phone: "+20 2 0000 1104",
    featured: 0,
  },
  {
    slug: "madinaty",
    name_en: "Madinaty",
    name_ar: "مدينتي",
    industry_en: "Real Estate",
    industry_ar: "عقارات",
    tier: "Growth",
    region_en: "Cairo East",
    region_ar: "القاهرة الشرقية",
    description_en:
      "Premium FTTH delivery and maintenance for a master-planned community with high activation volume.",
    description_ar:
      "تسليم وصيانة FTTH متميّز لمجتمع عمراني متكامل بحجم تنشيط عالي.",
    since: "2019",
    projects_count: 58,
    health_score: 93,
    contact_name: "Digital Infrastructure",
    contact_email: "digital@madinaty.example",
    contact_phone: "+20 2 0000 1105",
    featured: 1,
  },
] as const

const SERVICES = [
  {
    slug: "design",
    icon: "PencilRuler",
    title_en: "Design",
    title_ar: "التصميم",
    description_en:
      "From the first survey to the final BOQ — we plan networks that actually deploy on schedule.",
    description_ar: "من المسح الأول إلى حصر الكميات النهائي — نخطّط شبكات تُنفَّذ فعلاً في موعدها.",
    bullets_en: [
      "FTTX / GPON network design",
      "Route planning & site surveys",
      "Bill of Quantities (BOQ)",
      "Labelling plans & studies",
    ],
    bullets_ar: [
      "تصميم شبكات FTTX / GPON",
      "تخطيط المسارات والمسوحات الميدانية",
      "حصر الكميات (BOQ)",
      "خطط الترقيم والدراسات",
    ],
  },
  {
    slug: "supply",
    icon: "PackageOpen",
    title_en: "Supply",
    title_ar: "التوريد",
    description_en: "Vetted optical and copper supply chain — sourced for reliability, priced for scale.",
    description_ar: "سلسلة توريد بصرية ونحاسية موثّقة — مختارة للموثوقية ومسعّرة للتوسع.",
    bullets_en: [
      "Indoor / outdoor / aerial cables",
      "Patch panels, pigtails, adapters",
      "Termination & joint closures",
      "SFP, media converters, switches",
    ],
    bullets_ar: [
      "كابلات داخلية / خارجية / هوائية",
      "لوحات توصيل وبيغ تيلات ومحوّلات",
      "إنهاءات وعلب لحام",
      "SFP ومحوّلات وسائط وسويتشات",
    ],
  },
  {
    slug: "installation",
    icon: "HardHat",
    title_en: "Installation",
    title_ar: "التركيب",
    description_en:
      "Certified crews pulling, splicing, and dressing cable to telecom-grade standards.",
    description_ar: "فِرَق معتمدة تسحب وتلحم وتنظّم الكابلات بمعايير اتصالات معتمدة.",
    bullets_en: [
      "Cable laying, pulling, installation",
      "Fusion splicing & termination",
      "FTTX / GPON deployment",
      "Conduit, duct & cable dressing",
    ],
    bullets_ar: [
      "تمديد وسحب وتركيب الكابلات",
      "لحام بالاندماج وإنهاءات",
      "نشر FTTX / GPON",
      "تجهيز القنوات وتنظيم الكابلات",
    ],
  },
  {
    slug: "testing-maintenance",
    icon: "Activity",
    title_en: "Testing & Maintenance",
    title_ar: "الاختبار والصيانة",
    description_en:
      "OTDR-traced, OLTS-verified — every link signed off with documentation you can audit.",
    description_ar: "تتبّع بـ OTDR وتحقق بـ OLTS — كل وصلة معتمدة بوثائق قابلة للتدقيق.",
    bullets_en: [
      "OTDR testing & traces",
      "Optical loss testing (OLTS)",
      "Fault allocation & tracing",
      "Inspection & maintenance",
    ],
    bullets_ar: [
      "اختبارات وتتبّع OTDR",
      "قياس الفقد البصري OLTS",
      "تحديد وتتبع الأعطال",
      "الفحص والصيانة",
    ],
  },
  {
    slug: "consultancy",
    icon: "Compass",
    title_en: "Consultancy",
    title_ar: "الاستشارات",
    description_en:
      "Independent technical advice — for feasibility studies, vendor selection, and audits.",
    description_ar: "استشارة فنية مستقلة — لدراسات الجدوى واختيار الموردين والتدقيق.",
    bullets_en: [
      "FTTH/FTTX feasibility studies",
      "Technical audits of networks",
      "Vendor & equipment selection",
      "Cost optimization & supervision",
    ],
    bullets_ar: [
      "دراسات جدوى FTTH/FTTX",
      "تدقيق فني للشبكات",
      "اختيار الموردين والمعدات",
      "تحسين التكلفة والإشراف",
    ],
  },
] as const

const PARTNERS = [
  { name_en: "Vodafone Egypt", name_ar: "فودافون مصر", group_en: "Operators", group_ar: "مشغّلون", type_en: "Mobile · FTTH", type_ar: "محمول · FTTH" },
  { name_en: "WE", name_ar: "المصرية للاتصالات", group_en: "Operators", group_ar: "مشغّلون", type_en: "Fixed · FTTX", type_ar: "ثابت · FTTX" },
  { name_en: "Orange Egypt", name_ar: "أورانج مصر", group_en: "Operators", group_ar: "مشغّلون", type_en: "Mobile · Backhaul", type_ar: "محمول · بنية خلفية" },
  { name_en: "Telecom Egypt", name_ar: "تليكوم مصر", group_en: "Operators", group_ar: "مشغّلون", type_en: "Backbone · Wholesale", type_ar: "عمود فقري · جملة" },
  { name_en: "Huawei", name_ar: "هواوي", group_en: "Vendors", group_ar: "موردون", type_en: "OLT · ONT · DWDM", type_ar: "OLT · ONT · DWDM" },
  { name_en: "Nokia", name_ar: "نوكيا", group_en: "Vendors", group_ar: "موردون", type_en: "Access · Optical", type_ar: "وصول · بصري" },
  { name_en: "Ericsson", name_ar: "إريكسون", group_en: "Vendors", group_ar: "موردون", type_en: "Transport", type_ar: "نقل" },
  { name_en: "ZTE", name_ar: "زد تي إي", group_en: "Vendors", group_ar: "موردون", type_en: "GPON · OTN", type_ar: "GPON · OTN" },
  { name_en: "Smart Village", name_ar: "القرية الذكية", group_en: "Enterprise", group_ar: "شركات", type_en: "Tech park", type_ar: "مجمع تكنولوجي" },
  { name_en: "Madinaty", name_ar: "مدينتي", group_en: "Enterprise", group_ar: "شركات", type_en: "Real estate", type_ar: "عقارات" },
  { name_en: "ITIDA", name_ar: "إيتيدا", group_en: "Enterprise", group_ar: "شركات", type_en: "Government", type_ar: "حكومي" },
  { name_en: "TE Data", name_ar: "تي إي داتا", group_en: "Enterprise", group_ar: "شركات", type_en: "ISP", type_ar: "مزوّد إنترنت" },
] as const

const STATS = [
  {
    slug: "projects-delivered",
    value: 1240,
    suffix_en: "+",
    suffix_ar: "+",
    label_en: "Projects delivered",
    label_ar: "مشاريع منجزة",
    helper_en: "FTTX · GPON · Backbone",
    helper_ar: "FTTX · GPON · عمود فقري",
  },
  {
    slug: "fibre-laid",
    value: 8500,
    suffix_en: " km",
    suffix_ar: " كم",
    label_en: "Fibre laid",
    label_ar: "ألياف ممدودة",
    helper_en: "Aerial · Underground · Indoor",
    helper_ar: "هوائي · تحت الأرض · داخلي",
  },
  {
    slug: "years-in-practice",
    value: 12,
    suffix_en: " yrs",
    suffix_ar: " سنة",
    label_en: "Years in practice",
    label_ar: "سنوات الخبرة",
    helper_en: "Egypt-wide coverage",
    helper_ar: "تغطية على مستوى مصر",
  },
  {
    slug: "first-time-pass",
    value: 98,
    suffix_en: "%",
    suffix_ar: "٪",
    label_en: "First-time pass",
    label_ar: "اجتياز من المرة الأولى",
    helper_en: "On OTDR acceptance tests",
    helper_ar: "على اختبارات القبول بـ OTDR",
  },
] as const

const PAGES = [
  {
    key: "home",
    title_en: "Home page",
    title_ar: "الصفحة الرئيسية",
    sections: ["Hero", "Stats", "Services", "Works", "Partners", "Contact CTA"],
  },
  {
    key: "about",
    title_en: "About us",
    title_ar: "من نحن",
    sections: ["Mission", "Timeline", "Capabilities", "Certifications"],
  },
  {
    key: "contact",
    title_en: "Contact",
    title_ar: "اتصل بنا",
    sections: ["Contact info", "Lead form", "Map", "Service options"],
  },
  {
    key: "work",
    title_en: "Works",
    title_ar: "أعمالنا",
    sections: ["Project list", "Filters", "Featured banner"],
  },
  {
    key: "news",
    title_en: "News",
    title_ar: "الأخبار",
    sections: ["Latest", "Field notes", "Subscribe"],
  },
] as const

const SETTINGS: Record<string, string> = {
  "brand.name_en": "Fiber City",
  "brand.name_ar": "فايبر سيتي",
  "brand.tagline_en": "Light moves through glass. We move it across Egypt.",
  "brand.tagline_ar": "الضوء يسري عبر الزجاج. ونحن ننقله عبر مصر.",
  "brand.headline_en": "Light moves through glass.",
  "brand.headline_ar": "الضوء يسري عبر الزجاج.",
  "brand.primaryCTA_en": "Start a Project",
  "brand.primaryCTA_ar": "ابدأ مشروعاً",
  "brand.secondaryCTA_en": "View Capabilities",
  "brand.secondaryCTA_ar": "تصفّح خدماتنا",
  "contact.phone": "+20 2 1234 5678",
  "contact.email": "projects@fibercity.eg",
  "contact.address_en": "Smart Village, B12, Cairo",
  "contact.address_ar": "القرية الذكية، مبنى B12، القاهرة",
  "contact.hours_en": "Sun – Thu · 09 – 18 EET",
  "contact.hours_ar": "الأحد – الخميس · 09 – 18 بتوقيت القاهرة",
  "social.linkedin": "https://www.linkedin.com",
  "social.x": "https://www.x.com",
  "social.youtube": "https://www.youtube.com",
  "seo.defaultDescription_en":
    "Fiber City designs, supplies, installs and maintains fiber optic networks across Egypt. Trusted by Vodafone, WE, Orange and Huawei for end-to-end FTTX & GPON deployments.",
  "seo.defaultDescription_ar":
    "فايبر سيتي تصمّم وتورّد وتركّب وتصون شبكات الألياف الضوئية في مصر. شريك موثوق لفودافون وWE وأورانج وهواوي في تنفيذ FTTX وGPON.",
  "seo.defaultTitle_en": "Fiber City — Fiber Optic Infrastructure in Egypt",
  "seo.defaultTitle_ar": "فايبر سيتي — البنية التحتية للألياف الضوئية في مصر",
  "seo.keywords_en":
    "fiber optic, FTTX, GPON, OTDR, fusion splicing, telecom Egypt, Vodafone Egypt, WE, Huawei, Orange Egypt, fiber installation, network design, last mile",
  "seo.keywords_ar":
    "ألياف ضوئية, FTTX, GPON, OTDR, لحام ألياف, اتصالات مصر, فودافون مصر, WE, هواوي, أورانج مصر, تركيب ألياف, تصميم شبكات",
  "seo.siteUrl": "https://fibercity.eg",
  "seo.twitterHandle": "@fibercity",
  "seo.ogImage": "/opengraph-image",
  "seo.author": "Fiber City Engineering",
  "seo.foundingYear": "2014",
  "seo.googleSiteVerification": "",
  "seo.bingSiteVerification": "",
  "ops.defaultLocale": "en",
  "ops.cookieBanner": "true",
}

function genVisits(): { id: string; path: string; created_at: string }[] {
  const rows: { id: string; path: string; created_at: string }[] = []
  const today = new Date()
  // Generate ~30 days of synthetic visit traffic across key pages.
  const paths = [
    { p: "/", weight: 0.42 },
    { p: "/work", weight: 0.18 },
    { p: "/news", weight: 0.13 },
    { p: "/about", weight: 0.09 },
    { p: "/contact", weight: 0.11 },
    { p: "/admin", weight: 0.07 },
  ]
  for (let dayOffset = 0; dayOffset < 30; dayOffset++) {
    const d = new Date(today)
    d.setUTCHours(0, 0, 0, 0)
    d.setUTCDate(d.getUTCDate() - dayOffset)
    // Day base load (mon-fri busier than weekends)
    const dow = d.getUTCDay()
    const dayBase = dow === 5 || dow === 6 ? 380 : 720
    for (const { p, weight } of paths) {
      // deterministic randomness for repeat seed: weight × dayBase
      const count = Math.round(weight * dayBase * (0.85 + ((dayOffset * 13) % 30) / 100))
      for (let i = 0; i < count; i++) {
        const stamp = new Date(d)
        stamp.setUTCMinutes(Math.floor(((i * 37) % (24 * 60)) / 1))
        rows.push({ id: randomUUID(), path: p, created_at: stamp.toISOString() })
      }
    }
  }
  return rows
}

const SAMPLE_MESSAGES = [
  {
    name: "Ahmed Hassan",
    email: "ahmed.hassan@cairoeast.example",
    phone: "+20 100 123 4567",
    company: "Cairo East Developments",
    service: "Design",
    subject: "FTTH BOQ request",
    message:
      "Looking for a design + BOQ proposal for a 4,200-unit FTTH rollout in Mostakbal City. Please advise timelines and pricing for design + supervision.",
    status: "new",
  },
  {
    name: "Mariam Saad",
    email: "m.saad@nour-telecom.example",
    phone: "+20 100 998 1122",
    company: "Nour Telecom",
    service: "Testing & Maintenance",
    subject: "OTDR audit for 42 links",
    message:
      "We need a bi-directional OTDR audit on 42 backbone links in Alexandria. Need a quotation within 5 business days.",
    status: "read",
  },
  {
    name: "Karim Adel",
    email: "karim@madinaty-digital.example",
    phone: "+20 100 778 0099",
    company: "Madinaty Digital",
    service: "Installation",
    subject: "Maintenance contract renewal",
    message:
      "We'd like to renew the FTTH maintenance contract for cluster 12, including emergency dispatch and quarterly inspection.",
    status: "archived",
  },
  {
    name: "Sara Mahmoud",
    email: "sara@enterprise.example",
    phone: "+20 100 555 4477",
    company: "Enterprise Holdings",
    service: "Consultancy",
    subject: "Network audit + vendor selection",
    message:
      "Need a 4-week independent audit for our HQ optical network and a comparison report between three GPON vendors.",
    status: "new",
  },
] as const

export function seedDatabase(db: Database.Database, options: { force?: boolean } = {}) {
  const existing = db.prepare("SELECT COUNT(*) as c FROM works").get() as { c: number }
  if (existing.c > 0 && !options.force) {
    return { seeded: false, reason: "already-seeded" as const }
  }

  if (options.force) {
    db.exec(`
      DELETE FROM works;
      DELETE FROM news;
      DELETE FROM customers;
      DELETE FROM services;
      DELETE FROM partners;
      DELETE FROM stats;
      DELETE FROM contact_messages;
      DELETE FROM settings;
      DELETE FROM pages;
      DELETE FROM visits;
    `)
  }

  const insertWork = db.prepare(`
    INSERT INTO works (id, slug, title_en, title_ar, excerpt_en, excerpt_ar, content_en, content_ar,
      cover_image, gallery, category, client, location_en, location_ar, year, stats, status, sort_order, views, created_at, updated_at)
    VALUES (@id,@slug,@title_en,@title_ar,@excerpt_en,@excerpt_ar,@content_en,@content_ar,@cover_image,@gallery,
      @category,@client,@location_en,@location_ar,@year,@stats,'published',@sort_order,@views,@created_at,@updated_at)
  `)
  WORKS.forEach((w, idx) => {
    insertWork.run({
      id: id("work", w.slug),
      slug: w.slug,
      title_en: w.title_en,
      title_ar: w.title_ar,
      excerpt_en: w.excerpt_en,
      excerpt_ar: w.excerpt_ar,
      content_en: JSON.stringify(w.content_en),
      content_ar: JSON.stringify(w.content_ar),
      cover_image: w.cover_image,
      gallery: JSON.stringify(w.gallery),
      category: w.category,
      client: w.client,
      location_en: w.location_en,
      location_ar: w.location_ar,
      year: w.year,
      stats: JSON.stringify(
        w.stats.map((s) => ({ label_en: s.label_en, label_ar: s.label_ar, value: s.value })),
      ),
      sort_order: idx,
      views: 1200 - idx * 95,
      created_at: now(),
      updated_at: now(),
    })
  })

  const insertNews = db.prepare(`
    INSERT INTO news (id, slug, title_en, title_ar, excerpt_en, excerpt_ar, content_en, content_ar,
      cover_image, category_en, category_ar, author, read_minutes, status, published_at, views, created_at, updated_at)
    VALUES (@id,@slug,@title_en,@title_ar,@excerpt_en,@excerpt_ar,@content_en,@content_ar,@cover_image,
      @category_en,@category_ar,@author,@read_minutes,'published',@published_at,@views,@created_at,@updated_at)
  `)
  NEWS.forEach((n, idx) => {
    insertNews.run({
      id: id("news", n.slug),
      slug: n.slug,
      title_en: n.title_en,
      title_ar: n.title_ar,
      excerpt_en: n.excerpt_en,
      excerpt_ar: n.excerpt_ar,
      content_en: JSON.stringify(n.content_en),
      content_ar: JSON.stringify(n.content_ar),
      cover_image: n.cover_image,
      category_en: n.category_en,
      category_ar: n.category_ar,
      author: n.author,
      read_minutes: n.read_minutes,
      published_at: n.published_at,
      views: 720 - idx * 55,
      created_at: now(),
      updated_at: now(),
    })
  })

  const insertCustomer = db.prepare(`
    INSERT INTO customers (id, slug, name_en, name_ar, industry_en, industry_ar, tier, region_en, region_ar,
      description_en, description_ar, logo_url, since, projects_count, health_score, contact_name, contact_email,
      contact_phone, featured, status, created_at, updated_at)
    VALUES (@id,@slug,@name_en,@name_ar,@industry_en,@industry_ar,@tier,@region_en,@region_ar,
      @description_en,@description_ar,NULL,@since,@projects_count,@health_score,@contact_name,@contact_email,
      @contact_phone,@featured,'published',@created_at,@updated_at)
  `)
  CUSTOMERS.forEach((c) => {
    insertCustomer.run({
      id: id("cust", c.slug),
      slug: c.slug,
      name_en: c.name_en,
      name_ar: c.name_ar,
      industry_en: c.industry_en,
      industry_ar: c.industry_ar,
      tier: c.tier,
      region_en: c.region_en,
      region_ar: c.region_ar,
      description_en: c.description_en,
      description_ar: c.description_ar,
      since: c.since,
      projects_count: c.projects_count,
      health_score: c.health_score,
      contact_name: c.contact_name,
      contact_email: c.contact_email,
      contact_phone: c.contact_phone,
      featured: c.featured,
      created_at: now(),
      updated_at: now(),
    })
  })

  const insertService = db.prepare(`
    INSERT INTO services (id, slug, icon, title_en, title_ar, description_en, description_ar,
      bullets_en, bullets_ar, sort_order, status, created_at, updated_at)
    VALUES (@id,@slug,@icon,@title_en,@title_ar,@description_en,@description_ar,
      @bullets_en,@bullets_ar,@sort_order,'published',@created_at,@updated_at)
  `)
  SERVICES.forEach((s, idx) => {
    insertService.run({
      id: id("srv", s.slug),
      slug: s.slug,
      icon: s.icon,
      title_en: s.title_en,
      title_ar: s.title_ar,
      description_en: s.description_en,
      description_ar: s.description_ar,
      bullets_en: JSON.stringify(s.bullets_en),
      bullets_ar: JSON.stringify(s.bullets_ar),
      sort_order: idx,
      created_at: now(),
      updated_at: now(),
    })
  })

  const insertPartner = db.prepare(`
    INSERT INTO partners (id, name_en, name_ar, group_en, group_ar, type_en, type_ar, logo_url, website_url, sort_order, status, created_at)
    VALUES (@id,@name_en,@name_ar,@group_en,@group_ar,@type_en,@type_ar,NULL,NULL,@sort_order,'published',@created_at)
  `)
  PARTNERS.forEach((p, idx) => {
    insertPartner.run({
      id: id("part", p.name_en),
      name_en: p.name_en,
      name_ar: p.name_ar,
      group_en: p.group_en,
      group_ar: p.group_ar,
      type_en: p.type_en,
      type_ar: p.type_ar,
      sort_order: idx,
      created_at: now(),
    })
  })

  const insertStat = db.prepare(`
    INSERT INTO stats (id, slug, value, suffix_en, suffix_ar, label_en, label_ar, helper_en, helper_ar, sort_order, created_at)
    VALUES (@id,@slug,@value,@suffix_en,@suffix_ar,@label_en,@label_ar,@helper_en,@helper_ar,@sort_order,@created_at)
  `)
  STATS.forEach((s, idx) => {
    insertStat.run({
      id: id("stat", s.slug),
      slug: s.slug,
      value: s.value,
      suffix_en: s.suffix_en,
      suffix_ar: s.suffix_ar,
      label_en: s.label_en,
      label_ar: s.label_ar,
      helper_en: s.helper_en,
      helper_ar: s.helper_ar,
      sort_order: idx,
      created_at: now(),
    })
  })

  const insertMessage = db.prepare(`
    INSERT INTO contact_messages (id, name, email, phone, company, service, subject, message, status, created_at)
    VALUES (@id,@name,@email,@phone,@company,@service,@subject,@message,@status,@created_at)
  `)
  SAMPLE_MESSAGES.forEach((m, idx) => {
    insertMessage.run({
      id: randomUUID(),
      name: m.name,
      email: m.email,
      phone: m.phone,
      company: m.company,
      service: m.service,
      subject: m.subject,
      message: m.message,
      status: m.status,
      created_at: new Date(Date.now() - idx * 86400000).toISOString(),
    })
  })

  const insertSetting = db.prepare(
    "INSERT INTO settings (key, value, updated_at) VALUES (?, ?, ?)",
  )
  Object.entries(SETTINGS).forEach(([k, v]) => insertSetting.run(k, v, now()))

  const insertPage = db.prepare(`
    INSERT INTO pages (key, title_en, title_ar, status, sections, updated_at)
    VALUES (@key,@title_en,@title_ar,'published',@sections,@updated_at)
  `)
  PAGES.forEach((p) =>
    insertPage.run({
      key: p.key,
      title_en: p.title_en,
      title_ar: p.title_ar,
      sections: JSON.stringify(p.sections),
      updated_at: now(),
    }),
  )

  const insertVisit = db.prepare(
    "INSERT INTO visits (id, path, created_at) VALUES (?, ?, ?)",
  )
  const visits = genVisits()
  const insertVisits = db.transaction(
    (rows: { id: string; path: string; created_at: string }[]) => {
      for (const v of rows) insertVisit.run(v.id, v.path, v.created_at)
    },
  )
  insertVisits(visits)

  return { seeded: true, counts: { works: WORKS.length, news: NEWS.length, customers: CUSTOMERS.length, services: SERVICES.length, partners: PARTNERS.length, stats: STATS.length, visits: visits.length } }
}
