"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, ArrowRight, Utensils } from "lucide-react"

export function OnboardingForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    institution: "",
    accommodation: "",
    foodPreference: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
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
    // Save user data
    localStorage.setItem("userData", JSON.stringify(formData))
    router.push("/home")
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Button variant="ghost" className="mb-4" onClick={handleBack}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="mb-8 text-center">
        <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Utensils className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-red-600">MessCheck</h1>
        <p className="text-gray-600 mt-2">Complete your profile</p>
      </div>

      <Card className="border-red-100">
        <CardHeader>
          <CardTitle className="text-xl text-center">{step === 1 ? "Personal Information" : "Preferences"}</CardTitle>
          <CardDescription className="text-center">
            {step === 1 ? "Tell us about yourself" : "Set your food preferences"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="institution">College/Company</Label>
                  <Input
                    id="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    placeholder="Where do you study/work?"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accommodation">Hostel/PG</Label>
                  <Input
                    id="accommodation"
                    value={formData.accommodation}
                    onChange={handleChange}
                    placeholder="Where do you stay?"
                    required
                  />
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Food Preference</Label>
                  <RadioGroup
                    value={formData.foodPreference}
                    onValueChange={(value) => handleSelectChange("foodPreference", value)}
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
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter>
          {step === 1 ? (
            <Button
              className="w-full bg-red-600 hover:bg-red-700"
              onClick={handleNext}
              disabled={!formData.name || !formData.email || !formData.institution || !formData.accommodation}
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              className="w-full bg-red-600 hover:bg-red-700"
              onClick={handleSubmit}
              disabled={!formData.foodPreference}
            >
              Complete Setup
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
