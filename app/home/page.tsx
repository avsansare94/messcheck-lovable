import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { UserDashboard } from "@/components/user-dashboard"

export default async function HomePage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Get user profile to check if onboarding is complete
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile) {
    redirect("/onboarding")
  }

  // Check if user role is set (onboarding complete)
  if (!profile.role) {
    redirect("/onboarding")
  }

  // Redirect based on role
  if (profile.role === "provider") {
    redirect("/provider/home")
  }

  if (profile.role === "admin") {
    redirect("/admin/dashboard")
  }

  // User role - show user dashboard
  return <UserDashboard />
}
