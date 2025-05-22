"use client"

import { useOnlineStatus } from "@/hooks/use-online-status"
import { Wifi, WifiOff } from "lucide-react"
import { useEffect, useState } from "react"

export function OfflineIndicator() {
  const isOnline = useOnlineStatus()
  const [showReconnected, setShowReconnected] = useState(false)

  useEffect(() => {
    // When coming back online, show the reconnected message
    if (isOnline) {
      setShowReconnected(true)
      const timer = setTimeout(() => {
        setShowReconnected(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isOnline])

  if (isOnline && !showReconnected) {
    return null
  }

  return (
    <div
      className={`rounded-lg p-3 mb-4 flex items-center ${isOnline ? "bg-green-50 border border-green-200" : "bg-amber-50 border border-amber-200"}`}
    >
      {isOnline ? (
        <>
          <Wifi className="h-5 w-5 text-green-600 mr-2" />
          <div>
            <p className="text-green-800 text-sm font-medium">Connected</p>
            <p className="text-green-700 text-xs">You're back online</p>
          </div>
        </>
      ) : (
        <>
          <WifiOff className="h-5 w-5 text-amber-600 mr-2" />
          <div>
            <p className="text-amber-800 text-sm font-medium">Offline Mode</p>
            <p className="text-amber-700 text-xs">Some features may be limited</p>
          </div>
        </>
      )}
    </div>
  )
}
