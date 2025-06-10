
import React from "react"
import { ProviderDashboard } from "@/components/provider-dashboard"
import { ProviderBottomNavigation } from "@/components/provider-bottom-navigation"

export default function ProviderDashboardPage() {
  return (
    <main className="pb-16">
      <ProviderDashboard />
      <ProviderBottomNavigation activeTab="home" />
    </main>
  )
}
