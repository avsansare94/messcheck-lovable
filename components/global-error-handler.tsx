
"use client"

import { useEffect, type ReactNode } from "react"
import * as Sentry from "@sentry/react"
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

    // Add navigation breadcrumbs for React Router
    const handleRouteChange = (url: string) => {
      addBreadcrumb(`Navigation to ${url}`, "navigation", { to: url })
    }

    // Add listeners
    window.addEventListener("unhandledrejection", handleUnhandledRejection)
    window.addEventListener("error", handleError)

    // Add navigation tracking for React Router
    const handlePopState = () => {
      handleRouteChange(window.location.pathname)
    }

    window.addEventListener("popstate", handlePopState)

    // Clean up on component unmount
    return () => {
      window.removeEventListener("unhandledrejection", handleUnhandledRejection)
      window.removeEventListener("error", handleError)
      window.removeEventListener("popstate", handlePopState)
    }
  }, [])

  return <>{children}</>
}
