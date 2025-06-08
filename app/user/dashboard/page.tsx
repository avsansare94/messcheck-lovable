import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"

export default async function UserDashboardPage() {
  const supabase = createServerClient()

  // Check authentication
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    redirect("/login")
  }

  // Check user role
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

  if (profile?.role !== "user") {
    redirect("/unauthorized")
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Find Mess</h2>
          <p className="text-gray-600">Discover mess services near you</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">My Subscriptions</h2>
          <p className="text-gray-600">Manage your active meal plans</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Check-ins</h2>
          <p className="text-gray-600">View your recent mess visits</p>
        </div>
      </div>
    </div>
  )
}
