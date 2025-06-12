
import React from "react"
import { ProviderSettingsLayout } from "@/components/provider-settings-layout"
import { ProviderBottomNavigation } from "@/components/provider-bottom-navigation"
import { ProviderSettingsContent } from "@/components/provider/provider-settings-content"

export default function ProviderSettingsPage() {
  return (
    <main className="pb-16">
      <ProviderSettingsLayout title="Provider Settings" description="Manage your mess provider account">
        <ProviderSettingsContent />
      </ProviderSettingsLayout>
      <ProviderBottomNavigation activeTab="settings" />
    </main>
  )
}
