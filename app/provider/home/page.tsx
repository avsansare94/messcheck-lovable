import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ProviderHomeScreen } from "@/components/provider-home-screen"
import { ProviderBottomNavigation } from "@/components/provider-bottom-navigation"

export default async function ProviderHomePage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (!profile || profile.role !== "provider") {
    redirect("/unauthorized")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProviderHomeScreen />
      <ProviderBottomNavigation activeTab="home" />
    </div>
  )
}
