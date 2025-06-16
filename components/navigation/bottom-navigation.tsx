
import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Home, Search, User, Settings, Utensils } from "lucide-react"

interface BottomNavigationProps {
  activeTab: string
}

export function BottomNavigation({ activeTab }: BottomNavigationProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const tabs = [
    { id: "home", label: "Home", icon: Home, path: "/" },
    { id: "explore", label: "Explore", icon: Search, path: "/explore" },
    { id: "my-mess", label: "My Mess", icon: Utensils, path: "/my-mess" },
    { id: "profile", label: "Profile", icon: User, path: "/profile" },
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-zomato-gray-200 shadow-lg z-50">
      <div className="grid grid-cols-5 gap-1 p-2 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id || location.pathname === tab.path
          
          return (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-1 h-auto py-3 bottom-nav-item ${
                isActive 
                  ? "text-zomato-red active" 
                  : "text-zomato-gray-500 hover:text-zomato-gray-700"
              }`}
              onClick={() => navigate(tab.path)}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{tab.label}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
