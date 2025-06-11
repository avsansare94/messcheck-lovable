
"use client"

import { ExploreScreen } from "./explore-screen"
import { withErrorBoundary } from "./with-error-boundary"
import { useErrorReporting } from "@/hooks/use-error-reporting"
import { Button } from "./ui/button"
import { AlertTriangle, Home } from "lucide-react"
import { useNavigate } from "react-router-dom"

// Custom fallback UI for the explore screen
const ExploreScreenFallback = () => {
  const navigate = useNavigate()
  
  return (
    <div className="container max-w-md mx-auto px-4 py-12">
      <div className="p-6 bg-white rounded-lg border border-red-200 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Unable to load mess listings</h2>
          <p className="text-gray-600 mb-6">
            We encountered an error while loading mess listings. Please try again later.
          </p>
          <div className="flex gap-4">
            <Button onClick={() => window.location.reload()} className="bg-red-600 hover:bg-red-700">
              Refresh Page
            </Button>
            <Button variant="outline" className="border-red-200" onClick={() => navigate("/")}>
              <Home className="mr-2 h-4 w-4" /> Go Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Create a wrapped version of ExploreScreen with error boundary
export const ExploreScreenWithErrorBoundary = withErrorBoundary(ExploreScreen, {
  fallback: <ExploreScreenFallback />,
  onError: (error, errorInfo) => {
    const { reportError } = useErrorReporting()
    reportError(error, "ExploreScreen")
  },
})
