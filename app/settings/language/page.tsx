import { SettingsLayout } from "@/components/settings-layout"
import LanguageSettings from "@/components/language-settings"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function LanguageSettingsPage() {
  return (
    <>
      <SettingsLayout title="Language Settings">
        <LanguageSettings />
      </SettingsLayout>
      <BottomNavigation activeTab="settings" />
    </>
  )
}
