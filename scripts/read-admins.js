const Database = require('better-sqlite3')
const { resolve } = require('node:path')

const dbPath = resolve(process.cwd(), 'data', 'fibercity.db')
const db = new Database(dbPath)
try {
  const admins = db.prepare("SELECT email, password_hash FROM admins").all()
  console.log(admins)
} catch (e) {
  console.error(e)
}
db.close()
