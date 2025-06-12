
import React from "react"
import { Link } from "react-router-dom"
import { Home, Bell, CreditCard, Globe, HelpCircle, LogOut, ChevronRight } from "lucide-react"

export function ProviderSettingsContent() {
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
    <div className="space-y-3">
      {/* Settings menu items */}
      {menuItems.map((item) => (
        <Link to={item.path} key={item.path}>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                {item.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </Link>
      ))}

      {/* Logout item with special styling */}
      <Link to="/provider/settings/logout">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center justify-between hover:bg-red-50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
              <LogOut className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-red-600">Logout</h3>
              <p className="text-sm text-gray-500">Securely log out of your MessCheck provider account</p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </div>
      </Link>
    </div>
  )
}
