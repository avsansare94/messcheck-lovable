import type React from "react"
import { SettingsLayout } from "@/components/settings-layout"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function SettingsRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SettingsLayout>{children}</SettingsLayout>
      <BottomNavigation activeTab="settings" />
    </>
  )
}
