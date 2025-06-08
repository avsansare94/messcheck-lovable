"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building2, MapPin, Star, Clock, CheckCircle, TrendingUp, Utensils } from "lucide-react"
import { toast } from "sonner"

interface DashboardProps {
  user: any
  profile: any
}

interface MessProfile {
  id: string
  mess_name: string
  mess_type: string
  cuisine_tags: string[]
  address: string
  city: string
  state: string
  rating: number
  is_verified: boolean
  is_claimed: boolean
}

interface Subscription {
  id: string
  mess_id: string
  plan_id: string
  status: string
  start_date: string
  end_date: string
  mess_profiles: MessProfile
  meal_plans: {
    name: string
    type: string
    price: number
  }
}

interface CheckIn {
  id: string
  date: string
  meal_type: string
  mess_profiles: {
    mess_name: string
  }
}

interface DashboardStats {
  totalMesses: number
  activeSubscriptions: number
  todayCheckIns: number
  totalCheckIns: number
}

export default function DashboardOverview({ user, profile }: DashboardProps) {
  const [stats, setStats] = useState<DashboardStats>({
    totalMesses: 0,
    activeSubscriptions: 0,
    todayCheckIns: 0,
    totalCheckIns: 0,
  })
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [recentCheckIns, setRecentCheckIns] = useState<CheckIn[]>([])
  const [nearbyMesses, setNearbyMesses] = useState<MessProfile[]>([])
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch user's active subscriptions
      const { data: userSubscriptions } = await supabase
        .from("subscriptions")
        .select(`
          *,
          mess_profiles (
            id, mess_name, mess_type, cuisine_tags, address, city, state, rating, is_verified, is_claimed
          ),
          meal_plans (
            name, type, price
          )
        `)
        .eq("user_id", user.id)
        .eq("status", "active")

      // Fetch recent check-ins
      const { data: checkIns } = await supabase
        .from("checkins")
        .select(`
          *,
          mess_profiles (
            mess_name
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5)

      // Fetch nearby messes (sample data for now)
      const { data: messes } = await supabase.from("mess_profiles").select("*").eq("is_verified", true).limit(6)

      // Calculate stats
      const today = new Date().toISOString().split("T")[0]
      const todayCheckIns = checkIns?.filter((c) => c.date === today).length || 0

      const { data: totalMessesData } = await supabase.from("mess_profiles").select("id", { count: "exact" })

      setStats({
        totalMesses: totalMessesData?.length || 0,
        activeSubscriptions: userSubscriptions?.length || 0,
        todayCheckIns,
        totalCheckIns: checkIns?.length || 0,
      })

      setSubscriptions(userSubscriptions || [])
      setRecentCheckIns(checkIns || [])
      setNearbyMesses(messes || [])
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      toast.error("Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  const handleQuickCheckIn = async (subscriptionId: string, messId: string, mealType: "lunch" | "dinner") => {
    try {
      const today = new Date().toISOString().split("T")[0]

      // Check if already checked in for this meal today
      const { data: existingCheckIn } = await supabase
        .from("checkins")
        .select("id")
        .eq("user_id", user.id)
        .eq("mess_id", messId)
        .eq("date", today)
        .eq("meal_type", mealType)
        .single()

      if (existingCheckIn) {
        toast.error(`Already checked in for ${mealType} today`)
        return
      }

      // Create check-in
      const { error } = await supabase.from("checkins").insert({
        user_id: user.id,
        mess_id: messId,
        subscription_id: subscriptionId,
        date: today,
        meal_type: mealType,
        checkin_mode: "manual",
      })

      if (error) throw error

      toast.success(`Checked in for ${mealType} successfully!`)
      fetchDashboardData() // Refresh data
    } catch (error) {
      console.error("Error checking in:", error)
      toast.error("Failed to check in")
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {profile.full_name || "User"}!</h1>
          <p className="text-gray-600">Here's what's happening with your mess subscriptions</p>
        </div>
        <Avatar className="h-12 w-12">
          <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} />
          <AvatarFallback>{profile.full_name?.charAt(0) || user.email.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <Building2 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeSubscriptions}</div>
            <p className="text-xs text-gray-600">Mess subscriptions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Check-ins</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayCheckIns}</div>
            <p className="text-xs text-gray-600">Meals today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Check-ins</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCheckIns}</div>
            <p className="text-xs text-gray-600">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Messes</CardTitle>
            <Utensils className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMesses}</div>
            <p className="text-xs text-gray-600">In your area</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Subscriptions */}
        <Card>
          <CardHeader>
            <CardTitle>Your Active Subscriptions</CardTitle>
            <CardDescription>Manage your current mess subscriptions</CardDescription>
          </CardHeader>
          <CardContent>
            {subscriptions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No active subscriptions</p>
                <Button className="mt-4" size="sm">
                  Browse Messes
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {subscriptions.map((subscription) => (
                  <div key={subscription.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold">{subscription.mess_profiles.mess_name}</h3>
                        <p className="text-sm text-gray-600">{subscription.meal_plans.name}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {subscription.mess_profiles.city}, {subscription.mess_profiles.state}
                          </span>
                          <Star className="h-3 w-3 text-yellow-400 ml-2" />
                          <span className="text-xs">{subscription.mess_profiles.rating}</span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleQuickCheckIn(subscription.id, subscription.mess_id, "lunch")}
                          >
                            Check-in Lunch
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleQuickCheckIn(subscription.id, subscription.mess_id, "dinner")}
                          >
                            Check-in Dinner
                          </Button>
                        </div>
                      </div>
                      <Badge variant={subscription.mess_profiles.is_verified ? "default" : "secondary"}>
                        {subscription.mess_profiles.is_verified ? "Verified" : "Unverified"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Check-ins */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Check-ins</CardTitle>
            <CardDescription>Your latest meal check-ins</CardDescription>
          </CardHeader>
          <CardContent>
            {recentCheckIns.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No check-ins yet</p>
                <p className="text-sm">Start checking in to track your meals</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentCheckIns.map((checkIn) => (
                  <div key={checkIn.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium">{checkIn.mess_profiles.mess_name}</p>
                      <p className="text-sm text-gray-600 capitalize">{checkIn.meal_type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{new Date(checkIn.date).toLocaleDateString()}</p>
                      <Badge variant="outline" className="text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Checked In
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Nearby Messes */}
      <Card>
        <CardHeader>
          <CardTitle>Discover Nearby Messes</CardTitle>
          <CardDescription>Explore verified messes in your area</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nearbyMesses.map((mess) => (
              <div key={mess.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold">{mess.mess_name}</h3>
                  <Badge variant={mess.is_verified ? "default" : "secondary"}>
                    {mess.is_verified ? "Verified" : "Unverified"}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {mess.city}, {mess.state}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-3 w-3 text-yellow-400" />
                    <span className="text-sm">{mess.rating}/5</span>
                    <Badge variant="outline" className="text-xs ml-auto">
                      {mess.mess_type}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {mess.cuisine_tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {mess.cuisine_tags.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{mess.cuisine_tags.length - 2}
                      </Badge>
                    )}
                  </div>
                  <Button size="sm" className="w-full mt-3">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
