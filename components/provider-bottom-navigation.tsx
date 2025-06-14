
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
      href: "/provider/home",
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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-zomato-gray-200 shadow-2xl">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
        {tabs.map((tab, index) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.name || location.pathname === tab.href
          
          return (
            <Button
              key={tab.name}
              variant="ghost"
              className={`flex flex-col items-center justify-center w-full h-full transition-all duration-300 ${
                isActive 
                  ? "text-zomato-red scale-110" 
                  : "text-zomato-gray-500 hover:text-zomato-gray-700 hover:scale-105"
              }`}
              onClick={() => navigate(tab.href)}
            >
              <div className={`relative ${isActive ? 'animate-scale-in' : ''}`}>
                <Icon className={`h-5 w-5 transition-all duration-200 ${isActive ? 'drop-shadow-sm' : ''}`} />
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-zomato-red rounded-full"></div>
                )}
              </div>
              <span className={`text-xs mt-1 font-medium transition-all duration-200 ${
                isActive ? 'font-semibold' : 'font-normal'
              }`}>
                {tab.label}
              </span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
