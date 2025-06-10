
import React from "react"
import { SettingsLayout } from "@/components/settings-layout"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function SettingsPage() {
  return (
    <main className="pb-16">
      <SettingsLayout />
      <BottomNavigation activeTab="settings" />
    </main>
  )
}
