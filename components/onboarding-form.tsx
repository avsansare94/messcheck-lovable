"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { supabase } from "@/lib/supabase/client"
import { useUser } from "@/components/user-context-provider"

export function OnboardingForm() {
  const router = useRouter()
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    age: "",
    gender: "",
    dietary_preferences: [] as string[],
    location: "",
    emergency_contact: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    try {
      // Get user's location
      let geoLocation = null
      if (navigator.geolocation) {
        try {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
          })
          geoLocation = `POINT(${position.coords.longitude} ${position.coords.latitude})`
        } catch (error) {
          console.log("Geolocation not available:", error)
        }
      }

      const { error } = await supabase.from("profiles").insert({
        id: user.id,
        full_name: formData.full_name,
        phone: formData.phone,
        age: Number.parseInt(formData.age),
        gender: formData.gender,
        dietary_preferences: formData.dietary_preferences,
        location: formData.location,
        emergency_contact: formData.emergency_contact,
        geo_location: geoLocation,
        role: "user",
      })

      if (error) throw error

      router.push("/home")
    } catch (error) {
      console.error("Error creating profile:", error)
      alert("Error creating profile. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleDietaryChange = (preference: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      dietary_preferences: checked
        ? [...prev.dietary_preferences, preference]
        : prev.dietary_preferences.filter((p) => p !== preference),
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-4">
      <div className="mx-auto max-w-md">
        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-red-600">Complete Your Profile</CardTitle>
            <CardDescription>Tell us about yourself to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Dietary Preferences</Label>
                <div className="space-y-2 mt-2">
                  {["Vegetarian", "Non-Vegetarian", "Vegan", "Jain", "Gluten-Free"].map((preference) => (
                    <div key={preference} className="flex items-center space-x-2">
                      <Checkbox
                        id={preference}
                        checked={formData.dietary_preferences.includes(preference)}
                        onCheckedChange={(checked) => handleDietaryChange(preference, checked as boolean)}
                      />
                      <Label htmlFor={preference}>{preference}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="City, State"
                  required
                />
              </div>

              <div>
                <Label htmlFor="emergency_contact">Emergency Contact</Label>
                <Input
                  id="emergency_contact"
                  type="tel"
                  value={formData.emergency_contact}
                  onChange={(e) => setFormData({ ...formData, emergency_contact: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={loading}>
                {loading ? "Creating Profile..." : "Complete Setup"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default OnboardingForm
