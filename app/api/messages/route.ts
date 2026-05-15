import { NextRequest } from "next/server"

import { createMessage, listMessages } from "@/lib/db/queries"
import { jsonError, jsonOk } from "@/lib/api/response"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = (searchParams.get("status") as "all" | "new" | "read" | "archived" | null) ?? "all"
  const search = searchParams.get("search") ?? undefined
  const limitParam = searchParams.get("limit")
  const limit = limitParam ? Number.parseInt(limitParam, 10) : undefined
  try {
    return jsonOk(listMessages({ status, search, limit }))
  } catch (error) {
    console.error("[api/messages] GET", error)
    return jsonError("Failed to load messages", 500)
  }
}

type Body = {
  name: string
  email: string
  phone?: string
  company?: string
  service?: string
  subject?: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Body
    if (!body.name || !body.email || !body.message) {
      return jsonError("name, email, and message are required")
    }
    const created = createMessage({
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      service: body.service,
      subject: body.subject,
      message: body.message,
    })
    return jsonOk(created, { status: 201 })
  } catch (error) {
    console.error("[api/messages] POST", error)
    return jsonError("Failed to send message", 500)
  }
}
