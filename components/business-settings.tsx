
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Building, MapPin, Clock, Users } from "lucide-react"

export default function BusinessSettings() {
  const [businessInfo, setBusinessInfo] = useState({
    messName: "Sharma's Tiffin Service",
    address: "123 Main Street, Block A",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    operatingHours: "8:00 AM - 10:00 PM",
    capacity: "50",
  })
  
  const { toast } = useToast()

  const handleSave = () => {
    // Mock save functionality
    toast({
      title: "Business settings updated",
      description: "Your business information has been saved successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Business Information
          </CardTitle>
          <CardDescription>
            Update your mess details and business information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="messName">Mess Name</Label>
            <Input
              id="messName"
              value={businessInfo.messName}
              onChange={(e) => setBusinessInfo({ ...businessInfo, messName: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={businessInfo.address}
              onChange={(e) => setBusinessInfo({ ...businessInfo, address: e.target.value })}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={businessInfo.city}
                onChange={(e) => setBusinessInfo({ ...businessInfo, city: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={businessInfo.state}
                onChange={(e) => setBusinessInfo({ ...businessInfo, state: e.target.value })}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="pincode">Pincode</Label>
            <Input
              id="pincode"
              value={businessInfo.pincode}
              onChange={(e) => setBusinessInfo({ ...businessInfo, pincode: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Operating Details
          </CardTitle>
          <CardDescription>
            Set your operating hours and capacity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hours">Operating Hours</Label>
            <Input
              id="hours"
              value={businessInfo.operatingHours}
              onChange={(e) => setBusinessInfo({ ...businessInfo, operatingHours: e.target.value })}
              placeholder="e.g., 8:00 AM - 10:00 PM"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="capacity">Seating Capacity</Label>
            <Input
              id="capacity"
              type="number"
              value={businessInfo.capacity}
              onChange={(e) => setBusinessInfo({ ...businessInfo, capacity: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full">
        Save Business Settings
      </Button>
    </div>
  )
}
