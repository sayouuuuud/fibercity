import { getDashboardSnapshot } from "@/lib/db/queries"
import { jsonError, jsonOk } from "@/lib/api/response"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET() {
  try {
    return jsonOk(getDashboardSnapshot())
  } catch (error) {
    console.error("[api/dashboard] GET", error)
    return jsonError("Failed to build dashboard", 500)
  }
}
