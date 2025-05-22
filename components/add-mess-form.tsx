"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Upload, Minus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function AddMessForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    pincode: "",
    type: "",
    servingType: "",
    price: "",
    description: "",
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
  const [photos, setPhotos] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }))
  }

  const handleServingTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, servingType: value }))
  }

  const handleDayToggle = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      openDays: {
        ...prev.openDays,
        [day]: !prev.openDays[day as keyof typeof prev.openDays],
      },
    }))
  }

  const handleAddPhoto = () => {
    if (photos.length < 3) {
      // Simulate adding a photo
      setPhotos((prev) => [...prev, `/placeholder.svg?height=200&width=200&query=Mess photo ${prev.length + 1}`])
    }
  }

  const handleRemovePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Profile created!",
        description: "Others can now add reviews.",
        duration: 5000,
      })
      router.push("/my-mess")
    }, 1500)
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-6">
      <Link href="/my-mess" className="inline-block mb-4">
        <Button variant="ghost" className="pl-0">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </Link>

      <header className="mb-6">
        <h1 className="text-2xl font-bold text-red-600">Add a New Mess or Tiffin Service</h1>
        <p className="text-sm text-gray-500">List a mess that's not on MessCheck yet</p>
      </header>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Basic Information</CardTitle>
            <CardDescription>Provide details about the mess</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Mess Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. GreenLeaf Mess"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Full address with landmarks"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pincode">Pin Code</Label>
              <Input
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="e.g. 400076"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Cuisine Type</Label>
              <RadioGroup
                value={formData.type}
                onValueChange={handleTypeChange}
                className="grid grid-cols-2 gap-2"
                required
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
              <Label>Serving Type</Label>
              <RadioGroup
                value={formData.servingType}
                onValueChange={handleServingTypeChange}
                className="grid grid-cols-3 gap-2"
                required
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
              <Label htmlFor="price">Monthly Price (₹)</Label>
              <Input
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                type="number"
                placeholder="e.g. 2400"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell us about the mess, special dishes, etc. (Max 200 characters)"
                maxLength={200}
              />
              <div className="text-xs text-right text-gray-500">{formData.description.length}/200 characters</div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Open Days</CardTitle>
            <CardDescription>Select days when the mess is open</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(formData.openDays).map(([day, isChecked]) => (
                <div key={day} className="flex items-center space-x-2">
                  <Checkbox id={day} checked={isChecked} onCheckedChange={() => handleDayToggle(day)} />
                  <Label htmlFor={day} className="capitalize">
                    {day.slice(0, 3)}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Photos</CardTitle>
            <CardDescription>Add up to 3 photos of the mess (optional)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {photos.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative rounded-md overflow-hidden aspect-square">
                      <img
                        src={photo || "/placeholder.svg"}
                        alt={`Mess photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6"
                        type="button"
                        onClick={() => handleRemovePhoto(index)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {photos.length < 3 && (
                <Button variant="outline" className="w-full h-16 border-dashed" type="button" onClick={handleAddPhoto}>
                  <Upload className="mr-2 h-4 w-4" /> Upload Photo
                </Button>
              )}

              <p className="text-xs text-gray-500">Photos help users identify the mess and see the environment.</p>
            </div>
          </CardContent>
        </Card>

        <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 text-amber-800 text-sm mb-6">
          <p className="font-bold">Note:</p>
          <p className="mt-1">
            This mess will be marked as "Unclaimed" until the owner verifies it. You can claim this mess later if you're
            the owner.
          </p>
        </div>

        <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit for Review"}
        </Button>
      </form>
    </div>
  )
}
