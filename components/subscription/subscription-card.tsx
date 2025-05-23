"use client"

import { formatDistanceToNow } from "date-fns"

type SubscriptionCardProps = {
  subscription: {
    id: string
    start_date: string
    end_date: string
    is_active: boolean
    off_days_used: number
    renewal_due: string | null
    mess_profiles: {
      id: string
      mess_name: string
      mess_type: string
      address: string
      city: string
    }
    meal_plans: {
      id: string
      name: string
      type: string
      duration_days: number
      price: number
    }
  }
}

export default function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  const startDate = new Date(subscription.start_date)
  const endDate = new Date(subscription.end_date)
  const isExpired = endDate < new Date()

  const daysLeft = Math.ceil((endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  const progress = Math.max(0, Math.min(100, ((totalDays - daysLeft) / totalDays) * 100))

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{subscription.mess_profiles.mess_name}</h3>
          <div
            className={`px-2 py-1 rounded text-xs font-medium ${
              isExpired
                ? "bg-red-100 text-red-800"
                : subscription.is_active
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {isExpired ? "Expired" : subscription.is_active ? "Active" : "Inactive"}
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-1">
          {subscription.mess_profiles.address}, {subscription.mess_profiles.city}
        </p>

        <div className="mt-3">
          <div className="text-sm font-medium">
            {subscription.meal_plans.name} ({subscription.meal_plans.type})
          </div>
          <div className="text-sm text-gray-600">
            ₹{subscription.meal_plans.price} for {subscription.meal_plans.duration_days} days
          </div>
        </div>

        {!isExpired && subscription.is_active && (
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Progress</span>
              <span>{daysLeft} days left</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        )}

        <div className="mt-3 flex justify-between text-xs text-gray-600">
          <div>Started: {formatDistanceToNow(startDate, { addSuffix: true })}</div>
          <div>
            {isExpired ? "Ended" : "Ends"}: {formatDistanceToNow(endDate, { addSuffix: true })}
          </div>
        </div>
      </div>
    </div>
  )
}
