
import React from "react"
import { ProviderHomeScreen } from "@/components/provider-home-screen"
import { ProviderBottomNavigation } from "@/components/provider-bottom-navigation"

export default function ProviderHomePage() {
  return (
    <main className="pb-16">
      <ProviderHomeScreen />
      <ProviderBottomNavigation activeTab="home" />
    </main>
  )
}
