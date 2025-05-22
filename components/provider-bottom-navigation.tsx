"use client"

import Link from "next/link"
import { Home, ClipboardList, Users, Receipt, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/language-context-provider"

interface ProviderBottomNavigationProps {
  activeTab?: string
}

export function ProviderBottomNavigation({ activeTab = "home" }: ProviderBottomNavigationProps) {
  const { t } = useLanguage()

  const tabs = [
    {
      name: "home",
      href: "/provider/home",
      label: t("nav.home"),
      icon: Home,
    },
    {
      name: "manage",
      href: "/provider/manage",
      label: "Manage",
      icon: ClipboardList,
    },
    {
      name: "subscription",
      href: "/provider/subscription",
      label: "Subscribers",
      icon: Users,
    },
    {
      name: "checkin",
      href: "/provider/checkin",
      label: "Check-ins",
      icon: Receipt,
    },
    {
      name: "settings",
      href: "/provider/settings",
      label: t("nav.settings"),
      icon: Settings,
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 bg-white border-t border-gray-200">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {tabs.map((tab) => (
          <Link
            key={tab.name}
            href={tab.href}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full",
              activeTab === tab.name ? "text-red-600" : "text-gray-500",
            )}
          >
            <tab.icon className={cn("h-5 w-5", activeTab === tab.name ? "text-red-600" : "text-gray-500")} />
            <span className="text-xs mt-1">{tab.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
