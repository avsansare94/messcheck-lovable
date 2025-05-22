"use client"

import { useState } from "react"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, MapPin, User, Utensils } from "lucide-react"
import Link from "next/link"

export default function ProfileSettingsPage() {
  const [role, setRole] = useState("student")
  const [foodType, setFoodType] = useState("veg")
  const [spicyTolerance, setSpicyTolerance] = useState("yes")
  const [mealPlan, setMealPlan] = useState("both")

  return (
    <>
      <div className="container max-w-md mx-auto px-4 py-6 pb-20">
        <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 -mx-4 mb-6 flex items-center">
          <Link href="/settings" className="mr-3">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold">Profile Settings</h1>
        </header>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="personal" className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>Personal</span>
            </TabsTrigger>
            <TabsTrigger value="role" className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>Role</span>
            </TabsTrigger>
            <TabsTrigger value="food" className="flex items-center gap-1">
              <Utensils className="h-4 w-4" />
              <span>Food</span>
            </TabsTrigger>
          </TabsList>

          {/* Personal Info Section */}
          <TabsContent value="personal" className="space-y-4">
            <Card className="p-4">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 flex items-center justify-center overflow-hidden">
                  <User className="h-12 w-12 text-gray-500" />
                </div>
                <Button variant="outline" size="sm">
                  Change Photo
                </Button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="Enter your full name" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" type="number" placeholder="Age" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select defaultValue="male">
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" readOnly />
                  <p className="text-xs text-gray-500">Email cannot be changed (Google login)</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="Enter your phone number" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="flex gap-2 mb-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>Use Current Location</span>
                    </Button>
                  </div>
                  <Input id="address" placeholder="Enter your address" className="mb-2" />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="City" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" placeholder="State" />
                    </div>
                  </div>

                  <div className="space-y-2 mt-2">
                    <Label htmlFor="pincode">Pin Code</Label>
                    <Input id="pincode" placeholder="Pin Code" />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Role & Affiliation Section */}
          <TabsContent value="role" className="space-y-4">
            <Card className="p-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Your Role</Label>
                  <RadioGroup defaultValue="student" onValueChange={setRole}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="student" id="student" />
                      <Label htmlFor="student">Student</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="professional" id="professional" />
                      <Label htmlFor="professional">Working Professional</Label>
                    </div>
                  </RadioGroup>
                </div>

                {role === "student" ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="college">College Name</Label>
                      <Input id="college" placeholder="Enter your college name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hostel">Hostel/PG Name (Optional)</Label>
                      <Input id="hostel" placeholder="Enter your hostel or PG name" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input id="company" placeholder="Enter your company name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="workLocation">Work Location</Label>
                      <Input id="workLocation" placeholder="City or Pin Code" />
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Food Preferences Section */}
          <TabsContent value="food" className="space-y-4">
            <Card className="p-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Food Type</Label>
                  <RadioGroup defaultValue="veg" onValueChange={setFoodType}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="veg" id="veg" />
                      <Label htmlFor="veg">Vegetarian</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nonveg" id="nonveg" />
                      <Label htmlFor="nonveg">Non-Vegetarian</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="jain" id="jain" />
                      <Label htmlFor="jain">Jain</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Meal Plan Preference</Label>
                  <RadioGroup defaultValue="both" onValueChange={setMealPlan}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="lunch" id="lunch" />
                      <Label htmlFor="lunch">Lunch</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dinner" id="dinner" />
                      <Label htmlFor="dinner">Dinner</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="both" id="both" />
                      <Label htmlFor="both">Both</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Spicy Tolerance</Label>
                  <RadioGroup defaultValue="yes" onValueChange={setSpicyTolerance}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="spicy-yes" />
                      <Label htmlFor="spicy-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="spicy-no" />
                      <Label htmlFor="spicy-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 flex gap-4">
          <Button className="flex-1" variant="outline">
            Cancel
          </Button>
          <Button className="flex-1 bg-red-600 hover:bg-red-700">Save Changes</Button>
        </div>
      </div>
      <BottomNavigation activeTab="settings" />
    </>
  )
}
