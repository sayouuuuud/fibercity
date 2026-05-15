import Database from "better-sqlite3"
import { existsSync, mkdirSync } from "node:fs"
import { dirname, resolve } from "node:path"

import { applySchema } from "./schema"
import { seedDatabase } from "./seed"

declare global {
  // eslint-disable-next-line no-var
  var __fiberCityDb: Database.Database | undefined
  // eslint-disable-next-line no-var
  var __fiberCityDbReady: boolean | undefined
}

function resolveDbPath(): string {
  const env = process.env.FIBER_CITY_DB_PATH
  if (env) return resolve(env)
  return resolve(process.cwd(), "data", "fibercity.db")
}

export function getDb(): Database.Database {
  if (globalThis.__fiberCityDb) return globalThis.__fiberCityDb

  const path = resolveDbPath()
  if (!existsSync(dirname(path))) mkdirSync(dirname(path), { recursive: true })

  const db = new Database(path)
  db.pragma("journal_mode = WAL")
  db.pragma("foreign_keys = ON")

  applySchema(db)
  // Seed only on first run (idempotent — seedDatabase short-circuits if works > 0).
  seedDatabase(db)

  globalThis.__fiberCityDb = db
  globalThis.__fiberCityDbReady = true
  return db
}

export type Db = ReturnType<typeof getDb>
