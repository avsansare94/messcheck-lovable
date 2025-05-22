"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { User, Bell, Globe, Shield, Palette, HelpCircle, ChevronRight } from "lucide-react"

export default function UserSettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const menuItems = [
    {
      icon: <User className="h-5 w-5" />,
      label: "Profile",
      href: "/settings/profile",
      description: "Manage your personal information",
    },
    {
      icon: <Bell className="h-5 w-5" />,
      label: "Notifications",
      href: "/settings/notifications",
      description: "Control your notification preferences",
    },
    {
      icon: <Globe className="h-5 w-5" />,
      label: "Language",
      href: "/settings/language",
      description: "Change your language settings",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      label: "Privacy & Security",
      href: "/settings/privacy",
      description: "Manage your privacy and security settings",
    },
    {
      icon: <Palette className="h-5 w-5" />,
      label: "Appearance",
      href: "/settings/appearance",
      description: "Customize the app appearance",
    },
    {
      icon: <HelpCircle className="h-5 w-5" />,
      label: "Help & Support",
      href: "/settings/help",
      description: "Get help and support",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
        {/* Settings Menu */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <nav className="flex flex-col">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                  pathname === item.href ? "bg-gray-50 border-l-4 border-orange-500" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`${pathname === item.href ? "text-orange-500" : "text-gray-500"}`}>{item.icon}</div>
                  <div>
                    <div className="font-medium">{item.label}</div>
                    <div className="text-sm text-gray-500">{item.description}</div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow p-6">{children}</div>
      </div>
    </div>
  )
}
