import type React from "react"
import { ProviderSettingsLayout } from "@/components/provider-settings-layout"
import { ProviderBottomNavigation } from "@/components/provider-bottom-navigation"

export default function ProviderSettingsRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProviderSettingsLayout>{children}</ProviderSettingsLayout>
      <ProviderBottomNavigation activeTab="settings" />
    </>
  )
}
