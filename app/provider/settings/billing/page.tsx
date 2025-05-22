import { ProviderSettingsLayout } from "@/components/provider-settings-layout"
import BillingSettings from "@/components/billing-settings"
import { ProviderBottomNavigation } from "@/components/provider-bottom-navigation"

export default function BillingSettingsPage() {
  return (
    <>
      <ProviderSettingsLayout title="Billing & Payments">
        <BillingSettings />
      </ProviderSettingsLayout>
      <ProviderBottomNavigation activeTab="settings" />
    </>
  )
}
