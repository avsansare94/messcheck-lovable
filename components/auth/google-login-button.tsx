"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase/client"

interface GoogleLoginButtonProps {
  onSuccess?: () => void
  onError?: (error: string) => void
}

export function GoogleLoginButton({ onSuccess, onError }: GoogleLoginButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        throw error
      }

      onSuccess?.()
    } catch (error) {
      console.error("Google login error:", error)
      onError?.(error instanceof Error ? error.message : "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleGoogleLogin}
      disabled={loading}
      variant="outline"
      className="w-full flex items-center gap-2 border-gray-300 hover:bg-gray-50"
    >
      <img src="/google-logo.png" alt="Google" className="w-5 h-5" />
      {loading ? "Signing in..." : "Continue with Google"}
    </Button>
  )
}

export default GoogleLoginButton
