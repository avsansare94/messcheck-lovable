import { ExploreScreenWithErrorBoundary } from "@/components/explore-screen-with-error-boundary"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function ExplorePage() {
  return (
    <main>
      <ExploreScreenWithErrorBoundary />
      <BottomNavigation />
    </main>
  )
}
