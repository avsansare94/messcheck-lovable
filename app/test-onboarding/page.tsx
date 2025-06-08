"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, XCircle, ArrowRight } from "lucide-react"

export default function TestOnboardingPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [logs, setLogs] = useState<string[]>([])
  const [testStatus, setTestStatus] = useState<"idle" | "running" | "success" | "error">("idle")
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

  const runOnboardingTest = async () => {
    setTestStatus("running")
    addLog("Starting onboarding test...")

    try {
      if (!user) {
        addLog("Error: No authenticated user found")
        setTestStatus("error")
        return
      }

      // Step 1: Create test profile data
      addLog("Step 1: Creating test profile data...")
      const testProfileData = {
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name || "Test User",
        role: "user",
        gender: "other",
        age: 25,
        institution: "Test Institution",
        institution_type: "college",
        food_preference: "veg",
        phone_number: "+919876543210",
        city: "Test City",
        state: "Test State",
        pincode: "123456",
        updated_at: new Date().toISOString(),
      }

      // Step 2: Save profile to database
      addLog("Step 2: Saving profile to database...")
      const { error: updateError } = await supabase.from("profiles").upsert(testProfileData)

      if (updateError) {
        addLog(`Error saving profile: ${updateError.message}`)
        setTestStatus("error")
        return
      }

      addLog("Profile saved successfully!")

      // Step 3: Update auth metadata
      addLog("Step 3: Updating auth metadata...")
      const { error: metadataError } = await supabase.auth.updateUser({
        data: { role: "user" },
      })

      if (metadataError) {
        addLog(`Error updating metadata: ${metadataError.message}`)
        setTestStatus("error")
        return
      }

      addLog("Auth metadata updated successfully!")

      // Step 4: Verify profile was created
      addLog("Step 4: Verifying profile creation...")
      const { data: verifyData, error: verifyError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      if (verifyError) {
        addLog(`Error verifying profile: ${verifyError.message}`)
        setTestStatus("error")
        return
      }

      setProfile(verifyData)
      addLog(`Profile verified: ${verifyData.full_name}, Role: ${verifyData.role}`)

      // Step 5: Test redirection
      addLog("Step 5: Testing redirection logic...")
      addLog("Redirection would go to: /user/dashboard")

      setTestStatus("success")
      addLog("Onboarding test completed successfully!")
    } catch (error: any) {
      addLog(`Test error: ${error.message}`)
      setTestStatus("error")
    }
  }

  const goToDashboard = () => {
    if (!profile) {
      addLog("Error: No profile found")
      return
    }

    let dashboardUrl = "/dashboard"

    switch (profile.role) {
      case "admin":
        dashboardUrl = "/admin/dashboard"
        break
      case "provider":
        dashboardUrl = "/provider/dashboard"
        break
      case "user":
        dashboardUrl = "/user/dashboard"
        break
    }

    addLog(`Redirecting to ${dashboardUrl}...`)
    window.location.href = dashboardUrl
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Onboarding Process Test</CardTitle>
          <CardDescription>Verify that profile creation works correctly with updated Supabase exports</CardDescription>
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
                          <p className="text-sm text-gray-500">Phone: {profile.phone_number}</p>
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

              <div>
                <h3 className="text-lg font-medium mb-2">Test Onboarding Process</h3>
                <div className="flex space-x-4">
                  <Button
                    onClick={runOnboardingTest}
                    disabled={testStatus === "running" || !user}
                    className="flex items-center"
                  >
                    {testStatus === "running" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Run Onboarding Test
                  </Button>

                  {profile && (
                    <Button variant="outline" onClick={goToDashboard} className="flex items-center">
                      Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              {testStatus === "success" && (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-700">
                    Onboarding test completed successfully! Profile created and verified.
                  </AlertDescription>
                </Alert>
              )}

              {testStatus === "error" && (
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>Onboarding test failed. Check the logs for details.</AlertDescription>
                </Alert>
              )}

              <div>
                <h3 className="text-lg font-medium mb-2">Test Logs</h3>
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
          <Button variant="outline" onClick={() => (window.location.href = "/onboarding")}>
            Go to Real Onboarding
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
