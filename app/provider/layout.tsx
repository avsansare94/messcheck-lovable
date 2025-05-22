import type React from "react"
import { ProviderBottomNavigation } from "@/components/provider-bottom-navigation"

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-md mx-auto pb-16">{children}</div>
      <ProviderBottomNavigation />
    </div>
  )
}
