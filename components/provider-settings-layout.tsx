"use client"

import type React from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

interface ProviderSettingsLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
}

export function ProviderSettingsLayout({ children, title, description }: ProviderSettingsLayoutProps) {
  return (
    <div className="container max-w-md mx-auto px-0 pb-20">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center">
        <Link href="/provider/settings" className="mr-3">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-lg font-semibold">{title}</h1>
          {description && <p className="text-sm text-gray-500">{description}</p>}
        </div>
      </header>

      <div className="flex-1 px-4 py-4">{children}</div>
    </div>
  )
}

// Add this alias export to match what's being imported elsewhere
export const ProviderSettingsLayoutComponent = ProviderSettingsLayout
