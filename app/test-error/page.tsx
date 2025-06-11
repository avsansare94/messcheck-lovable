
import { ErrorTest } from "@/components/error-test"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function TestErrorPage() {
  return (
    <main>
      <ErrorTest />
      <BottomNavigation activeTab="home" />
    </main>
  )
}
