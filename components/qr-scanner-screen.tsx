"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { QRCodeScanner } from "./qr-code-scanner"

export function QRScannerScreen() {
  return (
    <div className="container max-w-md mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Link href="/provider-dashboard">
          <Button variant="ghost" className="p-0 mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-red-600">QR Scanner</h1>
          <p className="text-sm text-gray-500">Scan customer QR codes to check them in</p>
        </div>
      </div>

      <QRCodeScanner />

      <div className="mt-6 space-y-4">
        <h2 className="font-semibold text-lg">How to Use the Scanner</h2>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <div className="bg-red-100 text-red-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
              1
            </div>
            <p className="text-sm">Click "Start Scanning" to activate the camera</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="bg-red-100 text-red-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
              2
            </div>
            <p className="text-sm">Point the camera at the customer's QR code</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="bg-red-100 text-red-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
              3
            </div>
            <p className="text-sm">The system will automatically verify the code</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="bg-red-100 text-red-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
              4
            </div>
            <p className="text-sm">Once verified, the customer will be checked in</p>
          </div>
        </div>

        <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-amber-800 text-sm mt-4">
          <p className="font-bold">Note:</p>
          <p className="mt-1">
            Make sure the QR code is clearly visible and not expired. If a code fails to scan, ask the customer to
            refresh their code.
          </p>
        </div>
      </div>
    </div>
  )
}
