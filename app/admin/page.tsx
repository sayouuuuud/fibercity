import type { Metadata } from "next"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { buildPageMetadata } from "@/lib/seo/metadata"
import { getServerLocale } from "@/lib/i18n/server-locale"
import { DICTIONARIES } from "@/lib/i18n/dictionaries"

export const dynamic = "force-dynamic"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  const t = DICTIONARIES[locale]
  return buildPageMetadata({
    locale,
    path: "/admin",
    title: t.meta.adminTitle,
    description:
      "Professional content, analytics, customers, news, works, and settings dashboard for Fiber City.",
    noIndex: true,
  })
}

export default function AdminPage() {
  return <AdminDashboard />
}
