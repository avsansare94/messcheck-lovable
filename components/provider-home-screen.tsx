"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Users, Coffee, Moon, Star, DollarSign, BadgeCheck, Phone, Megaphone } from "lucide-react"

export function ProviderHomeScreen() {
  const [loading, setLoading] = useState(true)
  const [messData, setMessData] = useState({
    stats: {
      activeSubscribers: 42,
      lunchCheckins: 18,
      dinnerCheckins: 12,
      offDays: 3,
      averageRating: 4.3,
      monthlySales: 86400,
    },
    messInfo: {
      name: "Sharma's Tiffin Service",
      cuisine: "Veg",
      servingType: "Both",
      isVerified: true,
      contactNumber: "+91 98765 43210",
    },
    adStatus: "pending", // pending, approved, rejected
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
        <h1 className="text-2xl font-bold text-red-600">Provider Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome back to your mess management portal</p>
      </header>

      {loading ? (
        <KPISkeletons />
      ) : (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <KPICard
            title="Active Subscribers"
            value={messData.stats.activeSubscribers}
            icon={<Users className="h-5 w-5 text-blue-600" />}
            bgColor="bg-blue-50"
          />
          <KPICard
            title="Lunch Check-ins"
            value={messData.stats.lunchCheckins}
            icon={<Coffee className="h-5 w-5 text-amber-600" />}
            bgColor="bg-amber-50"
          />
          <KPICard
            title="Dinner Check-ins"
            value={messData.stats.dinnerCheckins}
            icon={<Moon className="h-5 w-5 text-indigo-600" />}
            bgColor="bg-indigo-50"
          />
          <KPICard
            title="Off Days Today"
            value={messData.stats.offDays}
            icon={<Coffee className="h-5 w-5 text-red-600" />}
            bgColor="bg-red-50"
          />
          <KPICard
            title="Average Rating"
            value={messData.stats.averageRating}
            icon={<Star className="h-5 w-5 text-yellow-600" />}
            bgColor="bg-yellow-50"
          />
          <KPICard
            title="Monthly Sales"
            value={messData.stats.monthlySales}
            icon={<DollarSign className="h-5 w-5 text-green-600" />}
            bgColor="bg-green-50"
            prefix="₹"
          />
        </div>
      )}

      {loading ? (
        <MessOverviewSkeleton />
      ) : (
        <Card className="mb-6 border-red-100 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Mess Overview</CardTitle>
            <CardDescription>Your mess information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg">{messData.messInfo.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {messData.messInfo.cuisine}
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {messData.messInfo.servingType}
                  </Badge>
                  {messData.messInfo.isVerified && (
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      <BadgeCheck className="h-3 w-3 mr-1" /> Verified
                    </Badge>
                  )}
                </div>
              </div>
              <Button variant="outline" size="sm" className="h-8 border-red-100">
                <Phone className="h-3 w-3 mr-1" /> {messData.messInfo.contactNumber}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <AdSkeleton />
      ) : (
        <Card className="mb-6 border-red-100 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Promote Your Mess</CardTitle>
            <CardDescription>Apply for advertisement on MessCheck</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              Boost your visibility and attract more customers by promoting your mess on the MessCheck platform.
            </p>

            <div className="flex items-center justify-between">
              <Badge
                variant="outline"
                className={`${
                  messData.adStatus === "pending"
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : messData.adStatus === "approved"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-red-50 text-red-700 border-red-200"
                }`}
              >
                {messData.adStatus === "pending"
                  ? "Ad Request Pending"
                  : messData.adStatus === "approved"
                    ? "Ad Approved"
                    : "Ad Rejected"}
              </Badge>

              <Button
                className="bg-red-600 hover:bg-red-700"
                disabled={messData.adStatus === "pending" || messData.adStatus === "approved"}
              >
                <Megaphone className="h-4 w-4 mr-1" /> Apply for Ads
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
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
}: {
  title: string
  value: number
  icon: React.ReactNode
  bgColor: string
  prefix?: string
  suffix?: string
}) {
  return (
    <Card className="border-gray-100 shadow-sm">
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
      {[...Array(6)].map((_, i) => (
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
    </div>
  )
}

function MessOverviewSkeleton() {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-32 mb-1" />
        <Skeleton className="h-4 w-48" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <Skeleton className="h-6 w-48 mb-1" />
            <div className="flex items-center gap-2 mt-1">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-24 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-8 w-32 rounded-md" />
        </div>
      </CardContent>
    </Card>
  )
}

function AdSkeleton() {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-40 mb-1" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />

        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="h-9 w-32 rounded-md" />
        </div>
      </CardContent>
    </Card>
  )
}
