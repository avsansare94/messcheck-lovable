"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Utensils, MapPin, Loader2 } from "lucide-react"
import { toast } from "sonner"

export function OnboardingForm() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [locationLoading, setLocationLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState<"user" | "provider" | "">("")

  const [formData, setFormData] = useState({
    full_name: "",
    gender: "",
    age: "",
    food_preference: "",
    institution_name: "",
    institution_type: "",
    city: "",
    state: "",
    pincode: "",
    geo_location: null as { lat: number; lng: number } | null,
    // Provider specific fields
    mess_name: "",
    mobile_number: "",
    cuisine_type: "",
    nearby_tags: "",
  })

  // Get user data from Google auth
  useEffect(() => {
    const getUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        setFormData((prev) => ({
          ...prev,
          full_name: user.user_metadata?.full_name || user.user_metadata?.name || "",
        }))
      }
    }
    getUserData()
  }, [supabase])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleLocationFetch = () => {
    setLocationLoading(true)

    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by this browser")
      setLocationLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setFormData((prev) => ({
          ...prev,
          geo_location: { lat: latitude, lng: longitude },
        }))
        toast.success("Location captured successfully!")
        setLocationLoading(false)
      },
      (error) => {
        toast.error("Failed to get location. Please enter manually.")
        setLocationLoading(false)
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("No user found")

      // Prepare profile data
      const profileData = {
        id: user.id,
        email: user.email,
        full_name: formData.full_name,
        role: selectedRole,
        gender: selectedRole === "user" ? formData.gender : null,
        age: selectedRole === "user" ? Number.parseInt(formData.age) || null : null,
        food_preference: formData.food_preference,
        institution_name: selectedRole === "user" ? formData.institution_name : null,
        institution_type: selectedRole === "user" ? formData.institution_type : null,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        geo_location: formData.geo_location ? `POINT(${formData.geo_location.lng} ${formData.geo_location.lat})` : null,
        // Provider specific
        mess_name: selectedRole === "provider" ? formData.mess_name : null,
        mobile_number: selectedRole === "provider" ? formData.mobile_number : null,
        cuisine_type: selectedRole === "provider" ? formData.cuisine_type : null,
        nearby_tags:
          selectedRole === "provider" && formData.nearby_tags
            ? formData.nearby_tags.split(",").map((tag) => tag.trim())
            : null,
        updated_at: new Date().toISOString(),
      }

      // Update profile
      const { error } = await supabase.from("profiles").update(profileData).eq("id", user.id)

      if (error) throw error

      toast.success(`Welcome ${formData.full_name}, your profile is ready!`)

      // Redirect based on role
      if (selectedRole === "provider") {
        router.push("/provider-dashboard")
      } else {
        router.push("/dashboard")
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to save profile")
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = () => {
    const baseFields = selectedRole && formData.full_name && formData.city && formData.state && formData.pincode

    if (selectedRole === "user") {
      return (
        baseFields &&
        formData.gender &&
        formData.age &&
        formData.food_preference &&
        formData.institution_name &&
        formData.institution_type
      )
    } else if (selectedRole === "provider") {
      return (
        baseFields && formData.mess_name && formData.mobile_number && formData.cuisine_type && formData.food_preference
      )
    }

    return false
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Utensils className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-red-600">MessCheck</h1>
        <p className="text-gray-600 mt-2">Complete your profile</p>
      </div>

      <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl text-center text-gray-800">Setup Your Profile</CardTitle>
          <CardDescription className="text-center text-gray-600">Tell us about yourself to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">I am a</Label>
              <Select value={selectedRole} onValueChange={(value: "user" | "provider") => setSelectedRole(value)}>
                <SelectTrigger className="h-12 border-gray-200 focus:border-red-500">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">👤 Mess User</SelectItem>
                  <SelectItem value="provider">👨‍🍳 Mess Provider</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedRole && (
              <>
                {/* Common Fields */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name" className="text-sm font-medium text-gray-700">
                      Full Name
                    </Label>
                    <Input
                      id="full_name"
                      value={formData.full_name}
                      onChange={(e) => handleInputChange("full_name", e.target.value)}
                      className="h-12 border-gray-200 focus:border-red-500"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  {/* User-specific fields */}
                  {selectedRole === "user" && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700">Gender</Label>
                          <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                            <SelectTrigger className="h-12 border-gray-200 focus:border-red-500">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="age" className="text-sm font-medium text-gray-700">
                            Age
                          </Label>
                          <Input
                            id="age"
                            type="number"
                            value={formData.age}
                            onChange={(e) => handleInputChange("age", e.target.value)}
                            className="h-12 border-gray-200 focus:border-red-500"
                            placeholder="25"
                            min="16"
                            max="100"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="institution_name" className="text-sm font-medium text-gray-700">
                          Institution Name
                        </Label>
                        <Input
                          id="institution_name"
                          value={formData.institution_name}
                          onChange={(e) => handleInputChange("institution_name", e.target.value)}
                          className="h-12 border-gray-200 focus:border-red-500"
                          placeholder="e.g., IIT Mumbai, TCS, etc."
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Institution Type</Label>
                        <Select
                          value={formData.institution_type}
                          onValueChange={(value) => handleInputChange("institution_type", value)}
                        >
                          <SelectTrigger className="h-12 border-gray-200 focus:border-red-500">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="college">College</SelectItem>
                            <SelectItem value="company">Company</SelectItem>
                            <SelectItem value="hostel">Hostel</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  {/* Provider-specific fields */}
                  {selectedRole === "provider" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="mess_name" className="text-sm font-medium text-gray-700">
                          Mess Name
                        </Label>
                        <Input
                          id="mess_name"
                          value={formData.mess_name}
                          onChange={(e) => handleInputChange("mess_name", e.target.value)}
                          className="h-12 border-gray-200 focus:border-red-500"
                          placeholder="e.g., Annapurna Mess"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="mobile_number" className="text-sm font-medium text-gray-700">
                          Mobile Number
                        </Label>
                        <Input
                          id="mobile_number"
                          value={formData.mobile_number}
                          onChange={(e) => handleInputChange("mobile_number", e.target.value)}
                          className="h-12 border-gray-200 focus:border-red-500"
                          placeholder="+91 9876543210"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Cuisine Type</Label>
                        <Select
                          value={formData.cuisine_type}
                          onValueChange={(value) => handleInputChange("cuisine_type", value)}
                        >
                          <SelectTrigger className="h-12 border-gray-200 focus:border-red-500">
                            <SelectValue placeholder="Select cuisine type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="veg">Vegetarian</SelectItem>
                            <SelectItem value="non_veg">Non-Vegetarian</SelectItem>
                            <SelectItem value="mixed">Mixed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="nearby_tags" className="text-sm font-medium text-gray-700">
                          Nearby Landmarks
                        </Label>
                        <Input
                          id="nearby_tags"
                          value={formData.nearby_tags}
                          onChange={(e) => handleInputChange("nearby_tags", e.target.value)}
                          className="h-12 border-gray-200 focus:border-red-500"
                          placeholder="e.g., IIT Mumbai, Powai Lake (comma separated)"
                        />
                      </div>
                    </>
                  )}

                  {/* Food Preference */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700">Food Preference</Label>
                    <RadioGroup
                      value={formData.food_preference}
                      onValueChange={(value) => handleInputChange("food_preference", value)}
                      className="grid grid-cols-3 gap-2"
                    >
                      <div className="flex items-center space-x-2 rounded-lg border border-gray-200 p-3 hover:border-red-300">
                        <RadioGroupItem value="veg" id="veg" />
                        <Label htmlFor="veg" className="text-sm cursor-pointer">
                          Veg
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-lg border border-gray-200 p-3 hover:border-red-300">
                        <RadioGroupItem value="non_veg" id="non_veg" />
                        <Label htmlFor="non_veg" className="text-sm cursor-pointer">
                          Non-Veg
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-lg border border-gray-200 p-3 hover:border-red-300">
                        <RadioGroupItem value="jain" id="jain" />
                        <Label htmlFor="jain" className="text-sm cursor-pointer">
                          Jain
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Location Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                        City
                      </Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className="h-12 border-gray-200 focus:border-red-500"
                        placeholder="Mumbai"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-sm font-medium text-gray-700">
                        State
                      </Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        className="h-12 border-gray-200 focus:border-red-500"
                        placeholder="Maharashtra"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pincode" className="text-sm font-medium text-gray-700">
                      Pincode
                    </Label>
                    <Input
                      id="pincode"
                      value={formData.pincode}
                      onChange={(e) => handleInputChange("pincode", e.target.value)}
                      className="h-12 border-gray-200 focus:border-red-500"
                      placeholder="400001"
                      pattern="[0-9]{6}"
                      required
                    />
                  </div>

                  {/* Location Button */}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleLocationFetch}
                    disabled={locationLoading}
                    className="w-full h-12 border-red-200 text-red-600 hover:bg-red-50"
                  >
                    {locationLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <MapPin className="mr-2 h-4 w-4" />
                    )}
                    {formData.geo_location ? "Location Captured ✓" : "📍 Use My Location"}
                  </Button>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={!isFormValid() || loading}
                  className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-medium"
                >
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Complete Setup
                </Button>
              </>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
