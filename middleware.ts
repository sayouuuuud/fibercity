import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  
  if (path.startsWith("/admin") && !path.startsWith("/admin/login")) {
    const isAuth = request.cookies.has("admin_auth")
    if (!isAuth) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }
  
  // Prevent logged in users from seeing login page
  if (path === "/admin/login") {
    const isAuth = request.cookies.has("admin_auth")
    if (isAuth) {
      return NextResponse.redirect(new URL("/admin", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
