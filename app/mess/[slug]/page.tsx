
import { MessProfileWithErrorBoundary } from "@/components/mess-profile-with-error-boundary"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function MessPage({ params }: { params: { slug: string } }) {
  return (
    <main>
      <MessProfileWithErrorBoundary slug={params.slug} />
      <BottomNavigation activeTab="explore" />
    </main>
  )
}
