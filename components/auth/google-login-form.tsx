"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Utensils, Chrome } from "lucide-react"
import Link from "next/link"

export function GoogleLoginForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const supabase = createClient()

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError("")

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error
    } catch (error: any) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* App Logo & Welcome */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Utensils className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-red-600 mb-2">MessCheck</h1>
        <p className="text-gray-600">Discover and review mess services</p>
      </div>

      {/* Login Card */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-xl font-semibold text-gray-800">Welcome Back</CardTitle>
          <CardDescription className="text-gray-600">Sign in to continue to MessCheck</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive" className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-700">{error}</AlertDescription>
            </Alert>
          )}

          {/* Google Sign-In Button */}
          <Button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full h-12 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm transition-all duration-200 hover:shadow-md"
            variant="outline"
          >
            <Chrome className="mr-3 h-5 w-5 text-blue-500" />
            {loading ? "Signing in..." : "Continue with Google"}
          </Button>

          {/* Admin Login Link */}
          <div className="text-center pt-4">
            <Link
              href="/admin-login"
              className="text-xs text-gray-500 hover:text-red-600 transition-colors duration-200"
            >
              Admin? Login here
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <p className="text-xs text-gray-500 text-center mt-6 px-4">
        By continuing, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  )
}
