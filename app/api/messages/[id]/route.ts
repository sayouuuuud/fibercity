import { NextRequest } from "next/server"

import { deleteMessage, getMessage, updateMessageStatus } from "@/lib/db/queries"
import { jsonError, jsonOk } from "@/lib/api/response"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

type Params = { params: Promise<{ id: string }> }

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params
  const message = getMessage(id)
  if (!message) return jsonError("Not found", 404)
  return jsonOk(message)
}

type Body = { status?: "new" | "read" | "archived" }

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params
  try {
    const body = (await request.json()) as Body
    if (!body.status) return jsonError("status is required")
    const updated = updateMessageStatus(id, body.status)
    if (!updated) return jsonError("Not found", 404)
    return jsonOk(updated)
  } catch (error) {
    console.error("[api/messages/:id] PUT", error)
    return jsonError("Failed to update message", 500)
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params
  return deleteMessage(id) ? jsonOk({ deleted: true }) : jsonError("Not found", 404)
}
