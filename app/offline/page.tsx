"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WifiOff, RefreshCw, Home } from "lucide-react"

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-red-50 to-white">
      <div className="w-full max-w-md mx-auto text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <WifiOff className="h-10 w-10 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-red-600">You're Offline</h1>
          <p className="text-gray-600 mt-2">
            It seems you're not connected to the internet. Some features may not be available.
          </p>
        </div>

        <Card className="mb-6 border-red-100">
          <CardHeader>
            <CardTitle className="text-xl text-center">What you can do</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-500">
              You can still access previously loaded content and your subscribed mess information while offline.
            </p>

            <div className="grid gap-2">
              <Button onClick={() => window.location.reload()} className="w-full bg-red-600 hover:bg-red-700">
                <RefreshCw className="mr-2 h-4 w-4" /> Try Again
              </Button>

              <Link href="/home">
                <Button variant="outline" className="w-full border-red-100">
                  <Home className="mr-2 h-4 w-4" /> Go to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <p className="text-xs text-gray-500">
          MessCheck will automatically reconnect when your internet connection is restored.
        </p>
      </div>
    </main>
  )
}
