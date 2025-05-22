"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { User, Store, Bell, CreditCard, Globe, HelpCircle, LogOut, ChevronRight } from "lucide-react"

export function ProviderSettingsMenu() {
  const pathname = usePathname()

  const menuItems = [
    {
      icon: User,
      label: "Profile",
      href: "/provider/settings/profile",
      description: "Manage your personal information",
    },
    {
      icon: Store,
      label: "Business Settings",
      href: "/provider/settings/business",
      description: "Configure your mess business details",
    },
    {
      icon: Bell,
      label: "Notifications",
      href: "/provider/settings/notifications",
      description: "Control your notification preferences",
    },
    {
      icon: CreditCard,
      label: "Billing & Payments",
      href: "/provider/settings/billing",
      description: "Manage your billing and payment methods",
    },
    {
      icon: Globe,
      label: "Language",
      href: "/provider/settings/language",
      description: "Change your language settings",
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      href: "/provider/settings/help",
      description: "Get help and support",
    },
  ]

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
        <p className="text-sm text-gray-500">Manage your mess provider account</p>
      </div>

      <nav className="divide-y divide-gray-100">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center justify-between p-4 hover:bg-gray-50 transition-colors",
              pathname === item.href ? "bg-orange-50" : "",
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center",
                  pathname === item.href ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-500",
                )}
              >
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <div className={cn("font-medium", pathname === item.href ? "text-orange-600" : "text-gray-900")}>
                  {item.label}
                </div>
                <div className="text-sm text-gray-500">{item.description}</div>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </Link>
        ))}

        {/* Logout item with special styling */}
        <Link
          href="/provider/settings/logout"
          className="flex items-center justify-between p-4 hover:bg-red-50 transition-colors text-red-600"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center bg-red-100">
              <LogOut className="h-5 w-5" />
            </div>
            <div>
              <div className="font-medium">Logout</div>
              <div className="text-sm text-gray-500">Sign out of your account</div>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </Link>
      </nav>
    </div>
  )
}
