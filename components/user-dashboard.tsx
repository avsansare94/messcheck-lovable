"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Check, X, Droplet, Star, MapPin, Bell, ChevronDown } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PromotionalCard } from "./promotional-card"
import { BottomNavigation } from "./bottom-navigation"

export function UserDashboard() {
  const [loading, setLoading] = useState(true)
  const [waterIntake, setWaterIntake] = useState(0)
  const [checkInStatus, setCheckInStatus] = useState({
    lunch: false,
    dinner: false,
  })

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleWaterIntake = () => {
    if (waterIntake < 8) {
      setWaterIntake((prev) => prev + 1)
    }
  }

  const handleCheckIn = (meal: "lunch" | "dinner") => {
    setCheckInStatus((prev) => ({
      ...prev,
      [meal]: true,
    }))
  }

  const handleMarkOffDay = () => {
    // Logic to mark off day
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-md mx-auto px-4 py-2">
        <header className="flex justify-between items-center py-3 sticky top-0 bg-gray-50 z-10">
          <div>
            <h1 className="text-2xl font-bold text-red-600">MessCheck</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center text-gray-700">
              <span className="text-sm font-medium">IIT Bombay</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>
            </Button>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium">AS</span>
            </div>
          </div>
        </header>

        {loading ? (
          <SubscriptionSkeleton />
        ) : (
          <Card className="mb-4 border-red-100 shadow-sm">
            <CardHeader className="pb-2 pt-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">My Mess Info</CardTitle>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <h3 className="text-lg font-semibold mb-1">Sharma's Tiffin Service</h3>
              <div className="flex gap-2 mb-3">
                <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
                  Lunch
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                  Dinner
                </Badge>
              </div>

              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-500">Days Attended</span>
                <span className="text-sm font-medium">12/30</span>
              </div>
              <Progress value={40} className="h-2 mb-1 bg-gray-100" indicatorClassName="bg-red-600" />
              <p className="text-xs text-gray-500 mb-4">18 days remaining</p>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <Button
                  variant={checkInStatus.lunch ? "secondary" : "default"}
                  className={
                    checkInStatus.lunch
                      ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
                      : "bg-red-600 hover:bg-red-700 text-white"
                  }
                  onClick={() => handleCheckIn("lunch")}
                  disabled={checkInStatus.lunch}
                >
                  {checkInStatus.lunch ? <Check className="mr-1 h-4 w-4" /> : null}
                  Lunch Check-in
                </Button>
                <Button
                  variant={checkInStatus.dinner ? "secondary" : "default"}
                  className={
                    checkInStatus.dinner
                      ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
                      : "bg-red-600 hover:bg-red-700 text-white"
                  }
                  onClick={() => handleCheckIn("dinner")}
                  disabled={checkInStatus.dinner}
                >
                  {checkInStatus.dinner ? <Check className="mr-1 h-4 w-4" /> : null}
                  Dinner Check-in
                </Button>
              </div>

              <Button
                variant="outline"
                className="w-full border-dashed border-red-200 text-red-600 hover:bg-red-50"
                onClick={handleMarkOffDay}
              >
                <X className="mr-1 h-4 w-4" /> Mark Off Day
              </Button>
            </CardContent>
          </Card>
        )}

        {loading ? (
          <MenuSkeleton />
        ) : (
          <Card className="mb-4 border-red-100 shadow-sm">
            <CardHeader className="pb-2 pt-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Today's Menu</CardTitle>
                <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
                  Wednesday
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <Tabs defaultValue="lunch" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="lunch" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                    Lunch
                  </TabsTrigger>
                  <TabsTrigger value="dinner" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                    Dinner
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="lunch" className="space-y-2">
                  <div>
                    <p className="font-medium">Kadhi Pakora</p>
                    <p className="text-sm text-gray-500">Yogurt curry with fritters</p>
                  </div>
                  <div>
                    <p className="font-medium">Jeera Rice</p>
                    <p className="text-sm text-gray-500">Cumin flavored rice</p>
                  </div>
                  <div>
                    <p className="font-medium">Roti</p>
                    <p className="text-sm text-gray-500">Whole wheat flatbread</p>
                  </div>
                  <div>
                    <p className="font-medium">Salad & Pickle</p>
                    <p className="text-sm text-gray-500">Fresh vegetables & mixed pickle</p>
                  </div>
                </TabsContent>

                <TabsContent value="dinner" className="space-y-2">
                  <div>
                    <p className="font-medium">Dal Tadka</p>
                    <p className="text-sm text-gray-500">Tempered lentils</p>
                  </div>
                  <div>
                    <p className="font-medium">Pulao</p>
                    <p className="text-sm text-gray-500">Vegetable rice</p>
                  </div>
                  <div>
                    <p className="font-medium">Roti</p>
                    <p className="text-sm text-gray-500">Whole wheat flatbread</p>
                  </div>
                  <div>
                    <p className="font-medium">Salad & Pickle</p>
                    <p className="text-sm text-gray-500">Fresh vegetables & mixed pickle</p>
                  </div>
                  <div>
                    <p className="font-medium">Kheer</p>
                    <p className="text-sm text-gray-500">Rice pudding</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}

        {!loading && (
          <Card className="mb-4 border-red-100 shadow-sm">
            <PromotionalCard
              title="Can't Find Your Mess?"
              subtitle="Add it to MessCheck in just 1 minute"
              description={
                'Help your mess provider get listed. Other students may be looking for the same place.\nNew messes appear as "Unclaimed" and can be claimed anytime by the official provider.\n\n🚀 Easy to submit\n🔍 Boost discoverability\n🔁 Keep the community updated'
              }
              ctaText="Add Your Mess"
              ctaTarget="/add-mess"
              icon="📍"
              colorScheme="soft"
              buttonStyle="primary"
              shadow="none"
            />
          </Card>
        )}

        {loading ? (
          <HealthSkeleton />
        ) : (
          <Card className="mb-4 border-red-100 shadow-sm">
            <CardHeader className="pb-2 pt-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">BMI Tracker</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <p className="text-sm text-gray-500 mb-3">Track and monitor your health</p>

              <div className="grid grid-cols-3 gap-4 mb-3">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Height</p>
                  <p className="font-medium">170 cm</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">Weight</p>
                  <p className="font-medium">65 kg</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">BMI</p>
                  <p className="font-medium text-green-600">22.5</p>
                </div>
              </div>

              <div className="w-full h-2 bg-gray-100 rounded-full mb-3 flex overflow-hidden">
                <div className="h-full bg-red-200 w-[15%]"></div>
                <div className="h-full bg-amber-300 w-[10%]"></div>
                <div className="h-full bg-green-400 w-[20%]"></div>
                <div className="h-full bg-amber-300 w-[15%]"></div>
                <div className="h-full bg-red-400 w-[40%]"></div>
              </div>

              <div className="mb-4">
                <p className="font-medium">
                  Your BMI: <span className="text-green-600">Normal</span>
                </p>
                <p className="text-sm text-gray-500">
                  Your BMI is within a healthy range. Maintain your current lifestyle.
                </p>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Water Intake</h3>
                  <div className="flex items-center">
                    <span className="text-sm mr-2">Reminders</span>
                    <div
                      className={`w-10 h-5 rounded-full ${true ? "bg-red-600" : "bg-gray-200"} relative transition-colors duration-200 ease-in-out`}
                    >
                      <div
                        className={`absolute w-4 h-4 rounded-full bg-white top-0.5 ${true ? "right-0.5" : "left-0.5"} transition-all duration-200 ease-in-out`}
                      ></div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-3">Track your daily water intake</p>

                <div className="flex justify-center items-center mb-3">
                  <span className="text-4xl font-bold text-blue-500">{waterIntake}</span>
                  <span className="text-xl text-gray-400">/8</span>
                </div>

                <div className="grid grid-cols-8 gap-1 mb-3">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded-full flex items-center justify-center ${
                        i < waterIntake ? "bg-blue-500 text-white" : "bg-gray-100"
                      }`}
                    >
                      <Droplet className="h-3 w-3" />
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="w-full text-blue-500 border-blue-200 hover:bg-blue-50"
                  onClick={handleWaterIntake}
                  disabled={waterIntake >= 8}
                >
                  <Droplet className="mr-1 h-4 w-4" /> Log Water Intake
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <section className="mb-20">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Nearby Messes</h2>
            <Link href="/explore" className="text-sm text-red-600">
              View All
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-24 w-full rounded-lg" />
            </div>
          ) : (
            <div className="space-y-3">
              <NearbyMessCard name="Homely Meals" type="Veg" price="₹3200/mo" rating={4.2} distance="0.3 km away" />
              <NearbyMessCard
                name="Punjabi Dhaba Mess"
                type="Non-Veg"
                price="₹3800/mo"
                rating={4.5}
                distance="0.8 km away"
              />
              <NearbyMessCard name="Mom's Kitchen" type="Veg" price="₹3500/mo" rating={4.7} distance="1.2 km away" />
            </div>
          )}
        </section>
      </div>
      <BottomNavigation activeTab="home" />
    </div>
  )
}

function NearbyMessCard({
  name,
  type,
  price,
  rating,
  distance,
}: {
  name: string
  type: string
  price: string
  rating: number
  distance: string
}) {
  const getMessImage = (type: string) => {
    switch (type.toLowerCase()) {
      case "veg":
        return "/veg-icon.png"
      case "non-veg":
        return "/non-veg-icon.png"
      case "jain":
        return "/jain-icon.png"
      default:
        return "/veg-icon.png"
    }
  }

  return (
    <div className="flex border rounded-lg overflow-hidden shadow-sm">
      <div className="w-20 h-20 bg-gray-100 flex items-center justify-center">
        <img src={getMessImage(type) || "/placeholder.svg"} alt={type} className="w-12 h-12" />
      </div>
      <div className="flex-1 p-3">
        <div className="flex justify-between">
          <div>
            <h3 className="font-semibold">{name}</h3>
            <Badge variant="outline" className="text-xs mt-1">
              {type}
            </Badge>
          </div>
          <div className="text-right">
            <span className="text-red-600 font-medium">{price}</span>
            <div className="flex items-center text-xs mt-1">
              <Star className="fill-amber-400 text-amber-400 mr-1 h-3 w-3" />
              <span className="font-medium">{rating}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center text-xs text-gray-500">
            <MapPin className="mr-1 h-3 w-3" />
            <span>{distance}</span>
          </div>
          <Button size="sm" variant="outline" className="h-7 text-xs border-red-200 text-red-600 hover:bg-red-50">
            View Details
          </Button>
        </div>
      </div>
    </div>
  )
}

function SubscriptionSkeleton() {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2 pt-3">
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <Skeleton className="h-6 w-48 mb-1" />
        <div className="flex gap-2 mb-3">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>

        <div className="flex justify-between items-center mb-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-10" />
        </div>
        <Skeleton className="h-2 w-full mb-1" />
        <Skeleton className="h-3 w-32 mb-4" />

        <div className="grid grid-cols-2 gap-2 mb-3">
          <Skeleton className="h-9 w-full rounded-md" />
          <Skeleton className="h-9 w-full rounded-md" />
        </div>

        <Skeleton className="h-9 w-full rounded-md" />
      </CardContent>
    </Card>
  )
}

function MenuSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2 pt-3">
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <Skeleton className="h-10 w-full mb-4" />

        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <Skeleton className="h-5 w-32 mb-1" />
              <Skeleton className="h-4 w-48" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function HealthSkeleton() {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2 pt-3">
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <Skeleton className="h-4 w-48 mb-3" />

        <div className="grid grid-cols-3 gap-4 mb-3">
          <div className="text-center">
            <Skeleton className="h-3 w-12 mx-auto mb-1" />
            <Skeleton className="h-5 w-16 mx-auto" />
          </div>
          <div className="text-center">
            <Skeleton className="h-3 w-12 mx-auto mb-1" />
            <Skeleton className="h-5 w-16 mx-auto" />
          </div>
          <div className="text-center">
            <Skeleton className="h-3 w-12 mx-auto mb-1" />
            <Skeleton className="h-5 w-16 mx-auto" />
          </div>
        </div>

        <Skeleton className="h-2 w-full rounded-full mb-3" />

        <div className="mb-4">
          <Skeleton className="h-5 w-40 mb-1" />
          <Skeleton className="h-4 w-full" />
        </div>

        <Skeleton className="h-px w-full mb-3" />

        <div className="flex justify-between items-center mb-2">
          <Skeleton className="h-5 w-32" />
          <div className="flex items-center">
            <Skeleton className="h-4 w-20 mr-2" />
            <Skeleton className="h-5 w-10 rounded-full" />
          </div>
        </div>
        <Skeleton className="h-4 w-48 mb-3" />

        <Skeleton className="h-10 w-20 rounded-full mx-auto mb-3" />

        <div className="grid grid-cols-8 gap-1 mb-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square rounded-full" />
          ))}
        </div>

        <Skeleton className="h-9 w-full rounded-md" />
      </CardContent>
    </Card>
  )
}
