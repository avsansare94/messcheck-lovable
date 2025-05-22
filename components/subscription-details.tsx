"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Download, FileText, History, PauseCircle, RefreshCw, Settings } from "lucide-react"
import { SubscriptionHistory } from "./subscription-history"

interface SubscriptionDetailsProps {
  onClose: () => void
}

export function SubscriptionDetails({ onClose }: SubscriptionDetailsProps) {
  const [showHistory, setShowHistory] = useState(false)

  // Mock data - in a real app, this would come from an API or context
  const subscription = {
    messName: "Sharma's Tiffin Service",
    isVerified: true,
    planName: "Monthly Thali Plan",
    status: "Active",
    cost: "₹3,000",
    startDate: "May 1, 2025",
    endDate: "May 30, 2025",
    remainingDays: 15,
    totalDays: 30,
    mealsIncluded: ["Lunch", "Dinner"],
    offDaysAllowed: 3,
    offDaysUsed: 1,
    paymentMethod: "UPI - user@okbank",
    lastPayment: "April 28, 2025",
    autoRenewal: true,
    specialRequests: "Less spicy food",
    mealTimings: {
      lunch: "12:30 PM - 2:30 PM",
      dinner: "7:30 PM - 9:30 PM",
    },
    invoiceId: "INV-2025-05-001",
  }

  if (showHistory) {
    return <SubscriptionHistory onClose={() => setShowHistory(false)} />
  }

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto pb-16">
      <div className="container max-w-md mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Subscription Details</h1>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>

        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-xs">Logo</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{subscription.messName}</h3>
                  {subscription.isVerified && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 text-xs">
                      ✓ Verified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                    {subscription.status}
                  </Badge>
                  <p className="text-sm text-muted-foreground">{subscription.planName}</p>
                </div>
              </div>
            </div>

            <div className="space-y-1 mb-4">
              <p className="text-sm font-medium">Remaining Meal Days</p>
              <Progress
                value={(subscription.remainingDays / subscription.totalDays) * 100}
                className="h-2 bg-gray-200"
                indicatorClassName="bg-rose-500"
              />
              <p className="text-xs text-muted-foreground">
                {subscription.remainingDays} of {subscription.totalDays} days
              </p>
            </div>

            <Button
              variant="outline"
              onClick={() => setShowHistory(true)}
              className="w-full justify-between mb-4 text-sm h-10 border-dashed"
            >
              <span className="flex items-center">
                <History className="mr-2 h-4 w-4 text-rose-500" />
                View Subscription History
              </span>
            </Button>

            <Separator className="my-4" />

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-2">Plan Details</h4>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <p className="text-muted-foreground">Plan Cost:</p>
                  <p className="font-medium">{subscription.cost}</p>
                  <p className="text-muted-foreground">Start Date:</p>
                  <p className="font-medium">{subscription.startDate}</p>
                  <p className="text-muted-foreground">End Date:</p>
                  <p className="font-medium">{subscription.endDate}</p>
                  <p className="text-muted-foreground">Meals Included:</p>
                  <p className="font-medium">{subscription.mealsIncluded.join(", ")}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-semibold mb-2">Off Days</h4>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <p className="text-muted-foreground">Allowed:</p>
                  <p className="font-medium">{subscription.offDaysAllowed} days</p>
                  <p className="text-muted-foreground">Used:</p>
                  <p className="font-medium">{subscription.offDaysUsed} day</p>
                  <p className="text-muted-foreground">Remaining:</p>
                  <p className="font-medium">{subscription.offDaysAllowed - subscription.offDaysUsed} days</p>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-semibold mb-2">Meal Timings</h4>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <p className="text-muted-foreground">Lunch:</p>
                  <p className="font-medium">{subscription.mealTimings.lunch}</p>
                  <p className="text-muted-foreground">Dinner:</p>
                  <p className="font-medium">{subscription.mealTimings.dinner}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-semibold mb-2">Payment Information</h4>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <p className="text-muted-foreground">Payment Method:</p>
                  <p className="font-medium">{subscription.paymentMethod}</p>
                  <p className="text-muted-foreground">Last Payment:</p>
                  <p className="font-medium">{subscription.lastPayment}</p>
                  <p className="text-muted-foreground">Auto-Renewal:</p>
                  <p className="font-medium">{subscription.autoRenewal ? "Enabled" : "Disabled"}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-semibold mb-2">Special Requests</h4>
                <p className="text-sm">{subscription.specialRequests}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <Button variant="outline" className="text-sm h-10">
                <PauseCircle className="mr-2 h-4 w-4" />
                Pause Plan
              </Button>
              <Button variant="outline" className="text-sm h-10">
                <Settings className="mr-2 h-4 w-4" />
                Modify Plan
              </Button>
            </div>

            <div className="mt-3 space-y-3">
              <Button variant="outline" className="w-full text-sm h-10">
                <RefreshCw className="mr-2 h-4 w-4" />
                Renew Subscription
              </Button>
              <Button variant="outline" className="w-full text-sm h-10">
                <FileText className="mr-2 h-4 w-4" />
                View Invoice #{subscription.invoiceId}
              </Button>
              <Button variant="outline" className="w-full text-sm h-10">
                <Download className="mr-2 h-4 w-4" />
                Download Receipt
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
