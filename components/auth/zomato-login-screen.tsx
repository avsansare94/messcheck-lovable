
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTestAuth } from "@/lib/test-auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, MapPin, Utensils, Building2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ZomatoLoginScreen() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()
  const { setRole } = useTestAuth()

  const handleLogin = async (role: "mess-user" | "mess-provider" = "mess-user") => {
    try {
      setIsLoading(true)
      
      // Simulate login delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Set the test role
      setRole(role)
      
      // Navigate based on role
      if (role === "mess-provider") {
        navigate("/provider/home")
      } else {
        navigate("/dashboard")
      }

      toast({
        title: "Login Successful",
        description: `Logged in as ${role === "mess-provider" ? "Mess Provider" : "Mess User"}`,
      })
    } catch (error: any) {
      console.error("Login error:", error)
      toast({
        title: "Login Failed",
        description: "Failed to sign in. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* App Logo & Branding */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-red-500/25">
            <Utensils className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-2">
            MessCheck
          </h1>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome!</h2>
          <p className="text-gray-600 text-sm leading-relaxed px-4">
            Choose your role to explore the app in test mode
          </p>
        </div>

        {/* Login Card */}
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl shadow-red-500/10 rounded-3xl overflow-hidden">
          <CardContent className="p-8">
            <div className="space-y-4">
              {/* Location Feature Highlight */}
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 bg-orange-50 rounded-2xl p-3">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>Test mode - No real authentication</span>
              </div>

              {/* Login as User Button */}
              <Button
                onClick={() => handleLogin("mess-user")}
                disabled={isLoading}
                className="w-full h-14 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-2xl shadow-lg shadow-blue-500/25 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Utensils className="w-5 h-5" />
                    <span>Login as Mess User</span>
                  </div>
                )}
              </Button>

              {/* Login as Provider Button */}
              <Button
                onClick={() => handleLogin("mess-provider")}
                disabled={isLoading}
                className="w-full h-14 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-2xl shadow-lg shadow-green-500/25 transition-all duration-200 hover:shadow-xl hover:shadow-green-500/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Building2 className="w-5 h-5" />
                    <span>Login as Mess Provider</span>
                  </div>
                )}
              </Button>

              {/* Features Preview */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Utensils className="w-4 h-4 text-orange-600" />
                  </div>
                  <p className="text-xs font-medium text-gray-700">Quality Food</p>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <MapPin className="w-4 h-4 text-red-600" />
                  </div>
                  <p className="text-xs font-medium text-gray-700">Near You</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-xs text-gray-500 text-center mt-6 px-4 leading-relaxed">
          Test mode active - Switch roles using the floating button
        </p>
      </div>
    </div>
  )
}
