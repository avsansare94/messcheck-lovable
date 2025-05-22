import { ProviderSettingsLayout } from "@/components/provider-settings-layout"
import ProviderNotificationSettings from "@/components/provider-notification-settings"
import { ProviderBottomNavigation } from "@/components/provider-bottom-navigation"

export default function ProviderNotificationSettingsPage() {
  return (
    <>
      <ProviderSettingsLayout title="Notification Settings">
        <ProviderNotificationSettings />
      </ProviderSettingsLayout>
      <ProviderBottomNavigation activeTab="settings" />
    </>
  )
}
