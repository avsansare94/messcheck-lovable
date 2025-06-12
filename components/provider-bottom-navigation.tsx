
import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Home, ClipboardList, Users, Receipt, Settings } from "lucide-react"

interface ProviderBottomNavigationProps {
  activeTab?: string
}

export function ProviderBottomNavigation({ activeTab = "home" }: ProviderBottomNavigationProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const tabs = [
    {
      name: "home",
      href: "/provider-dashboard",
      label: "Home",
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
      label: "Settings",
      icon: Settings,
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.name || location.pathname === tab.href
          
          return (
            <Button
              key={tab.name}
              variant="ghost"
              className={`flex flex-col items-center justify-center w-full h-full ${
                isActive 
                  ? "text-zomato-red" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => navigate(tab.href)}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs mt-1 font-medium">{tab.label}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
