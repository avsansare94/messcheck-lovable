"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, Camera, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function QRCodeScanner() {
  const [scanning, setScanning] = useState(false)
  const [scanned, setScanned] = useState(false)
  const [scanResult, setScanResult] = useState<null | {
    success: boolean
    userId: string
    messId: string
    subscriptionId: string
    mealType: "lunch" | "dinner"
    userName?: string
    message: string
  }>(null)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const { toast } = useToast()

  // Simulate QR code scanning
  const startScanning = () => {
    setScanning(true)
    setCameraError(null)
    setScanResult(null)
    setScanned(false)

    // Simulate camera access and scanning process
    setTimeout(() => {
      // Randomly decide if scan is successful (90% chance of success)
      const isSuccess = Math.random() > 0.1

      if (isSuccess) {
        // Simulate successful scan
        const mockResult = {
          success: true,
          userId: "user123",
          messId: "mess789",
          subscriptionId: "sub456",
          mealType: Math.random() > 0.5 ? "lunch" : "dinner",
          userName: "Avinash Sansare",
          message: "Check-in successful!",
        } as const

        setScanResult(mockResult)
        toast({
          title: "Check-in Successful",
          description: `${mockResult.userName} checked in for ${mockResult.mealType}`,
          variant: "default",
        })
      } else {
        // Simulate failed scan
        setScanResult({
          success: false,
          userId: "",
          messId: "",
          subscriptionId: "",
          mealType: "lunch",
          message: "Invalid or expired QR code. Please ask the user to refresh their code.",
        })
        toast({
          title: "Check-in Failed",
          description: "Invalid or expired QR code",
          variant: "destructive",
        })
      }

      setScanned(true)
      setScanning(false)
    }, 2000)
  }

  const resetScanner = () => {
    setScanned(false)
    setScanResult(null)
    setCameraError(null)
  }

  return (
    <Card className="border-red-100 shadow-sm">
      <CardContent className="p-4">
        <div className="text-center mb-4">
          <h3 className="font-semibold text-lg">QR Code Scanner</h3>
          <p className="text-sm text-gray-500">Scan customer QR codes to check them in</p>
        </div>

        <div className="bg-gray-100 rounded-lg aspect-square mb-4 relative overflow-hidden">
          {scanning ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : scanned ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              {scanResult?.success ? (
                <>
                  <CheckCircle2 className="h-16 w-16 text-green-500 mb-2" />
                  <h3 className="font-semibold text-lg text-green-800">Check-in Successful</h3>
                  <p className="text-sm text-center text-green-700 mb-2">
                    {scanResult.userName || "User"} has been checked in for{" "}
                    {scanResult.mealType === "lunch" ? "lunch" : "dinner"}
                  </p>
                </>
              ) : (
                <>
                  <XCircle className="h-16 w-16 text-red-500 mb-2" />
                  <h3 className="font-semibold text-lg text-red-800">Check-in Failed</h3>
                  <p className="text-sm text-center text-red-700 mb-2">{scanResult?.message}</p>
                </>
              )}
            </div>
          ) : cameraError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
              <XCircle className="h-16 w-16 text-red-500 mb-2" />
              <h3 className="font-semibold text-lg text-red-800">Camera Error</h3>
              <p className="text-sm text-center text-red-700 mb-2">{cameraError}</p>
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Camera className="h-16 w-16 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Camera preview will appear here</p>
            </div>
          )}

          {/* Scanner overlay */}
          {scanning && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 border-2 border-red-600 rounded-lg"></div>
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-red-600 opacity-50 animate-pulse"></div>
              <div className="absolute top-0 left-1/2 w-0.5 h-full bg-red-600 opacity-50 animate-pulse"></div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {scanned ? (
            <Button variant="outline" className="border-red-100 text-red-600" onClick={resetScanner}>
              <RefreshCw className="h-4 w-4 mr-2" /> Scan Another Code
            </Button>
          ) : (
            <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={startScanning} disabled={scanning}>
              {scanning ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Scanning...
                </>
              ) : (
                <>
                  <Camera className="h-4 w-4 mr-2" /> Start Scanning
                </>
              )}
            </Button>
          )}
        </div>

        <div className="mt-4">
          <h4 className="font-medium text-sm mb-2">Today's Check-ins</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {[
              { name: "Avinash S.", time: "12:45 PM", meal: "lunch" },
              { name: "Rahul K.", time: "12:30 PM", meal: "lunch" },
              { name: "Priya M.", time: "1:15 PM", meal: "lunch" },
            ].map((checkin, index) => (
              <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-sm font-medium mr-2">
                    {checkin.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{checkin.name}</p>
                    <p className="text-xs text-gray-500">{checkin.time}</p>
                  </div>
                </div>
                <Badge
                  className={checkin.meal === "lunch" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"}
                >
                  {checkin.meal === "lunch" ? "Lunch" : "Dinner"}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
