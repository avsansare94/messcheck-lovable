"use client"

import { useEffect } from "react"

const MessMapView = () => {
  useEffect(() => {
    // Window-dependent code here
    console.log("MessMapView mounted (client-side)")
  }, [])

  return (
    <div>
      <h1>Mess Map View</h1>
      {/* Add your map component or logic here */}
    </div>
  )
}

export default MessMapView
