import "server-only"

import {
  listCustomers,
  listNews,
  listPartners,
  listServices,
  listStats,
  listWorks,
  getSettings,
} from "@/lib/db/queries"
import type {
  CustomerDTO,
  Locale,
  NewsDTO,
  PartnerDTO,
  ServiceDTO,
  SettingsDTO,
  StatDTO,
  WorkDTO,
} from "@/lib/db/types"

export type SiteContent = {
  locale: Locale
  works: WorkDTO[]
  featuredWorks: WorkDTO[]
  news: NewsDTO[]
  customers: CustomerDTO[]
  services: ServiceDTO[]
  partners: PartnerDTO[]
  stats: StatDTO[]
  settings: SettingsDTO
}

export function getSiteContent(locale: Locale): SiteContent {
  const works = listWorks({ locale, status: "published" })
  return {
    locale,
    works,
    featuredWorks: works.slice(0, 6),
    news: listNews({ locale, status: "published" }),
    customers: listCustomers({ locale, status: "published" }),
    services: listServices({ locale, status: "published" }),
    partners: listPartners({ locale, status: "published" }),
    stats: listStats({ locale }),
    settings: getSettings(),
  }
}
