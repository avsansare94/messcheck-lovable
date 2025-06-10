
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/lib/supabase/client"
import { UserDashboard } from "@/components/user-dashboard"
import { BottomNavigation } from "@/components/bottom-navigation"
import { ZomatoLoginScreen } from "@/components/auth/zomato-login-screen"
import { Loader2 } from "lucide-react"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [showLogin, setShowLogin] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function checkAuth() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          setUser(session.user)
          // Check if user has a complete profile
          const { data: profileData } = await supabase
            .from("profiles")
            .select("role, email, full_name")
            .eq("id", session.user.id)
            .single()

          if (profileData?.role) {
            setProfile(profileData)
            // Redirect to appropriate dashboard
            switch (profileData.role) {
              case "admin":
                navigate("/admin/dashboard")
                return
              case "provider":
                navigate("/provider/dashboard")
                return
              case "user":
              default:
                // Show user dashboard for users
                break
            }
          } else {
            // User exists but no complete profile, redirect to onboarding
            navigate("/onboarding")
            return
          }
        } else {
          // No user session, show login
          setShowLogin(true)
        }
      } catch (error) {
        console.error("Auth check error:", error)
        // On error, show login
        setShowLogin(true)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [navigate])

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

  if (showLogin) {
    return <ZomatoLoginScreen />
  }

  // Show user dashboard for authenticated users
  if (user && profile?.role === "user") {
    return (
      <main className="pb-16">
        <UserDashboard />
        <BottomNavigation activeTab="home" />
      </main>
    )
  }

  // Fallback
  return <ZomatoLoginScreen />
}
