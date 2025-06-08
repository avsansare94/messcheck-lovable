import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const pathname = request.nextUrl.pathname

  // Skip processing for static files, API routes, and auth callbacks
  if (
    pathname.match(/\.(jpg|png|svg|ico|css|js|woff|woff2|ttf|eot)$/) ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/auth/callback")
  ) {
    return response
  }

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options)
            })
          },
        },
      },
    )

    // Get session without throwing errors
    const {
      data: { session },
    } = await supabase.auth.getSession()

    const user = session?.user || null
    let userProfile = null

    // Only fetch profile if user exists
    if (user) {
      try {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role, email, full_name")
          .eq("id", user.id)
          .single()

        userProfile = profile
      } catch (profileError) {
        console.warn("Profile fetch failed:", profileError)
        // Continue without profile - user might be newly created
      }
    }

    // Public routes that don't require authentication
    const publicRoutes = ["/", "/login", "/admin-login", "/signup", "/about", "/contact", "/unauthorized"]
    const isPublicRoute = publicRoutes.includes(pathname)

    // Protected routes that require authentication
    const protectedRoutes = ["/admin", "/zeus", "/provider", "/home", "/dashboard", "/profile", "/settings"]
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

    // Handle root path specially to avoid redirect loops
    if (pathname === "/") {
      if (user && userProfile?.role) {
        // Only redirect if we have a complete user profile
        const redirectUrl = getRoleBasedRedirect(userProfile.role)
        return NextResponse.redirect(new URL(redirectUrl, request.url))
      }
      // If no user or incomplete profile, let the root page handle it
      return response
    }

    // Handle authenticated users
    if (user && userProfile) {
      // Redirect authenticated users from login pages to their dashboard
      if (pathname === "/login" || pathname === "/admin-login") {
        const redirectUrl = getRoleBasedRedirect(userProfile.role)
        return NextResponse.redirect(new URL(redirectUrl, request.url))
      }

      // Role-based route protection
      if (pathname.startsWith("/admin") && userProfile.role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", request.url))
      }

      if (pathname.startsWith("/zeus") && userProfile.role !== "zeus") {
        return NextResponse.redirect(new URL("/unauthorized", request.url))
      }

      if (pathname.startsWith("/provider") && userProfile.role !== "provider") {
        return NextResponse.redirect(new URL("/unauthorized", request.url))
      }
    }
    // Handle unauthenticated users
    else if (!user && isProtectedRoute) {
      // Redirect to appropriate login page
      if (pathname.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/admin-login", request.url))
      } else {
        return NextResponse.redirect(new URL("/login", request.url))
      }
    }

    return response
  } catch (error) {
    console.error("Middleware error:", error)
    // Don't block the request, just continue
    return response
  }
}

function getRoleBasedRedirect(role: string): string {
  switch (role) {
    case "admin":
      return "/admin/dashboard"
    case "zeus":
      return "/zeus/dashboard"
    case "provider":
      return "/provider/dashboard"
    case "user":
    default:
      return "/dashboard"
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
