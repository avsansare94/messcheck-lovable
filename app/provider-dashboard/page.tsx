import { ProviderDashboard } from "@/components/provider-dashboard"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function ProviderDashboardPage() {
  return (
    <main className="pb-16">
      <ProviderDashboard />
      <BottomNavigation activeTab="home" />
    </main>
  )
}
