"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ErrorBoundary from "./error-boundary"

// Component that will throw an error when the button is clicked
function ErrorThrower() {
  const [shouldThrow, setShouldThrow] = useState(false)

  if (shouldThrow) {
    throw new Error("This is a test error")
  }

  return (
    <div className="p-4 border rounded-md">
      <h3 className="font-medium mb-2">Test Component</h3>
      <p className="text-sm text-gray-600 mb-4">Click the button below to simulate an error in this component.</p>
      <Button onClick={() => setShouldThrow(true)} variant="destructive">
        Throw Error
      </Button>
    </div>
  )
}

// Component with async error
function AsyncErrorThrower() {
  const [isLoading, setIsLoading] = useState(false)

  const handleAsyncError = async () => {
    setIsLoading(true)
    // Simulate an API call that fails
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    throw new Error("Async operation failed")
  }

  return (
    <div className="p-4 border rounded-md">
      <h3 className="font-medium mb-2">Async Test Component</h3>
      <p className="text-sm text-gray-600 mb-4">Click the button below to simulate an async error.</p>
      <Button onClick={handleAsyncError} variant="destructive" disabled={isLoading}>
        {isLoading ? "Loading..." : "Throw Async Error"}
      </Button>
    </div>
  )
}

// Main error test component
export function ErrorTest() {
  return (
    <div className="container max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Error Boundary Testing</h2>
      <div className="space-y-4">
        <ErrorBoundary>
          <ErrorThrower />
        </ErrorBoundary>

        <ErrorBoundary>
          <AsyncErrorThrower />
        </ErrorBoundary>
      </div>
    </div>
  )
}
