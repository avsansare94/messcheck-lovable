"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

export function GeolocationPermission() {
  const [permissionState, setPermissionState] = useState<PermissionState | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      return
    }

    // Check if permissions API is supported
    if (navigator.permissions) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        setPermissionState(result.state)

        // Show prompt if permission is prompt or denied
        setShowPrompt(result.state === "prompt" || result.state === "denied")

        // Listen for permission changes
        result.onchange = () => {
          setPermissionState(result.state)
          setShowPrompt(result.state === "prompt" || result.state === "denied")
        }
      })
    } else {
      // If permissions API is not supported, show the prompt
      setShowPrompt(true)
    }
  }, [])

  const requestPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          // Success callback
          setShowPrompt(false)
        },
        (error) => {
          // Error callback
          console.error("Geolocation error:", error)

          // If permission was denied, keep showing the prompt
          if (error.code === error.PERMISSION_DENIED) {
            setPermissionState("denied")
          }
        },
      )
    }
  }

  if (!showPrompt) {
    return null
  }

  return (
    <div className="bg-blue-50 rounded-lg border border-blue-200 p-4 mb-4">
      <h3 className="text-blue-800 font-medium mb-2">Enable Location Services</h3>
      <p className="text-blue-700 text-sm mb-3">
        {permissionState === "denied"
          ? "You've denied location access. Please enable location services in your browser settings to see nearby mess options."
          : "Allow location access to find mess services near you and get accurate distance information."}
      </p>
      <Button
        onClick={requestPermission}
        className="bg-blue-600 hover:bg-blue-700 text-white"
        disabled={permissionState === "denied"}
      >
        <MapPin className="h-4 w-4 mr-2" />
        {permissionState === "denied" ? "Update Browser Settings" : "Enable Location"}
      </Button>
    </div>
  )
}
