
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  MapPin, 
  Star, 
  Clock, 
  Users, 
  Coffee, 
  Moon, 
  Search,
  TrendingUp,
  Heart,
  CheckCircle
} from "lucide-react"

export function UserDashboard() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState({
    activeSubscriptions: 2,
    todayMeals: { lunch: true, dinner: false },
    favoriteMessCount: 5,
    totalCheckins: 247,
    nearbyMess: [
      {
        id: 1,
        name: "Sharma's Tiffin Service",
        cuisine: "North Indian",
        rating: 4.3,
        distance: "0.2 km",
        price: "₹120/meal",
        isVeg: true,
        image: "/placeholder.jpg"
      },
      {
        id: 2,
        name: "South Indian Express",
        cuisine: "South Indian",
        rating: 4.1,
        distance: "0.5 km",
        price: "₹100/meal",
        isVeg: true,
        image: "/placeholder.jpg"
      }
    ]
  })

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zomato-gray-50 to-white">
      <div className="container max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-zomato-gray-900 font-display">Good Morning!</h1>
              <p className="text-zomato-gray-600">Ready for your delicious meals today?</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-zomato-red to-zomato-red-dark rounded-xl flex items-center justify-center shadow-zomato">
              <Coffee className="h-6 w-6 text-white" />
            </div>
          </div>
        </header>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <StatsCard
            title="Active Plans"
            value={userData.activeSubscriptions}
            icon={<CheckCircle className="h-5 w-5" />}
            bgColor="from-green-500 to-green-600"
            textColor="text-green-600"
          />
          <StatsCard
            title="Total Check-ins"
            value={userData.totalCheckins}
            icon={<TrendingUp className="h-5 w-5" />}
            bgColor="from-blue-500 to-blue-600"
            textColor="text-blue-600"
          />
          <StatsCard
            title="Favorites"
            value={userData.favoriteMessCount}
            icon={<Heart className="h-5 w-5" />}
            bgColor="from-pink-500 to-pink-600"
            textColor="text-pink-600"
          />
          <StatsCard
            title="Today's Meals"
            value={`${userData.todayMeals.lunch ? 1 : 0}/${userData.todayMeals.dinner ? 2 : 1}`}
            icon={<Coffee className="h-5 w-5" />}
            bgColor="from-zomato-orange to-zomato-orange-light"
            textColor="text-zomato-orange"
          />
        </div>

        {/* Today's Meals */}
        <Card className="mb-6 border-zomato-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-display text-zomato-gray-900">Today's Meals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <MealCard
                type="Lunch"
                time="12:00 PM - 2:00 PM"
                status={userData.todayMeals.lunch ? "completed" : "pending"}
                icon={<Coffee className="h-5 w-5" />}
              />
              <MealCard
                type="Dinner"
                time="7:00 PM - 9:00 PM"
                status={userData.todayMeals.dinner ? "completed" : "pending"}
                icon={<Moon className="h-5 w-5" />}
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="mb-6 border-zomato-gray-100 shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-display text-zomato-gray-900">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center gap-2 border-zomato-gray-200 hover:bg-zomato-red/5 hover:border-zomato-red/30"
              onClick={() => navigate("/explore")}
            >
              <Search className="h-6 w-6 text-zomato-red" />
              <span className="text-sm font-medium">Find Mess</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-center gap-2 border-zomato-gray-200 hover:bg-zomato-red/5 hover:border-zomato-red/30"
              onClick={() => navigate("/scanner")}
            >
              <MapPin className="h-6 w-6 text-zomato-red" />
              <span className="text-sm font-medium">Check In</span>
            </Button>
          </CardContent>
        </Card>

        {/* Nearby Mess */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-zomato-gray-900 font-display">Nearby Mess</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-zomato-red hover:text-zomato-red-dark"
              onClick={() => navigate("/explore")}
            >
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {userData.nearbyMess.map((mess, index) => (
              <MessCard key={mess.id} mess={mess} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatsCard({ title, value, icon, bgColor, textColor }: {
  title: string
  value: number | string
  icon: React.ReactNode
  bgColor: string
  textColor: string
}) {
  return (
    <Card className="border-zomato-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-105">
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${bgColor} flex items-center justify-center mb-3 shadow-lg`}>
            <div className="text-white">{icon}</div>
          </div>
          <p className="text-sm text-zomato-gray-600 mb-1 font-medium">{title}</p>
          <p className={`text-xl font-bold ${textColor} font-display`}>{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function MealCard({ type, time, status, icon }: {
  type: string
  time: string
  status: "completed" | "pending"
  icon: React.ReactNode
}) {
  return (
    <div className={`p-4 rounded-xl border-2 transition-all duration-200 ${
      status === "completed" 
        ? "border-green-200 bg-green-50" 
        : "border-zomato-gray-200 bg-zomato-gray-50"
    }`}>
      <div className="flex items-center gap-3 mb-2">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
          status === "completed" ? "bg-green-100 text-green-600" : "bg-zomato-gray-200 text-zomato-gray-600"
        }`}>
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-zomato-gray-900">{type}</h3>
          <p className="text-xs text-zomato-gray-600">{time}</p>
        </div>
      </div>
      <Badge 
        variant="outline" 
        className={`text-xs ${
          status === "completed" 
            ? "bg-green-100 text-green-700 border-green-200" 
            : "bg-amber-100 text-amber-700 border-amber-200"
        }`}
      >
        {status === "completed" ? "Completed" : "Pending"}
      </Badge>
    </div>
  )
}

function MessCard({ mess, index }: { mess: any; index: number }) {
  return (
    <Card 
      className="border-zomato-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-zomato-gray-100 flex items-center justify-center">
            <Coffee className="h-8 w-8 text-zomato-gray-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-zomato-gray-900 font-display">{mess.name}</h3>
              {mess.isVeg && (
                <div className="w-4 h-4 border-2 border-green-500 rounded flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-zomato-gray-600">
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                {mess.rating}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {mess.distance}
              </span>
              <span className="font-semibold text-zomato-red">{mess.price}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function DashboardSkeleton() {
  return (
    <div className="container max-w-md mx-auto px-4 py-6">
      <div className="mb-8">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="border-zomato-gray-100">
            <CardContent className="p-4 flex flex-col items-center">
              <Skeleton className="w-12 h-12 rounded-xl mb-3" />
              <Skeleton className="h-4 w-16 mb-1" />
              <Skeleton className="h-6 w-12" />
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-24 rounded-xl" />
            <Skeleton className="h-24 rounded-xl" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
