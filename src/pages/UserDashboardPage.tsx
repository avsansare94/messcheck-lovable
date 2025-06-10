
import React from "react"
import { UserDashboard } from "@/components/user-dashboard"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function UserDashboardPage() {
  return (
    <main className="pb-16">
      <UserDashboard />
      <BottomNavigation activeTab="home" />
    </main>
  )
}
