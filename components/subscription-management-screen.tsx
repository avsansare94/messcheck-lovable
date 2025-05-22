"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Clock, RefreshCw, Coffee, CreditCard, Bell, Check, X, ExternalLink } from "lucide-react"

export function SubscriptionManagementScreen() {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("active")
  const [subscriptionData, setSubscriptionData] = useState({
    stats: {
      totalSubscribers: 42,
      expiredSubscriptions: 5,
      renewalsToday: 3,
      trialUsers: 8,
      activeSales: 86400,
    },
    activeSubscribers: [
      {
        id: 1,
        name: "Avinash Sansare",
        plan: "Trial Plan (7 days)",
        joinDate: "May 15, 2025",
        daysRemaining: 5,
        status: "active",
      },
      {
        id: 2,
        name: "Rahul Kumar",
        plan: "Full Month Plan",
        joinDate: "May 3, 2025",
        daysRemaining: 18,
        status: "active",
      },
      {
        id: 3,
        name: "Sneha Patel",
        plan: "Lunch Only Plan",
        joinDate: "May 9, 2025",
        daysRemaining: 12,
        status: "active",
      },
      {
        id: 4,
        name: "Priya Sharma",
        plan: "Full Month Plan",
        joinDate: "Apr 29, 2025",
        daysRemaining: 2,
        status: "due",
      },
      {
        id: 5,
        name: "Amit Verma",
        plan: "Dinner Only Plan",
        joinDate: "Apr 22, 2025",
        daysRemaining: 0,
        status: "expired",
      },
    ],
    pendingRequests: [
      {
        id: 1,
        name: "Vikram Singh",
        plan: "Monthly Plan",
        requestDate: "May 21, 2025",
        paymentScreenshot: "/payment-screenshot.png",
      },
      {
        id: 2,
        name: "Neha Gupta",
        plan: "Lunch Only Plan",
        requestDate: "May 21, 2025",
        paymentScreenshot: "/payment-screenshot.png",
      },
    ],
  })

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="container max-w-md mx-auto px-4 py-6 pb-20">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-red-600">Subscription Management</h1>
        <p className="text-sm text-gray-500">Manage your subscribers and plans</p>
      </header>

      {loading ? (
        <KPISkeletons />
      ) : (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <KPICard
            title="Total Subscribers"
            value={subscriptionData.stats.totalSubscribers}
            icon={<Users className="h-5 w-5 text-blue-600" />}
            bgColor="bg-blue-50"
          />
          <KPICard
            title="Expired Subscriptions"
            value={subscriptionData.stats.expiredSubscriptions}
            icon={<Clock className="h-5 w-5 text-red-600" />}
            bgColor="bg-red-50"
          />
          <KPICard
            title="Renewals Today"
            value={subscriptionData.stats.renewalsToday}
            icon={<RefreshCw className="h-5 w-5 text-green-600" />}
            bgColor="bg-green-50"
          />
          <KPICard
            title="Trial Users"
            value={subscriptionData.stats.trialUsers}
            icon={<Coffee className="h-5 w-5 text-amber-600" />}
            bgColor="bg-amber-50"
          />
          <KPICard
            title="Active Sales"
            value={subscriptionData.stats.activeSales}
            icon={<CreditCard className="h-5 w-5 text-indigo-600" />}
            bgColor="bg-indigo-50"
            prefix="₹"
            colSpan={2}
          />
        </div>
      )}

      <Tabs defaultValue="active" className="mb-4" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 h-auto p-1 bg-gray-100">
          <TabsTrigger
            value="active"
            className="text-xs py-1.5 data-[state=active]:bg-red-600 data-[state=active]:text-white"
          >
            Active Subscribers
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="text-xs py-1.5 data-[state=active]:bg-red-600 data-[state=active]:text-white"
          >
            Pending Requests
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4 pt-4">
          {loading ? (
            <SubscribersSkeleton />
          ) : (
            <Card className="border-red-100 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Subscriber List</CardTitle>
                <CardDescription>Manage your active subscribers</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {subscriptionData.activeSubscribers.map((subscriber) => (
                    <div key={subscriber.id} className="flex justify-between items-center p-3">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarFallback className="bg-red-100 text-red-600">
                            {subscriber.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{subscriber.name}</p>
                          <p className="text-xs text-gray-500">{subscriber.plan}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                subscriber.status === "active"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : subscriber.status === "due"
                                    ? "bg-amber-50 text-amber-700 border-amber-200"
                                    : "bg-red-50 text-red-700 border-red-200"
                              }`}
                            >
                              {subscriber.status === "active"
                                ? "Active"
                                : subscriber.status === "due"
                                  ? "Due for Renewal"
                                  : "Expired"}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {subscriber.daysRemaining > 0 ? `${subscriber.daysRemaining} days left` : "Expired"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs text-blue-600"
                          disabled={subscriber.status === "active"}
                        >
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Mark Renewed
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs text-amber-600"
                          disabled={subscriber.status !== "due"}
                        >
                          <Bell className="h-3 w-3 mr-1" />
                          Send Reminder
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4 pt-4">
          {loading ? (
            <PendingRequestsSkeleton />
          ) : (
            <Card className="border-red-100 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Pending Subscription Requests</CardTitle>
                <CardDescription>Review and approve new subscription requests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {subscriptionData.pendingRequests.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-gray-500">No pending requests</p>
                  </div>
                ) : (
                  subscriptionData.pendingRequests.map((request) => (
                    <div key={request.id} className="p-3 rounded-md bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarFallback className="bg-red-100 text-red-600">
                              {request.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{request.name}</p>
                            <p className="text-xs text-gray-500">Requested: {request.plan}</p>
                            <p className="text-xs text-gray-500">Date: {request.requestDate}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 relative">
                        <div className="aspect-[4/3] rounded-md overflow-hidden bg-gray-100">
                          <img
                            src={request.paymentScreenshot || "/placeholder.svg"}
                            alt="Payment screenshot"
                            className="w-full h-full object-cover"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            className="absolute top-2 right-2 h-7 bg-white/90 hover:bg-white"
                          >
                            <ExternalLink className="h-3 w-3 mr-1" /> View Full
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Payment Screenshot</p>
                      </div>

                      <div className="flex justify-end gap-2 mt-3">
                        <Button variant="outline" size="sm" className="border-red-100 text-red-600">
                          <X className="h-4 w-4 mr-1" /> Reject
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <Check className="h-4 w-4 mr-1" /> Approve
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function KPICard({
  title,
  value,
  icon,
  bgColor,
  prefix = "",
  suffix = "",
  colSpan = 1,
}: {
  title: string
  value: number
  icon: React.ReactNode
  bgColor: string
  prefix?: string
  suffix?: string
  colSpan?: number
}) {
  return (
    <Card className={`border-gray-100 shadow-sm ${colSpan === 2 ? "col-span-2" : ""}`}>
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center">
          <div className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center mb-2`}>{icon}</div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-xl font-bold">
            {prefix}
            {value}
            {suffix}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function KPISkeletons() {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <Skeleton className="w-10 h-10 rounded-full mb-2" />
              <Skeleton className="h-4 w-16 mb-1" />
              <Skeleton className="h-6 w-12" />
            </div>
          </CardContent>
        </Card>
      ))}
      <Card className="border-gray-100 shadow-sm col-span-2">
        <CardContent className="p-4">
          <div className="flex flex-col items-center text-center">
            <Skeleton className="w-10 h-10 rounded-full mb-2" />
            <Skeleton className="h-4 w-16 mb-1" />
            <Skeleton className="h-6 w-24" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function SubscribersSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-40 mb-1" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex justify-between items-center p-3">
              <div className="flex items-center">
                <Skeleton className="h-10 w-10 rounded-full mr-3" />
                <div>
                  <Skeleton className="h-4 w-32 mb-1" />
                  <Skeleton className="h-3 w-24 mb-1" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>
              <div className="flex flex-col items-end">
                <Skeleton className="h-7 w-24 mb-1" />
                <Skeleton className="h-7 w-24" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function PendingRequestsSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-64 mb-1" />
        <Skeleton className="h-4 w-80" />
      </CardHeader>
      <CardContent className="space-y-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="p-3 rounded-md bg-gray-50">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <Skeleton className="h-10 w-10 rounded-full mr-3" />
                <div>
                  <Skeleton className="h-4 w-32 mb-1" />
                  <Skeleton className="h-3 w-40 mb-1" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            </div>

            <div className="mt-3">
              <Skeleton className="aspect-[4/3] rounded-md w-full" />
              <Skeleton className="h-3 w-32 mt-1" />
            </div>

            <div className="flex justify-end gap-2 mt-3">
              <Skeleton className="h-9 w-24 rounded-md" />
              <Skeleton className="h-9 w-24 rounded-md" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
