"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Building2,
  ClipboardCheck,
  ShieldCheck,
  MessageSquare,
  Settings,
  BarChart3,
  LogOut,
  Menu,
  X,
  Shield,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Providers", href: "/admin/providers", icon: Building2 },
  { name: "Mess Claims", href: "/admin/claims", icon: ClipboardCheck },
  { name: "Mess Verification", href: "/admin/mess-verification", icon: ShieldCheck },
  { name: "Reviews", href: "/admin/reviews", icon: MessageSquare },
  { name: "Provider Insights", href: "/admin/provider-insights", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export default function AdminSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin-login")
  }

  return (
    <>
      {/* Mobile sidebar */}
      <div className={cn("fixed inset-0 z-50 lg:hidden", sidebarOpen ? "block" : "hidden")}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <SidebarContent
            navigation={navigation}
            pathname={pathname}
            onLogout={handleLogout}
            onClose={() => setSidebarOpen(false)}
          />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <SidebarContent navigation={navigation} pathname={pathname} onLogout={handleLogout} />
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        <Button variant="outline" size="sm" onClick={() => setSidebarOpen(true)}>
          <Menu className="h-4 w-4" />
        </Button>
      </div>
    </>
  )
}

function SidebarContent({
  navigation,
  pathname,
  onLogout,
  onClose,
}: {
  navigation: any[]
  pathname: string
  onLogout: () => void
  onClose?: () => void
}) {
  return (
    <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        <div className="flex items-center">
          <Shield className="h-8 w-8 text-red-600" />
          <span className="ml-2 text-lg font-semibold text-gray-900">Admin Panel</span>
        </div>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={cn(
                "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive ? "bg-red-100 text-red-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              )}
            >
              <item.icon
                className={cn("mr-3 h-5 w-5", isActive ? "text-red-500" : "text-gray-400 group-hover:text-gray-500")}
              />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <Button
          variant="outline"
          className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
          onClick={onLogout}
        >
          <LogOut className="mr-3 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}
