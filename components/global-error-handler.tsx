"use client"

import { useEffect, type ReactNode } from "react"
import * as Sentry from "@sentry/nextjs"
import { addBreadcrumb } from "@/lib/sentry"

interface GlobalErrorHandlerProps {
  children: ReactNode
}

export function GlobalErrorHandler({ children }: GlobalErrorHandlerProps) {
  useEffect(() => {
    // Handler for unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled Promise Rejection:", event.reason)

      // Send to Sentry
      Sentry.captureException(event.reason)
    }

    // Handler for uncaught exceptions
    const handleError = (event: ErrorEvent) => {
      console.error("Uncaught error:", event.error || event.message)

      // Send to Sentry
      if (event.error) {
        Sentry.captureException(event.error)
      } else {
        Sentry.captureMessage(`Uncaught error: ${event.message}`)
      }

      // Prevent the default browser error handler
      event.preventDefault()
    }

    // Add navigation breadcrumbs
    const handleRouteChange = (url: string) => {
      addBreadcrumb(`Navigation to ${url}`, "navigation", { to: url })
    }

    // Add listeners
    window.addEventListener("unhandledrejection", handleUnhandledRejection)
    window.addEventListener("error", handleError)

    // Add navigation tracking if available
    if (typeof window !== "undefined" && window.navigation) {
      window.navigation.addEventListener("navigate", (event) => {
        if (event.destination?.url) {
          handleRouteChange(event.destination.url)
        }
      })
    }

    // Clean up on component unmount
    return () => {
      window.removeEventListener("unhandledrejection", handleUnhandledRejection)
      window.removeEventListener("error", handleError)

      if (typeof window !== "undefined" && window.navigation) {
        window.navigation.removeEventListener("navigate", (event) => {
          if (event.destination?.url) {
            handleRouteChange(event.destination.url)
          }
        })
      }
    }
  }, [])

  return <>{children}</>
}
