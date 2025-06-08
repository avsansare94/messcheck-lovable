import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import DashboardOverview from "@/components/dashboard/dashboard-overview"

export default async function DashboardPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile) {
    redirect("/onboarding")
  }

  return <DashboardOverview user={user} profile={profile} />
}
