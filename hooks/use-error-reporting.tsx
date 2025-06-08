"use client"

import { useCallback } from "react"
import { useToast } from "@/hooks/use-toast"

export function useErrorReporting() {
  const { toast } = useToast()

  const reportError = useCallback(
    (error: Error, componentInfo?: string, additionalContext?: Record<string, any>) => {
      // Log to console in development
      if (process.env.NODE_ENV !== "production") {
        console.error(`Error in ${componentInfo || "unknown component"}:`, error)
      }

      // Don't report redirect errors as they are expected behavior
      if (error.message?.includes("NEXT_REDIRECT") || error.name === "RedirectError") {
        return error
      }

      // Show a toast notification for actual errors
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
    if (process.env.NODE_ENV !== "production") {
      console.log(`Event: ${message}`, { category, data })
    }
  }, [])

  return { reportError, logEvent }
}
