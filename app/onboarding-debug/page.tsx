"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Loader2, CheckCircle, XCircle, ArrowRight } from "lucide-react"

export default function OnboardingDebugPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [logs, setLogs] = useState<string[]>([])
  const supabase = createClient()

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`])
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        addLog("Checking authentication status...")
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          addLog(`Auth error: ${error.message}`)
          setIsLoading(false)
          return
        }

        if (data.session) {
          setUser(data.session.user)
          addLog(`User authenticated: ${data.session.user.email}`)

          // Check if profile exists
          const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", data.session.user.id)
            .single()

          if (profileError && profileError.code !== "PGRST116") {
            addLog(`Profile fetch error: ${profileError.message}`)
          } else if (profileData) {
            setProfile(profileData)
            addLog(`Profile found: ${profileData.full_name}, Role: ${profileData.role}`)

            // Check middleware redirection
            const expectedRedirect = getRoleBasedRedirect(profileData.role)
            addLog(`Expected middleware redirect: ${expectedRedirect}`)
          } else {
            addLog("No profile found - user needs onboarding")
          }
        } else {
          addLog("No active session found")
        }

        setIsLoading(false)
      } catch (error: any) {
        addLog(`Error during auth check: ${error.message}`)
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [supabase])

  const completeOnboarding = () => {
    window.location.href = "/onboarding"
  }

  const goToDashboard = () => {
    if (!profile) {
      addLog("Error: No profile found")
      return
    }

    const dashboardUrl = getRoleBasedRedirect(profile.role)
    addLog(`Redirecting to ${dashboardUrl}...`)
    window.location.href = dashboardUrl
  }

  function getRoleBasedRedirect(role: string): string {
    switch (role) {
      case "admin":
        return "/admin/dashboard"
      case "zeus":
        return "/zeus/dashboard"
      case "provider":
        return "/provider/dashboard"
      case "user":
      default:
        return "/user/dashboard"
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Onboarding Debug Tool</CardTitle>
          <CardDescription>Diagnose and debug the onboarding process and profile creation</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading authentication status...</span>
            </div>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium mb-2">Authentication Status</h3>
                  <div className="p-4 bg-gray-50 rounded-md">
                    {user ? (
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">Authenticated</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                          <p className="text-sm text-gray-500">ID: {user.id.substring(0, 8)}...</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <XCircle className="h-5 w-5 text-red-500" />
                        <p>Not authenticated</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Profile Status</h3>
                  <div className="p-4 bg-gray-50 rounded-md">
                    {profile ? (
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <div>
                          <p className="font-medium">{profile.full_name}</p>
                          <p className="text-sm text-gray-500">Role: {profile.role}</p>
                          <p className="text-sm text-gray-500">Phone: {profile.phone_number || "Not set"}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <XCircle className="h-5 w-5 text-red-500" />
                        <p>No profile found</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {profile && (
                <div className="p-4 bg-gray-50 rounded-md">
                  <h3 className="text-lg font-medium mb-2">Profile Details</h3>
                  <pre className="text-xs overflow-auto p-2 bg-gray-100 rounded">
                    {JSON.stringify(profile, null, 2)}
                  </pre>
                </div>
              )}

              <div className="flex space-x-4">
                {!profile && user && (
                  <Button onClick={completeOnboarding} className="flex items-center">
                    Complete Onboarding <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}

                {profile && (
                  <Button onClick={goToDashboard} className="flex items-center">
                    Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}

                {!user && (
                  <Button onClick={() => (window.location.href = "/login")} className="flex items-center">
                    Login First <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Debug Logs</h3>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm h-64 overflow-y-auto">
                  {logs.map((log, i) => (
                    <div key={i} className="pb-1">
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => (window.location.href = "/")}>
            Back to Home
          </Button>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Refresh Status
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
