
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTestAuth } from "@/lib/test-auth-context"
import { UserDashboard } from "@/components/user-dashboard"
import { BottomNavigation } from "@/components/bottom-navigation"
import { ZomatoLoginScreen } from "@/components/auth/zomato-login-screen"
import { Loader2 } from "lucide-react"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useTestAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoading && user) {
      // Redirect based on role
      switch (user.role) {
        case "admin":
          navigate("/admin/dashboard")
          return
        case "mess-provider":
          navigate("/provider/home")
          return
        case "mess-user":
        default:
          // Stay on home page for mess users
          break
      }
    }
  }, [user, isLoading, navigate])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
          <h1 className="text-2xl font-bold text-red-600 mb-2">MessCheck</h1>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Show user dashboard for mess users
  if (user?.role === "mess-user") {
    return (
      <main className="pb-16">
        <UserDashboard />
        <BottomNavigation activeTab="home" />
      </main>
    )
  }

  // Fallback - show login screen
  return <ZomatoLoginScreen />
}
