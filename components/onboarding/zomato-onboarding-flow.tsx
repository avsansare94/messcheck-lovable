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
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Loader2, MapPin, CheckCircle2, User, ChefHat, X } from "lucide-react"
import { toast } from "sonner"

interface LocationData {
  lat: number
  lng: number
  city: string
  state: string
  pincode: string
}

export function ZomatoOnboardingFlow() {
  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(false)
  const [locationLoading, setLocationLoading] = useState(false)
  const [locationCaptured, setLocationCaptured] = useState(false)
  const [selectedRole, setSelectedRole] = useState<"user" | "provider" | "">("")
  const [error, setError] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")

  const [formData, setFormData] = useState({
    full_name: "",
    gender: "",
    age: "",
    institution_name: "",
    institution_type: "",
    food_preference: "",
    mess_name: "",
    phone_number: "",
    cuisine_type: "",
    city: "",
    state: "",
    pincode: "",
    geo_location: null as { lat: number; lng: number } | null,
  })

  // Auto-load user data and capture location
  useEffect(() => {
    const initializeData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        setFormData((prev) => ({
          ...prev,
          full_name: user.user_metadata?.full_name || user.user_metadata?.name || "",
        }))
      }
      // Auto-capture location
      captureLocation()
    }
    initializeData()
  }, [supabase])

  const reverseGeocode = async (lat: number, lng: number): Promise<LocationData> => {
    try {
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
      return { lat, lng, city: "", state: "", pincode: "" }
    }
  }

  const captureLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported")
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
          toast.success("Location captured!")
        }

        setLocationLoading(false)
      },
      (error) => {
        toast.error("Location access denied. Please enter manually.")
        setLocationLoading(false)
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    )
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("No user found")

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
        mess_name: selectedRole === "provider" ? formData.mess_name : null,
        phone_number: selectedRole === "provider" ? formData.phone_number : null,
        cuisine_type: selectedRole === "provider" ? formData.cuisine_type : null,
        nearby_tags: selectedRole === "provider" ? tags : null,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        geo_location: formData.geo_location ? `POINT(${formData.geo_location.lng} ${formData.geo_location.lat})` : null,
        updated_at: new Date().toISOString(),
      }

      const { error } = await supabase.from("profiles").update(profileData).eq("id", user.id)

      if (error) throw error

      toast.success("Welcome to MessCheck, your profile is set!")

      // Role-based redirect
      if (selectedRole === "provider") {
        router.push("/provider/dashboard")
      } else {
        router.push("/user/dashboard")
      }
    } catch (error: any) {
      setError(error.message || "Failed to save profile")
    } finally {
      setIsLoading(false)
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-8 px-4">
      {/* Mobile-First Container - Max Width 400px */}
      <div className="w-full max-w-sm mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-orange-600 rounded-3xl mx-auto shadow-2xl flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Complete Your Profile
            </h1>
            <p className="text-gray-600">Let's set up your MessCheck experience</p>
          </div>
        </div>

        {/* Status Alerts */}
        {locationLoading && (
          <Alert className="border-blue-200 bg-blue-50/80 rounded-2xl">
            <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
            <AlertDescription className="text-blue-700 font-medium">Capturing your location...</AlertDescription>
          </Alert>
        )}

        {locationCaptured && (
          <Alert className="border-green-200 bg-green-50/80 rounded-2xl">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700 font-medium">Location captured successfully!</AlertDescription>
          </Alert>
        )}

        {/* Main Form Card */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {error && (
                <Alert variant="destructive" className="border-red-200 bg-red-50/80 rounded-2xl">
                  <AlertDescription className="text-red-700 font-medium">{error}</AlertDescription>
                </Alert>
              )}

              {/* Role Selection - Step 1 */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-gray-800">I am a</Label>
                <div className="grid grid-cols-1 gap-4">
                  <button
                    type="button"
                    onClick={() => setSelectedRole("user")}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                      selectedRole === "user"
                        ? "border-red-500 bg-red-50 shadow-lg"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <User className={`w-8 h-8 ${selectedRole === "user" ? "text-red-600" : "text-gray-400"}`} />
                      <div className="text-left">
                        <p className={`font-semibold ${selectedRole === "user" ? "text-red-600" : "text-gray-600"}`}>
                          Mess User
                        </p>
                        <p className="text-xs text-gray-500">Find and book meals</p>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole("provider")}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                      selectedRole === "provider"
                        ? "border-red-500 bg-red-50 shadow-lg"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <ChefHat
                        className={`w-8 h-8 ${selectedRole === "provider" ? "text-red-600" : "text-gray-400"}`}
                      />
                      <div className="text-left">
                        <p
                          className={`font-semibold ${selectedRole === "provider" ? "text-red-600" : "text-gray-600"}`}
                        >
                          Mess Provider
                        </p>
                        <p className="text-xs text-gray-500">Manage your mess</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {selectedRole && (
                <div className="space-y-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="full_name" className="text-sm font-semibold text-gray-700">
                      Full Name
                    </Label>
                    <Input
                      id="full_name"
                      value={formData.full_name}
                      onChange={(e) => handleInputChange("full_name", e.target.value)}
                      className="h-12 border-gray-200 focus:border-red-500 rounded-xl bg-white/50"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  {/* User-specific fields */}
                  {selectedRole === "user" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-700">Gender</Label>
                          <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                            <SelectTrigger className="h-12 border-gray-200 focus:border-red-500 rounded-xl bg-white/50">
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
                          <Label htmlFor="age" className="text-sm font-semibold text-gray-700">
                            Age
                          </Label>
                          <Input
                            id="age"
                            type="number"
                            value={formData.age}
                            onChange={(e) => handleInputChange("age", e.target.value)}
                            className="h-12 border-gray-200 focus:border-red-500 rounded-xl bg-white/50"
                            placeholder="25"
                            min="16"
                            max="100"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="institution_name" className="text-sm font-semibold text-gray-700">
                          Institution Name
                        </Label>
                        <Input
                          id="institution_name"
                          value={formData.institution_name}
                          onChange={(e) => handleInputChange("institution_name", e.target.value)}
                          className="h-12 border-gray-200 focus:border-red-500 rounded-xl bg-white/50"
                          placeholder="e.g., IIT Mumbai, TCS, etc."
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700">Institution Type</Label>
                        <Select
                          value={formData.institution_type}
                          onValueChange={(value) => handleInputChange("institution_type", value)}
                        >
                          <SelectTrigger className="h-12 border-gray-200 focus:border-red-500 rounded-xl bg-white/50">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="college">College</SelectItem>
                            <SelectItem value="hostel">Hostel</SelectItem>
                            <SelectItem value="company">Company</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {/* Provider-specific fields */}
                  {selectedRole === "provider" && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="mess_name" className="text-sm font-semibold text-gray-700">
                          Mess Name
                        </Label>
                        <Input
                          id="mess_name"
                          value={formData.mess_name}
                          onChange={(e) => handleInputChange("mess_name", e.target.value)}
                          className="h-12 border-gray-200 focus:border-red-500 rounded-xl bg-white/50"
                          placeholder="e.g., Annapurna Mess"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone_number" className="text-sm font-semibold text-gray-700">
                          Phone Number
                        </Label>
                        <Input
                          id="phone_number"
                          value={formData.phone_number}
                          onChange={(e) => handleInputChange("phone_number", e.target.value)}
                          className="h-12 border-gray-200 focus:border-red-500 rounded-xl bg-white/50"
                          placeholder="+91 9876543210"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700">Cuisine Type</Label>
                        <RadioGroup
                          value={formData.cuisine_type}
                          onValueChange={(value) => handleInputChange("cuisine_type", value)}
                          className="grid grid-cols-2 gap-3"
                        >
                          {["veg", "non_veg", "jain", "mixed"].map((type) => (
                            <div
                              key={type}
                              className="flex items-center space-x-2 rounded-xl border border-gray-200 p-4 hover:border-red-300 transition-colors bg-white/50"
                            >
                              <RadioGroupItem value={type} id={type} />
                              <Label htmlFor={type} className="text-sm cursor-pointer capitalize">
                                {type.replace("_", "-")}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm font-semibold text-gray-700">Nearby College / Company</Label>
                        <div className="flex gap-2">
                          <Input
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="h-12 border-gray-200 focus:border-red-500 rounded-xl bg-white/50"
                            placeholder="e.g., IIT Mumbai"
                          />
                          <Button
                            type="button"
                            onClick={addTag}
                            className="h-12 px-6 bg-red-600 hover:bg-red-700 rounded-xl"
                          >
                            Add
                          </Button>
                        </div>
                        {tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {tags.map((tag, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-red-100 text-red-700 hover:bg-red-200 rounded-lg px-3 py-1"
                              >
                                {tag}
                                <button
                                  type="button"
                                  onClick={() => removeTag(tag)}
                                  className="ml-2 hover:text-red-900"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Food Preference */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-700">Food Preference</Label>
                    <RadioGroup
                      value={formData.food_preference}
                      onValueChange={(value) => handleInputChange("food_preference", value)}
                      className="grid grid-cols-3 gap-3"
                    >
                      {["veg", "non_veg", "jain"].map((pref) => (
                        <div
                          key={pref}
                          className="flex items-center space-x-2 rounded-xl border border-gray-200 p-4 hover:border-red-300 transition-colors bg-white/50"
                        >
                          <RadioGroupItem value={pref} id={pref} />
                          <Label htmlFor={pref} className="text-sm cursor-pointer capitalize">
                            {pref.replace("_", "-")}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Location Fields */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-sm font-semibold text-gray-700">
                          City
                        </Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          className="h-12 border-gray-200 focus:border-red-500 rounded-xl bg-white/50"
                          placeholder="Mumbai"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state" className="text-sm font-semibold text-gray-700">
                          State
                        </Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => handleInputChange("state", e.target.value)}
                          className="h-12 border-gray-200 focus:border-red-500 rounded-xl bg-white/50"
                          placeholder="Maharashtra"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pincode" className="text-sm font-semibold text-gray-700">
                        Pincode
                      </Label>
                      <Input
                        id="pincode"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange("pincode", e.target.value)}
                        className="h-12 border-gray-200 focus:border-red-500 rounded-xl bg-white/50"
                        placeholder="400001"
                        pattern="[0-9]{6}"
                        required
                      />
                    </div>

                    {!locationCaptured && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={captureLocation}
                        disabled={locationLoading}
                        className="w-full h-12 border-red-200 text-red-600 hover:bg-red-50 rounded-xl bg-white/50"
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
                    disabled={!isFormValid() || isLoading}
                    className="w-full h-14 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
                    Complete Setup
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
