const Database = require('better-sqlite3')
const { resolve } = require('node:path')

const dbPath = resolve(process.cwd(), 'data', 'fibercity.db')
const db = new Database(dbPath)

try {
  db.prepare("DELETE FROM works").run()
  db.prepare("DELETE FROM news").run()
  db.prepare("DELETE FROM customers").run()
  db.prepare("DELETE FROM services").run()
  db.prepare("DELETE FROM partners").run()
  db.prepare("DELETE FROM contact_messages").run()
  console.log("Dummy data cleared successfully.")
} catch (e) {
  console.error("Error clearing data:", e)
}

db.close()
