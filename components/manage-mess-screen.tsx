"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Edit, Trash2, Plus, Star, Flag, MessageSquare } from "lucide-react"

export function ManageMessScreen() {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [messData, setMessData] = useState({
    name: "Sharma's Tiffin Service",
    cuisine: "Veg",
    cuisineType: "North Indian",
    servingType: "Both",
    contactNumber: "+91 98765 43210",
    openDays: "Monday - Saturday",
    menu: {
      lunch: "Rice, Dal, Chapati\nMix Vegetable Curry\nPaneer Butter Masala\nSalad, Papad, Pickle\nSweet: Gulab Jamun",
      dinner: "Rice, Dal, Chapati\nAloo Gobi\nChana Masala\nSalad, Papad, Pickle\nDessert: Fruit Custard",
    },
    plans: [
      { id: 1, name: "Trial Plan", price: 500, duration: "7 days", mealSlot: "Both" },
      { id: 2, name: "Weekly Plan", price: 1200, duration: "7 days", mealSlot: "Both" },
      { id: 3, name: "Lunch Only", price: 2000, duration: "30 days", mealSlot: "Lunch" },
      { id: 4, name: "Monthly Plan", price: 3500, duration: "30 days", mealSlot: "Both" },
    ],
    reviews: {
      average: {
        taste: 4.5,
        hygiene: 4.2,
        quantity: 4.0,
        timeliness: 4.3,
      },
      list: [
        {
          id: 1,
          user: "Rahul S.",
          rating: 5,
          comment: "Best mess around the campus. Food quality is excellent and consistent. Highly recommended!",
          tags: ["Tasty", "Clean", "Good Quantity"],
          date: "2 weeks ago",
        },
        {
          id: 2,
          user: "Priya M.",
          rating: 4,
          comment: "Good food quality. Sometimes the curry is a bit spicy, but overall a good option.",
          tags: ["Tasty", "Spicy"],
          date: "1 month ago",
        },
        {
          id: 3,
          user: "Amit K.",
          rating: 4,
          comment: "Clean place, good food. The owner is very friendly and accommodating to special requests.",
          tags: ["Clean", "Friendly Staff"],
          date: "2 months ago",
        },
      ],
    },
  })
  const [editingMenu, setEditingMenu] = useState({
    lunch: messData.menu.lunch,
    dinner: messData.menu.dinner,
  })

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleMenuChange = (type: "lunch" | "dinner", value: string) => {
    setEditingMenu((prev) => ({
      ...prev,
      [type]: value,
    }))
  }

  const saveMenu = () => {
    setMessData((prev) => ({
      ...prev,
      menu: editingMenu,
    }))
    // Here you would typically save to backend
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-6 pb-20">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-red-600">Manage Mess</h1>
        <p className="text-sm text-gray-500">Update your mess details and offerings</p>
      </header>

      <Tabs defaultValue="overview" className="mb-4" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 h-auto p-1 bg-gray-100">
          <TabsTrigger
            value="overview"
            className="text-xs py-1.5 data-[state=active]:bg-red-600 data-[state=active]:text-white"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="menu"
            className="text-xs py-1.5 data-[state=active]:bg-red-600 data-[state=active]:text-white"
          >
            Menu
          </TabsTrigger>
          <TabsTrigger
            value="plans"
            className="text-xs py-1.5 data-[state=active]:bg-red-600 data-[state=active]:text-white"
          >
            Plans & Reviews
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 pt-4">
          {loading ? (
            <MessInfoSkeleton />
          ) : (
            <Card className="border-red-100 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Mess Information</CardTitle>
                <CardDescription>Basic details about your mess</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mess-name">Mess Name</Label>
                  <Input id="mess-name" value={messData.name} readOnly className="bg-gray-50" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cuisine">Cuisine</Label>
                    <Input id="cuisine" value={messData.cuisine} readOnly className="bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cuisine-type">Cuisine Type</Label>
                    <Input id="cuisine-type" value={messData.cuisineType} readOnly className="bg-gray-50" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="serving-type">Serving Type</Label>
                    <Input id="serving-type" value={messData.servingType} readOnly className="bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="open-days">Open Days</Label>
                    <Input id="open-days" value={messData.openDays} readOnly className="bg-gray-50" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Number</Label>
                  <Input id="contact" value={messData.contactNumber} readOnly className="bg-gray-50" />
                </div>

                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <Edit className="mr-2 h-4 w-4" /> Edit Information
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="menu" className="space-y-4 pt-4">
          {loading ? (
            <MenuSkeleton />
          ) : (
            <Card className="border-red-100 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Today's Menu</CardTitle>
                <CardDescription>Update what you're serving today</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="lunch-menu">Lunch Menu</Label>
                  <Textarea
                    id="lunch-menu"
                    value={editingMenu.lunch}
                    onChange={(e) => handleMenuChange("lunch", e.target.value)}
                    placeholder="Enter lunch menu items, one per line"
                    className="min-h-[120px]"
                  />
                  <p className="text-xs text-gray-500">
                    Use a new line for each item. You can use emojis like 🍚, 🍲, 🥗
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dinner-menu">Dinner Menu</Label>
                  <Textarea
                    id="dinner-menu"
                    value={editingMenu.dinner}
                    onChange={(e) => handleMenuChange("dinner", e.target.value)}
                    placeholder="Enter dinner menu items, one per line"
                    className="min-h-[120px]"
                  />
                  <p className="text-xs text-gray-500">
                    Use a new line for each item. You can use emojis like 🍚, 🍲, 🥗
                  </p>
                </div>

                <Button onClick={saveMenu} className="w-full bg-red-600 hover:bg-red-700">
                  Save Menu
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="plans" className="space-y-4 pt-4">
          {loading ? (
            <PlansSkeleton />
          ) : (
            <Card className="border-red-100 shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg">Meal Plans</CardTitle>
                    <CardDescription>Manage your subscription plans</CardDescription>
                  </div>
                  <Button size="sm" className="h-8 bg-red-600 hover:bg-red-700">
                    <Plus className="h-3 w-3 mr-1" /> Add Plan
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {messData.plans.map((plan) => (
                  <div key={plan.id} className="flex justify-between items-center p-3 rounded-md bg-gray-50">
                    <div>
                      <p className="font-medium">{plan.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                          ₹{plan.price}
                        </Badge>
                        <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                          {plan.duration}
                        </Badge>
                        <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                          {plan.mealSlot}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {loading ? (
            <ReviewsSkeleton />
          ) : (
            <Card className="border-red-100 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">User Reviews</CardTitle>
                <CardDescription>See what your customers are saying</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">Taste</p>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        <span className="text-sm font-medium ml-1">{messData.reviews.average.taste}</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-yellow-500 h-1.5 rounded-full"
                        style={{ width: `${(messData.reviews.average.taste / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">Hygiene</p>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        <span className="text-sm font-medium ml-1">{messData.reviews.average.hygiene}</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-yellow-500 h-1.5 rounded-full"
                        style={{ width: `${(messData.reviews.average.hygiene / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">Quantity</p>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        <span className="text-sm font-medium ml-1">{messData.reviews.average.quantity}</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-yellow-500 h-1.5 rounded-full"
                        style={{ width: `${(messData.reviews.average.quantity / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">Timeliness</p>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        <span className="text-sm font-medium ml-1">{messData.reviews.average.timeliness}</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-yellow-500 h-1.5 rounded-full"
                        style={{ width: `${(messData.reviews.average.timeliness / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {messData.reviews.list.map((review) => (
                    <div key={review.id} className="p-3 rounded-md bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback className="bg-red-100 text-red-600">
                              {review.user
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{review.user}</p>
                            <p className="text-xs text-gray-500">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-2 text-sm">{review.comment}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {review.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs bg-gray-100">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-end gap-2 mt-2">
                        <Button variant="ghost" size="sm" className="h-7 text-xs text-gray-500">
                          <MessageSquare className="h-3 w-3 mr-1" /> Reply
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs text-red-500">
                          <Flag className="h-3 w-3 mr-1" /> Report
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function MessInfoSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-40 mb-1" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <Skeleton className="h-10 w-full rounded-md" />
      </CardContent>
    </Card>
  )
}

function MenuSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-32 mb-1" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-32 w-full rounded-md" />
          <Skeleton className="h-3 w-3/4" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-32 w-full rounded-md" />
          <Skeleton className="h-3 w-3/4" />
        </div>

        <Skeleton className="h-10 w-full rounded-md" />
      </CardContent>
    </Card>
  )
}

function PlansSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-6 w-24 mb-1" />
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex justify-between items-center p-3 rounded-md bg-gray-50">
            <div>
              <Skeleton className="h-5 w-32 mb-1" />
              <div className="flex items-center gap-2 mt-1">
                <Skeleton className="h-4 w-16 rounded-full" />
                <Skeleton className="h-4 w-16 rounded-full" />
                <Skeleton className="h-4 w-16 rounded-full" />
              </div>
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function ReviewsSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-32 mb-1" />
        <Skeleton className="h-4 w-56" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-8" />
              </div>
              <Skeleton className="h-1.5 w-full rounded-full" />
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-3 rounded-md bg-gray-50">
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
              <Skeleton className="h-4 w-full mt-2" />
              <Skeleton className="h-4 w-3/4 mt-1" />
              <div className="flex flex-wrap gap-1 mt-2">
                {[1, 2, 3].map((j) => (
                  <Skeleton key={j} className="h-4 w-16 rounded-full" />
                ))}
              </div>
              <div className="flex justify-end gap-2 mt-2">
                <Skeleton className="h-7 w-16 rounded-md" />
                <Skeleton className="h-7 w-16 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
