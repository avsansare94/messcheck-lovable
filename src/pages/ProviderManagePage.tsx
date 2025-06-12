
import React from "react"
import { ManageMessScreen } from "@/components/manage-mess-screen"
import { ProviderBottomNavigation } from "@/components/provider-bottom-navigation"

export default function ProviderManagePage() {
  return (
    <main className="pb-16">
      <ManageMessScreen />
      <ProviderBottomNavigation activeTab="manage" />
    </main>
  )
}
