import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"

export default async function ProviderDashboardPage() {
  const supabase = createServerClient()

  // Check authentication
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    redirect("/login")
  }

  // Check user role
  const { data: profile } = await supabase.from("profiles").select("role, full_name").eq("id", session.user.id).single()

  if (profile?.role !== "provider") {
    redirect("/unauthorized")
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Provider Dashboard</h1>
      <p className="mb-4">Welcome, {profile.full_name}!</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Manage Mess</h2>
          <p className="text-gray-600">Update your mess details and offerings</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Subscriptions</h2>
          <p className="text-gray-600">Manage customer subscriptions</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Check-ins</h2>
          <p className="text-gray-600">View and manage customer check-ins</p>
        </div>
      </div>
    </div>
  )
}
