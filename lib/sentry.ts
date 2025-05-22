import * as Sentry from "@sentry/nextjs"

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN

export function initSentry() {
  if (SENTRY_DSN) {
    Sentry.init({
      dsn: SENTRY_DSN,
      // Adjust this value in production, or use tracesSampler for greater control
      tracesSampleRate: 1.0,
      // Enable performance monitoring
      integrations: [
        new Sentry.BrowserTracing({
          // Set sampling rate for performance monitoring
          tracePropagationTargets: ["localhost", /^https:\/\/messcheck\.vercel\.app/],
        }),
        new Sentry.Replay({
          // Capture 10% of all sessions
          sessionSampleRate: 0.1,
          // Capture 100% of sessions with an error
          errorSampleRate: 1.0,
        }),
      ],
      // We recommend adjusting this value in production
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      environment: process.env.NODE_ENV,
      // Enable debug in development
      debug: process.env.NODE_ENV === "development",
      beforeSend(event) {
        // Don't send events in development unless explicitly enabled
        if (process.env.NODE_ENV === "development" && !process.env.NEXT_PUBLIC_ENABLE_SENTRY_DEV) {
          return null
        }
        return event
      },
    })
  } else {
    console.warn("Sentry DSN not provided. Error tracking disabled.")
  }
}

// Helper function to capture exceptions with additional context
export function captureException(error: Error, context?: Record<string, any>) {
  if (SENTRY_DSN) {
    // Use a safer approach that doesn't rely on configureScope
    Sentry.captureException(error, {
      extra: context,
    })
  } else {
    // Fallback to console in development or when Sentry is not configured
    console.error("Error captured:", error, context)
  }
}

// Set user information for better error tracking
export function setUserInfo(user: { id?: string; email?: string; username?: string }) {
  if (SENTRY_DSN) {
    Sentry.setUser(user)
  }
}

// Clear user information on logout
export function clearUserInfo() {
  if (SENTRY_DSN) {
    Sentry.setUser(null)
  }
}

// Add breadcrumbs for better debugging
export function addBreadcrumb(message: string, category?: string, data?: Record<string, any>) {
  if (SENTRY_DSN) {
    Sentry.addBreadcrumb({
      message,
      category: category || "app",
      data,
      level: "info",
    })
  }
}
