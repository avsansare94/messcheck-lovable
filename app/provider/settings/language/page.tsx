import { ProviderSettingsLayout } from "@/components/provider-settings-layout"
import LanguageSettings from "@/components/language-settings"
import { ProviderBottomNavigation } from "@/components/provider-bottom-navigation"

export default function ProviderLanguageSettingsPage() {
  return (
    <>
      <ProviderSettingsLayout title="Language Settings">
        <LanguageSettings />
      </ProviderSettingsLayout>
      <ProviderBottomNavigation activeTab="settings" />
    </>
  )
}
