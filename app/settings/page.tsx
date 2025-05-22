import { BottomNavigation } from "@/components/bottom-navigation"
import { Card } from "@/components/ui/card"
import { ChevronRight, User, Bell, Globe, Lock, Palette, HelpCircle, LogOut } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const settingsItems = [
    {
      title: "Profile",
      description: "Manage your personal information and preferences",
      icon: <User className="h-5 w-5 text-blue-500" />,
      href: "/settings/profile",
      color: "bg-blue-100",
    },
    {
      title: "Notifications",
      description: "Configure alerts for check-ins, menu updates, and more",
      icon: <Bell className="h-5 w-5 text-orange-500" />,
      href: "/settings/notifications",
      color: "bg-orange-100",
    },
    {
      title: "Language",
      description: "Choose your preferred app language",
      icon: <Globe className="h-5 w-5 text-green-500" />,
      href: "/settings/language",
      color: "bg-green-100",
    },
    {
      title: "Privacy & Security",
      description: "Manage login method and data preferences",
      icon: <Lock className="h-5 w-5 text-purple-500" />,
      href: "/settings/privacy",
      color: "bg-purple-100",
    },
    {
      title: "Appearance",
      description: "Customize the app's look and feel",
      icon: <Palette className="h-5 w-5 text-pink-500" />,
      href: "/settings/appearance",
      color: "bg-pink-100",
    },
    {
      title: "Help & Support",
      description: "Contact support or browse FAQs",
      icon: <HelpCircle className="h-5 w-5 text-cyan-500" />,
      href: "/settings/help",
      color: "bg-cyan-100",
    },
  ]

  return (
    <>
      <div className="container max-w-md mx-auto px-4 py-6 pb-20">
        <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 -mx-4 mb-6 flex items-center">
          <h1 className="text-xl font-bold">Settings</h1>
        </header>

        <div className="space-y-4">
          {settingsItems.map((item) => (
            <Link href={item.href} key={item.title}>
              <Card className="p-4 flex items-center hover:bg-gray-50 active:bg-gray-100 transition-colors">
                <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center mr-4`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </Card>
            </Link>
          ))}

          {/* Logout item with special styling */}
          <Link href="/settings/logout">
            <Card className="p-4 flex items-center hover:bg-red-50 active:bg-red-100 transition-colors border-red-100">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-4">
                <LogOut className="h-5 w-5 text-red-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-red-600">Logout</h3>
                <p className="text-sm text-red-500">Sign out of your MessCheck account</p>
              </div>
              <ChevronRight className="h-5 w-5 text-red-400" />
            </Card>
          </Link>
        </div>
      </div>
      <BottomNavigation activeTab="settings" />
    </>
  )
}
