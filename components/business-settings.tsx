"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"

export default function BusinessSettings() {
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    cuisineType: "veg",
    servingType: "both",
    openDays: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
    autoAcceptSubscriptions: true,
    showMenuPublicly: true,
    allowReviews: true,
    allowOfflineCheckIn: true,
    businessDescription: "We serve delicious home-cooked meals with a focus on nutrition and taste.",
    specialInstructions: "Please inform us about any allergies or dietary restrictions.",
  })

  const handleCuisineChange = (value: string) => {
    setSettings((prev) => ({ ...prev, cuisineType: value }))
  }

  const handleServingChange = (value: string) => {
    setSettings((prev) => ({ ...prev, servingType: value }))
  }

  const handleDayToggle = (day: string) => {
    setSettings((prev) => {
      const openDays = [...prev.openDays]
      if (openDays.includes(day)) {
        return { ...prev, openDays: openDays.filter((d) => d !== day) }
      } else {
        return { ...prev, openDays: [...openDays, day] }
      }
    })
  }

  const handleToggle = (key: string) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Business settings updated",
        description: "Your business settings have been saved successfully.",
      })
    }, 1000)
  }

  const days = [
    { id: "monday", label: "Monday" },
    { id: "tuesday", label: "Tuesday" },
    { id: "wednesday", label: "Wednesday" },
    { id: "thursday", label: "Thursday" },
    { id: "friday", label: "Friday" },
    { id: "saturday", label: "Saturday" },
    { id: "sunday", label: "Sunday" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Business Settings</h2>
        <p className="text-sm text-gray-500">Manage your mess business settings and preferences</p>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-4">
        <Link href="/settings/cuisine-type" className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-medium">Cuisine Type</h3>
          <p className="text-sm text-gray-500">Choose your preferred cuisine type</p>
        </Link>
        <Link href="/settings/serving-type" className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-medium">Serving Type</h3>
          <p className="text-sm text-gray-500">Select the type of serving you offer</p>
        </Link>
        <Link href="/settings/open-days" className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-medium">Open Days</h3>
          <p className="text-sm text-gray-500">Set the days your mess is open</p>
        </Link>
        <Link href="/settings/business-description" className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-medium">Business Description</h3>
          <p className="text-sm text-gray-500">Describe your mess business</p>
        </Link>
        <Link href="/settings/special-instructions" className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-medium">Special Instructions</h3>
          <p className="text-sm text-gray-500">Provide any special instructions for your customers</p>
        </Link>
        <Link href="/settings/business-preferences" className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-medium">Business Preferences</h3>
          <p className="text-sm text-gray-500">Manage additional business preferences</p>
        </Link>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Business Settings"}
      </Button>
    </div>
  )
}
