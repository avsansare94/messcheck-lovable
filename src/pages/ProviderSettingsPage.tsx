
import React from "react"
import { ProviderSettingsLayout } from "@/components/provider-settings-layout"
import { ProviderBottomNavigation } from "@/components/provider-bottom-navigation"

export default function ProviderSettingsPage() {
  return (
    <main className="pb-16">
      <ProviderSettingsLayout />
      <ProviderBottomNavigation activeTab="settings" />
    </main>
  )
}
