import { MyMessScreen } from "@/components/my-mess-screen"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function MyMessPage() {
  return (
    <main className="pb-16">
      <MyMessScreen />
      <BottomNavigation activeTab="my-mess" />
    </main>
  )
}
