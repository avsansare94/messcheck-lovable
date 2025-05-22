"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { WifiOff, Clock, Calendar } from "lucide-react"
import { useOnlineStatus } from "@/hooks/use-online-status"
import offlineManager from "@/utils/offline-manager"

interface OfflineCheckInProps {
  userId: string
  messId: string
  subscriptionId: string
  mealType: "lunch" | "dinner"
  messName: string
  userName: string
}

export function OfflineCheckIn({ userId, messId, subscriptionId, mealType, messName, userName }: OfflineCheckInProps) {
  const isOnline = useOnlineStatus()
  const [checkInQueued, setCheckInQueued] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleOfflineCheckIn = async () => {
    if (!offlineManager) return

    setIsSubmitting(true)

    try {
      // Create a pending check-in action
      const checkInData = {
        userId,
        messId,
        subscriptionId,
        mealType,
        timestamp: Date.now(),
      }

      // Generate a unique ID for this check-in
      const actionId = `check-in-${userId}-${messId}-${mealType}-${Date.now()}`

      // Add to pending actions queue
      await offlineManager.addPendingAction({
        id: actionId,
        type: "checkIn",
        data: checkInData,
        timestamp: Date.now(),
        retryCount: 0,
      })

      // Mark as queued
      setCheckInQueued(true)
    } catch (error) {
      console.error("Error queueing offline check-in:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Only show this component when offline
  if (isOnline) return null

  return (
    <Card className="border-amber-100 bg-amber-50 mb-4">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <WifiOff className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-medium text-amber-800">You're currently offline</h3>

            {checkInQueued ? (
              <div className="mt-2">
                <p className="text-sm text-amber-700">
                  Your check-in has been saved and will be processed when you're back online.
                </p>
                <div className="mt-3 flex items-center justify-center">
                  <Badge className="bg-amber-200 text-amber-800 border-amber-300">Check-in Queued</Badge>
                </div>
              </div>
            ) : (
              <>
                <p className="text-sm text-amber-700 mt-1 mb-3">
                  You can still check in offline. Your check-in will be processed when you're back online.
                </p>

                <div className="space-y-2 text-sm mb-3">
                  <div className="flex items-center text-amber-700">
                    <Calendar className="h-4 w-4 mr-2 text-amber-600" />
                    <span>Today's Date: {new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-amber-700">
                    <Clock className="h-4 w-4 mr-2 text-amber-600" />
                    <span>Meal: {mealType === "lunch" ? "Lunch" : "Dinner"}</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                  onClick={handleOfflineCheckIn}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    "Check In Offline"
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
