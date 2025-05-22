import { SettingsLayout } from "@/components/settings-layout"
import AppearanceSettings from "@/components/appearance-settings"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function AppearanceSettingsPage() {
  return (
    <>
      <SettingsLayout title="Appearance">
        <AppearanceSettings />
      </SettingsLayout>
      <BottomNavigation activeTab="settings" />
    </>
  )
}
