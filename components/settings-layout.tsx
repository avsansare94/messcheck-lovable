
import type React from "react"

interface SettingsLayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
}

export function SettingsLayout({ children, title = "Settings", description }: SettingsLayoutProps) {
  return (
    <div className="container max-w-md mx-auto px-0 pb-20">
      <div className="flex-1 px-4 py-4">{children}</div>
    </div>
  )
}
