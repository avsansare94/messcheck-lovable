import { QRScannerScreen } from "@/components/qr-scanner-screen"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function ScannerPage() {
  return (
    <main className="pb-16">
      <QRScannerScreen />
      <BottomNavigation activeTab="home" />
    </main>
  )
}
