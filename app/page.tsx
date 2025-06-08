"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { ZomatoLoginScreen } from "@/components/auth/zomato-login-screen"
import { Loader2 } from "lucide-react"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [showLogin, setShowLogin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function checkAuth() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          // Check if user has a complete profile
          const { data: profile } = await supabase
            .from("profiles")
            .select("role, email, full_name")
            .eq("id", session.user.id)
            .single()

          if (profile?.role) {
            // Redirect to appropriate dashboard
            switch (profile.role) {
              case "admin":
                router.replace("/admin/dashboard")
                return
              case "zeus":
                router.replace("/zeus/dashboard")
                return
              case "provider":
                router.replace("/provider/dashboard")
                return
              case "user":
              default:
                router.replace("/dashboard")
                return
            }
          } else {
            // User exists but no complete profile, redirect to onboarding
            router.replace("/onboarding")
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
  }, [router])

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

  // This should not be reached due to redirects above
  return null
}
