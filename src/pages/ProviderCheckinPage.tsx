
import React from "react"
import { CheckInManagementScreen } from "@/components/check-in-management-screen"
import { ProviderBottomNavigation } from "@/components/provider-bottom-navigation"

export default function ProviderCheckinPage() {
  return (
    <main className="pb-16">
      <CheckInManagementScreen />
      <ProviderBottomNavigation activeTab="checkin" />
    </main>
  )
}
