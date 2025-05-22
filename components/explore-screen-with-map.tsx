"use client"

import { useEffect } from "react"

const ExploreScreenWithMap = () => {
  useEffect(() => {
    // Example of window-dependent code.  Replace with actual map initialization or other window-dependent logic.
    if (typeof window !== "undefined") {
      console.log("Window object is available")
      // Example: Accessing window.innerWidth
      console.log("Window width:", window.innerWidth)
    }
  }, [])

  return (
    <div>
      <h1>Explore Screen with Map</h1>
      {/* Placeholder for map component */}
      <div style={{ width: "100%", height: "500px", backgroundColor: "lightgray" }}>Map Placeholder</div>
    </div>
  )
}

export default ExploreScreenWithMap
