"use client"

import { useState } from "react"
import { ProviderSettingsLayout } from "@/components/provider-settings-layout"
import { ProviderBottomNavigation } from "@/components/provider-bottom-navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, MapPin, School } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MessProfileSettingsPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <>
      <ProviderSettingsLayout title="Mess Profile" description="Edit your mess details and information">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="details" className="flex items-center gap-1">
              <Building className="h-4 w-4" />
              <span>Details</span>
            </TabsTrigger>
            <TabsTrigger value="address" className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>Address</span>
            </TabsTrigger>
            <TabsTrigger value="nearby" className="flex items-center gap-1">
              <School className="h-4 w-4" />
              <span>Nearby</span>
            </TabsTrigger>
          </TabsList>

          {/* Mess Details Section */}
          <TabsContent value="details" className="space-y-4">
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="messName">Mess Name</Label>
                <Input id="messName" defaultValue="Annapurna Mess" />
              </div>

              <div className="space-y-1">
                <Label htmlFor="ownerName">Mess Owner Name</Label>
                <Input id="ownerName" defaultValue="Rajesh Sharma" />
              </div>

              <div className="space-y-1">
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input id="contactNumber" type="tel" defaultValue="+91 98765 43210" />
              </div>

              <div className="space-y-1">
                <Label htmlFor="email">Email ID</Label>
                <Input id="email" type="email" defaultValue="annapurna@example.com" />
              </div>

              <div className="space-y-1">
                <Label htmlFor="messType">Mess Type</Label>
                <Select defaultValue="mixed">
                  <SelectTrigger id="messType">
                    <SelectValue placeholder="Select mess type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="veg">Vegetarian</SelectItem>
                    <SelectItem value="nonveg">Non-Vegetarian</SelectItem>
                    <SelectItem value="jain">Jain</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="cuisineType">Cuisine Type</Label>
                <Select defaultValue="north">
                  <SelectTrigger id="cuisineType">
                    <SelectValue placeholder="Select cuisine type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="north">North Indian</SelectItem>
                    <SelectItem value="south">South Indian</SelectItem>
                    <SelectItem value="maharashtrian">Maharashtrian</SelectItem>
                    <SelectItem value="gujarati">Gujarati</SelectItem>
                    <SelectItem value="punjabi">Punjabi</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Details"}
              </Button>
            </div>
          </TabsContent>

          {/* Address Section */}
          <TabsContent value="address" className="space-y-4">
            <div className="space-y-3">
              <Button variant="outline" className="w-full flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Use Current Location</span>
              </Button>

              <div className="space-y-1">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="123, Main Street, Near City Park" />
              </div>

              <div className="space-y-1">
                <Label htmlFor="city">City</Label>
                <Input id="city" defaultValue="Pune" />
              </div>

              <div className="space-y-1">
                <Label htmlFor="pincode">Pin Code</Label>
                <Input id="pincode" defaultValue="411001" />
              </div>

              <div className="space-y-1">
                <Label htmlFor="landmark">Landmark (Optional)</Label>
                <Input id="landmark" defaultValue="Opposite to Central Mall" />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Address"}
              </Button>
            </div>
          </TabsContent>

          {/* Nearby Institutions Section */}
          <TabsContent value="nearby" className="space-y-4">
            <div className="bg-orange-50 p-3 rounded-lg text-sm text-orange-800 mb-4">
              Tag nearby colleges or companies to help your mess appear to users from these institutions.
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Input placeholder="Search colleges or companies..." />
                <Button variant="outline" size="icon">
                  <span className="sr-only">Search</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-search"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </Button>
              </div>

              <div className="space-y-2">
                <div className="bg-gray-100 p-2 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <School className="h-4 w-4 text-gray-500" />
                    <span>Pune University</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 px-2">
                    <span className="sr-only">Remove</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-x"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </Button>
                </div>

                <div className="bg-gray-100 p-2 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <School className="h-4 w-4 text-gray-500" />
                    <span>Symbiosis College</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 px-2">
                    <span className="sr-only">Remove</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-x"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </Button>
                </div>

                <div className="bg-gray-100 p-2 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-gray-500" />
                    <span>Infosys Campus</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 px-2">
                    <span className="sr-only">Remove</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-x"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Institutions"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </ProviderSettingsLayout>
      <ProviderBottomNavigation activeTab="settings" />
    </>
  )
}
