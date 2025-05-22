"use client"

import { useEffect } from "react"
import { ErrorPage } from "@/components/error-page"
import { useErrorReporting } from "@/hooks/use-error-reporting"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { reportError } = useErrorReporting()

  useEffect(() => {
    // Report the error to our error reporting service
    reportError(error, "Global App Error")
  }, [error, reportError])

  return (
    <ErrorPage
      title="Something went wrong!"
      message="We apologize for the inconvenience. Please try again or return to the home page."
      error={error}
      reset={reset}
    />
  )
}
