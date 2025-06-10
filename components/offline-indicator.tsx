
"use client"

import { AlertTriangle, Wifi, WifiOff } from "lucide-react"
import { useOnlineStatus } from "@/hooks/use-online-status"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface OfflineIndicatorProps {
  message?: string
}

export function OfflineIndicator({ message = "You're offline. Some features may not work properly." }: OfflineIndicatorProps) {
  const isOnline = useOnlineStatus()

  if (isOnline) {
    return null
  }

  return (
    <Alert className="mb-4 border-amber-200 bg-amber-50">
      <WifiOff className="h-4 w-4 text-amber-600" />
      <AlertDescription className="text-amber-800">
        {message}
      </AlertDescription>
    </Alert>
  )
}

// Network status indicator for the header
export function NetworkStatusIndicator() {
  const isOnline = useOnlineStatus()

  return (
    <div className="flex items-center gap-1">
      {isOnline ? (
        <Wifi className="h-4 w-4 text-green-600" />
      ) : (
        <WifiOff className="h-4 w-4 text-red-600" />
      )}
      <span className={`text-xs ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
        {isOnline ? 'Online' : 'Offline'}
      </span>
    </div>
  )
}
