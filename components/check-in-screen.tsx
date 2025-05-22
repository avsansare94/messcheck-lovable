"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Clock, Calendar, CheckCircle2 } from "lucide-react"
import { QRCodeGenerator } from "./qr-code-generator"
import { OfflineCheckIn } from "./offline-check-in"
import { OfflineIndicator } from "./offline-indicator"
import { useOnlineStatus } from "@/hooks/use-online-status"

// Mock user data - in a real app, this would come from authentication
const userData = {
  id: "user123",
  name: "Avinash Sansare",
  email: "avinash.s@example.com",
}

// Mock subscription data - in a real app, this would come from an API
const subscriptionData = {
  id: "sub456",
  messId: "mess789",
  messName: "GreenLeaf Mess",
  status: "active",
  startDate: "May 15, 2025",
  endDate: "May 21, 2025",
  daysRemaining: 5,
  totalDays: 7,
  offDaysUsed: 0,
  offDaysTotal: 1,
  checkInHistory: [
    { date: "May 20, 2025", meal: "lunch", status: "checked-in" },
    { date: "May 19, 2025", meal: "lunch", status: "checked-in" },
    { date: "May 19, 2025", meal: "dinner", status: "checked-in" },
    { date: "May 18, 2025", meal: "dinner", status: "checked-in" },
    { date: "May 17, 2025", meal: "off-day", status: "off-day" },
  ],
}

export function CheckInScreen() {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"lunch" | "dinner">("lunch")
  const [todayStatus, setTodayStatus] = useState({
    lunch: false,
    dinner: false,
  })
  const isOnline = useOnlineStatus()

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false)

      // Check if user has already checked in today
      const today = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })

      const lunchCheckedIn = subscriptionData.checkInHistory.some(
        (history) => history.date === today && history.meal === "lunch",
      )

      const dinnerCheckedIn = subscriptionData.checkInHistory.some(
        (history) => history.date === today && history.meal === "dinner",
      )

      setTodayStatus({
        lunch: lunchCheckedIn,
        dinner: dinnerCheckedIn,
      })
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Get current time to determine which meal is active
  useEffect(() => {
    const currentHour = new Date().getHours()
    if (currentHour >= 16) {
      // After 4 PM, default to dinner
      setActiveTab("dinner")
    } else {
      setActiveTab("lunch")
    }
  }, [])

  return (
    <div className="container max-w-md mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Link href="/my-mess">
          <Button variant="ghost" className="p-0 mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-red-600">Meal Check-in</h1>
          <p className="text-sm text-gray-500">Scan QR code to check in for your meal</p>
        </div>
      </div>

      {/* Offline indicator */}
      <OfflineIndicator message="You're offline. You can still check in, but it will be processed when you're back online." />

      {loading ? (
        <CheckInSkeleton />
      ) : (
        <>
          <Card className="mb-6 border-red-100 shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="font-semibold text-lg">{subscriptionData.messName}</h2>
                  <p className="text-sm text-gray-500">
                    {subscriptionData.daysRemaining} of {subscriptionData.totalDays} days remaining
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Today's Date</p>
                  <p className="font-medium">
                    {new Date().toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center text-sm mb-4">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span>Open Days: Monday - Saturday</span>
              </div>
              <div className="flex items-center text-sm mb-4">
                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                <span>Timings: Lunch: 12:30-2:30 PM, Dinner: 7:30-9:30 PM</span>
              </div>
            </CardContent>
          </Card>

          <Tabs
            defaultValue={activeTab}
            className="mb-6"
            onValueChange={(value) => setActiveTab(value as "lunch" | "dinner")}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="lunch"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
                disabled={todayStatus.lunch}
              >
                {todayStatus.lunch && <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />}
                Lunch
              </TabsTrigger>
              <TabsTrigger
                value="dinner"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
                disabled={todayStatus.dinner}
              >
                {todayStatus.dinner && <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />}
                Dinner
              </TabsTrigger>
            </TabsList>

            <TabsContent value="lunch" className="mt-4">
              {todayStatus.lunch ? (
                <AlreadyCheckedInCard mealType="lunch" />
              ) : (
                <>
                  {/* Show offline check-in option when offline */}
                  {!isOnline && (
                    <OfflineCheckIn
                      userId={userData.id}
                      messId={subscriptionData.messId}
                      subscriptionId={subscriptionData.id}
                      mealType="lunch"
                      messName={subscriptionData.messName}
                      userName={userData.name}
                    />
                  )}

                  {/* Always show QR code, even when offline */}
                  <QRCodeGenerator
                    userId={userData.id}
                    messId={subscriptionData.messId}
                    subscriptionId={subscriptionData.id}
                    mealType="lunch"
                    messName={subscriptionData.messName}
                    userName={userData.name}
                  />
                </>
              )}
            </TabsContent>

            <TabsContent value="dinner" className="mt-4">
              {todayStatus.dinner ? (
                <AlreadyCheckedInCard mealType="dinner" />
              ) : (
                <>
                  {/* Show offline check-in option when offline */}
                  {!isOnline && (
                    <OfflineCheckIn
                      userId={userData.id}
                      messId={subscriptionData.messId}
                      subscriptionId={subscriptionData.id}
                      mealType="dinner"
                      messName={subscriptionData.messName}
                      userName={userData.name}
                    />
                  )}

                  {/* Always show QR code, even when offline */}
                  <QRCodeGenerator
                    userId={userData.id}
                    messId={subscriptionData.messId}
                    subscriptionId={subscriptionData.id}
                    mealType="dinner"
                    messName={subscriptionData.messName}
                    userName={userData.name}
                  />
                </>
              )}
            </TabsContent>
          </Tabs>

          <div className="space-y-4">
            <h2 className="font-semibold text-lg">How to Check In</h2>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="bg-red-100 text-red-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                  1
                </div>
                <p className="text-sm">Show the QR code to the mess staff at the counter</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-red-100 text-red-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                  2
                </div>
                <p className="text-sm">They will scan your code using the MessCheck Partner app</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-red-100 text-red-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                  3
                </div>
                <p className="text-sm">Once verified, you'll receive a confirmation notification</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="bg-red-100 text-red-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                  4
                </div>
                <p className="text-sm">Your attendance will be marked for the selected meal</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function AlreadyCheckedInCard({ mealType }: { mealType: "lunch" | "dinner" }) {
  return (
    <Card className="border-green-100 bg-green-50">
      <CardContent className="p-4 flex flex-col items-center text-center">
        <CheckCircle2 className="h-12 w-12 text-green-500 mb-2" />
        <h3 className="font-semibold text-lg text-green-800">Already Checked In</h3>
        <p className="text-sm text-green-700 mb-2">
          You've already checked in for {mealType === "lunch" ? "lunch" : "dinner"} today
        </p>
        <p className="text-xs text-green-600">Checked in at {mealType === "lunch" ? "12:45 PM" : "7:30 PM"}</p>
      </CardContent>
    </Card>
  )
}

function CheckInSkeleton() {
  return (
    <>
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <Skeleton className="h-5 w-32 mb-1" />
              <Skeleton className="h-4 w-40" />
            </div>
            <div className="text-right">
              <Skeleton className="h-3 w-20 mb-1" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-4 w-full mb-4" />
        </CardContent>
      </Card>

      <Skeleton className="h-10 w-full mb-4 rounded-md" />

      <Card>
        <CardContent className="p-4 flex flex-col items-center">
          <Skeleton className="h-6 w-40 mb-2" />
          <Skeleton className="h-4 w-32 mb-4" />

          <Skeleton className="h-48 w-48 mb-4" />

          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-40 mb-2" />
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>
    </>
  )
}
