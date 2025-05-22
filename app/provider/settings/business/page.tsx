import { ProviderSettingsLayout } from "@/components/provider-settings-layout"
import BusinessSettings from "@/components/business-settings"
import { ProviderBottomNavigation } from "@/components/provider-bottom-navigation"

export default function BusinessSettingsPage() {
  return (
    <>
      <ProviderSettingsLayout title="Business Settings">
        <BusinessSettings />
      </ProviderSettingsLayout>
      <ProviderBottomNavigation activeTab="settings" />
    </>
  )
}
