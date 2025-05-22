"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangle, Home, RefreshCw } from "lucide-react"
import Link from "next/link"

interface ErrorPageProps {
  title?: string
  message?: string
  error?: Error
  reset?: () => void
}

export function ErrorPage({
  title = "Something went wrong",
  message = "We encountered an error while processing your request",
  error,
  reset,
}: ErrorPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md border border-red-100">
        <div className="flex flex-col items-center text-center">
          <div className="bg-red-100 p-3 rounded-full mb-4">
            <AlertTriangle className="h-10 w-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600 mb-6">{message}</p>

          {error && process.env.NODE_ENV !== "production" && (
            <div className="w-full mb-6 overflow-auto max-h-32 bg-gray-100 p-3 rounded text-left">
              <p className="text-sm font-mono text-red-600">{error.message}</p>
              {error.stack && <pre className="text-xs text-gray-700 mt-2 whitespace-pre-wrap">{error.stack}</pre>}
            </div>
          )}

          <div className="flex gap-4">
            {reset && (
              <Button onClick={reset} className="bg-red-600 hover:bg-red-700">
                <RefreshCw className="mr-2 h-4 w-4" /> Try Again
              </Button>
            )}
            <Link href="/">
              <Button variant="outline" className="border-red-200">
                <Home className="mr-2 h-4 w-4" /> Go Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
