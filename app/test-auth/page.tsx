"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle2, XCircle, Shield } from "lucide-react"

interface AuthTestResult {
  test: string
  status: "pending" | "success" | "error"
  message: string
  details?: any
}

export default function AuthTestPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [testResults, setTestResults] = useState<AuthTestResult[]>([])

  const updateTestResult = (testName: string, status: "success" | "error", message: string, details?: any) => {
    setTestResults((prev) =>
      prev.map((test) => (test.test === testName ? { ...test, status, message, details } : test)),
    )
  }

  const initializeTests = () => {
    setTestResults([
      { test: "Client Connection", status: "pending", message: "Testing client connection..." },
      { test: "User Session", status: "pending", message: "Checking user session..." },
      { test: "Profile Fetch", status: "pending", message: "Fetching user profile..." },
      { test: "Server Client", status: "pending", message: "Testing server client..." },
      { test: "Auth State", status: "pending", message: "Checking auth state..." },
    ])
  }

  const runAuthTests = async () => {
    setIsLoading(true)
    initializeTests()

    try {
      // Test 1: Client Connection
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) throw error
        updateTestResult("Client Connection", "success", "Client connected successfully", {
          hasSession: !!data.session,
        })
      } catch (error: any) {
        updateTestResult("Client Connection", "error", `Connection failed: ${error.message}`)
      }

      // Test 2: User Session
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser()
        if (error) throw error
        updateTestResult("User Session", "success", user ? "User authenticated" : "No user session", {
          userId: user?.id,
          email: user?.email,
        })
      } catch (error: any) {
        updateTestResult("User Session", "error", `Session check failed: ${error.message}`)
      }

      // Test 3: Profile Fetch
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (user) {
          const { data: profile, error } = await supabase
            .from("profiles")
            .select("role, email, full_name, phone_number")
            .eq("id", user.id)
            .single()

          if (error && error.code !== "PGRST116") throw error
          updateTestResult("Profile Fetch", "success", profile ? "Profile found" : "No profile yet", profile)
        } else {
          updateTestResult("Profile Fetch", "success", "Skipped - no user session")
        }
      } catch (error: any) {
        updateTestResult("Profile Fetch", "error", `Profile fetch failed: ${error.message}`)
      }

      // Test 4: Server Client (via API route)
      try {
        const response = await fetch("/api/test-auth")
        const result = await response.json()

        if (response.ok) {
          updateTestResult("Server Client", "success", "Server client working", result)
        } else {
          updateTestResult("Server Client", "error", `Server test failed: ${result.error}`)
        }
      } catch (error: any) {
        updateTestResult("Server Client", "error", `Server test failed: ${error.message}`)
      }

      // Test 5: Auth State
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        const authState = {
          isAuthenticated: !!session,
          sessionExpiry: session?.expires_at,
          accessToken: !!session?.access_token,
          refreshToken: !!session?.refresh_token,
        }
        updateTestResult("Auth State", "success", "Auth state retrieved", authState)
      } catch (error: any) {
        updateTestResult("Auth State", "error", `Auth state check failed: ${error.message}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
    } catch (error: any) {
      console.error("Login error:", error)
    }
  }

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setTestResults([])
    } catch (error: any) {
      console.error("Logout error:", error)
    }
  }

  useEffect(() => {
    // Run tests on component mount
    runAuthTests()
  }, [])

  const getStatusIcon = (status: AuthTestResult["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />
      case "error":
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
    }
  }

  const getStatusColor = (status: AuthTestResult["status"]) => {
    switch (status) {
      case "success":
        return "border-green-200 bg-green-50"
      case "error":
        return "border-red-200 bg-red-50"
      default:
        return "border-blue-200 bg-blue-50"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-3">
              <Shield className="w-8 h-8 text-blue-600" />
              Authentication Test Suite
            </CardTitle>
            <p className="text-gray-600">Verify that all authentication components are working correctly</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 justify-center">
              <Button onClick={runAuthTests} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Run Tests
              </Button>
              <Button onClick={handleGoogleLogin} variant="outline">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Test Google Login
              </Button>
              <Button onClick={handleLogout} variant="destructive">
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Test Results */}
        <div className="grid gap-4">
          {testResults.map((result, index) => (
            <Card key={index} className={`border-2 ${getStatusColor(result.status)} transition-all duration-300`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">{getStatusIcon(result.status)}</div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-800">{result.test}</h3>
                      <span
                        className={`text-sm px-2 py-1 rounded-full ${
                          result.status === "success"
                            ? "bg-green-100 text-green-700"
                            : result.status === "error"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {result.status}
                      </span>
                    </div>
                    <p className="text-gray-600">{result.message}</p>
                    {result.details && (
                      <details className="mt-2">
                        <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                          View Details
                        </summary>
                        <pre className="mt-2 p-3 bg-gray-100 rounded-lg text-xs overflow-auto">
                          {JSON.stringify(result.details, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        {testResults.length > 0 && (
          <Card className="border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">Test Summary</h3>
                <div className="flex justify-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {testResults.filter((r) => r.status === "success").length}
                    </div>
                    <div className="text-sm text-gray-600">Passed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {testResults.filter((r) => r.status === "error").length}
                    </div>
                    <div className="text-sm text-gray-600">Failed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {testResults.filter((r) => r.status === "pending").length}
                    </div>
                    <div className="text-sm text-gray-600">Pending</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
