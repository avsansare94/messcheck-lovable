"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { useAuth } from "@/components/auth-provider"

type CheckinFormProps = {
  messId: string
  subscriptionId: string
}

export default function CheckinForm({ messId, subscriptionId }: CheckinFormProps) {
  const [mealType, setMealType] = useState<"lunch" | "dinner">("lunch")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()
  const { user } = useAuth()

  const handleCheckin = async () => {
    if (!user) {
      setError("You must be logged in to check in")
      return
    }

    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const supabase = getSupabaseBrowserClient()

      // Check if already checked in today for this meal
      const today = new Date().toISOString().split("T")[0]
      const { data: existingCheckin } = await supabase
        .from("checkins")
        .select("id")
        .eq("user_id", user.id)
        .eq("mess_id", messId)
        .eq("date", today)
        .eq("meal_type", mealType)
        .maybeSingle()

      if (existingCheckin) {
        setError(`You have already checked in for ${mealType} today`)
        setIsLoading(false)
        return
      }

      // Create the check-in
      const { error: checkinError } = await supabase.from("checkins").insert({
        user_id: user.id,
        mess_id: messId,
        subscription_id: subscriptionId,
        date: today,
        meal_type: mealType,
        checkin_mode: "manual",
      })

      if (checkinError) {
        throw new Error(checkinError.message)
      }

      setSuccess(`Successfully checked in for ${mealType}`)
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Failed to check in")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-semibold text-lg mb-3">Check In</h3>

      {error && <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">{error}</div>}

      {success && <div className="bg-green-50 text-green-600 p-3 rounded-md mb-4">{success}</div>}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Meal Type</label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="mealType"
              value="lunch"
              checked={mealType === "lunch"}
              onChange={() => setMealType("lunch")}
              className="mr-2"
            />
            Lunch
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="mealType"
              value="dinner"
              checked={mealType === "dinner"}
              onChange={() => setMealType("dinner")}
              className="mr-2"
            />
            Dinner
          </label>
        </div>
      </div>

      <button
        onClick={handleCheckin}
        disabled={isLoading}
        className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:opacity-50"
      >
        {isLoading ? "Checking in..." : "Check In"}
      </button>
    </div>
  )
}
