import { ProviderSettingsLayout } from "@/components/provider-settings-layout"
import HelpSupportSettings from "@/components/help-support-settings"
import { ProviderBottomNavigation } from "@/components/provider-bottom-navigation"

export default function ProviderHelpSupportSettingsPage() {
  return (
    <>
      <ProviderSettingsLayout title="Help & Support">
        <HelpSupportSettings />
      </ProviderSettingsLayout>
      <ProviderBottomNavigation activeTab="settings" />
    </>
  )
}
