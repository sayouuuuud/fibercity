const Database = require('better-sqlite3')
const crypto = require('node:crypto')
const { resolve } = require('node:path')
const { randomUUID } = require('node:crypto')

const dbPath = resolve(process.cwd(), 'data', 'fibercity.db')
const db = new Database(dbPath)

try {
  // Ensure table exists just in case
  db.exec(`
    CREATE TABLE IF NOT EXISTS admins (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'admin',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `)

  const existing = db.prepare("SELECT COUNT(*) as c FROM admins").get()
  if (existing.c === 0) {
    const salt = crypto.randomBytes(16).toString("hex")
    const hash = crypto.scryptSync("111111", salt, 64).toString("hex")
    db.prepare(
      "INSERT INTO admins (id, email, password_hash, role) VALUES (?, ?, ?, ?)"
    ).run(randomUUID(), "admin@test.com", hash + ":" + salt, "admin")
    console.log("Admin seeded successfully: admin@test.com / 111111")
  } else {
    console.log("Admins table already populated.")
  }
} catch (e) {
  console.error("Error seeding admin:", e)
}

db.close()
