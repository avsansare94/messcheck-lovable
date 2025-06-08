import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/"

  if (code) {
    const supabase = createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      // Check if user has a complete profile
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", data.user.id).single()

      // If no profile or role is null, redirect to onboarding
      if (!profile || !profile.role) {
        return NextResponse.redirect(`${origin}/onboarding`)
      }

      // Redirect based on role
      if (profile.role === "admin") {
        return NextResponse.redirect(`${origin}/admin/dashboard`)
      } else if (profile.role === "provider") {
        return NextResponse.redirect(`${origin}/provider-dashboard`)
      } else {
        return NextResponse.redirect(`${origin}/dashboard`)
      }
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
