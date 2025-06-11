
import React from "react"
import { ExploreScreenWithErrorBoundary } from "@/components/explore-screen-with-error-boundary"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function ExplorePage() {
  return (
    <main className="pb-16">
      <ExploreScreenWithErrorBoundary />
      <BottomNavigation activeTab="explore" />
    </main>
  )
}
