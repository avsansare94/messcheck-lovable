"use client"

import { useState, useEffect, useRef } from "react"
import { Wifi, WifiOff } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useOnlineStatus } from "@/hooks/use-online-status"

export function NetworkStatus() {
  const isOnline = useOnlineStatus()
  const [showAlert, setShowAlert] = useState(false)
  const prevOnlineState = useRef(isOnline)

  useEffect(() => {
    // Only show alert when online status changes
    if (isOnline !== prevOnlineState.current) {
      setShowAlert(true)
      prevOnlineState.current = isOnline

      // If we're back online, hide the alert after 3 seconds
      if (isOnline) {
        const timer = setTimeout(() => setShowAlert(false), 3000)
        return () => clearTimeout(timer)
      }
    }
  }, [isOnline])

  if (!showAlert) return null

  return (
    <Alert
      className={`fixed bottom-16 left-0 right-0 z-50 mx-4 transition-all duration-300 ${
        isOnline ? "bg-green-100 text-green-800 border-green-200" : "bg-red-100 text-red-800 border-red-200"
      }`}
    >
      {isOnline ? <Wifi className="h-4 w-4 mr-2" /> : <WifiOff className="h-4 w-4 mr-2" />}
      <AlertDescription>
        {isOnline
          ? "You're back online! All features are now available."
          : "You're offline. Some features may not be available."}
      </AlertDescription>
    </Alert>
  )
}
