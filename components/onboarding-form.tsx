"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, MapPin, CheckCircle } from "lucide-react"
import { toast } from "sonner"

interface LocationData {
  lat: number
  lng: number
  city: string
  state: string
  pincode: string
}

export function OnboardingForm() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [locationLoading, setLocationLoading] = useState(false)
  const [locationCaptured, setLocationCaptured] = useState(false)
  const [selectedRole, setSelectedRole] = useState<"user" | "provider" | "">("")
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    full_name: "",
    gender: "",
    age: "",
    institution_name: "",
    institution_type: "",
    food_preference: "",
    // Provider fields
    mess_name: "",
    phone_number: "",
    cuisine_type: "",
    nearby_tags: "",
    // Location fields
    city: "",
    state: "",
    pincode: "",
    geo_location: null as { lat: number; lng: number } | null,
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

  // Auto-capture location on component mount
  useEffect(() => {
    handleLocationCapture()
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const reverseGeocode = async (lat: number, lng: number): Promise<LocationData> => {
    try {
      // Using a free geocoding service
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
      )
      const data = await response.json()

      return {
        lat,
        lng,
        city: data.city || data.locality || "",
        state: data.principalSubdivision || "",
        pincode: data.postcode || "",
      }
    } catch (error) {
      // Fallback - just return coordinates
      return { lat, lng, city: "", state: "", pincode: "" }
    }
  }

  const handleLocationCapture = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by this browser")
      return
    }

    setLocationLoading(true)

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords

        try {
          const locationData = await reverseGeocode(latitude, longitude)

          setFormData((prev) => ({
            ...prev,
            geo_location: { lat: latitude, lng: longitude },
            city: locationData.city,
            state: locationData.state,
            pincode: locationData.pincode,
          }))

          setLocationCaptured(true)
          toast.success("Location captured successfully!")
        } catch (error) {
          setFormData((prev) => ({
            ...prev,
            geo_location: { lat: latitude, lng: longitude },
          }))
          setLocationCaptured(true)
          toast.success("Location captured! Please fill address manually.")
        }

        setLocationLoading(false)
      },
      (error) => {
        toast.error("Failed to get location. Please enter address manually.")
        setLocationLoading(false)
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

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
        age: selectedRole === "user" ? (formData.age ? Number.parseInt(formData.age) : null) : null,
        institution_name: selectedRole === "user" ? formData.institution_name : null,
        institution_type: selectedRole === "user" ? formData.institution_type : null,
        food_preference: formData.food_preference,
        // Provider specific
        mess_name: selectedRole === "provider" ? formData.mess_name : null,
        phone_number: selectedRole === "provider" ? formData.phone_number : null,
        cuisine_type: selectedRole === "provider" ? formData.cuisine_type : null,
        nearby_tags:
          selectedRole === "provider" && formData.nearby_tags
            ? formData.nearby_tags.split(",").map((tag) => tag.trim())
            : null,
        // Location
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        geo_location: formData.geo_location ? `POINT(${formData.geo_location.lng} ${formData.geo_location.lat})` : null,
        updated_at: new Date().toISOString(),
      }

      // Update profile
      const { error } = await supabase.from("profiles").update(profileData).eq("id", user.id)

      if (error) throw error

      toast.success(`Welcome to MessCheck, your profile is set!`)

      // Redirect based on role
      if (selectedRole === "provider") {
        router.push("/provider/dashboard")
      } else {
        router.push("/dashboard")
      }
    } catch (error: any) {
      setError(error.message || "Failed to save profile")
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = () => {
    const baseFields =
      selectedRole &&
      formData.full_name &&
      formData.food_preference &&
      formData.city &&
      formData.state &&
      formData.pincode

    if (selectedRole === "user") {
      return baseFields && formData.gender && formData.age && formData.institution_name && formData.institution_type
    } else if (selectedRole === "provider") {
      return baseFields && formData.mess_name && formData.phone_number && formData.cuisine_type
    }

    return false
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-red-600 mb-2">Complete Your Profile</h1>
        <p className="text-gray-600">Tell us about yourself to get started</p>
      </div>

      <Card className="shadow-lg border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl text-center text-gray-800">Setup Your Account</CardTitle>
          <CardDescription className="text-center text-gray-600">
            Choose your role and complete your profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            {/* Location Status */}
            {locationLoading && (
              <Alert className="border-blue-200 bg-blue-50">
                <Loader2 className="h-4 w-4 animate-spin" />
                <AlertDescription className="text-blue-700">Capturing your location...</AlertDescription>
              </Alert>
            )}

            {locationCaptured && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">Location captured successfully!</AlertDescription>
              </Alert>
            )}

            {/* Role Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">I am a</Label>
              <Select value={selectedRole} onValueChange={(value: "user" | "provider") => setSelectedRole(value)}>
                <SelectTrigger className="h-12 border-gray-200 focus:border-red-500 rounded-lg">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">🧍 Mess User</SelectItem>
                  <SelectItem value="provider">👨‍🍳 Mess Provider</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedRole && (
              <>
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="full_name" className="text-sm font-medium text-gray-700">
                    Full Name
                  </Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => handleInputChange("full_name", e.target.value)}
                    className="h-12 border-gray-200 focus:border-red-500 rounded-lg"
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
                          <SelectTrigger className="h-12 border-gray-200 focus:border-red-500 rounded-lg">
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
                          className="h-12 border-gray-200 focus:border-red-500 rounded-lg"
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
                        className="h-12 border-gray-200 focus:border-red-500 rounded-lg"
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
                        <SelectTrigger className="h-12 border-gray-200 focus:border-red-500 rounded-lg">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="college">College</SelectItem>
                          <SelectItem value="hostel">Hostel</SelectItem>
                          <SelectItem value="company">Company</SelectItem>
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
                        className="h-12 border-gray-200 focus:border-red-500 rounded-lg"
                        placeholder="e.g., Annapurna Mess"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone_number" className="text-sm font-medium text-gray-700">
                        Phone Number
                      </Label>
                      <Input
                        id="phone_number"
                        value={formData.phone_number}
                        onChange={(e) => handleInputChange("phone_number", e.target.value)}
                        className="h-12 border-gray-200 focus:border-red-500 rounded-lg"
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
                        <SelectTrigger className="h-12 border-gray-200 focus:border-red-500 rounded-lg">
                          <SelectValue placeholder="Select cuisine type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="veg">Veg</SelectItem>
                          <SelectItem value="non_veg">Non-Veg</SelectItem>
                          <SelectItem value="jain">Jain</SelectItem>
                          <SelectItem value="mixed">Mixed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nearby_tags" className="text-sm font-medium text-gray-700">
                        Nearby College / Company
                      </Label>
                      <Input
                        id="nearby_tags"
                        value={formData.nearby_tags}
                        onChange={(e) => handleInputChange("nearby_tags", e.target.value)}
                        className="h-12 border-gray-200 focus:border-red-500 rounded-lg"
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
                    <div className="flex items-center space-x-2 rounded-lg border border-gray-200 p-3 hover:border-red-300 transition-colors">
                      <RadioGroupItem value="veg" id="veg" />
                      <Label htmlFor="veg" className="text-sm cursor-pointer">
                        Veg
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-lg border border-gray-200 p-3 hover:border-red-300 transition-colors">
                      <RadioGroupItem value="non_veg" id="non_veg" />
                      <Label htmlFor="non_veg" className="text-sm cursor-pointer">
                        Non-Veg
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-lg border border-gray-200 p-3 hover:border-red-300 transition-colors">
                      <RadioGroupItem value="jain" id="jain" />
                      <Label htmlFor="jain" className="text-sm cursor-pointer">
                        Jain
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Location Fields */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                        City
                      </Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className="h-12 border-gray-200 focus:border-red-500 rounded-lg"
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
                        className="h-12 border-gray-200 focus:border-red-500 rounded-lg"
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
                      className="h-12 border-gray-200 focus:border-red-500 rounded-lg"
                      placeholder="400001"
                      pattern="[0-9]{6}"
                      required
                    />
                  </div>

                  {!locationCaptured && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleLocationCapture}
                      disabled={locationLoading}
                      className="w-full h-12 border-red-200 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      {locationLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <MapPin className="mr-2 h-4 w-4" />
                      )}
                      📍 Capture My Location
                    </Button>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={!isFormValid() || loading}
                  className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
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
