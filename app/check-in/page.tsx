import { CheckInScreen } from "@/components/check-in-screen"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function CheckInPage() {
  return (
    <main className="pb-16">
      <CheckInScreen />
      <BottomNavigation activeTab="my-mess" />
    </main>
  )
}
