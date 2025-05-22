import { SettingsLayout } from "@/components/settings-layout"
import HelpSupportSettings from "@/components/help-support-settings"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function HelpSupportSettingsPage() {
  return (
    <>
      <SettingsLayout title="Help & Support">
        <HelpSupportSettings />
      </SettingsLayout>
      <BottomNavigation activeTab="settings" />
    </>
  )
}
