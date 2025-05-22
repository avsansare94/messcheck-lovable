import { SettingsLayout } from "@/components/settings-layout"
import PrivacySettings from "@/components/privacy-settings"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function PrivacySettingsPage() {
  return (
    <>
      <SettingsLayout title="Privacy & Security">
        <PrivacySettings />
      </SettingsLayout>
      <BottomNavigation activeTab="settings" />
    </>
  )
}
