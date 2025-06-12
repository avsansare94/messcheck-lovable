
import React from "react"
import { Navigate } from "react-router-dom"
import { useTestAuth } from "@/lib/test-auth-context"
import { ProviderBottomNavigation } from "@/components/provider-bottom-navigation"

export default function ProviderDashboardPage() {
  const { user } = useTestAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (user.role !== "mess-provider") {
    return <Navigate to="/unauthorized" replace />
  }

  return (
    <main className="pb-16">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Provider Dashboard</h1>
        <p className="mb-4">Welcome, {user.full_name}!</p>

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
      <ProviderBottomNavigation activeTab="home" />
    </main>
  )
}
