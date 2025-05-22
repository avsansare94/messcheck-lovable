"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPin, Save } from "lucide-react"

export function ProviderProfileScreen() {
  const [loading, setLoading] = useState(true)
  const [profileData, setProfileData] = useState({
    name: "Sharma's Tiffin Service",
    cuisine: "veg",
    cuisineType: "North Indian",
    servingType: "both",
    contactNumber: "+91 98765 43210",
    address: "123 Hostel Road, Powai, Mumbai - 400076",
    location: {
      latitude: 19.1234,
      longitude: 72.9123,
    },
    openDays: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false,
    },
    nearbyInstitutions: ["IIT Bombay", "Powai Lake Residences"],
  })

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleOpenDayToggle = (day: string) => {
    setProfileData((prev) => ({
      ...prev,
      openDays: {
        ...prev.openDays,
        [day]: !prev.openDays[day as keyof typeof prev.openDays],
      },
    }))
  }

  const handleCuisineChange = (value: string) => {
    setProfileData((prev) => ({ ...prev, cuisine: value }))
  }

  const handleServingTypeChange = (value: string) => {
    setProfileData((prev) => ({ ...prev, servingType: value }))
  }

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setProfileData((prev) => ({
            ...prev,
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          }))
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    }
  }

  const handleRemoveInstitution = (institution: string) => {
    setProfileData((prev) => ({
      ...prev,
      nearbyInstitutions: prev.nearbyInstitutions.filter((i) => i !== institution),
    }))
  }

  const handleAddInstitution = (e: React.FormEvent) => {
    e.preventDefault()
    const input = document.getElementById("new-institution") as HTMLInputElement
    if (input.value.trim() && !profileData.nearbyInstitutions.includes(input.value.trim())) {
      setProfileData((prev) => ({
        ...prev,
        nearbyInstitutions: [...prev.nearbyInstitutions, input.value.trim()],
      }))
      input.value = ""
    }
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-6 pb-20">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-red-600">Mess Profile</h1>
        <p className="text-sm text-gray-500">Manage your mess details</p>
      </header>

      {loading ? (
        <MessInfoSkeleton />
      ) : (
        <Card className="mb-6 border-red-100 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Basic Information</CardTitle>
            <CardDescription>Update your mess details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mess-name">Mess Name</Label>
              <Input
                id="mess-name"
                value={profileData.name}
                onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Sharma's Tiffin Service"
              />
            </div>

            <div className="space-y-2">
              <Label>Cuisine Type</Label>
              <RadioGroup
                value={profileData.cuisine}
                onValueChange={handleCuisineChange}
                className="grid grid-cols-2 gap-2"
              >
                <div className="flex items-center space-x-2 rounded-md border p-2">
                  <RadioGroupItem value="veg" id="veg" />
                  <Label htmlFor="veg" className="cursor-pointer">
                    Veg
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-2">
                  <RadioGroupItem value="non-veg" id="non-veg" />
                  <Label htmlFor="non-veg" className="cursor-pointer">
                    Non-Veg
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-2">
                  <RadioGroupItem value="jain" id="jain" />
                  <Label htmlFor="jain" className="cursor-pointer">
                    Jain
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-2">
                  <RadioGroupItem value="mixed" id="mixed" />
                  <Label htmlFor="mixed" className="cursor-pointer">
                    Mixed
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cuisine-type">Cuisine Style</Label>
              <Input
                id="cuisine-type"
                value={profileData.cuisineType}
                onChange={(e) => setProfileData((prev) => ({ ...prev, cuisineType: e.target.value }))}
                placeholder="e.g. North Indian, South Indian, etc."
              />
            </div>

            <div className="space-y-2">
              <Label>Serving Type</Label>
              <RadioGroup
                value={profileData.servingType}
                onValueChange={handleServingTypeChange}
                className="grid grid-cols-3 gap-2"
              >
                <div className="flex items-center space-x-2 rounded-md border p-2">
                  <RadioGroupItem value="lunch" id="lunch" />
                  <Label htmlFor="lunch" className="cursor-pointer">
                    Lunch
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-2">
                  <RadioGroupItem value="dinner" id="dinner" />
                  <Label htmlFor="dinner" className="cursor-pointer">
                    Dinner
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-2">
                  <RadioGroupItem value="both" id="both" />
                  <Label htmlFor="both" className="cursor-pointer">
                    Both
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">Contact Number</Label>
              <Input
                id="contact"
                value={profileData.contactNumber}
                onChange={(e) => setProfileData((prev) => ({ ...prev, contactNumber: e.target.value }))}
                placeholder="e.g. +91 98765 43210"
              />
            </div>

            <div className="space-y-2">
              <Label>Open Days</Label>
              <div className="grid grid-cols-4 gap-2">
                {Object.entries(profileData.openDays).map(([day, isChecked]) => (
                  <div key={day} className="flex items-center space-x-2">
                    <Checkbox id={day} checked={isChecked} onCheckedChange={() => handleOpenDayToggle(day)} />
                    <Label htmlFor={day} className="capitalize">
                      {day.slice(0, 3)}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <LocationSkeleton />
      ) : (
        <Card className="mb-6 border-red-100 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Location</CardTitle>
            <CardDescription>Set your mess location</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Full Address</Label>
              <Textarea
                id="address"
                value={profileData.address}
                onChange={(e) => setProfileData((prev) => ({ ...prev, address: e.target.value }))}
                placeholder="Enter your complete address with landmarks"
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Geo-Location</Label>
              <div className="flex items-center gap-2 p-3 rounded-md bg-gray-50">
                <MapPin className="h-5 w-5 text-red-600 shrink-0" />
                <div className="text-sm">
                  <p>Latitude: {profileData.location.latitude.toFixed(6)}</p>
                  <p>Longitude: {profileData.location.longitude.toFixed(6)}</p>
                </div>
              </div>
              <Button variant="outline" type="button" className="w-full border-red-100" onClick={handleUseMyLocation}>
                <MapPin className="mr-2 h-4 w-4" /> Use My Current Location
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <InstitutionsSkeleton />
      ) : (
        <Card className="mb-6 border-red-100 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Nearby Institutions</CardTitle>
            <CardDescription>Tag colleges or companies near your mess</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {profileData.nearbyInstitutions.map((institution, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200 cursor-pointer"
                  onClick={() => handleRemoveInstitution(institution)}
                >
                  {institution} ×
                </Badge>
              ))}
              {profileData.nearbyInstitutions.length === 0 && (
                <p className="text-sm text-gray-500">No institutions added yet</p>
              )}
            </div>

            <form onSubmit={handleAddInstitution} className="flex gap-2">
              <div className="flex-1">
                <Input id="new-institution" placeholder="Add college or company name" />
              </div>
              <Button type="submit" variant="outline" className="border-red-100">
                Add
              </Button>
            </form>

            <p className="text-xs text-gray-500">
              Adding nearby institutions helps students and employees find your mess more easily. You can add up to 3
              institutions.
            </p>
          </CardContent>
        </Card>
      )}

      <Button className="w-full bg-red-600 hover:bg-red-700">
        <Save className="mr-2 h-4 w-4" /> Save Profile
      </Button>
    </div>
  )
}

function MessInfoSkeleton() {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-40 mb-1" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <div className="grid grid-cols-2 gap-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-md" />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <div className="grid grid-cols-3 gap-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded-md" />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <div className="grid grid-cols-4 gap-2">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 w-8" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function LocationSkeleton() {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-24 mb-1" />
        <Skeleton className="h-4 w-48" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-24 w-full rounded-md" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-16 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </CardContent>
    </Card>
  )
}

function InstitutionsSkeleton() {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-48 mb-1" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-24 rounded-full" />
          ))}
        </div>

        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1 rounded-md" />
          <Skeleton className="h-10 w-16 rounded-md" />
        </div>

        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </CardContent>
    </Card>
  )
}
