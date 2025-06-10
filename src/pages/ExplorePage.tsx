
import React from "react"
import { ExploreScreen } from "@/components/explore-screen"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function ExplorePage() {
  return (
    <main className="pb-16">
      <ExploreScreen />
      <BottomNavigation activeTab="explore" />
    </main>
  )
}
