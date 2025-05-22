"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Upload, ArrowLeft } from "lucide-react"

export function ReviewForm({ messName = "" }: { messName?: string }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [ratings, setRatings] = useState({
    taste: 0,
    hygiene: 0,
    punctuality: 0,
    quantity: 0,
  })
  const [comment, setComment] = useState("")
  const [recommended, setRecommended] = useState(false)
  const [photos, setPhotos] = useState<string[]>([])
  const [selectedMess, setSelectedMess] = useState(messName || "")

  const handleRatingChange = (category: keyof typeof ratings, value: number) => {
    setRatings((prev) => ({ ...prev, [category]: value }))
  }

  const handleAddPhoto = () => {
    if (photos.length < 2) {
      // Simulate adding a photo
      setPhotos((prev) => [...prev, `/placeholder.svg?height=200&width=200&query=Food photo ${prev.length + 1}`])
    }
  }

  const handleRemovePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Calculate average rating
    const avgRating = Object.values(ratings).reduce((sum, rating) => sum + rating, 0) / Object.keys(ratings).length

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      router.push(messName ? `/mess/${messName.toLowerCase().replace(/\s+/g, "-")}` : "/explore")
    }, 1500)
  }

  const getOverallRating = () => {
    const sum = Object.values(ratings).reduce((acc, val) => acc + val, 0)
    const count = Object.values(ratings).filter((val) => val > 0).length
    return count > 0 ? (sum / count).toFixed(1) : "0.0"
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-6">
      <Button variant="ghost" className="pl-0 mb-4" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <header className="mb-6">
        <h1 className="text-2xl font-bold text-red-600">Write a Review</h1>
        <p className="text-sm text-gray-500">Share your experience with other users</p>
      </header>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6 border-red-100">
          <CardHeader>
            <CardTitle className="text-lg">Rate Your Experience</CardTitle>
            <CardDescription>How was your experience with the mess?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!messName && (
              <div className="space-y-2">
                <Label htmlFor="mess">Select Mess</Label>
                <Select value={selectedMess} onValueChange={setSelectedMess} required>
                  <SelectTrigger id="mess" className="w-full">
                    <SelectValue placeholder="Select a mess" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GreenLeaf Mess">GreenLeaf Mess</SelectItem>
                    <SelectItem value="Khan's Kitchen">Khan's Kitchen</SelectItem>
                    <SelectItem value="Jain Bhojan">Jain Bhojan</SelectItem>
                    <SelectItem value="Sharma's Tiffin Service">Sharma's Tiffin Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label htmlFor="taste">Taste</Label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      className="focus:outline-none"
                      onClick={() => handleRatingChange("taste", value)}
                    >
                      <Star
                        className={`h-5 w-5 ${
                          value <= ratings.taste ? "fill-amber-500 text-amber-500" : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Label htmlFor="hygiene">Hygiene</Label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      className="focus:outline-none"
                      onClick={() => handleRatingChange("hygiene", value)}
                    >
                      <Star
                        className={`h-5 w-5 ${
                          value <= ratings.hygiene ? "fill-amber-500 text-amber-500" : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Label htmlFor="punctuality">Punctuality</Label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      className="focus:outline-none"
                      onClick={() => handleRatingChange("punctuality", value)}
                    >
                      <Star
                        className={`h-5 w-5 ${
                          value <= ratings.punctuality ? "fill-amber-500 text-amber-500" : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Label htmlFor="quantity">Quantity</Label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      className="focus:outline-none"
                      onClick={() => handleRatingChange("quantity", value)}
                    >
                      <Star
                        className={`h-5 w-5 ${
                          value <= ratings.quantity ? "fill-amber-500 text-amber-500" : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Overall Rating</span>
                <div className="flex items-center">
                  <span className="mr-2 font-medium text-amber-500">{getOverallRating()}</span>
                  <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comment">Your Review</Label>
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience with this mess..."
                  className="min-h-[100px]"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 border-red-100">
          <CardHeader>
            <CardTitle className="text-lg">Photos</CardTitle>
            <CardDescription>Add photos of the food (optional)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {photos.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative rounded-md overflow-hidden aspect-square">
                      <img
                        src={photo || "/placeholder.svg"}
                        alt={`Food photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6"
                        type="button"
                        onClick={() => handleRemovePhoto(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {photos.length < 2 && (
                <Button variant="outline" className="w-full h-16 border-dashed" type="button" onClick={handleAddPhoto}>
                  <Upload className="mr-2 h-4 w-4" /> Upload Photo
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 border-red-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="recommended">Would you recommend this mess?</Label>
                <p className="text-sm text-muted-foreground">Let others know if this mess is worth trying</p>
              </div>
              <Switch id="recommended" checked={recommended} onCheckedChange={setRecommended} />
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </div>
  )
}
