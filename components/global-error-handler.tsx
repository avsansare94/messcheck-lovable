
"use client"

import { useEffect, type ReactNode } from "react"

interface GlobalErrorHandlerProps {
  children: ReactNode
}

export function GlobalErrorHandler({ children }: GlobalErrorHandlerProps) {
  useEffect(() => {
    // Handler for unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled Promise Rejection:", event.reason)
      
      // Prevent the default browser error handler
      event.preventDefault()
    }

    // Handler for uncaught exceptions
    const handleError = (event: ErrorEvent) => {
      console.error("Uncaught error:", event.error || event.message)

      // Prevent the default browser error handler
      event.preventDefault()
    }

    // Add navigation breadcrumbs for React Router
    const handleRouteChange = (url: string) => {
      console.log(`Navigation to ${url}`)
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
