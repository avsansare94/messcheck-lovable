
import * as Sentry from "@sentry/react"

// Initialize Sentry for React
Sentry.init({
  dsn: import.meta.env?.VITE_SENTRY_DSN || "",
  environment: import.meta.env?.MODE || "development",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  // Only initialize if DSN is provided
  enabled: !!(import.meta.env?.VITE_SENTRY_DSN),
})

// Helper function to add breadcrumbs
export const addBreadcrumb = (message: string, category: string, data?: any) => {
  Sentry.addBreadcrumb({
    message,
    category,
    data,
    level: "info",
  })
}

// Helper function to capture exceptions
export const captureException = (error: Error, context?: any) => {
  Sentry.captureException(error, {
    extra: context,
  })
}

// Helper function to capture messages
export const captureMessage = (message: string, level: Sentry.SeverityLevel = "info") => {
  Sentry.captureMessage(message, level)
}

// Helper function to set user context
export const setUser = (user: { id: string; email?: string; username?: string }) => {
  Sentry.setUser(user)
}

// Helper function to set tag
export const setTag = (key: string, value: string) => {
  Sentry.setTag(key, value)
}
