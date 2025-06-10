
import React from "react"
import { SettingsLayout } from "@/components/settings-layout"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function SettingsPage() {
  return (
    <main className="pb-16">
      <SettingsLayout>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-gray-600">Manage your account settings and preferences.</p>
        </div>
      </SettingsLayout>
      <BottomNavigation activeTab="settings" />
    </main>
  )
}
