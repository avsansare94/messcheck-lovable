"use client"

import type React from "react"
import type { ComponentType, ReactNode } from "react"
import ErrorBoundary from "./error-boundary"

interface WithErrorBoundaryProps {
  fallback?: ReactNode
  onReset?: () => void
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

export function withErrorBoundary<P extends object>(Component: ComponentType<P>, options: WithErrorBoundaryProps = {}) {
  const { fallback, onReset, onError } = options

  const WithErrorBoundary = (props: P) => (
    <ErrorBoundary fallback={fallback} onReset={onReset} onError={onError}>
      <Component {...props} />
    </ErrorBoundary>
  )

  // Set display name for debugging
  const displayName = Component.displayName || Component.name || "Component"
  WithErrorBoundary.displayName = `WithErrorBoundary(${displayName})`

  return WithErrorBoundary
}
