"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Chrome } from "lucide-react"

export function ZomatoLoginCard() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const supabase = createClient()

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setError("")

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error
    } catch (err: any) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* App Branding */}
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-orange-600 rounded-3xl mx-auto shadow-2xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            MessCheck
          </h1>
          <h2 className="text-2xl font-semibold text-gray-800">Welcome to MessCheck</h2>
          <p className="text-gray-600 text-sm leading-relaxed px-4">
            Your go-to app to discover and manage daily mess services.
          </p>
        </div>
      </div>

      {/* Login Card */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl p-8 space-y-6">
        {error && (
          <Alert variant="destructive" className="border-red-200 bg-red-50/80 rounded-2xl">
            <AlertDescription className="text-red-700 text-sm font-medium">{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-gray-800">Get Started</h3>
            <p className="text-sm text-gray-600">Sign in to explore mess options near you</p>
          </div>

          <Button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full h-14 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl font-semibold text-base group"
            variant="outline"
          >
            {isLoading ? (
              <Loader2 className="mr-3 h-5 w-5 animate-spin text-red-500" />
            ) : (
              <div className="mr-3 relative">
                <Chrome className="h-5 w-5 text-blue-500 group-hover:scale-110 transition-transform duration-200" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </div>
            )}
            <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
              {isLoading ? "Signing in..." : "Continue with Google"}
            </span>
          </Button>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500 leading-relaxed">
            By continuing, you agree to our <span className="text-red-600 font-medium">Terms of Service</span> and{" "}
            <span className="text-red-600 font-medium">Privacy Policy</span>
          </p>
        </div>
      </Card>

      {/* Decorative Elements */}
      <div className="flex justify-center space-x-2">
        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse delay-75"></div>
        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-150"></div>
      </div>
    </div>
  )
}
