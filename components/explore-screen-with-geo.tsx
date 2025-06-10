"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPin, Star, Filter, Bell, ChevronDown, Search, Compass } from "lucide-react"
import { useGeolocation, calculateDistance, formatDistance } from "@/hooks/use-geolocation"
import { GeolocationPermission } from "@/components/geolocation-permission"
import { OfflineIndicator } from "@/components/offline-indicator"
import { useOnlineStatus } from "@/hooks/use-online-status"
import offlineManager from "@/utils/offline-manager"

// Sample data with coordinates - add distance property to types
const messData = [
  {
    id: 1,
    name: "Sharma's Tiffin Service",
    type: "Veg",
    ethnicity: "North Indian",
    price: "₹3500/month",
    rating: 4.5,
    coordinates: { latitude: 19.1334, longitude: 72.9133 },
    distance: "0.5 km", // Add default distance
    tags: ["North Indian"],
    isFavorite: false,
    isVerified: true,
    ratings: {
      taste: 4.5,
      hygiene: 4.3,
      punctual: 4.6,
    },
  },
  {
    id: 2,
    name: "Khan's Kitchen",
    type: "Non-Veg",
    ethnicity: "Punjabi",
    price: "₹2700/month",
    rating: 4.0,
    coordinates: { latitude: 19.1354, longitude: 72.9153 },
    distance: "0.8 km", // Add default distance
    tags: ["North Indian", "Mughlai"],
    isFavorite: false,
    isVerified: true,
    ratings: {
      taste: 4.2,
      hygiene: 3.8,
      punctual: 4.0,
    },
  },
  {
    id: 3,
    name: "Jain Bhojan",
    type: "Jain",
    ethnicity: "Gujarati",
    price: "₹2500/month",
    rating: 4.2,
    coordinates: { latitude: 19.1374, longitude: 72.9173 },
    distance: "1.2 km", // Add default distance
    tags: ["Jain", "Gujarati"],
    isFavorite: true,
    isVerified: false,
    ratings: {
      taste: 4.3,
      hygiene: 4.1,
      punctual: 4.2,
    },
  },
]

// Unclaimed mess data with coordinates - add distance property
const unclaimedMessData = [
  {
    id: 101,
    name: "Student's Favorite Mess",
    type: "Mixed",
    rating: 3.8,
    coordinates: { latitude: 19.1314, longitude: 72.9113 },
    distance: "0.3 km", // Add default distance
    location: "Delhi University",
    isUnclaimed: true,
  },
  {
    id: 102,
    name: "Campus Tiffin",
    type: "Veg",
    rating: 4.1,
    coordinates: { latitude: 19.1294, longitude: 72.9093 },
    distance: "0.5 km", // Add default distance
    location: "IIT Bombay",
    isUnclaimed: true,
  },
]

export function ExploreScreenWithGeo() {
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [messes, setMesses] = useState(messData)
  const [unclaimedMesses, setUnclaimedMesses] = useState(unclaimedMessData)
  const [activeFilter, setActiveFilter] = useState("all")
  const [sortedByDistance, setSortedByDistance] = useState(false)
  const isOnline = useOnlineStatus()

  // Get user's geolocation
  const geolocation = useGeolocation({ enableHighAccuracy: true })

  useEffect(() => {
    // Simulate data loading and cache data for offline use
    const timer = setTimeout(async () => {
      setLoading(false)

      // If online, cache the mess data for offline use
      if (isOnline && offlineManager) {
        try {
          // Store each mess in the offline database with correct signature
          for (const mess of messData) {
            offlineManager.storeData("mess", mess)
          }

          // Store unclaimed mess data
          for (const mess of unclaimedMessData) {
            offlineManager.storeData("mess", mess)
          }
        } catch (error) {
          console.error("Error caching mess data:", error)
        }
      }

      // If offline, try to load cached data
      if (!isOnline && offlineManager) {
        try {
          const cachedMesses = offlineManager.getAllDataByType("mess")
          if (cachedMesses.length > 0) {
            const claimed = cachedMesses.filter((item) => !item.isUnclaimed)
            const unclaimed = cachedMesses.filter((item) => item.isUnclaimed)

            if (claimed.length > 0) setMesses(claimed)
            if (unclaimed.length > 0) setUnclaimedMesses(unclaimed)
          }
        } catch (error) {
          console.error("Error loading cached mess data:", error)
        }
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [isOnline])

  // Update distances when geolocation changes
  useEffect(() => {
    if (geolocation.position.latitude && geolocation.position.longitude) {
      // Calculate distances for all messes
      const userLat = geolocation.position.latitude
      const userLng = geolocation.position.longitude

      // Update claimed messes with distances
      const messesWithDistance = messes.map((mess) => {
        const distance = calculateDistance(userLat, userLng, mess.coordinates.latitude, mess.coordinates.longitude)
        return {
          ...mess,
          distance: formatDistance(distance),
          distanceValue: distance, // For sorting
        }
      })

      // Update unclaimed messes with distances
      const unclaimedWithDistance = unclaimedMesses.map((mess) => {
        const distance = calculateDistance(userLat, userLng, mess.coordinates.latitude, mess.coordinates.longitude)
        return {
          ...mess,
          distance: formatDistance(distance),
          distanceValue: distance, // For sorting
        }
      })

      // Sort by distance if that filter is active
      if (sortedByDistance) {
        messesWithDistance.sort((a, b) => a.distanceValue - b.distanceValue)
        unclaimedWithDistance.sort((a, b) => a.distanceValue - b.distanceValue)
      }

      setMesses(messesWithDistance)
      setUnclaimedMesses(unclaimedWithDistance)
    }
  }, [geolocation.position, sortedByDistance])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleToggleFavorite = (id: number) => {
    setMesses((prev) => prev.map((mess) => (mess.id === id ? { ...mess, isFavorite: !mess.isFavorite } : mess)))
  }

  const handleFindNearby = () => {
    if (geolocation.position.latitude && geolocation.position.longitude) {
      setSortedByDistance(true)
      setActiveFilter("nearest")
    }
  }

  const filteredMesses = messes.filter((mess) => {
    const matchesSearch =
      mess.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mess.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      mess.ethnicity.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeFilter === "all") return matchesSearch
    if (activeFilter === "nearest") return matchesSearch
    if (activeFilter === "top-rated") return matchesSearch && mess.rating >= 4.0
    if (activeFilter === "veg-only") return matchesSearch && mess.type === "Veg"
    if (activeFilter === "non-veg") return matchesSearch && mess.type === "Non-Veg"

    return matchesSearch
  })

  return (
    <div className="container max-w-md mx-auto px-4">
      <header className="flex justify-between items-center py-3 sticky top-0 bg-white z-10">
        <div>
          <h1 className="text-2xl font-bold text-red-600">MessCheck</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center text-gray-700">
            <span className="text-sm font-medium">IIT Bombay</span>
            <ChevronDown className="h-4 w-4 ml-1" />
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></span>
          </Button>
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-sm font-medium">AS</span>
          </div>
        </div>
      </header>

      {/* Offline indicator */}
      <OfflineIndicator />

      {/* Geolocation permission request */}
      <GeolocationPermission />

      <div className="mb-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search mess services"
            className="pl-10 pr-4 border-gray-200"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Button
            variant="outline"
            size="sm"
            className={`whitespace-nowrap ${activeFilter === "nearest" ? "bg-red-50 text-red-600 border-red-200" : "border-gray-200"}`}
            onClick={() => {
              setActiveFilter("nearest")
              setSortedByDistance(true)
            }}
          >
            Nearest
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`whitespace-nowrap ${activeFilter === "top-rated" ? "bg-red-50 text-red-600 border-red-200" : "border-gray-200"}`}
            onClick={() => {
              setActiveFilter("top-rated")
              setSortedByDistance(false)
            }}
          >
            Top Rated
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`whitespace-nowrap ${activeFilter === "veg-only" ? "bg-red-50 text-red-600 border-red-200" : "border-gray-200"}`}
            onClick={() => {
              setActiveFilter("veg-only")
              setSortedByDistance(false)
            }}
          >
            Veg Only
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`whitespace-nowrap ${activeFilter === "non-veg" ? "bg-red-50 text-red-600 border-red-200" : "border-gray-200"}`}
            onClick={() => {
              setActiveFilter("non-veg")
              setSortedByDistance(false)
            }}
          >
            Non-Veg
          </Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap border-gray-200">
            <Filter className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-medium">Find Messes Nearby</h2>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleFindNearby}
              disabled={!geolocation.position.latitude || geolocation.loading}
            >
              {geolocation.loading ? (
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              ) : (
                <Compass className="h-4 w-4 mr-2" />
              )}
              Find Nearby
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            {geolocation.error
              ? `Error: ${geolocation.error}`
              : geolocation.position.latitude
                ? "Using your current location to find nearby mess services"
                : "Use your current location to find mess services near you"}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-24 w-full rounded-lg" />
          <Skeleton className="h-24 w-full rounded-lg" />
        </div>
      ) : (
        <>
          <div className="mb-6">
            <div className="bg-amber-50 rounded-lg border border-amber-200 p-4 mb-4">
              <h2 className="font-medium text-amber-800 mb-1">Unclaimed Mess Profiles</h2>
              <p className="text-xs text-amber-700 mb-3">
                Own a mess that's listed here? Claim your business profile to respond to reviews and update information.
              </p>

              {unclaimedMesses.map((mess) => (
                <div key={mess.id} className="bg-white rounded-lg border border-gray-200 p-3 mb-3 last:mb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium">{mess.name}</h3>
                        <Badge className="ml-2 bg-amber-100 text-amber-800 border-amber-200">Unclaimed</Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <span className="flex items-center mr-2">
                          <span className="text-amber-500 font-medium mr-1">{mess.rating}</span>
                          <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {mess.distance || "Distance unavailable"} from {mess.location}
                        </span>
                      </div>
                    </div>
                    <Badge className="bg-gray-100 text-gray-800 border-gray-200">{mess.type}</Badge>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" className="flex-1 border-gray-200">
                      View
                    </Button>
                    <Button size="sm" className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                      Claim
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-medium">All Mess Services</h2>
              <span className="text-sm text-gray-500">{filteredMesses.length} results</span>
            </div>

            <div className="space-y-4">
              {filteredMesses.map((mess) => (
                <VerifiedMessCard
                  key={mess.id}
                  id={mess.id}
                  name={mess.name}
                  type={mess.type}
                  ethnicity={mess.ethnicity}
                  price={mess.price}
                  rating={mess.rating}
                  distance={mess.distance || "Distance unavailable"}
                  isVerified={mess.isVerified}
                  ratings={mess.ratings}
                  isFavorite={mess.isFavorite}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function VerifiedMessCard({
  id,
  name,
  type,
  ethnicity,
  price,
  rating,
  distance,
  isVerified,
  ratings,
  isFavorite,
  onToggleFavorite,
}: {
  id: number
  name: string
  type: string
  ethnicity: string
  price: string
  rating: number
  distance: string
  isVerified: boolean
  ratings: {
    taste: number
    hygiene: number
    punctual: number
  }
  isFavorite: boolean
  onToggleFavorite: (id: number) => void
}) {
  return (
    <Card className="overflow-hidden border-gray-200 shadow-sm">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="flex items-center">
              <h3 className="font-medium">{name}</h3>
              {isVerified && <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">Verified</Badge>}
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              <Badge variant="outline" className="text-xs font-normal border-gray-200">
                {type}
              </Badge>
              <Badge variant="outline" className="text-xs font-normal border-gray-200">
                {ethnicity}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <span className="font-medium text-red-600">{price}</span>
          </div>
        </div>

        <div className="flex items-center text-xs text-gray-500 mb-2">
          <MapPin className="mr-1 h-3 w-3" />
          <span>{distance}</span>
        </div>

        <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3 text-xs">
          <div className="flex items-center">
            <span className="mr-1">Taste</span>
            <span className="font-medium text-amber-500">{ratings.taste}</span>
            <Star className="h-3 w-3 fill-amber-500 text-amber-500 ml-1" />
          </div>
          <div className="flex items-center">
            <span className="mr-1">Hygiene</span>
            <span className="font-medium text-amber-500">{ratings.hygiene}</span>
            <Star className="h-3 w-3 fill-amber-500 text-amber-500 ml-1" />
          </div>
          <div className="flex items-center">
            <span className="mr-1">Punctual</span>
            <span className="font-medium text-amber-500">{ratings.punctual}</span>
            <Star className="h-3 w-3 fill-amber-500 text-amber-500 ml-1" />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Link href={`/mess/${name.toLowerCase().replace(/\s+/g, "-")}`}>
            <Button variant="outline" size="sm" className="border-gray-200">
              View Details
            </Button>
          </Link>
          <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
            Request Trial
          </Button>
        </div>
      </div>
      <div className="absolute top-2 right-2">
        <div className="flex items-center bg-amber-50 rounded-full px-1.5 py-0.5">
          <Star className="h-3 w-3 fill-amber-500 text-amber-500 mr-0.5" />
          <span className="text-xs font-medium text-amber-800">{rating}</span>
        </div>
      </div>
    </Card>
  )
}
