"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { AlertCircle, Lock, Shield } from "lucide-react"

export default function PrivacySettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [privacySettings, setPrivacySettings] = useState({
    shareLocation: true,
    shareProfile: true,
    allowMessToContact: true,
    showReviews: true,
    dataCollection: true,
    twoFactorAuth: false,
    loginNotifications: true,
  })

  const handleToggle = (key: keyof typeof privacySettings) => {
    setPrivacySettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Privacy settings updated",
        description: "Your privacy settings have been saved.",
      })
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5 text-red-600" />
            Privacy Settings
          </CardTitle>
          <CardDescription>Manage your privacy preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="share-location">Share Location</Label>
                <p className="text-sm text-muted-foreground">Allow the app to access your location</p>
              </div>
              <Switch
                id="share-location"
                checked={privacySettings.shareLocation}
                onCheckedChange={() => handleToggle("shareLocation")}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="share-profile">Profile Visibility</Label>
                <p className="text-sm text-muted-foreground">Allow other users to see your profile</p>
              </div>
              <Switch
                id="share-profile"
                checked={privacySettings.shareProfile}
                onCheckedChange={() => handleToggle("shareProfile")}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="allow-contact">Allow Mess to Contact</Label>
                <p className="text-sm text-muted-foreground">Allow mess providers to contact you</p>
              </div>
              <Switch
                id="allow-contact"
                checked={privacySettings.allowMessToContact}
                onCheckedChange={() => handleToggle("allowMessToContact")}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="show-reviews">Show My Reviews</Label>
                <p className="text-sm text-muted-foreground">Display your reviews publicly</p>
              </div>
              <Switch
                id="show-reviews"
                checked={privacySettings.showReviews}
                onCheckedChange={() => handleToggle("showReviews")}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="data-collection">Data Collection</Label>
                <p className="text-sm text-muted-foreground">Allow us to collect usage data to improve the app</p>
              </div>
              <Switch
                id="data-collection"
                checked={privacySettings.dataCollection}
                onCheckedChange={() => handleToggle("dataCollection")}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lock className="mr-2 h-5 w-5 text-red-600" />
            Security Settings
          </CardTitle>
          <CardDescription>Manage your account security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
              </div>
              <Switch
                id="two-factor"
                checked={privacySettings.twoFactorAuth}
                onCheckedChange={() => handleToggle("twoFactorAuth")}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="login-notifications">Login Notifications</Label>
                <p className="text-sm text-muted-foreground">Get notified when someone logs into your account</p>
              </div>
              <Switch
                id="login-notifications"
                checked={privacySettings.loginNotifications}
                onCheckedChange={() => handleToggle("loginNotifications")}
              />
            </div>

            <Separator />

            <div className="pt-2">
              <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50">
                Change Password
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 text-amber-800 text-sm mb-6 flex items-start">
        <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold">Privacy Notice</p>
          <p className="mt-1">
            We take your privacy seriously. Your data is encrypted and stored securely. We never share your personal
            information with third parties without your consent.
          </p>
        </div>
      </div>

      <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Settings"}
      </Button>
    </form>
  )
}
