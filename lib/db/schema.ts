import type Database from "better-sqlite3"

// SQLite DDL — all bilingual content fields use *_en / *_ar suffixes.
// Tables stay flat for simple JSON serialisation back to the UI layer.
export const SCHEMA_DDL = `
CREATE TABLE IF NOT EXISTS works (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL DEFAULT '',
  excerpt_en TEXT NOT NULL DEFAULT '',
  excerpt_ar TEXT NOT NULL DEFAULT '',
  content_en TEXT NOT NULL DEFAULT '[]',
  content_ar TEXT NOT NULL DEFAULT '[]',
  cover_image TEXT NOT NULL DEFAULT '',
  gallery TEXT NOT NULL DEFAULT '[]',
  category TEXT NOT NULL DEFAULT 'Installation',
  client TEXT NOT NULL DEFAULT '',
  location_en TEXT NOT NULL DEFAULT '',
  location_ar TEXT NOT NULL DEFAULT '',
  year TEXT NOT NULL DEFAULT '',
  stats TEXT NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'published',
  sort_order INTEGER NOT NULL DEFAULT 0,
  views INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS news (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL DEFAULT '',
  excerpt_en TEXT NOT NULL DEFAULT '',
  excerpt_ar TEXT NOT NULL DEFAULT '',
  content_en TEXT NOT NULL DEFAULT '[]',
  content_ar TEXT NOT NULL DEFAULT '[]',
  cover_image TEXT NOT NULL DEFAULT '',
  category_en TEXT NOT NULL DEFAULT '',
  category_ar TEXT NOT NULL DEFAULT '',
  author TEXT NOT NULL DEFAULT '',
  read_minutes INTEGER NOT NULL DEFAULT 5,
  status TEXT NOT NULL DEFAULT 'published',
  published_at TEXT NOT NULL DEFAULT (datetime('now')),
  views INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS customers (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL DEFAULT '',
  industry_en TEXT NOT NULL DEFAULT '',
  industry_ar TEXT NOT NULL DEFAULT '',
  tier TEXT NOT NULL DEFAULT 'Growth',
  region_en TEXT NOT NULL DEFAULT '',
  region_ar TEXT NOT NULL DEFAULT '',
  description_en TEXT NOT NULL DEFAULT '',
  description_ar TEXT NOT NULL DEFAULT '',
  logo_url TEXT,
  since TEXT NOT NULL DEFAULT '',
  projects_count INTEGER NOT NULL DEFAULT 0,
  health_score INTEGER NOT NULL DEFAULT 85,
  contact_name TEXT NOT NULL DEFAULT '',
  contact_email TEXT NOT NULL DEFAULT '',
  contact_phone TEXT NOT NULL DEFAULT '',
  featured INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL DEFAULT 'Sparkles',
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL DEFAULT '',
  description_en TEXT NOT NULL DEFAULT '',
  description_ar TEXT NOT NULL DEFAULT '',
  bullets_en TEXT NOT NULL DEFAULT '[]',
  bullets_ar TEXT NOT NULL DEFAULT '[]',
  sort_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS partners (
  id TEXT PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_ar TEXT NOT NULL DEFAULT '',
  group_en TEXT NOT NULL DEFAULT '',
  group_ar TEXT NOT NULL DEFAULT '',
  type_en TEXT NOT NULL DEFAULT '',
  type_ar TEXT NOT NULL DEFAULT '',
  logo_url TEXT,
  website_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'published',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS stats (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  value INTEGER NOT NULL DEFAULT 0,
  suffix_en TEXT NOT NULL DEFAULT '',
  suffix_ar TEXT NOT NULL DEFAULT '',
  label_en TEXT NOT NULL,
  label_ar TEXT NOT NULL DEFAULT '',
  helper_en TEXT NOT NULL DEFAULT '',
  helper_ar TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  company TEXT NOT NULL DEFAULT '',
  service TEXT NOT NULL DEFAULT '',
  subject TEXT NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS pages (
  key TEXT PRIMARY KEY,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'published',
  sections TEXT NOT NULL DEFAULT '[]',
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS visits (
  id TEXT PRIMARY KEY,
  path TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS works_status_idx ON works(status);
CREATE INDEX IF NOT EXISTS works_category_idx ON works(category);
CREATE INDEX IF NOT EXISTS news_status_idx ON news(status);
CREATE INDEX IF NOT EXISTS news_published_idx ON news(published_at);
CREATE INDEX IF NOT EXISTS customers_status_idx ON customers(status);
CREATE INDEX IF NOT EXISTS customers_tier_idx ON customers(tier);
CREATE INDEX IF NOT EXISTS partners_group_idx ON partners(group_en);
CREATE INDEX IF NOT EXISTS messages_status_idx ON contact_messages(status);
CREATE INDEX IF NOT EXISTS visits_created_idx ON visits(created_at);
CREATE INDEX IF NOT EXISTS visits_path_idx ON visits(path);
`

export function applySchema(db: Database.Database) {
  db.exec(SCHEMA_DDL)
}
