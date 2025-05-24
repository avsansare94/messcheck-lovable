import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createClient } from "@supabase/supabase-js"
import * as Sentry from "@sentry/nextjs"

export async function middleware(request: NextRequest) {
  // Add trace ID to response headers for debugging
  const traceId = Math.random().toString(36).substring(2, 15)
  const response = NextResponse.next()

  response.headers.set("x-trace-id", traceId)

  // Get the pathname from the URL
  const pathname = request.nextUrl.pathname

  // Skip processing for static files and API routes
  if (pathname.match(/\.(jpg|png|svg|ico|css|js)$/) || pathname.startsWith("/api")) {
    return response
  }

  // Create a Supabase client for middleware
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Get session from cookies
    const accessToken = request.cookies.get("sb-access-token")?.value
    const refreshToken = request.cookies.get("sb-refresh-token")?.value

    if (accessToken && refreshToken) {
      const {
        data: { user },
      } = await supabase.auth.getUser(accessToken)

      if (user) {
        // Get user profile to check role
        const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

        // Admin routes protection
        if (pathname.startsWith("/admin")) {
          if (!profile || profile.role !== "admin") {
            return NextResponse.redirect(new URL("/not-authorized", request.url))
          }
        }

        // Zeus routes protection
        if (pathname.startsWith("/zeus")) {
          if (!profile || profile.role !== "zeus") {
            return NextResponse.redirect(new URL("/not-authorized", request.url))
          }
        }

        // Provider routes protection
        if (pathname.startsWith("/provider")) {
          if (!profile || profile.role !== "provider") {
            return NextResponse.redirect(new URL("/home", request.url))
          }
        }

        // User routes protection
        if (["/home", "/my-mess", "/explore", "/profile", "/settings"].some((route) => pathname.startsWith(route))) {
          if (profile && profile.role === "admin") {
            return NextResponse.redirect(new URL("/admin/dashboard", request.url))
          } else if (profile && profile.role === "zeus") {
            return NextResponse.redirect(new URL("/zeus/dashboard", request.url))
          } else if (profile && profile.role === "provider") {
            return NextResponse.redirect(new URL("/provider/home", request.url))
          }
        }

        // Redirect authenticated users from public routes
        if (pathname === "/" || pathname === "/login") {
          if (profile?.role === "admin") {
            return NextResponse.redirect(new URL("/admin/dashboard", request.url))
          } else if (profile?.role === "zeus") {
            return NextResponse.redirect(new URL("/zeus/dashboard", request.url))
          } else if (profile?.role === "provider") {
            return NextResponse.redirect(new URL("/provider/home", request.url))
          } else if (profile?.role === "user") {
            return NextResponse.redirect(new URL("/home", request.url))
          }
        }
      }
    } else {
      // No authentication - protect secured routes
      if (
        pathname.startsWith("/admin") ||
        pathname.startsWith("/zeus") ||
        pathname.startsWith("/provider") ||
        ["/home", "/my-mess", "/explore", "/profile", "/settings"].some((route) => pathname.startsWith(route))
      ) {
        return NextResponse.redirect(new URL("/login", request.url))
      }
    }
  }

  // Fallback to cookie-based authentication for existing users
  const userDataCookie = request.cookies.get("userData")
  const userData = userDataCookie ? JSON.parse(userDataCookie.value) : null

  if (userData) {
    // Admin routes protection (fallback)
    if (pathname.startsWith("/admin") && userData.role !== "admin") {
      return NextResponse.redirect(new URL("/not-authorized", request.url))
    }

    // Zeus routes protection (fallback)
    if (pathname.startsWith("/zeus") && userData.role !== "zeus") {
      return NextResponse.redirect(new URL("/not-authorized", request.url))
    }

    // Provider routes protection (fallback)
    if (pathname.startsWith("/provider") && userData.role !== "provider") {
      return NextResponse.redirect(new URL("/home", request.url))
    }

    // User routes protection (fallback)
    if (["/home", "/my-mess", "/explore", "/profile"].some((route) => pathname === route)) {
      if (userData.role === "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url))
      } else if (userData.role === "zeus") {
        return NextResponse.redirect(new URL("/zeus/dashboard", request.url))
      } else if (userData.role === "provider") {
        return NextResponse.redirect(new URL("/provider/home", request.url))
      }
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
