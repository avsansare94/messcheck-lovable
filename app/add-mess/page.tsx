import { AddMessForm } from "@/components/add-mess-form"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function AddMessPage() {
  return (
    <main className="pb-16">
      <AddMessForm />
      <BottomNavigation activeTab="my-mess" />
    </main>
  )
}
