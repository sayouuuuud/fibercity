"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  Activity,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText,
  Inbox,
  LayoutDashboard,
  Mail,
  Newspaper,
  PanelTop,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Users,
} from "lucide-react"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/i18n/language-toggle"
import { useLanguage } from "@/components/i18n/language-provider"
import { cn } from "@/lib/utils"
import type {
  ContactMessageRecord,
  CustomerDTO,
  DashboardSnapshot,
  NewsDTO,
  PartnerDTO,
  ServiceDTO,
  StatDTO,
  WorkDTO,
} from "@/lib/db/types"

type AdminSection =
  | "overview"
  | "works"
  | "news"
  | "customers"
  | "partners"
  | "services"
  | "stats"
  | "messages"
  | "analytics"
  | "settings"

type FetchState<T> = { data: T | null; loading: boolean; error: string | null }

function useFetch<T>(url: string, deps: unknown[] = []): FetchState<T> & { reload: () => void } {
  const [state, setState] = useState<FetchState<T>>({ data: null, loading: true, error: null })
  const reload = useCallback(() => {
    let cancelled = false
    setState((s) => ({ ...s, loading: true, error: null }))
    fetch(url, { cache: "no-store" })
      .then(async (r) => {
        const j = await r.json()
        if (!r.ok || j?.ok === false) {
          throw new Error(typeof j?.error === "string" ? j.error : `Request failed (${r.status})`)
        }
        return j?.data ?? j
      })
      .then((data: T) => {
        if (!cancelled) setState({ data, loading: false, error: null })
      })
      .catch((e) => {
        if (!cancelled) setState({ data: null, loading: false, error: e.message })
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  useEffect(() => {
    return reload()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, ...deps])

  return { ...state, reload }
}

export function AdminDashboard() {
  const { t } = useLanguage()
  const [activeSection, setActiveSection] = useState<AdminSection>("overview")
  const [collapsed, setCollapsed] = useState(false)
  const [query, setQuery] = useState("")

  const navItems: { id: AdminSection; label: string; icon: React.ElementType }[] = useMemo(
    () => [
      { id: "overview", label: t.admin.overview, icon: LayoutDashboard },
      { id: "works", label: t.admin.works, icon: BriefcaseBusiness },
      { id: "news", label: t.admin.news, icon: Newspaper },
      { id: "customers", label: t.admin.customers, icon: Users },
      { id: "partners", label: t.admin.partners, icon: PanelTop },
      { id: "services", label: t.admin.services, icon: FileText },
      { id: "stats", label: t.admin.stats, icon: Activity },
      { id: "messages", label: t.admin.messages, icon: Inbox },
      { id: "analytics", label: t.admin.analytics, icon: BarChart3 },
      { id: "settings", label: t.admin.settings, icon: Settings },
    ],
    [t],
  )

  const activeLabel = navItems.find((item) => item.id === activeSection)?.label ?? t.admin.overview

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside
        className={cn(
          "fixed inset-y-0 z-40 flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300 ltr:left-0 rtl:right-0 ltr:border-r rtl:border-l rtl:border-r-0",
          collapsed ? "w-[76px]" : "w-[280px]",
        )}
      >
        <div className="flex h-20 items-center justify-between border-b border-sidebar-border px-4">
          <Link
            href="/"
            className={cn("overflow-hidden transition-all", collapsed ? "w-9" : "w-auto")}
          >
            <Logo showWordmark={!collapsed} />
          </Link>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = activeSection === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  "group relative flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition",
                  active
                    ? "bg-sidebar-accent text-sidebar-foreground shadow-lg shadow-primary/10"
                    : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                )}
              >
                <span
                  className={cn(
                    "absolute h-7 w-1 rounded-r-full bg-primary ltr:left-0 rtl:right-0",
                    active ? "opacity-100" : "opacity-0",
                  )}
                />
                <Icon className={cn("h-5 w-5 shrink-0", active && "text-primary")} />
                <span
                  className={cn(
                    "whitespace-nowrap transition",
                    collapsed && "w-0 overflow-hidden opacity-0",
                  )}
                >
                  {item.label}
                </span>
              </button>
            )
          })}
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <button
            type="button"
            onClick={() => setCollapsed((value) => !value)}
            className="flex w-full items-center justify-center gap-2 rounded-2xl px-3 py-3 text-sm text-muted-foreground transition hover:bg-sidebar-accent hover:text-sidebar-foreground"
          >
            {collapsed ? <ChevronRight className="h-5 w-5 rtl:rotate-180" /> : <ChevronLeft className="h-5 w-5 rtl:rotate-180" />}
            <span className={cn(collapsed && "hidden")}>{collapsed ? t.admin.expand : t.admin.collapse}</span>
          </button>
        </div>
      </aside>

      <div
        className={cn(
          "transition-all duration-300",
          collapsed
            ? "ltr:ml-[76px] rtl:mr-[76px]"
            : "ltr:ml-[280px] rtl:mr-[280px]",
        )}
      >
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-border bg-background/85 px-6 backdrop-blur-xl">
          <div>
            <div className="folio text-muted-foreground">{t.admin.appName}</div>
            <h1 className="mt-1 font-display text-3xl leading-none tracking-tight">{activeLabel}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground ltr:left-3 rtl:right-3" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t.admin.search}
                className="h-11 w-72 rounded-full border border-border bg-card text-sm outline-none transition focus:border-primary ltr:pl-10 ltr:pr-4 rtl:pr-10 rtl:pl-4"
              />
            </div>
            <LanguageToggle variant="inline" />
            <ThemeToggle />
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary font-mono text-xs font-bold text-primary-foreground">
              FC
            </div>
          </div>
        </header>

        <main className="p-6">
          <div key={activeSection} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeSection === "overview" && <Overview query={query} setSection={setActiveSection} />}
            {activeSection === "works" && <WorksManager query={query} />}
            {activeSection === "news" && <NewsManager query={query} />}
            {activeSection === "customers" && <CustomersManager query={query} />}
            {activeSection === "partners" && <PartnersManager query={query} />}
            {activeSection === "services" && <ServicesManager query={query} />}
            {activeSection === "stats" && <StatsManager query={query} />}
            {activeSection === "messages" && <MessagesManager query={query} />}
            {activeSection === "analytics" && <AnalyticsManager />}
            {activeSection === "settings" && <SettingsManager />}
          </div>
        </main>
      </div>
    </div>
  )
}

function Overview({ query, setSection }: { query: string; setSection: (s: AdminSection) => void }) {
  const { t, locale } = useLanguage()
  const { data, loading, error, reload } = useFetch<DashboardSnapshot>("/api/dashboard")
  const dateLocale = locale === "ar" ? "ar-EG" : "en"

  if (loading) return <SkeletonGrid />
  if (error) return <ErrorPanel message={error} onRetry={reload} />
  if (!data) return null

  const cards = [
    {
      label: t.admin.publishedWorks,
      value: data.totals.works_published,
      sub: `${data.totals.works_draft} ${t.admin.draft}`,
    },
    {
      label: t.admin.publishedNews,
      value: data.totals.news_published,
      sub: `${data.totals.news_draft} ${t.admin.draft}`,
    },
    {
      label: t.admin.clientRecords,
      value: data.totals.customers,
      sub: `${data.totals.customers_enterprise} ${t.admin.tierEnterprise}`,
    },
    {
      label: t.admin.pendingMessages,
      value: data.totals.messages_new,
      sub: `${data.totals.messages} ${t.admin.totalInbox}`,
    },
  ]

  const maxVisit = Math.max(1, ...data.visits_by_day.map((v) => v.value))

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-[1.75rem] border border-border bg-card/90 p-6 shadow-sm dark:bg-card"
          >
            <div className="text-sm text-muted-foreground">{c.label}</div>
            <div className="mt-4 font-display text-4xl leading-none tabular">{c.value}</div>
            <div className="mt-3 text-sm text-primary">{c.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-[2rem] border border-border bg-card/90 p-6 shadow-sm dark:bg-card xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="folio text-muted-foreground">{t.admin.visitsThisWeek}</div>
              <div className="mt-2 font-display text-3xl tabular">{data.metrics.monthly_visits.toLocaleString()}</div>
              <div className="mt-1 text-sm text-muted-foreground">
                {data.metrics.monthly_visits_change_pct >= 0 ? "▲" : "▼"} {Math.abs(data.metrics.monthly_visits_change_pct).toFixed(1)}%
              </div>
            </div>
            <button
              onClick={reload}
              className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              {t.admin.refresh}
            </button>
          </div>
          <div className="mt-6 flex items-end gap-2 sm:gap-3">
            {data.visits_by_day.map((v) => (
              <div key={v.date} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-44 w-full items-end overflow-hidden rounded-2xl bg-secondary/40">
                  <div
                    className="w-full rounded-2xl bg-gradient-to-t from-primary/30 to-primary"
                    style={{ height: `${Math.max(8, Math.round((v.value / maxVisit) * 100))}%` }}
                  />
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{v.day}</div>
                <div className="font-mono text-xs tabular">{v.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-border bg-card/90 p-6 shadow-sm dark:bg-card">
          <div className="folio text-muted-foreground">{t.admin.contentHealth}</div>
          <div className="mt-2 font-display text-3xl tabular">{data.metrics.avg_health}%</div>
          <div className="mt-6 space-y-4">
            {[
              { label: t.admin.seoMetadata, value: data.health.seo_metadata_pct },
              { label: t.admin.arabicCoverage, value: data.health.arabic_coverage_pct },
              { label: t.admin.imageCoverage, value: data.health.image_coverage_pct },
              { label: t.admin.publishRate, value: data.health.publish_rate_pct },
            ].map((r) => (
              <div key={r.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{r.label}</span>
                  <span className="font-mono tabular">{r.value}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${r.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <RecentList
          title={t.admin.topPages}
          rows={data.top_pages.slice(0, 6).map((p) => ({
            id: p.path,
            title: p.path,
            sub: `${p.visits} ${t.admin.visits}`,
          }))}
          icon={Eye}
        />
        <RecentList
          title={t.admin.recentWorks}
          rows={data.recent_works.slice(0, 6).map((w) => ({
            id: w.id,
            title: w.title_en,
            sub: `${w.status} · ${w.views} ${t.admin.views}`,
            href: `/work/${w.slug}`,
          }))}
          icon={BriefcaseBusiness}
        />
        <RecentList
          title={t.admin.recentMessages}
          rows={data.recent_messages.slice(0, 6).map((m) => ({
            id: m.id,
            title: `${m.name} — ${m.company ?? ""}`,
            sub: `${m.subject ?? m.service ?? ""} · ${new Date(m.created_at).toLocaleDateString(dateLocale)}`,
            badge: m.status,
          }))}
          icon={Mail}
          onClick={() => setSection("messages")}
        />
      </div>

      <div className="rounded-[2rem] border border-border bg-card/90 p-6 shadow-sm dark:bg-card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="folio text-muted-foreground">{t.admin.quickActions}</div>
            <div className="mt-1 font-display text-2xl">{t.admin.quickActionsBody}</div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSection("works")}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:brightness-110"
            >
              <Plus className="h-4 w-4" />
              {t.admin.addWork}
            </button>
            <button
              onClick={() => setSection("news")}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90"
            >
              <Plus className="h-4 w-4" />
              {t.admin.addNews}
            </button>
            <button
              onClick={() => setSection("messages")}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-secondary"
            >
              <Bell className="h-4 w-4" />
              {t.admin.messages} ({data.totals.messages_new})
            </button>
          </div>
        </div>
      </div>
      {query && <div className="text-xs text-muted-foreground">{t.admin.searchHint}: {query}</div>}
    </div>
  )
}

function RecentList({
  title,
  rows,
  icon: Icon,
  onClick,
}: {
  title: string
  rows: { id: string; title: string; sub: string; href?: string; badge?: string }[]
  icon: React.ElementType
  onClick?: () => void
}) {
  return (
    <div className="rounded-[2rem] border border-border bg-card/90 p-6 shadow-sm dark:bg-card">
      <div className="flex items-center justify-between">
        <div className="folio text-muted-foreground">{title}</div>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <ul className="mt-4 space-y-3">
        {rows.length === 0 && <li className="text-sm text-muted-foreground">—</li>}
        {rows.map((row) => {
          const inner = (
            <>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{row.title}</div>
                <div className="truncate text-xs text-muted-foreground">{row.sub}</div>
              </div>
              {row.badge && (
                <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {row.badge}
                </span>
              )}
            </>
          )
          if (row.href) {
            return (
              <li key={row.id}>
                <Link
                  href={row.href}
                  className="flex items-center justify-between gap-3 rounded-2xl px-3 py-2 transition hover:bg-secondary"
                >
                  {inner}
                </Link>
              </li>
            )
          }
          return (
            <li
              key={row.id}
              onClick={onClick}
              className={cn(
                "flex items-center justify-between gap-3 rounded-2xl px-3 py-2",
                onClick && "cursor-pointer transition hover:bg-secondary",
              )}
            >
              {inner}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function WorksManager({ query }: { query: string }) {
  const { t } = useLanguage()
  const { data, loading, error, reload } = useFetch<{ works: WorkDTO[] }>("/api/works?status=all")
  if (loading) return <SkeletonGrid />
  if (error) return <ErrorPanel message={error} onRetry={reload} />
  if (!data) return null
  const items = data.works.filter((w) => !query || w.title.toLowerCase().includes(query.toLowerCase()))
  return (
    <CollectionTable
      title={t.admin.works}
      rows={items.map((w) => ({
        id: w.id,
        title: w.title,
        meta: `${w.client} · ${w.location} · ${w.year}`,
        status: w.status,
        tag: w.category,
        views: w.views,
        href: `/work/${w.slug}`,
      }))}
    />
  )
}

function NewsManager({ query }: { query: string }) {
  const { t } = useLanguage()
  const { data, loading, error, reload } = useFetch<{ news: NewsDTO[] }>("/api/news?status=all")
  if (loading) return <SkeletonGrid />
  if (error) return <ErrorPanel message={error} onRetry={reload} />
  if (!data) return null
  const items = data.news.filter((n) => !query || n.title.toLowerCase().includes(query.toLowerCase()))
  return (
    <CollectionTable
      title={t.admin.news}
      rows={items.map((n) => ({
        id: n.id,
        title: n.title,
        meta: `${n.author} · ${n.readMinutes} ${t.newsPage.readMin}`,
        status: n.status,
        tag: n.category,
        views: n.views,
        href: `/news/${n.slug}`,
      }))}
    />
  )
}

function CustomersManager({ query }: { query: string }) {
  const { t } = useLanguage()
  const { data, loading, error, reload } = useFetch<{ customers: CustomerDTO[] }>("/api/customers?status=all")
  if (loading) return <SkeletonGrid />
  if (error) return <ErrorPanel message={error} onRetry={reload} />
  if (!data) return null
  const items = data.customers.filter((c) => !query || c.name.toLowerCase().includes(query.toLowerCase()))
  return (
    <CollectionTable
      title={t.admin.customers}
      rows={items.map((c) => ({
        id: c.id,
        title: c.name,
        meta: `${c.industry} · ${c.region}`,
        status: c.status,
        tag: c.tier,
      }))}
    />
  )
}

function PartnersManager({ query }: { query: string }) {
  const { t } = useLanguage()
  const { data, loading, error, reload } = useFetch<{ partners: PartnerDTO[] }>("/api/partners?status=all")
  if (loading) return <SkeletonGrid />
  if (error) return <ErrorPanel message={error} onRetry={reload} />
  if (!data) return null
  const items = data.partners.filter((p) => !query || p.name.toLowerCase().includes(query.toLowerCase()))
  return (
    <CollectionTable
      title={t.admin.partners}
      rows={items.map((p) => ({
        id: p.id,
        title: p.name,
        meta: `${p.group} · ${p.type}`,
        status: p.status,
      }))}
    />
  )
}

function ServicesManager({ query }: { query: string }) {
  const { t } = useLanguage()
  const { data, loading, error, reload } = useFetch<{ services: ServiceDTO[] }>("/api/services?status=all")
  if (loading) return <SkeletonGrid />
  if (error) return <ErrorPanel message={error} onRetry={reload} />
  if (!data) return null
  const items = data.services.filter((s) => !query || s.title.toLowerCase().includes(query.toLowerCase()))
  return (
    <CollectionTable
      title={t.admin.services}
      rows={items.map((s) => ({
        id: s.id,
        title: s.title,
        meta: s.description,
        status: s.status,
      }))}
    />
  )
}

function StatsManager({ query }: { query: string }) {
  const { t } = useLanguage()
  const { data, loading, error, reload } = useFetch<{ stats: StatDTO[] }>("/api/stats")
  if (loading) return <SkeletonGrid />
  if (error) return <ErrorPanel message={error} onRetry={reload} />
  if (!data) return null
  const items = data.stats.filter((s) => !query || s.label.toLowerCase().includes(query.toLowerCase()))
  return (
    <CollectionTable
      title={t.admin.stats}
      rows={items.map((s) => ({
        id: s.id,
        title: `${s.value}${s.suffix} ${s.label}`,
        meta: s.helper,
      }))}
    />
  )
}

function MessagesManager({ query }: { query: string }) {
  const { t, locale } = useLanguage()
  const { data, loading, error, reload } = useFetch<{ messages: ContactMessageRecord[] }>(
    "/api/messages?status=all",
  )
  const dateLocale = locale === "ar" ? "ar-EG" : "en"
  const setStatus = async (id: string, status: string) => {
    await fetch(`/api/messages/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status }),
    })
    reload()
  }
  if (loading) return <SkeletonGrid />
  if (error) return <ErrorPanel message={error} onRetry={reload} />
  if (!data) return null
  const items = data.messages.filter(
    (m) =>
      !query ||
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      (m.company ?? "").toLowerCase().includes(query.toLowerCase()),
  )
  return (
    <div className="space-y-4">
      <div className="rounded-[1.75rem] border border-border bg-card/90 p-6 shadow-sm dark:bg-card">
        <div className="folio text-muted-foreground">{t.admin.inboxTitle}</div>
        <div className="mt-2 font-display text-2xl">{items.length} {t.admin.messages.toLowerCase()}</div>
      </div>
      <div className="overflow-hidden rounded-[1.75rem] border border-border bg-card/90 shadow-sm dark:bg-card">
        <table className="w-full table-fixed text-sm">
          <thead className="bg-secondary/40 text-left">
            <tr>
              <th className="px-4 py-3">{t.admin.from}</th>
              <th className="px-4 py-3">{t.admin.subject}</th>
              <th className="w-28 px-4 py-3">{t.admin.statusCell}</th>
              <th className="w-32 px-4 py-3">{t.admin.date}</th>
              <th className="w-56 px-4 py-3">{t.admin.actions}</th>
            </tr>
          </thead>
          <tbody>
            {items.map((m) => (
              <tr key={m.id} className="border-t border-border align-top">
                <td className="px-4 py-3">
                  <div className="truncate font-medium">{m.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{m.email}</div>
                  <div className="truncate text-xs text-muted-foreground">{m.company}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="truncate">{m.subject || m.service || "—"}</div>
                  <div className="truncate text-xs text-muted-foreground">{m.message}</div>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em]">
                    {m.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  {new Date(m.created_at).toLocaleString(dateLocale)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => setStatus(m.id, "read")}
                      className="rounded-full border border-border px-2 py-1 text-xs hover:bg-secondary"
                    >
                      {t.admin.markRead}
                    </button>
                    <button
                      onClick={() => setStatus(m.id, "archived")}
                      className="rounded-full border border-border px-2 py-1 text-xs hover:bg-secondary"
                    >
                      {t.admin.markArchived}
                    </button>
                    <a
                      href={`mailto:${m.email}`}
                      className="rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground hover:brightness-110"
                    >
                      {t.admin.reply}
                    </a>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-sm text-muted-foreground">
                  {t.admin.empty}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function AnalyticsManager() {
  const { t } = useLanguage()
  const { data, loading, error, reload } = useFetch<DashboardSnapshot>("/api/dashboard")
  if (loading) return <SkeletonGrid />
  if (error) return <ErrorPanel message={error} onRetry={reload} />
  if (!data) return null
  const maxVisit = Math.max(1, ...data.visits_by_day.map((v) => v.value))
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Metric label={t.admin.monthlyVisits} value={data.metrics.monthly_visits.toLocaleString()} />
        <Metric label={t.admin.fibreLaid} value={`${data.metrics.fibre_km.toLocaleString()} km`} />
        <Metric label={t.admin.completionRate} value={`${data.metrics.completion_rate}%`} />
      </div>
      <div className="rounded-[2rem] border border-border bg-card/90 p-6 shadow-sm dark:bg-card">
        <div className="folio text-muted-foreground">{t.admin.visitsThisWeek}</div>
        <div className="mt-6 flex items-end gap-3">
          {data.visits_by_day.map((v) => (
            <div key={v.date} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-56 w-full items-end overflow-hidden rounded-2xl bg-secondary/40">
                <div
                  className="w-full rounded-2xl bg-gradient-to-t from-primary/30 to-primary"
                  style={{ height: `${Math.max(8, Math.round((v.value / maxVisit) * 100))}%` }}
                />
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{v.day}</div>
              <div className="font-mono text-xs tabular">{v.value}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[2rem] border border-border bg-card/90 p-6 shadow-sm dark:bg-card">
          <div className="folio text-muted-foreground">{t.admin.topPages}</div>
          <ul className="mt-4 space-y-3">
            {data.top_pages.map((p) => (
              <li key={p.path} className="flex items-center justify-between">
                <span className="truncate font-mono text-sm">{p.path}</span>
                <span className="font-mono tabular text-sm">{p.visits}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[2rem] border border-border bg-card/90 p-6 shadow-sm dark:bg-card">
          <div className="folio text-muted-foreground">{t.admin.contentHealth}</div>
          <ul className="mt-4 space-y-4">
            {[
              { label: t.admin.seoMetadata, value: data.health.seo_metadata_pct },
              { label: t.admin.arabicCoverage, value: data.health.arabic_coverage_pct },
              { label: t.admin.imageCoverage, value: data.health.image_coverage_pct },
              { label: t.admin.publishRate, value: data.health.publish_rate_pct },
            ].map((r) => (
              <li key={r.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{r.label}</span>
                  <span className="font-mono tabular">{r.value}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${r.value}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function SettingsManager() {
  const { t } = useLanguage()
  const { data, loading, error, reload } = useFetch<Record<string, string>>("/api/settings")
  const [saving, setSaving] = useState(false)
  const [savedFlash, setSavedFlash] = useState(false)
  if (loading) return <SkeletonGrid />
  if (error) return <ErrorPanel message={error} onRetry={reload} />
  if (!data) return null
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    const form = new FormData(e.currentTarget)
    const payload: Record<string, string> = {}
    form.forEach((v, k) => {
      payload[k] = String(v)
    })
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    })
    setSaving(false)
    setSavedFlash(true)
    setTimeout(() => setSavedFlash(false), 1500)
    reload()
  }
  const groups: Record<string, [string, string][]> = {}
  for (const [k, v] of Object.entries(data)) {
    const prefix = k.includes(".") ? k.split(".")[0] : "general"
    if (!groups[prefix]) groups[prefix] = []
    groups[prefix].push([k, v])
  }
  const groupOrder = ["brand", "contact", "social", "seo", "general"]
  const orderedGroupKeys = [
    ...groupOrder.filter((g) => groups[g]),
    ...Object.keys(groups).filter((g) => !groupOrder.includes(g)),
  ]
  const groupLabels: Record<string, string> = {
    brand: t.admin.settingsGroups?.brand ?? "Brand",
    contact: t.admin.settingsGroups?.contact ?? "Contact",
    social: t.admin.settingsGroups?.social ?? "Social",
    seo: t.admin.settingsGroups?.seo ?? "SEO",
    general: t.admin.settingsGroups?.general ?? "General",
  }
  const groupHints: Record<string, string> = {
    seo:
      t.admin.settingsGroups?.seoHint ??
      "Site-wide SEO defaults. These are used in <title>, meta description, OG/Twitter cards, sitemap and JSON-LD schemas.",
    brand:
      t.admin.settingsGroups?.brandHint ?? "Brand name and tagline used across the site.",
    contact:
      t.admin.settingsGroups?.contactHint ?? "Contact info shown publicly and in schema.",
    social: t.admin.settingsGroups?.socialHint ?? "Social profile URLs.",
  }
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-[2rem] border border-border bg-card/90 p-6 shadow-sm dark:bg-card"
    >
      <div className="flex items-center justify-between">
        <div className="folio text-muted-foreground">{t.admin.settings}</div>
        <div className="flex items-center gap-3">
          {savedFlash && <span className="text-sm text-primary">{t.admin.saved}</span>}
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:brightness-110 disabled:opacity-70"
          >
            {saving ? t.admin.saving : t.admin.save}
          </button>
        </div>
      </div>
      {orderedGroupKeys.map((g) => (
        <div key={g} className="rounded-2xl border border-border bg-background/50 p-5">
          <div className="flex items-baseline justify-between">
            <h3 className="font-display text-lg">{groupLabels[g] ?? g}</h3>
            {groupHints[g] && (
              <p className="ml-4 max-w-md text-xs text-muted-foreground">{groupHints[g]}</p>
            )}
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {groups[g].map(([k, v]) => {
              const isLong = v.length > 60 || k.toLowerCase().includes("description")
              return (
                <label key={k} className="block text-sm md:col-span-2 md:[&:not(:has(textarea))]:col-span-1">
                  <span className="folio text-muted-foreground">{k}</span>
                  {isLong ? (
                    <textarea
                      name={k}
                      defaultValue={v}
                      rows={3}
                      className="mt-2 w-full resize-y rounded-2xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                  ) : (
                    <input
                      name={k}
                      defaultValue={v}
                      className="mt-2 w-full rounded-2xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                  )}
                </label>
              )
            })}
          </div>
        </div>
      ))}
    </form>
  )
}

function CollectionTable({
  title,
  rows,
}: {
  title: string
  rows: {
    id: string
    title: string
    meta: string
    status?: string
    tag?: string
    views?: number
    href?: string
  }[]
}) {
  const { t } = useLanguage()
  return (
    <div className="space-y-4">
      <div className="rounded-[1.75rem] border border-border bg-card/90 p-6 shadow-sm dark:bg-card">
        <div className="folio text-muted-foreground">{title}</div>
        <div className="mt-2 font-display text-2xl">{rows.length} {t.admin.records}</div>
      </div>
      <div className="overflow-hidden rounded-[1.75rem] border border-border bg-card/90 shadow-sm dark:bg-card">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40 text-left">
            <tr>
              <th className="px-4 py-3">{t.admin.titleCol}</th>
              <th className="px-4 py-3">{t.admin.detailsCol}</th>
              <th className="w-28 px-4 py-3">{t.admin.tagCol}</th>
              <th className="w-28 px-4 py-3">{t.admin.statusCol}</th>
              <th className="w-24 px-4 py-3 text-right">{t.admin.viewsCol}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-border align-top">
                <td className="px-4 py-3">
                  {r.href ? (
                    <Link href={r.href} className="font-medium hover:text-primary">
                      {r.title}
                    </Link>
                  ) : (
                    <span className="font-medium">{r.title}</span>
                  )}
                </td>
                <td className="truncate px-4 py-3 text-muted-foreground">{r.meta}</td>
                <td className="px-4 py-3">
                  {r.tag && (
                    <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em]">
                      {r.tag}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {r.status && (
                    <span
                      className={cn(
                        "rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em]",
                        r.status === "published"
                          ? "border-primary/40 bg-primary/10 text-primary"
                          : "border-border text-muted-foreground",
                      )}
                    >
                      {r.status}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right font-mono tabular">{r.views ?? "—"}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-sm text-muted-foreground">
                  {t.admin.empty}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.75rem] border border-border bg-card/90 p-6 shadow-sm dark:bg-card">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="mt-3 font-display text-3xl tabular">{value}</div>
    </div>
  )
}

function SkeletonGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-32 animate-pulse rounded-[1.75rem] border border-border bg-card/40 dark:bg-card/60"
        />
      ))}
    </div>
  )
}

function ErrorPanel({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="rounded-[1.75rem] border border-destructive/40 bg-destructive/10 p-6">
      <div className="font-display text-lg text-destructive">Error</div>
      <p className="mt-1 text-sm text-destructive/80">{message}</p>
      <button
        onClick={onRetry}
        className="mt-4 inline-flex items-center gap-2 rounded-full border border-destructive/30 px-3 py-2 text-sm text-destructive hover:bg-destructive/20"
      >
        <RefreshCw className="h-4 w-4" />
        Retry
      </button>
    </div>
  )
}
