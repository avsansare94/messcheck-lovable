"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Bell } from "lucide-react"

export default function NotificationSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    mealUpdates: true,
    subscriptionReminders: true,
    specialOffers: false,
    messRecommendations: true,
    appUpdates: true,
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
  })

  const handleToggle = (key: string) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been saved.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="h-6 w-6 text-red-600" />
        <h2 className="text-2xl font-bold">Notification Settings</h2>
      </div>

      <p className="text-gray-600">Manage how and when you receive notifications</p>

      <Separator />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Notification Types</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="mealUpdates" className="font-medium">
                  Meal Updates
                </Label>
                <p className="text-sm text-gray-500">Receive updates about your mess menu</p>
              </div>
              <Switch
                id="mealUpdates"
                checked={settings.mealUpdates}
                onCheckedChange={() => handleToggle("mealUpdates")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="subscriptionReminders" className="font-medium">
                  Subscription Reminders
                </Label>
                <p className="text-sm text-gray-500">Get reminders about your subscription status</p>
              </div>
              <Switch
                id="subscriptionReminders"
                checked={settings.subscriptionReminders}
                onCheckedChange={() => handleToggle("subscriptionReminders")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="specialOffers" className="font-medium">
                  Special Offers
                </Label>
                <p className="text-sm text-gray-500">Receive special offers and promotions</p>
              </div>
              <Switch
                id="specialOffers"
                checked={settings.specialOffers}
                onCheckedChange={() => handleToggle("specialOffers")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="messRecommendations" className="font-medium">
                  Mess Recommendations
                </Label>
                <p className="text-sm text-gray-500">Get recommendations for new mess options</p>
              </div>
              <Switch
                id="messRecommendations"
                checked={settings.messRecommendations}
                onCheckedChange={() => handleToggle("messRecommendations")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="appUpdates" className="font-medium">
                  App Updates
                </Label>
                <p className="text-sm text-gray-500">Receive updates about new app features</p>
              </div>
              <Switch
                id="appUpdates"
                checked={settings.appUpdates}
                onCheckedChange={() => handleToggle("appUpdates")}
              />
            </div>
          </div>

          <Separator />

          <h3 className="text-lg font-medium">Notification Channels</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotifications" className="font-medium">
                  Email Notifications
                </Label>
                <p className="text-sm text-gray-500">Receive notifications via email</p>
              </div>
              <Switch
                id="emailNotifications"
                checked={settings.emailNotifications}
                onCheckedChange={() => handleToggle("emailNotifications")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="pushNotifications" className="font-medium">
                  Push Notifications
                </Label>
                <p className="text-sm text-gray-500">Receive push notifications on your device</p>
              </div>
              <Switch
                id="pushNotifications"
                checked={settings.pushNotifications}
                onCheckedChange={() => handleToggle("pushNotifications")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="smsNotifications" className="font-medium">
                  SMS Notifications
                </Label>
                <p className="text-sm text-gray-500">Receive notifications via SMS</p>
              </div>
              <Switch
                id="smsNotifications"
                checked={settings.smsNotifications}
                onCheckedChange={() => handleToggle("smsNotifications")}
              />
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  )
}
