import { NextResponse } from "next/server"
import { getDb } from "@/lib/db/client"
import { randomUUID } from "node:crypto"
import crypto from "node:crypto"

export async function GET() {
  try {
    const db = getDb()
    const admins = db.prepare("SELECT id, email, role, created_at FROM admins ORDER BY created_at DESC").all()
    return NextResponse.json({ data: admins })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch admins" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password, role = "admin" } = body

    if (!email || !password || password.length < 6) {
      return NextResponse.json({ error: "Email and password (min 6 chars) are required." }, { status: 400 })
    }

    const db = getDb()
    const existing = db.prepare("SELECT id FROM admins WHERE email = ?").get(email) as any

    const salt = crypto.randomBytes(16).toString("hex")
    const hash = crypto.scryptSync(password, salt, 64).toString("hex")
    const passwordHash = hash + ":" + salt

    if (existing) {
      // Update existing admin
      db.prepare(
        "UPDATE admins SET password_hash = ?, role = ? WHERE id = ?"
      ).run(passwordHash, role, existing.id)
    } else {
      // Create new admin
      db.prepare(
        "INSERT INTO admins (id, email, password_hash, role, created_at) VALUES (?, ?, ?, ?, ?)"
      ).run(randomUUID(), email, passwordHash, role, new Date().toISOString())
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error saving admin:", error)
    return NextResponse.json({ error: "Failed to save admin" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 })
    }

    const db = getDb()
    const count = db.prepare("SELECT COUNT(*) as c FROM admins").get() as { c: number }
    if (count.c <= 1) {
      return NextResponse.json({ error: "Cannot delete the last admin account." }, { status: 400 })
    }

    db.prepare("DELETE FROM admins WHERE id = ?").run(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting admin:", error)
    return NextResponse.json({ error: "Failed to delete admin" }, { status: 500 })
  }
}
