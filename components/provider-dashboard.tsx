"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell, ChevronDown, Users, CreditCard, Star, Calendar, Clock, Edit, Plus, FileText, Camera } from "lucide-react"

export function ProviderDashboard() {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container max-w-md mx-auto px-4 py-2">
        <header className="flex justify-between items-center py-3 sticky top-0 bg-gray-50 z-10">
          <div>
            <h1 className="text-2xl font-bold text-red-600">MessCheck</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center text-gray-700">
              <span className="text-sm font-medium">Sharma's Tiffin</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>
            </Button>
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-sm font-medium text-red-600">ST</span>
            </div>
          </div>
        </header>

        {loading ? (
          <OverviewSkeleton />
        ) : (
          <Card className="mb-4 border-red-100 shadow-sm">
            <CardHeader className="pb-2 pt-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Mess Overview</CardTitle>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Verified</Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <h3 className="text-lg font-semibold mb-1">Sharma's Tiffin Service</h3>
              <div className="flex gap-2 mb-3">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Veg
                </Badge>
                <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                  North Indian
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-1">
                    <Users className="h-5 w-5 text-red-600" />
                  </div>
                  <p className="text-xs text-gray-500">Subscribers</p>
                  <p className="font-medium">42</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-1">
                    <CreditCard className="h-5 w-5 text-red-600" />
                  </div>
                  <p className="text-xs text-gray-500">Revenue</p>
                  <p className="font-medium">₹86,400</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-1">
                    <Star className="h-5 w-5 text-red-600" />
                  </div>
                  <p className="text-xs text-gray-500">Rating</p>
                  <p className="font-medium">4.5/5</p>
                </div>
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Open Days: Monday - Saturday</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Timings: Lunch: 12:00-2:30 PM, Dinner: 7:00-9:30 PM</span>
                </div>
                <div className="font-medium text-base mt-1 text-red-600">₹3500/month</div>
              </div>

              <div className="flex gap-2">
                <Link href="/edit-mess">
                  <Button variant="outline" className="flex-1 border-red-100">
                    <Edit className="mr-1 h-4 w-4" /> Edit Profile
                  </Button>
                </Link>
                <Link href="/update-menu">
                  <Button className="flex-1 bg-red-600 hover:bg-red-700">Update Menu</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="overview" className="mb-4" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 h-auto p-1 bg-gray-100">
            <TabsTrigger
              value="overview"
              className="text-xs py-1.5 data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="subscribers"
              className="text-xs py-1.5 data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              Subscribers
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="text-xs py-1.5 data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              Reviews
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 pt-4">
            {loading ? (
              <CheckInSkeleton />
            ) : (
              <Card className="border-red-100 shadow-sm">
                <CardHeader className="pb-2 pt-3">
                  <CardTitle className="text-lg">Today's Check-ins</CardTitle>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">May 21, 2025</h3>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Lunch: 18/42
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Dinner: 0/42
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 rounded-md bg-gray-50">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarFallback className="bg-red-100 text-red-600">AS</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Avinash Sansare</p>
                          <p className="text-xs text-gray-500">Trial Plan (7 days)</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Lunch
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center p-2 rounded-md bg-gray-50">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarFallback className="bg-red-100 text-red-600">RK</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Rahul Kumar</p>
                          <p className="text-xs text-gray-500">Full Month Plan</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Lunch
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center p-2 rounded-md bg-gray-50">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarFallback className="bg-red-100 text-red-600">SP</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Sneha Patel</p>
                          <p className="text-xs text-gray-500">Lunch Only Plan</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Lunch
                      </Badge>
                    </div>
                  </div>

                  <Link href="/check-ins">
                    <Button variant="link" className="w-full text-red-600 mt-2">
                      View All Check-ins
                    </Button>
                  </Link>
                  <Link href="/scanner" className="mt-2">
                    <Button className="w-full bg-red-600 hover:bg-red-700">
                      <Camera className="mr-2 h-4 w-4" /> Scan QR Codes
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {loading ? (
              <MenuSkeleton />
            ) : (
              <Card className="border-red-100 shadow-sm">
                <CardHeader className="pb-2 pt-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Today's Menu</CardTitle>
                    <Link href="/update-menu">
                      <Button variant="outline" size="sm" className="h-8 border-red-100">
                        <Edit className="h-3 w-3 mr-1" /> Edit
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <span className="bg-red-100 text-red-600 p-1 rounded-md mr-2">🍽️</span>
                      Lunch
                    </h3>
                    <ul className="text-sm space-y-1">
                      <li>• Rice, Dal, Chapati</li>
                      <li>• Mix Vegetable Curry</li>
                      <li>• Paneer Butter Masala</li>
                      <li>• Salad, Papad, Pickle</li>
                      <li>• Sweet: Gulab Jamun</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2 flex items-center">
                      <span className="bg-blue-100 text-blue-600 p-1 rounded-md mr-2">🌙</span>
                      Dinner
                    </h3>
                    <ul className="text-sm space-y-1">
                      <li>• Rice, Dal, Chapati</li>
                      <li>• Aloo Gobi</li>
                      <li>• Chana Masala</li>
                      <li>• Salad, Papad, Pickle</li>
                      <li>• Dessert: Fruit Custard</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-2 gap-4 mb-20">
              <Link href="/subscription-plans">
                <Card className="border-red-100 shadow-sm h-full">
                  <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-2">
                      <FileText className="h-5 w-5 text-red-600" />
                    </div>
                    <h3 className="font-medium text-center">Manage Subscription Plans</h3>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/payment-settings">
                <Card className="border-red-100 shadow-sm h-full">
                  <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-2">
                      <CreditCard className="h-5 w-5 text-red-600" />
                    </div>
                    <h3 className="font-medium text-center">Payment Settings</h3>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="subscribers" className="space-y-4 pt-4">
            {loading ? (
              <SubscribersSkeleton />
            ) : (
              <>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Active Subscribers (42)</h3>
                  <Button variant="outline" size="sm" className="h-8 border-red-100">
                    <Plus className="h-3 w-3 mr-1" /> Add Manually
                  </Button>
                </div>

                <Card className="border-red-100 shadow-sm">
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {[
                        { name: "Avinash Sansare", plan: "Trial Plan (7 days)", days: "5 of 7 days remaining" },
                        { name: "Rahul Kumar", plan: "Full Month Plan", days: "18 of 30 days remaining" },
                        { name: "Sneha Patel", plan: "Lunch Only Plan", days: "12 of 30 days remaining" },
                        { name: "Priya Sharma", plan: "Full Month Plan", days: "22 of 30 days remaining" },
                        { name: "Amit Verma", plan: "Dinner Only Plan", days: "8 of 30 days remaining" },
                      ].map((subscriber, index) => (
                        <div key={index} className="flex justify-between items-center p-3">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
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
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">{subscriber.days}</p>
                            <Button variant="link" size="sm" className="h-6 p-0 text-red-600">
                              Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Link href="/subscribers">
                  <Button variant="link" className="w-full text-red-600 mb-20">
                    View All Subscribers
                  </Button>
                </Link>
              </>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4 pt-4">
            {loading ? (
              <ReviewsSkeleton />
            ) : (
              <>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-medium">Customer Reviews</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="fill-amber-500 text-amber-500 mr-1 h-4 w-4" />
                      <span className="font-medium text-amber-500">4.5</span>
                      <span className="mx-1">•</span>
                      <span>28 reviews</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-20">
                  {[
                    {
                      name: "Rahul S.",
                      date: "2 weeks ago",
                      rating: 5,
                      comment:
                        "Best mess around the campus. Food quality is excellent and consistent. Highly recommended!",
                      recommended: true,
                    },
                    {
                      name: "Priya M.",
                      date: "1 month ago",
                      rating: 4,
                      comment: "Good food quality. Sometimes the curry is a bit spicy, but overall a good option.",
                      recommended: true,
                    },
                    {
                      name: "Amit K.",
                      date: "2 months ago",
                      rating: 4,
                      comment:
                        "Clean place, good food. The owner is very friendly and accommodating to special requests.",
                      recommended: true,
                    },
                  ].map((review, index) => (
                    <Card key={index} className="border-red-100 shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarFallback className="bg-red-100 text-red-600">
                                {review.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{review.name}</div>
                              <div className="text-xs text-gray-500">{review.date}</div>
                            </div>
                          </div>
                          <div className="flex items-center text-amber-500">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? "fill-amber-500" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="mt-3 text-sm">{review.comment}</p>
                        {review.recommended && (
                          <Badge variant="outline" className="mt-2 bg-green-100 text-green-700 border-green-200">
                            Recommended
                          </Badge>
                        )}
                        <div className="mt-3 flex justify-end">
                          <Button variant="link" size="sm" className="h-6 p-0 text-red-600">
                            Reply
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Link href="/reviews">
                  <Button variant="link" className="w-full text-red-600 mb-20">
                    View All Reviews
                  </Button>
                </Link>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function OverviewSkeleton() {
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
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <Skeleton className="h-10 w-10 rounded-full mx-auto mb-1" />
            <Skeleton className="h-3 w-16 mx-auto mb-1" />
            <Skeleton className="h-4 w-8 mx-auto" />
          </div>
          <div className="text-center">
            <Skeleton className="h-10 w-10 rounded-full mx-auto mb-1" />
            <Skeleton className="h-3 w-16 mx-auto mb-1" />
            <Skeleton className="h-4 w-16 mx-auto" />
          </div>
          <div className="text-center">
            <Skeleton className="h-10 w-10 rounded-full mx-auto mb-1" />
            <Skeleton className="h-3 w-16 mx-auto mb-1" />
            <Skeleton className="h-4 w-8 mx-auto" />
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-5 w-24 mt-1" />
        </div>

        <div className="flex gap-2">
          <Skeleton className="h-9 w-full rounded-md" />
          <Skeleton className="h-9 w-full rounded-md" />
        </div>
      </CardContent>
    </Card>
  )
}

function CheckInSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2 pt-3">
        <Skeleton className="h-6 w-40" />
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex justify-between items-center mb-3">
          <Skeleton className="h-5 w-32" />
          <div className="flex gap-2">
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-5 w-24 rounded-full" />
          </div>
        </div>

        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between items-center p-2 rounded-md">
              <div className="flex items-center">
                <Skeleton className="h-8 w-8 rounded-full mr-2" />
                <div>
                  <Skeleton className="h-4 w-32 mb-1" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
          ))}
        </div>

        <Skeleton className="h-9 w-full rounded-md mt-2" />
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
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="mb-4">
          <Skeleton className="h-5 w-24 mb-2" />
          <div className="space-y-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>

        <div>
          <Skeleton className="h-5 w-24 mb-2" />
          <div className="space-y-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SubscribersSkeleton() {
  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex justify-between items-center p-3">
                <div className="flex items-center">
                  <Skeleton className="h-8 w-8 rounded-full mr-2" />
                  <div>
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <div className="text-right">
                  <Skeleton className="h-3 w-24 mb-1" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Skeleton className="h-9 w-full rounded-md" />
    </>
  )
}

function ReviewsSkeleton() {
  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <div>
          <Skeleton className="h-5 w-32 mb-1" />
          <Skeleton className="h-4 w-40" />
        </div>
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <Skeleton className="h-8 w-8 rounded-full mr-2" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-4 w-full mt-3" />
              <Skeleton className="h-4 w-full mt-1" />
              <Skeleton className="h-4 w-3/4 mt-1" />
              <div className="mt-3 flex justify-end">
                <Skeleton className="h-4 w-16" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Skeleton className="h-9 w-full rounded-md" />
    </>
  )
}
