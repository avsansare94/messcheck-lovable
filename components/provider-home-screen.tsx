
import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Users, Coffee, Moon, Star, DollarSign, BadgeCheck, Phone, Megaphone, TrendingUp } from "lucide-react"

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
    <div className="min-h-screen bg-gradient-to-br from-zomato-gray-50 to-white">
      <div className="container max-w-md mx-auto px-4 py-6 pb-20">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-zomato-red to-zomato-red-dark rounded-xl flex items-center justify-center shadow-zomato">
              <Coffee className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-zomato-gray-900 font-display">Provider Dashboard</h1>
              <p className="text-sm text-zomato-gray-600">Welcome back to your mess management portal</p>
            </div>
          </div>
        </header>

        {loading ? (
          <KPISkeletons />
        ) : (
          <div className="grid grid-cols-2 gap-4 mb-8">
            <KPICard
              title="Active Subscribers"
              value={messData.stats.activeSubscribers}
              icon={<Users className="h-5 w-5" />}
              bgColor="from-blue-500 to-blue-600"
              textColor="text-blue-600"
              bgAccent="bg-blue-50"
            />
            <KPICard
              title="Lunch Check-ins"
              value={messData.stats.lunchCheckins}
              icon={<Coffee className="h-5 w-5" />}
              bgColor="from-zomato-orange to-zomato-orange-light"
              textColor="text-zomato-orange"
              bgAccent="bg-orange-50"
            />
            <KPICard
              title="Dinner Check-ins"
              value={messData.stats.dinnerCheckins}
              icon={<Moon className="h-5 w-5" />}
              bgColor="from-indigo-500 to-purple-600"
              textColor="text-indigo-600"
              bgAccent="bg-indigo-50"
            />
            <KPICard
              title="Off Days Today"
              value={messData.stats.offDays}
              icon={<Coffee className="h-5 w-5" />}
              bgColor="from-red-500 to-red-600"
              textColor="text-red-600"
              bgAccent="bg-red-50"
            />
            <KPICard
              title="Average Rating"
              value={messData.stats.averageRating}
              icon={<Star className="h-5 w-5" />}
              bgColor="from-yellow-400 to-yellow-500"
              textColor="text-yellow-600"
              bgAccent="bg-yellow-50"
            />
            <KPICard
              title="Monthly Sales"
              value={messData.stats.monthlySales}
              icon={<TrendingUp className="h-5 w-5" />}
              bgColor="from-green-500 to-green-600"
              textColor="text-green-600"
              bgAccent="bg-green-50"
              prefix="₹"
            />
          </div>
        )}

        {loading ? (
          <MessOverviewSkeleton />
        ) : (
          <Card className="mb-6 border-zomato-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-display text-zomato-gray-900">Mess Overview</CardTitle>
              <CardDescription className="text-zomato-gray-600">Your mess information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg text-zomato-gray-900 font-display">{messData.messInfo.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 font-medium">
                      {messData.messInfo.cuisine}
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 font-medium">
                      {messData.messInfo.servingType}
                    </Badge>
                    {messData.messInfo.isVerified && (
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 font-medium">
                        <BadgeCheck className="h-3 w-3 mr-1" /> Verified
                      </Badge>
                    )}
                  </div>
                </div>
                <Button variant="outline" size="sm" className="h-9 border-zomato-gray-200 text-zomato-gray-700 hover:bg-zomato-gray-50">
                  <Phone className="h-3 w-3 mr-2" /> Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {loading ? (
          <AdSkeleton />
        ) : (
          <Card className="mb-6 border-zomato-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 bg-gradient-to-br from-zomato-red/5 to-zomato-orange/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-display text-zomato-gray-900">Promote Your Mess</CardTitle>
              <CardDescription className="text-zomato-gray-600">Apply for advertisement on MessCheck</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-zomato-gray-700 leading-relaxed">
                Boost your visibility and attract more customers by promoting your mess on the MessCheck platform.
              </p>

              <div className="flex items-center justify-between">
                <Badge
                  variant="outline"
                  className={`font-medium ${
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
                  className="bg-zomato-red hover:bg-zomato-red-dark text-white shadow-zomato transition-all duration-200"
                  disabled={messData.adStatus === "pending" || messData.adStatus === "approved"}
                >
                  <Megaphone className="h-4 w-4 mr-2" /> Apply for Ads
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

function KPICard({
  title,
  value,
  icon,
  bgColor,
  textColor,
  bgAccent,
  prefix = "",
  suffix = "",
}: {
  title: string
  value: number
  icon: React.ReactNode
  bgColor: string
  textColor: string
  bgAccent: string
  prefix?: string
  suffix?: string
}) {
  return (
    <Card className="border-zomato-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-105 bg-white">
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${bgColor} flex items-center justify-center mb-3 shadow-lg`}>
            <div className="text-white">{icon}</div>
          </div>
          <p className="text-sm text-zomato-gray-600 mb-2 font-medium">{title}</p>
          <p className={`text-xl font-bold ${textColor} font-display`}>
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
    <div className="grid grid-cols-2 gap-4 mb-8">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="border-zomato-gray-100 shadow-card bg-white">
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <Skeleton className="w-12 h-12 rounded-xl mb-3" />
              <Skeleton className="h-4 w-16 mb-2" />
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
    <Card className="mb-6 border-zomato-gray-100 shadow-card bg-white">
      <CardHeader className="pb-3">
        <Skeleton className="h-6 w-32 mb-1" />
        <Skeleton className="h-4 w-48" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <Skeleton className="h-6 w-48 mb-2" />
            <div className="flex items-center gap-2 mt-1">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-24 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-9 w-24 rounded-md" />
        </div>
      </CardContent>
    </Card>
  )
}

function AdSkeleton() {
  return (
    <Card className="mb-6 border-zomato-gray-100 shadow-card bg-white">
      <CardHeader className="pb-3">
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
