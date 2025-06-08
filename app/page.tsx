import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-orange-600">MessCheck</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your ultimate platform for discovering, managing, and enjoying mess services. Connect with quality food
            providers and streamline your meal experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl text-center">For Users</CardTitle>
              <CardDescription className="text-center">Discover and subscribe to quality mess services</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <ul className="text-left space-y-2 mb-6">
                <li>• Find nearby mess services</li>
                <li>• Read reviews and ratings</li>
                <li>• Subscribe to meal plans</li>
                <li>• Track your meals and payments</li>
              </ul>
              <Link href="/login">
                <Button className="w-full bg-orange-600 hover:bg-orange-700">Login as User</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl text-center">For Admins</CardTitle>
              <CardDescription className="text-center">Manage the platform and oversee operations</CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <ul className="text-left space-y-2 mb-6">
                <li>• Verify mess profiles</li>
                <li>• Manage user accounts</li>
                <li>• Monitor platform activity</li>
                <li>• Handle disputes and reviews</li>
              </ul>
              <Link href="/admin-login">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Admin Login</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600">
            New to MessCheck?{" "}
            <Link href="/signup" className="text-orange-600 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
