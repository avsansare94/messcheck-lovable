
import React from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Bell, CreditCard, Globe, HelpCircle, LogOut, ChevronRight } from "lucide-react"

export function ProviderSettingsScreen() {
  const navigate = useNavigate()

  // Settings menu items
  const menuItems = [
    {
      icon: <Home className="h-5 w-5" />,
      title: "Mess Profile",
      description: "Edit your mess details, address, and nearby institutions",
      path: "/provider/settings/profile",
    },
    {
      icon: <Bell className="h-5 w-5" />,
      title: "Notifications",
      description: "Manage notification preferences for reviews, subscriptions, and more",
      path: "/provider/settings/notifications",
    },
    {
      icon: <CreditCard className="h-5 w-5" />,
      title: "Billing & Payments",
      description: "View earnings, subscription stats, and manage payments",
      path: "/provider/settings/billing",
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Language",
      description: "Choose your preferred language",
      path: "/provider/settings/language",
    },
    {
      icon: <HelpCircle className="h-5 w-5" />,
      title: "Help & Support",
      description: "Contact support, report issues, and read FAQs",
      path: "/provider/settings/help",
    },
  ]

  return (
    <div className="container max-w-md mx-auto px-4 py-6 pb-20 bg-zomato-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-zomato-gray-900 font-display">Provider Settings</h1>
        <p className="text-zomato-gray-600 mt-2">Manage your mess provider account</p>
      </header>

      <div className="space-y-3">
        {/* Settings menu items */}
        {menuItems.map((item, index) => (
          <Card 
            key={item.path} 
            className="bg-white border-zomato-gray-100 shadow-card hover:shadow-card-hover transition-all duration-200 cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => navigate(item.path)}
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-zomato-orange/10 flex items-center justify-center text-zomato-orange transition-colors hover:bg-zomato-orange/20">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-zomato-gray-900 font-display">{item.title}</h3>
                  <p className="text-sm text-zomato-gray-600 mt-1 leading-relaxed">{item.description}</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-zomato-gray-400" />
            </CardContent>
          </Card>
        ))}

        {/* Logout item with special styling */}
        <Card 
          className="bg-white border-zomato-gray-100 shadow-card hover:shadow-card-hover transition-all duration-200 cursor-pointer hover:bg-red-50 animate-fade-in"
          style={{ animationDelay: `${menuItems.length * 100}ms` }}
          onClick={() => navigate("/provider/settings/logout")}
        >
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500 transition-colors hover:bg-red-100">
                <LogOut className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-red-600 font-display">Logout</h3>
                <p className="text-sm text-zomato-gray-600 mt-1 leading-relaxed">Securely log out of your MessCheck provider account</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-zomato-gray-400" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
