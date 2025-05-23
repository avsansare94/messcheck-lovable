import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function middleware(request: NextRequest) {
  // Create a Supabase client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  const supabase = createClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value
      },
    },
  })

  // Get the user's session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Get the user's profile to check their role
  let role = "anonymous"
  if (session?.user?.id) {
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

    if (profile) {
      role = profile.role
    }
  }

  // Define protected routes
  const userProtectedRoutes = ["/home", "/explore", "/my-mess", "/settings"]
  const providerProtectedRoutes = [
    "/provider/home",
    "/provider/manage",
    "/provider/subscription",
    "/provider/checkin",
    "/provider/settings",
  ]
  const publicRoutes = ["/", "/login", "/signup", "/onboarding", "/provider/onboarding"]

  const path = request.nextUrl.pathname

  // Check if the route is protected
  const isUserProtectedRoute = userProtectedRoutes.some((route) => path.startsWith(route))
  const isProviderProtectedRoute = providerProtectedRoutes.some((route) => path.startsWith(route))
  const isPublicRoute = publicRoutes.some((route) => path === route)

  // Redirect logic
  if (!session && (isUserProtectedRoute || isProviderProtectedRoute)) {
    // Redirect to login if not authenticated
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (session) {
    // Redirect based on role
    if (role === "user" && isProviderProtectedRoute) {
      return NextResponse.redirect(new URL("/home", request.url))
    }

    if (role === "provider" && isUserProtectedRoute) {
      return NextResponse.redirect(new URL("/provider/home", request.url))
    }

    // Redirect from public routes if already authenticated
    if (isPublicRoute && path !== "/onboarding" && path !== "/provider/onboarding") {
      if (role === "user") {
        return NextResponse.redirect(new URL("/home", request.url))
      } else if (role === "provider") {
        return NextResponse.redirect(new URL("/provider/home", request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
