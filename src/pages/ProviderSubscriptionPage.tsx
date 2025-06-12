
import React from "react"
import { SubscriptionManagementScreen } from "@/components/subscription-management-screen"
import { ProviderBottomNavigation } from "@/components/provider-bottom-navigation"

export default function ProviderSubscriptionPage() {
  return (
    <main className="pb-16">
      <SubscriptionManagementScreen />
      <ProviderBottomNavigation activeTab="subscription" />
    </main>
  )
}
