"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useUser } from "@/components/user-context-provider"
import { Loader2 } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { setUser } = useUser()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Get the selected role from localStorage
      const selectedRole = localStorage.getItem("userRole") || "user"

      // Simulate API call for authentication
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Create a mock user with proper Supabase User structure
      const mockUser = {
        id: "user-" + Math.random().toString(36).substring(2, 9),
        email: email,
        app_metadata: { role: selectedRole },
        user_metadata: { username: email.split("@")[0] },
        aud: "authenticated",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        email_confirmed_at: new Date().toISOString(),
        phone: undefined,
        confirmation_sent_at: undefined,
        confirmed_at: new Date().toISOString(),
        last_sign_in_at: new Date().toISOString(),
        role: "authenticated",
        recovery_sent_at: undefined,
        invited_at: undefined,
        action_link: undefined,
        email_change: undefined,
        email_change_sent_at: undefined,
        email_change_token: undefined,
        email_change_confirm_status: 0,
        banned_until: undefined,
        new_email: undefined,
        new_phone: undefined,
        phone_change: undefined,
        phone_change_token: undefined,
        phone_change_sent_at: undefined,
        phone_confirmed_at: undefined,
        phone_change_confirm_status: 0,
        email_change_token_new: undefined,
        email_change_token_current: undefined,
        is_sso_user: false,
        deleted_at: undefined,
        is_anonymous: false,
      }

      // Set the user in context
      setUser(mockUser)

      // Store user data in a cookie for middleware
      document.cookie = `userData=${JSON.stringify(mockUser)}; path=/; max-age=86400`

      // Redirect based on role
      if (selectedRole === "provider") {
        router.push("/provider/home")
      } else {
        router.push("/home")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("Failed to login. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Login to MessCheck</CardTitle>
        <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <Button variant="link" className="p-0 text-red-600" onClick={() => router.push("/onboarding")}>
            Sign up
          </Button>
        </div>
        <Button variant="link" className="text-sm text-gray-500">
          Forgot password?
        </Button>
      </CardFooter>
    </Card>
  )
}
