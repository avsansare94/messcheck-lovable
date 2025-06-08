import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <CardTitle className="text-2xl text-red-600">Access Denied</CardTitle>
          <CardDescription>You don't have permission to access this page.</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">Please contact your administrator if you believe this is an error.</p>
          <div className="space-y-2">
            <Link href="/login">
              <Button variant="outline" className="w-full">
                User Login
              </Button>
            </Link>
            <Link href="/admin-login">
              <Button variant="outline" className="w-full">
                Admin Login
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
