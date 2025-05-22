import { type NextRequest, NextResponse } from "next/server"
import * as Sentry from "@sentry/nextjs"

export function middleware(request: NextRequest) {
  // Add trace ID to response headers for debugging
  const traceId = Math.random().toString(36).substring(2, 15)
  const response = NextResponse.next()

  response.headers.set("x-trace-id", traceId)

  // Get the pathname from the URL
  const pathname = request.nextUrl.pathname

  // Skip processing for the root path, login, and onboarding
  if (pathname === "/" || pathname === "/login" || pathname.startsWith("/onboarding")) {
    return response
  }

  // Check if the user is logged in
  const userDataCookie = request.cookies.get("userData")
  const userData = userDataCookie ? JSON.parse(userDataCookie.value) : null

  // If no user data and not on public routes, redirect to root
  if (!userData && !pathname.match(/\.(jpg|png|svg|ico|css|js)$/)) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Provider routes protection
  if (pathname.startsWith("/provider")) {
    // If no user data or user is not a provider, redirect to home
    if (!userData || userData.role !== "provider") {
      return NextResponse.redirect(new URL("/home", request.url))
    }
  }

  // User routes protection
  if (["/home", "/my-mess", "/explore", "/profile"].some((route) => pathname === route)) {
    // If user is a provider, redirect to provider home
    if (userData && userData.role === "provider") {
      return NextResponse.redirect(new URL("/provider/home", request.url))
    }
  }

  // Log the request to Sentry breadcrumbs
  Sentry.addBreadcrumb({
    category: "http",
    type: "http",
    level: "info",
    message: `${request.method} ${request.nextUrl.pathname}`,
    data: {
      url: request.url,
      method: request.method,
      traceId,
      userRole: userData?.role || "anonymous",
    },
  })

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
