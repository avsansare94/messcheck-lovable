"use client"

import { useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import { captureException, addBreadcrumb } from "@/lib/sentry"

export function useErrorReporting() {
  const { toast } = useToast()

  const reportError = useCallback(
    (error: Error, componentInfo?: string, additionalContext?: Record<string, any>) => {
      // Log to console in development
      if (process.env.NODE_ENV !== "production") {
        console.error(`Error in ${componentInfo || "unknown component"}:`, error)
      }

      // Add breadcrumb for the component where the error occurred
      if (componentInfo) {
        addBreadcrumb(`Error in ${componentInfo}`, "error", { component: componentInfo })
      }

      // Send to Sentry with additional context
      captureException(error, {
        component: componentInfo,
        ...additionalContext,
      })

      // Show a toast notification
      toast({
        title: "An error occurred",
        description: error.message || "Something went wrong. Please try again later.",
        variant: "destructive",
      })

      // Return the error for chaining
      return error
    },
    [toast],
  )

  const logEvent = useCallback((message: string, category?: string, data?: Record<string, any>) => {
    addBreadcrumb(message, category, data)
  }, [])

  return { reportError, logEvent }
}
