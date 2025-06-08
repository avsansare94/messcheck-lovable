"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Shield, CheckCircle2, XCircle, ArrowRight } from "lucide-react"

interface MiddlewareTest {
  path: string
  description: string
  expectedBehavior: string
  status: "pending" | "success" | "error" | "redirect"
  result?: string
  redirectTo?: string
}

export default function VerifyMiddlewarePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [tests, setTests] = useState<MiddlewareTest[]>([
    {
      path: "/",
      description: "Root path",
      expectedBehavior: "Redirect to login or dashboard based on auth",
      status: "pending",
    },
    {
      path: "/login",
      description: "Login page",
      expectedBehavior: "Show login or redirect if authenticated",
      status: "pending",
    },
    {
      path: "/onboarding",
      description: "Onboarding page",
      expectedBehavior: "Accessible to authenticated users without complete profile",
      status: "pending",
    },
    {
      path: "/user/dashboard",
      description: "User dashboard",
      expectedBehavior: "Only accessible to users with 'user' role",
      status: "pending",
    },
    {
      path: "/provider/dashboard",
      description: "Provider dashboard",
      expectedBehavior: "Only accessible to users with 'provider' role",
      status: "pending",
    },
    {
      path: "/admin/dashboard",
      description: "Admin dashboard",
      expectedBehavior: "Only accessible to users with 'admin' role",
      status: "pending",
    },
  ])

  const updateTest = (path: string, status: MiddlewareTest["status"], result?: string, redirectTo?: string) => {
    setTests((prev) => prev.map((test) => (test.path === path ? { ...test, status, result, redirectTo } : test)))
  }

  const testMiddleware = async () => {
    setIsLoading(true)

    for (const test of tests) {
      try {
        updateTest(test.path, "pending")

        const response = await fetch(test.path, {
          method: "HEAD",
          redirect: "manual",
        })

        if (response.status === 0) {
          // This indicates a redirect was attempted
          updateTest(test.path, "redirect", "Redirect detected", "Unknown destination")
        } else if (response.ok) {
          updateTest(test.path, "success", `Status: ${response.status}`)
        } else if (response.status >= 300 && response.status < 400) {
          const location = response.headers.get("location")
          updateTest(test.path, "redirect", `Redirected to: ${location}`, location || "Unknown")
        } else {
          updateTest(test.path, "error", `Status: ${response.status}`)
        }

        // Small delay between tests
        await new Promise((resolve) => setTimeout(resolve, 100))
      } catch (error: any) {
        updateTest(test.path, "error", error.message)
      }
    }

    setIsLoading(false)
  }

  const getStatusIcon = (status: MiddlewareTest["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />
      case "redirect":
        return <ArrowRight className="w-5 h-5 text-blue-600" />
      case "error":
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return <Loader2 className="w-5 h-5 text-gray-600 animate-spin" />
    }
  }

  const getStatusColor = (status: MiddlewareTest["status"]) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800"
      case "redirect":
        return "bg-blue-100 text-blue-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-3">
              <Shield className="w-8 h-8 text-purple-600" />
              Middleware Verification
            </CardTitle>
            <p className="text-gray-600">Test middleware behavior and route protection</p>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <Button onClick={testMiddleware} disabled={isLoading} className="bg-purple-600 hover:bg-purple-700">
                {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Test Middleware
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Test Results */}
        <div className="grid gap-4">
          {tests.map((test, index) => (
            <Card key={index} className="border-2 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">{getStatusIcon(test.status)}</div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800">{test.path}</h3>
                        <p className="text-sm text-gray-600">{test.description}</p>
                      </div>
                      <Badge className={getStatusColor(test.status)}>{test.status}</Badge>
                    </div>
                    <p className="text-sm text-gray-700">
                      <strong>Expected:</strong> {test.expectedBehavior}
                    </p>
                    {test.result && (
                      <p className="text-sm text-gray-700">
                        <strong>Result:</strong> {test.result}
                      </p>
                    )}
                    {test.redirectTo && (
                      <p className="text-sm text-blue-700">
                        <strong>Redirect to:</strong> {test.redirectTo}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Instructions */}
        <Card className="border-0 shadow-xl">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">How to Interpret Results</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <span>
                  <strong>Success:</strong> Page loaded successfully (200 status)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-blue-600" />
                <span>
                  <strong>Redirect:</strong> Middleware redirected the request (expected behavior)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-600" />
                <span>
                  <strong>Error:</strong> Request failed or returned error status
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
