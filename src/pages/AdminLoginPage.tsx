
import React from "react"
import { GoogleLoginForm } from "@/components/auth/google-login-form"

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-red-600 mb-2">Admin Login</h1>
          <p className="text-gray-600">Access administrative dashboard</p>
        </div>
        <GoogleLoginForm />
      </div>
    </div>
  )
}
