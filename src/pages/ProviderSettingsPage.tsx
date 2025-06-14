
import React from "react"
import { ProviderBottomNavigation } from "@/components/provider-bottom-navigation"
import { ProviderSettingsScreen } from "@/components/provider-settings-screen"

export default function ProviderSettingsPage() {
  return (
    <main className="pb-16">
      <ProviderSettingsScreen />
      <ProviderBottomNavigation activeTab="settings" />
    </main>
  )
}
