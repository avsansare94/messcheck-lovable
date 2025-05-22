import { SettingsLayout } from "@/components/settings-layout"
import NotificationSettings from "@/components/notification-settings"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function NotificationSettingsPage() {
  return (
    <>
      <SettingsLayout title="Notification Settings">
        <NotificationSettings />
      </SettingsLayout>
      <BottomNavigation activeTab="settings" />
    </>
  )
}
