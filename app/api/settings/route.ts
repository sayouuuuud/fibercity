import { NextRequest } from "next/server"

import { getSettings, setSettings } from "@/lib/db/queries"
import { jsonError, jsonOk } from "@/lib/api/response"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET() {
  try {
    return jsonOk(getSettings())
  } catch (error) {
    console.error("[api/settings] GET", error)
    return jsonError("Failed to load settings", 500)
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>
    const stringValues: Record<string, string> = {}
    for (const [key, value] of Object.entries(body)) {
      if (value === undefined || value === null) continue
      stringValues[key] = typeof value === "string" ? value : JSON.stringify(value)
    }
    setSettings(stringValues)
    return jsonOk(getSettings())
  } catch (error) {
    console.error("[api/settings] PUT", error)
    return jsonError("Failed to update settings", 500)
  }
}
