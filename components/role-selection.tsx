"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Utensils, Store, ArrowRight } from "lucide-react"
import { useUser } from "@/components/user-context-provider"

export function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const router = useRouter()
  const { user, logout } = useUser()

  // If user is already logged in, redirect to appropriate dashboard
  useEffect(() => {
    if (user) {
      if (user.role === "provider") {
        router.push("/provider/home")
      } else {
        router.push("/home")
      }
    }
  }, [user, router])

  // Check if there's a previously selected role
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole")
    if (storedRole) {
      setSelectedRole(storedRole)
    }
  }, [])

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role)
    // Store the role in localStorage
    localStorage.setItem("userRole", role)
  }

  const handleContinue = () => {
    if (selectedRole) {
      // Store the role in localStorage
      localStorage.setItem("userRole", selectedRole)

      // If user is already logged in but changing roles, log them out first
      if (user) {
        logout()
        // Wait a bit before redirecting to login
        setTimeout(() => router.push("/login"), 100)
      } else {
        router.push("/login")
      }
    }
  }

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center">
      <div className="mb-8 text-center">
        <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Utensils className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-red-600">MessCheck</h1>
        <p className="text-gray-600 mt-2">Discover and review mess services</p>
      </div>

      <Card className="w-full mb-6 border-red-100">
        <CardHeader>
          <CardTitle className="text-xl text-center">Choose your role</CardTitle>
          <CardDescription className="text-center">Select how you want to use MessCheck</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button
            variant={selectedRole === "user" ? "default" : "outline"}
            className={`h-20 justify-start gap-4 ${selectedRole === "user" ? "bg-red-600 hover:bg-red-700 text-white border-2 border-red-600" : "border-2 hover:border-red-600 hover:text-red-600"}`}
            onClick={() => handleRoleSelect("user")}
          >
            <Utensils className="h-6 w-6 shrink-0" />
            <div className="flex flex-col items-start">
              <span className="font-medium">Mess User</span>
              <span className="text-xs text-muted-foreground">Find and subscribe to mess services</span>
            </div>
          </Button>

          <Button
            variant={selectedRole === "provider" ? "default" : "outline"}
            className={`h-20 justify-start gap-4 ${selectedRole === "provider" ? "bg-red-600 hover:bg-red-700 text-white border-2 border-red-600" : "border-2 hover:border-red-600 hover:text-red-600"}`}
            onClick={() => handleRoleSelect("provider")}
          >
            <Store className="h-6 w-6 shrink-0" />
            <div className="flex flex-col items-start">
              <span className="font-medium">Mess Provider</span>
              <span className="text-xs text-muted-foreground">Manage your mess service and customers</span>
            </div>
          </Button>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-red-600 hover:bg-red-700" disabled={!selectedRole} onClick={handleContinue}>
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      <p className="text-xs text-gray-500 text-center">
        By continuing, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  )
}
