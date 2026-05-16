"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getDb } from "@/lib/db/client"
import crypto from "node:crypto"

export async function loginAdmin(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  let success = false
  try {
    const db = getDb()
    const admin = db.prepare("SELECT * FROM admins WHERE email = ?").get(email) as any

    if (admin) {
      const [hash, salt] = admin.password_hash.split(":")
      const verifyHash = crypto.scryptSync(password, salt, 64).toString("hex")

      if (hash === verifyHash) {
        const cookieStore = await cookies()
        cookieStore.set("admin_auth", "true", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24 * 7, // 1 week
          path: "/",
        })
        success = true
      }
    }
  } catch (error) {
    console.error("Login error:", error)
  }

  if (success) {
    redirect("/admin")
  }

  return { error: "Invalid credentials" }
}

export async function logoutAdmin() {
  const cookieStore = await cookies()
  cookieStore.delete("admin_auth")
  redirect("/admin/login")
}
