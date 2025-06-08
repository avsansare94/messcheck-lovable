"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight, Store } from "lucide-react"
import { useUser } from "./user-context-provider"

export function ProviderOnboardingForm() {
  const router = useRouter()
  const { user } = useUser()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    messName: "",
    contactNumber: "",
    address: "",
    cuisineType: "",
    servingType: "",
    openDays: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false,
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleDayToggle = (day: keyof typeof formData.openDays) => {
    setFormData((prev) => ({
      ...prev,
      openDays: {
        ...prev.openDays,
        [day]: !prev.openDays[day],
      },
    }))
  }

  const handleNext = () => {
    setStep((prev) => prev + 1)
  }

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1)
    } else {
      router.push("/login")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Save provider data
    if (typeof window !== "undefined") {
      localStorage.setItem("providerData", JSON.stringify(formData))
    }
    router.push("/provider/home")
  }

  const isStepOneValid = formData.messName && formData.contactNumber && formData.address

  return (
    <div className="w-full max-w-md mx-auto">
      <Button variant="ghost" className="mb-4" onClick={handleBack}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="mb-8 text-center">
        <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Store className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-red-600">MessCheck</h1>
        <p className="text-gray-600 mt-2">Set up your mess profile</p>
      </div>

      <Card className="border-red-100">
        <CardHeader>
          <CardTitle className="text-xl text-center">{step === 1 ? "Mess Information" : "Service Details"}</CardTitle>
          <CardDescription className="text-center">
            {step === 1 ? "Tell us about your mess" : "Set your service preferences"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="messName">Mess Name</Label>
                  <Input
                    id="messName"
                    value={formData.messName}
                    onChange={handleChange}
                    placeholder="Your Mess Name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input
                    id="contactNumber"
                    type="tel"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    placeholder="Your Contact Number"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Your Mess Address"
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label>Cuisine Type</Label>
                  <RadioGroup
                    value={formData.cuisineType}
                    onValueChange={(value) => handleSelectChange("cuisineType", value)}
                    className="grid grid-cols-1 gap-2"
                  >
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="veg" id="veg" />
                      <Label htmlFor="veg" className="flex-1 cursor-pointer">
                        Vegetarian
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="non-veg" id="non-veg" />
                      <Label htmlFor="non-veg" className="flex-1 cursor-pointer">
                        Non-Vegetarian
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="jain" id="jain" />
                      <Label htmlFor="jain" className="flex-1 cursor-pointer">
                        Jain
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Serving Type</Label>
                  <RadioGroup
                    value={formData.servingType}
                    onValueChange={(value) => handleSelectChange("servingType", value)}
                    className="grid grid-cols-1 gap-2"
                  >
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="lunch" id="lunch" />
                      <Label htmlFor="lunch" className="flex-1 cursor-pointer">
                        Lunch Only
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="dinner" id="dinner" />
                      <Label htmlFor="dinner" className="flex-1 cursor-pointer">
                        Dinner Only
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="both" id="both" />
                      <Label htmlFor="both" className="flex-1 cursor-pointer">
                        Both Lunch & Dinner
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Open Days</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(formData.openDays).map(([day, isChecked]) => (
                      <div key={day} className="flex items-center space-x-2 rounded-md border p-3">
                        <Checkbox
                          id={day}
                          checked={isChecked}
                          onCheckedChange={() => handleDayToggle(day as keyof typeof formData.openDays)}
                        />
                        <Label htmlFor={day} className="flex-1 cursor-pointer capitalize">
                          {day}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </form>
        </CardContent>
        <CardFooter>
          {step === 1 ? (
            <Button className="w-full bg-red-600 hover:bg-red-700" onClick={handleNext} disabled={!isStepOneValid}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              className="w-full bg-red-600 hover:bg-red-700"
              onClick={handleSubmit}
              disabled={!formData.cuisineType || !formData.servingType}
            >
              Complete Setup
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

// Default export for compatibility
export default ProviderOnboardingForm
