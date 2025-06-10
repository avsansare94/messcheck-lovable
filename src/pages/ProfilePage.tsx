
import React from "react"
import { ProfileScreen } from "@/components/profile-screen"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function ProfilePage() {
  return (
    <main className="pb-16">
      <ProfileScreen />
      <BottomNavigation activeTab="settings" />
    </main>
  )
}
