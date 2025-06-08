import { ProviderDashboard } from "@/components/provider-dashboard"
import { ProviderBottomNavigation } from "@/components/provider-bottom-navigation"

export default function ProviderHomePage() {
  return (
    <main className="pb-16">
      <ProviderDashboard />
      <ProviderBottomNavigation activeTab="home" />
    </main>
  )
}
