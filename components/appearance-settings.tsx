"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Moon, Sun, Palette, Type } from "lucide-react"

export default function AppearanceSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [appearance, setAppearance] = useState({
    theme: "light",
    fontSize: 16,
    reducedMotion: false,
    highContrast: false,
    colorScheme: "default",
  })

  const handleThemeChange = (value: string) => {
    setAppearance((prev) => ({ ...prev, theme: value }))
  }

  const handleFontSizeChange = (value: number[]) => {
    setAppearance((prev) => ({ ...prev, fontSize: value[0] }))
  }

  const handleToggle = (key: keyof typeof appearance) => {
    setAppearance((prev) => ({ ...prev, [key]: !prev[key as keyof typeof appearance] }))
  }

  const handleColorSchemeChange = (value: string) => {
    setAppearance((prev) => ({ ...prev, colorScheme: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Appearance settings updated",
        description: "Your appearance settings have been saved.",
      })
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Palette className="mr-2 h-5 w-5 text-red-600" />
            Theme Settings
          </CardTitle>
          <CardDescription>Customize the app appearance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <Label>Theme Mode</Label>
            <RadioGroup value={appearance.theme} onValueChange={handleThemeChange} className="grid grid-cols-3 gap-2">
              <div className="flex flex-col items-center space-y-2 rounded-md border p-3">
                <Sun className="h-5 w-5 text-amber-500" />
                <RadioGroupItem value="light" id="light" className="sr-only" />
                <Label htmlFor="light" className="cursor-pointer text-sm">
                  Light
                </Label>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-md border p-3">
                <Moon className="h-5 w-5 text-blue-500" />
                <RadioGroupItem value="dark" id="dark" className="sr-only" />
                <Label htmlFor="dark" className="cursor-pointer text-sm">
                  Dark
                </Label>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-md border p-3">
                <div className="flex">
                  <Sun className="h-5 w-5 text-amber-500" />
                  <Moon className="h-5 w-5 text-blue-500 -ml-1" />
                </div>
                <RadioGroupItem value="system" id="system" className="sr-only" />
                <Label htmlFor="system" className="cursor-pointer text-sm">
                  System
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          <div className="space-y-4">
            <Label>Color Scheme</Label>
            <RadioGroup
              value={appearance.colorScheme}
              onValueChange={handleColorSchemeChange}
              className="grid grid-cols-3 gap-2"
            >
              <div className="flex flex-col items-center space-y-2 rounded-md border p-3">
                <div className="h-5 w-5 rounded-full bg-red-500" />
                <RadioGroupItem value="default" id="default" className="sr-only" />
                <Label htmlFor="default" className="cursor-pointer text-sm">
                  Default
                </Label>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-md border p-3">
                <div className="h-5 w-5 rounded-full bg-blue-500" />
                <RadioGroupItem value="blue" id="blue" className="sr-only" />
                <Label htmlFor="blue" className="cursor-pointer text-sm">
                  Blue
                </Label>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-md border p-3">
                <div className="h-5 w-5 rounded-full bg-green-500" />
                <RadioGroupItem value="green" id="green" className="sr-only" />
                <Label htmlFor="green" className="cursor-pointer text-sm">
                  Green
                </Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Type className="mr-2 h-5 w-5 text-red-600" />
            Text Settings
          </CardTitle>
          <CardDescription>Adjust text size and readability</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="font-size">Font Size</Label>
                <span className="text-sm">{appearance.fontSize}px</span>
              </div>
              <Slider
                id="font-size"
                min={12}
                max={24}
                step={1}
                value={[appearance.fontSize]}
                onValueChange={handleFontSizeChange}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Small</span>
                <span>Large</span>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="high-contrast">High Contrast</Label>
                <p className="text-sm text-muted-foreground">Increase contrast for better readability</p>
              </div>
              <Switch
                id="high-contrast"
                checked={appearance.highContrast}
                onCheckedChange={() => handleToggle("highContrast")}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="reduced-motion">Reduced Motion</Label>
                <p className="text-sm text-muted-foreground">Minimize animations throughout the app</p>
              </div>
              <Switch
                id="reduced-motion"
                checked={appearance.reducedMotion}
                onCheckedChange={() => handleToggle("reducedMotion")}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Settings"}
      </Button>
    </form>
  )
}
