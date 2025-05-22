"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

export default function ProviderNotificationSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [notifications, setNotifications] = useState({
    newSubscriptions: true,
    subscriptionRenewals: true,
    subscriptionCancellations: true,
    checkIns: true,
    reviews: true,
    paymentReceipts: true,
    marketingEmails: false,
    appUpdates: true,
    lowInventoryAlerts: true,
    dailySummary: true,
  })

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Notification preferences updated",
        description: "Your notification preferences have been saved.",
      })
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Business Notification Settings</CardTitle>
          <CardDescription>Manage your business notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="new-subscriptions">New Subscriptions</Label>
                <p className="text-sm text-muted-foreground">Get notified when a new customer subscribes</p>
              </div>
              <Switch
                id="new-subscriptions"
                checked={notifications.newSubscriptions}
                onCheckedChange={() => handleToggle("newSubscriptions")}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="subscription-renewals">Subscription Renewals</Label>
                <p className="text-sm text-muted-foreground">Get notified when a subscription is renewed</p>
              </div>
              <Switch
                id="subscription-renewals"
                checked={notifications.subscriptionRenewals}
                onCheckedChange={() => handleToggle("subscriptionRenewals")}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="subscription-cancellations">Subscription Cancellations</Label>
                <p className="text-sm text-muted-foreground">Get notified when a subscription is cancelled</p>
              </div>
              <Switch
                id="subscription-cancellations"
                checked={notifications.subscriptionCancellations}
                onCheckedChange={() => handleToggle("subscriptionCancellations")}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="check-ins">Check-ins</Label>
                <p className="text-sm text-muted-foreground">Get notified when customers check in</p>
              </div>
              <Switch
                id="check-ins"
                checked={notifications.checkIns}
                onCheckedChange={() => handleToggle("checkIns")}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="reviews">Reviews</Label>
                <p className="text-sm text-muted-foreground">Get notified when you receive a new review</p>
              </div>
              <Switch id="reviews" checked={notifications.reviews} onCheckedChange={() => handleToggle("reviews")} />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="payment-receipts">Payment Receipts</Label>
                <p className="text-sm text-muted-foreground">Get notified about payment receipts</p>
              </div>
              <Switch
                id="payment-receipts"
                checked={notifications.paymentReceipts}
                onCheckedChange={() => handleToggle("paymentReceipts")}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="low-inventory">Low Inventory Alerts</Label>
                <p className="text-sm text-muted-foreground">Get notified when inventory is running low</p>
              </div>
              <Switch
                id="low-inventory"
                checked={notifications.lowInventoryAlerts}
                onCheckedChange={() => handleToggle("lowInventoryAlerts")}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="daily-summary">Daily Summary</Label>
                <p className="text-sm text-muted-foreground">Receive a daily summary of your business activities</p>
              </div>
              <Switch
                id="daily-summary"
                checked={notifications.dailySummary}
                onCheckedChange={() => handleToggle("dailySummary")}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="marketing">Marketing Emails</Label>
                <p className="text-sm text-muted-foreground">Receive emails about new features and offers</p>
              </div>
              <Switch
                id="marketing"
                checked={notifications.marketingEmails}
                onCheckedChange={() => handleToggle("marketingEmails")}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="app-updates">App Updates</Label>
                <p className="text-sm text-muted-foreground">Get notified about app updates and new features</p>
              </div>
              <Switch
                id="app-updates"
                checked={notifications.appUpdates}
                onCheckedChange={() => handleToggle("appUpdates")}
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Preferences"}
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}
