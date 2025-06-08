import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import AdminDashboardOverview from "@/components/admin/admin-dashboard-overview"

export default async function AdminDashboardPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin-login")
  }

  // Check if user has admin role
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (!profile || profile.role !== "admin") {
    redirect("/unauthorized")
  }

  return <AdminDashboardOverview />
}
