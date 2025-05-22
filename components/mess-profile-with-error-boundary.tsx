"use client"

import { MessProfile } from "./mess-profile"
import { withErrorBoundary } from "./with-error-boundary"
import { useErrorReporting } from "@/hooks/use-error-reporting"
import { Button } from "./ui/button"
import { AlertTriangle, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Custom fallback UI for the mess profile
const MessProfileFallback = () => (
  <div className="p-6 bg-white rounded-lg border border-red-200 shadow-sm">
    <div className="flex flex-col items-center text-center">
      <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
      <h2 className="text-xl font-bold text-gray-900 mb-2">Unable to load mess details</h2>
      <p className="text-gray-600 mb-6">
        We encountered an error while loading this mess profile. Please try again later.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => window.location.reload()} className="bg-red-600 hover:bg-red-700">
          Refresh Page
        </Button>
        <Link href="/explore">
          <Button variant="outline" className="border-red-200">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Explore
          </Button>
        </Link>
      </div>
    </div>
  </div>
)

// Create a wrapped version of MessProfile with error boundary
export const MessProfileWithErrorBoundary = withErrorBoundary(MessProfile, {
  fallback: <MessProfileFallback />,
  onError: (error, errorInfo) => {
    // We need to create the hook inside a component
    const ErrorReporter = () => {
      const { reportError } = useErrorReporting()
      reportError(error, "MessProfile")
      return null
    }

    // Render the error reporter component
    const root = document.createElement("div")
    document.body.appendChild(root)
    const { createRoot } = require("react-dom/client")
    const reactRoot = createRoot(root)
    reactRoot.render(<ErrorReporter />)

    // Clean up
    setTimeout(() => {
      reactRoot.unmount()
      document.body.removeChild(root)
    }, 1000)
  },
})
