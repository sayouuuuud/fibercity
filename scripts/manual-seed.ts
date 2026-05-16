import Database from "better-sqlite3"
import { resolve } from "node:path"
import { seedDatabase } from "../lib/db/seed"

const dbPath = resolve(process.cwd(), "data", "fibercity.db")
const db = new Database(dbPath)

console.log("Starting manual re-seed...")
const result = seedDatabase(db, { force: true })
console.log("Seed result:", result)

db.close()
console.log("Database closed.")
