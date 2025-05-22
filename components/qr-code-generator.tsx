"use client"

import { useState, useEffect } from "react"
import { QRCodeSVG as QRCode } from "qrcode.react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RefreshCw } from "lucide-react"

interface QRCodeGeneratorProps {
  userId: string
  messId: string
  subscriptionId: string
  mealType: "lunch" | "dinner"
  messName: string
  userName: string
}

export function QRCodeGenerator({
  userId,
  messId,
  subscriptionId,
  mealType,
  messName,
  userName,
}: QRCodeGeneratorProps) {
  const [timestamp, setTimestamp] = useState<number>(Date.now())
  const [expiryTime, setExpiryTime] = useState<number>(5 * 60) // 5 minutes in seconds
  const [countdown, setCountdown] = useState<number>(5 * 60)

  // Generate a unique token that changes every few minutes for security
  const generateToken = () => {
    const newTimestamp = Date.now()
    setTimestamp(newTimestamp)
    setCountdown(expiryTime)
    return newTimestamp
  }

  // QR code data
  const qrData = JSON.stringify({
    userId,
    messId,
    subscriptionId,
    mealType,
    timestamp,
    exp: timestamp + expiryTime * 1000, // Expiry time in milliseconds
  })

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          generateToken()
          return expiryTime
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [expiryTime])

  // Format countdown time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card className="border-red-100 shadow-sm">
      <CardContent className="p-4 flex flex-col items-center">
        <div className="mb-4 text-center">
          <h3 className="font-semibold text-lg">{messName}</h3>
          <p className="text-sm text-gray-500">Check-in QR Code</p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
          <QRCode
            value={qrData}
            size={200}
            level="H"
            includeMargin={true}
            renderAs="svg"
            imageSettings={{
              src: "/icon-192.png",
              x: undefined,
              y: undefined,
              height: 40,
              width: 40,
              excavate: true,
            }}
          />
        </div>

        <div className="flex flex-col items-center gap-2 w-full">
          <Badge
            className={`${
              mealType === "lunch" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"
            } text-sm px-3 py-1`}
          >
            {mealType === "lunch" ? "Lunch Check-in" : "Dinner Check-in"}
          </Badge>

          <div className="text-center mt-2">
            <p className="text-sm text-gray-500">Code refreshes in</p>
            <p className="font-medium text-lg">{formatTime(countdown)}</p>
          </div>

          <Button variant="outline" size="sm" className="mt-2 border-red-100 text-red-600" onClick={generateToken}>
            <RefreshCw className="h-4 w-4 mr-2" /> Refresh Code
          </Button>

          <p className="text-xs text-gray-500 text-center mt-2">
            Show this QR code to the mess staff to check in for your meal
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
