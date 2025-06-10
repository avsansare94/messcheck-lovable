"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Star,
  Clock,
  ArrowLeft,
  Heart,
  Share2,
  MapPin,
  Phone,
  Navigation,
  Copy,
  Check,
  MessageSquare,
} from "lucide-react"
import { useGeolocation } from "@/hooks/use-geolocation"
import { useOnlineStatus } from "@/hooks/use-online-status"
import { useToast } from "@/hooks/use-toast"

// Sample mess data with coordinates
const messDetails = {
  "greenleaf-mess": {
    name: "GreenLeaf Mess",
    type: "Veg",
    ethnicity: "Maharashtrian",
    price: "₹2400",
    rating: 4.7,
    tags: ["South Indian", "North Indian"],
    openDays: ["mon", "tue", "wed", "thu", "fri", "sat"],
    timings: "Lunch: 12:30-2:30 PM, Dinner: 7:30-9:30 PM",
    isClaimed: true,
    isVerified: true,
    verifiedDate: "May 5, 2023",
    address: "123 Hostel Road, Powai",
    distance: "0.5 km from IIT Bombay",
    coordinates: {
      latitude: 19.1334,
      longitude: 72.9133,
    },
    phone: "+91 98765 43210",
    description: "Authentic home-cooked meals delivered fresh daily",
    menu: {
      lunch: [
        "Rice, Dal, Chapati",
        "Mix Vegetable Curry",
        "Paneer Butter Masala",
        "Salad, Papad, Pickle",
        "Sweet: Gulab Jamun",
      ],
      dinner: ["Rice, Dal, Chapati", "Aloo Gobi", "Chana Masala", "Salad, Papad, Pickle", "Dessert: Fruit Custard"],
    },
    ratings: {
      taste: 4.7,
      hygiene: 4.3,
      punctuality: 4.9,
      quantity: 4.4,
    },
    reviews: [
      {
        id: 1,
        user: "Rahul S.",
        rating: 5,
        date: "2 weeks ago",
        comment: "Best mess around the campus. Food quality is excellent and consistent. Highly recommended!",
        recommended: true,
        tags: ["Tasty", "Clean", "Value for money"],
      },
      {
        id: 2,
        user: "Priya M.",
        rating: 4,
        date: "1 month ago",
        comment: "Good food quality. Sometimes the curry is a bit spicy, but overall a good option.",
        recommended: true,
      },
      {
        id: 3,
        user: "Amit K.",
        rating: 4,
        date: "2 months ago",
        comment: "Clean place, good food. The owner is very friendly and accommodating to special requests.",
        recommended: true,
      },
    ],
    plans: [
      { id: 1, name: "Trial (7 days)", price: "₹600" },
      { id: 2, name: "Lunch Only", price: "₹1500/month" },
      { id: 3, name: "Dinner Only", price: "₹1500/month" },
      { id: 4, name: "Full Month", price: "₹2400/month" },
    ],
    servingType: "Lunch & Dinner",
  },
  "khans-kitchen": {
    name: "Khan's Kitchen",
    type: "Non-Veg",
    ethnicity: "Punjabi",
    price: "₹2700",
    rating: 4.2,
    tags: ["North Indian", "Mughlai"],
    openDays: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
    timings: "Lunch: 12:00-3:00 PM, Dinner: 7:00-10:00 PM",
    isClaimed: true,
    isVerified: true,
    verifiedDate: "June 10, 2023",
    address: "45 Food Street, Powai",
    distance: "0.8 km from IIT Bombay",
    coordinates: {
      latitude: 19.1367,
      longitude: 72.9121,
    },
    phone: "+91 98765 43211",
    description: "Authentic home-cooked meals delivered fresh daily",
    menu: {
      lunch: ["Rice, Dal, Chapati", "Chicken Curry", "Mix Vegetable", "Salad, Papad, Pickle", "Sweet: Jalebi"],
      dinner: [
        "Rice, Dal, Chapati",
        "Mutton Curry (Wed, Sun)",
        "Egg Curry (Other days)",
        "Salad, Papad, Pickle",
        "Dessert: Ice Cream (Weekends)",
      ],
    },
    ratings: {
      taste: 4.5,
      hygiene: 4.0,
      punctuality: 4.2,
      quantity: 4.6,
    },
    reviews: [
      {
        id: 1,
        user: "Arjun P.",
        rating: 5,
        date: "1 week ago",
        comment: "Amazing non-veg options! The chicken curry on Wednesday is to die for.",
        recommended: true,
        tags: ["Spicy", "Delicious"],
      },
      {
        id: 2,
        user: "Zoya K.",
        rating: 3,
        date: "3 weeks ago",
        comment: "Food is good but sometimes it's too oily. Service is excellent though.",
        recommended: false,
      },
    ],
    plans: [
      { id: 1, name: "Trial (5 days)", price: "₹700" },
      { id: 2, name: "Lunch Only", price: "₹1700/month" },
      { id: 3, name: "Dinner Only", price: "₹1700/month" },
      { id: 4, name: "Full Month", price: "₹2700/month" },
    ],
    servingType: "Lunch & Dinner",
  },
  "students-favorite-mess": {
    name: "Student's Favorite Mess",
    type: "Veg",
    ethnicity: "North Indian",
    price: "₹3500",
    rating: 4.5,
    tags: ["North Indian"],
    openDays: ["mon", "tue", "wed", "thu", "fri", "sat"],
    timings: "Breakfast: 7-9 AM, Lunch: 12-2 PM, Dinner: 7-9 PM",
    isClaimed: false,
    isVerified: false,
    address: "123 Hostel Road, Powai",
    distance: "0.5 km from IIT Bombay",
    coordinates: {
      latitude: 19.1301,
      longitude: 72.9156,
    },
    phone: "+91 98765 43212",
    description: "Authentic home-cooked meals delivered fresh daily",
    menu: {
      lunch: [
        "Rice, Dal, Chapati",
        "Mix Vegetable Curry",
        "Paneer Butter Masala",
        "Salad, Papad, Pickle",
        "Sweet: Gulab Jamun",
      ],
      dinner: ["Rice, Dal, Chapati", "Aloo Gobi", "Chana Masala", "Salad, Papad, Pickle", "Dessert: Fruit Custard"],
    },
    ratings: {
      taste: 4.7,
      hygiene: 4.3,
      punctuality: 4.9,
      quantity: 4.4,
    },
    reviews: [
      {
        id: 1,
        user: "Rahul S.",
        rating: 5,
        date: "2 weeks ago",
        comment: "Best mess around the campus. Food quality is excellent and consistent. Highly recommended!",
        recommended: true,
        tags: ["Healthy", "Affordable"],
      },
    ],
    plans: [
      { id: 1, name: "Trial (7 days)", price: "₹600" },
      { id: 2, name: "Lunch Only", price: "₹1500/month" },
      { id: 3, name: "Dinner Only", price: "₹1500/month" },
      { id: 4, name: "Full Month", price: "₹3500/month" },
    ],
    servingType: "Lunch & Dinner",
  },
  "sharmas-tiffin-service": {
    name: "Sharma's Tiffin Service",
    type: "Veg",
    ethnicity: "North Indian",
    price: "₹3500",
    rating: 4.5,
    tags: ["North Indian"],
    openDays: ["mon", "tue", "wed", "thu", "fri", "sat"],
    timings: "Breakfast: 7-9 AM, Lunch: 12-2 PM, Dinner: 7-9 PM",
    isClaimed: true,
    isVerified: true,
    verifiedDate: "May 5, 2023",
    address: "123 Hostel Road, Powai",
    distance: "0.5 km from IIT Bombay",
    coordinates: {
      latitude: 19.1278,
      longitude: 72.9172,
    },
    phone: "+91 98765 43210",
    description: "Authentic home-cooked meals delivered fresh daily",
    menu: {
      lunch: [
        "Rice, Dal, Chapati",
        "Mix Vegetable Curry",
        "Paneer Butter Masala",
        "Salad, Papad, Pickle",
        "Sweet: Gulab Jamun",
      ],
      dinner: ["Rice, Dal, Chapati", "Aloo Gobi", "Chana Masala", "Salad, Papad, Pickle", "Dessert: Fruit Custard"],
    },
    ratings: {
      taste: 4.7,
      hygiene: 4.3,
      punctuality: 4.9,
      quantity: 4.4,
    },
    reviews: [
      {
        id: 1,
        user: "Rahul S.",
        rating: 5,
        date: "2 weeks ago",
        comment: "Best mess around the campus. Food quality is excellent and consistent. Highly recommended!",
        recommended: true,
        tags: ["Home-style", "Wholesome"],
      },
      {
        id: 2,
        user: "Priya M.",
        rating: 4,
        date: "1 month ago",
        comment: "Good food quality. Sometimes the curry is a bit spicy, but overall a good option.",
        recommended: true,
      },
    ],
    plans: [
      { id: 1, name: "Trial (7 days)", price: "₹600" },
      { id: 2, name: "Lunch Only", price: "₹1500/month" },
      { id: 3, name: "Dinner Only", price: "₹1500/month" },
      { id: 4, name: "Full Month", price: "₹3500/month" },
    ],
    servingType: "Lunch & Dinner",
  },
  "jain-bhojan": {
    name: "Jain Bhojan",
    type: "Jain",
    ethnicity: "Gujarati",
    price: "₹2500",
    rating: 4.5,
    tags: ["Jain", "Gujarati"],
    openDays: ["mon", "tue", "wed", "thu", "fri", "sat"],
    timings: "Lunch: 11:30-2:00 PM, Dinner: 7:00-9:00 PM",
    isClaimed: false,
    isVerified: false,
    address: "78 Jain Colony, Powai",
    distance: "1.2 km from IIT Bombay",
    coordinates: {
      latitude: 19.1356,
      longitude: 72.9089,
    },
    phone: "+91 98765 43213",
    description: "Authentic home-cooked meals delivered fresh daily",
    menu: {
      lunch: [
        "Rice, Dal, Chapati",
        "Jain Sabzi (No onion, garlic)",
        "Jain Curry",
        "Salad, Papad",
        "Sweet: Jain Sweets",
      ],
      dinner: ["Rice, Dal, Chapati", "Jain Special Sabzi", "Jain Curry", "Salad, Papad", "Dessert: Fruit Salad"],
    },
    ratings: {
      taste: 4.5,
      hygiene: 4.6,
      punctuality: 4.3,
      quantity: 4.2,
    },
    reviews: [
      {
        id: 1,
        user: "Jinal P.",
        rating: 5,
        date: "2 weeks ago",
        comment: "Perfect for Jain diet followers. Very authentic taste and clean preparation.",
        recommended: true,
        tags: ["Authentic", "Pure"],
      },
    ],
    plans: [
      { id: 1, name: "Trial (7 days)", price: "₹650" },
      { id: 2, name: "Lunch Only", price: "₹1600/month" },
      { id: 3, name: "Dinner Only", price: "₹1600/month" },
      { id: 4, name: "Full Month", price: "₹2500/month" },
    ],
    servingType: "Lunch & Dinner",
  },
}

const MenuSkeleton = () => (
  <div className="space-y-3 p-4">
    <Skeleton className="h-4 w-1/2" />
    <Skeleton className="h-4 w-2/3" />
    <Skeleton className="h-4 w-1/3" />
    <Skeleton className="h-4 w-1/2" />
  </div>
)

const RatingsSkeleton = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-2 flex-1" />
          <Skeleton className="h-4 w-8" />
        </div>
      ))}
    </div>
  </div>
)

export function MessProfile({ slug }: { slug: string }) {
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [showClaimDialog, setShowClaimDialog] = useState(false)
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [activeMenu, setActiveMenu] = useState<"lunch" | "dinner">("lunch")
  const [copied, setCopied] = useState(false)
  const { position, error } = useGeolocation()
  const isOnline = useOnlineStatus()
  const { toast } = useToast()

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Get mess details based on slug or use a default if not found
  const messData = messDetails[slug as keyof typeof messDetails] || messDetails["students-favorite-mess"]

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const handleSelectPlan = (planId: number) => {
    setSelectedPlan(planId)
    setShowPaymentDialog(true)
  }

  // Function to open native maps app with directions
  const openDirections = () => {
    if (!messData.coordinates) {
      alert("Location coordinates not available for this mess.")
      return
    }

    const { latitude, longitude } = messData.coordinates
    const destination = `${latitude},${longitude}`
    const destinationName = encodeURIComponent(messData.name)

    // If user's location is available, use it as the starting point
    let origin = ""
    if (position.latitude && position.longitude) {
      origin = `&origin=${position.latitude},${position.longitude}`
    }

    // Create a maps URL that works across platforms
    let mapsUrl = ""

    // Check if it's iOS
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      // Apple Maps URL format
      mapsUrl = `maps://maps.apple.com/?daddr=${destination}&q=${destinationName}`
    } else {
      // Google Maps URL format (works on Android, desktop)
      mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}&destination_place_id=${destinationName}${origin}`
    }

    // Open the maps URL in a new tab/window
    window.open(mapsUrl, "_blank")
  }

  // Function to share mess location
  const shareMess = async () => {
    if (!isOnline) {
      toast({
        title: "You're offline",
        description: "Please connect to the internet to share this location.",
        variant: "destructive",
      })
      return
    }

    const shareData = {
      title: `Check out ${messData.name}`,
      text: `${messData.name} - ${messData.type} mess in ${messData.address}. ${messData.description}`,
      url: `https://messcheck.app/mess/${slug}`,
    }

    // Check if Web Share API is supported
    if (navigator.share && typeof navigator.share === "function") {
      try {
        await navigator.share(shareData)
        toast({
          title: "Shared successfully",
          description: "Location has been shared.",
        })
      } catch (error) {
        // User cancelled or share failed
        if ((error as Error).name !== "AbortError") {
          setShowShareDialog(true)
        }
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      setShowShareDialog(true)
    }
  }

  // Function to copy share text to clipboard
  const copyShareText = () => {
    const shareText = `Check out ${messData.name} - ${messData.type} mess in ${messData.address}. ${messData.description}\n\nLocation: https://maps.google.com/?q=${messData.coordinates?.latitude},${messData.coordinates?.longitude}\n\nPhone: ${messData.phone}`

    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast({
        title: "Copied to clipboard",
        description: "Share text has been copied to clipboard.",
      })
    })
  }

  // Generate a WhatsApp share link
  const getWhatsAppShareLink = () => {
    const shareText = encodeURIComponent(
      `Check out ${messData.name} - ${messData.type} mess in ${messData.address}. ${messData.description}\n\nLocation: https://maps.google.com/?q=${messData.coordinates?.latitude},${messData.coordinates?.longitude}\n\nPhone: ${messData.phone}`,
    )
    return `https://wa.me/?text=${shareText}`
  }

  // Generate a SMS share link
  const getSMSShareLink = () => {
    const shareText = encodeURIComponent(
      `Check out ${messData.name} at ${messData.address}. Location: https://maps.google.com/?q=${messData.coordinates?.latitude},${messData.coordinates?.longitude}`,
    )
    return `sms:?body=${shareText}`
  }

  const getMessBanner = (type: string) => {
    switch (type.toLowerCase()) {
      case "veg":
        return "/veg-banner.png"
      case "non-veg":
        return "/non-veg-banner.png"
      case "jain":
        return "/jain-banner.png"
      default:
        return "/veg-banner.png"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "veg":
        return "bg-green-100 text-green-800 border-green-200"
      case "non-veg":
        return "bg-red-100 text-red-800 border-red-200"
      case "jain":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const selectedPlanDetails = messData.plans.find((plan) => plan.id === selectedPlan)

  const renderRatingBar = (value: number, color = "bg-red-500") => (
    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
      <div className={`h-full ${color}`} style={{ width: `${(value / 5) * 100}%` }}></div>
    </div>
  )

  return (
    <div className="pb-20 bg-white">
      {/* Header with banner */}
      <div className="relative">
        <div className="h-48 bg-gray-200">
          <img
            src={getMessBanner(messData.type) || "/placeholder.svg?height=192&width=384&query=food banner"}
            alt={`${messData.name} banner`}
            className="w-full h-full object-cover"
          />
          <Link href="/explore" className="absolute top-4 left-4 z-10">
            <Button variant="ghost" size="icon" className="bg-white/80 hover:bg-white rounded-full shadow-sm">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/80 hover:bg-white rounded-full shadow-sm"
              onClick={handleToggleFavorite}
              aria-label="Add to favorites"
            >
              <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/80 hover:bg-white rounded-full shadow-sm"
              onClick={shareMess}
              aria-label="Share this mess"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="px-4">
        {/* Mess logo and basic info */}
        <div className="relative -mt-12 mb-6">
          <div className="flex items-start">
            <div className="w-16 h-16 bg-white rounded-md shadow-sm flex items-center justify-center border border-gray-200">
              <img
                src={`/abstract-geometric-shapes.png?height=64&width=64&query=${messData.type} food icon`}
                alt={messData.type}
                className="w-10 h-10"
              />
            </div>
            <div className="ml-3 mt-2">
              <h1 className="text-xl font-bold">{messData.name}</h1>
              <div className="flex flex-wrap gap-1 mt-1">
                <Badge variant="outline" className={`${getTypeColor(messData.type)} border`}>
                  {messData.type}
                </Badge>
                <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
                  {messData.ethnicity}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Status Card (Verified or Unclaimed) */}
        {messData.isClaimed && messData.isVerified ? (
          <Card className="border-green-200 bg-green-50 mb-6">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-green-600">
                  <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p className="text-green-800 font-medium">Verified Business</p>
                  <p className="text-sm text-green-700">
                    {messData.name} was verified on {"verifiedDate" in messData ? messData.verifiedDate : "a previous date"}.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : !messData.isClaimed ? (
          <Card className="border-amber-200 bg-amber-50 mb-6">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-amber-600">
                  <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8.4449 0.608765C8.0183 -0.107015 6.9817 -0.107015 6.55509 0.608766L0.161178 11.3368C-0.275824 12.07 0.252503 13 1.10608 13H13.8939C14.7475 13 15.2758 12.07 14.8388 11.3368L8.4449 0.608765ZM7.4141 1.12073C7.45288 1.05566 7.54712 1.05566 7.5859 1.12073L13.9798 11.8488C14.0196 11.9154 13.9715 12 13.8939 12H1.10608C1.02849 12 0.980454 11.9154 1.02018 11.8488L7.4141 1.12073ZM6.8269 4.48611C6.81221 4.10423 7.11783 3.78663 7.5 3.78663C7.88217 3.78663 8.18778 4.10423 8.1731 4.48612L8.01921 8.48701C8.00848 8.766 7.7792 8.98664 7.5 8.98664C7.2208 8.98664 6.99151 8.766 6.98078 8.48701L6.8269 4.48611ZM8.24989 10.476C8.24989 10.8902 7.9141 11.226 7.49989 11.226C7.08567 11.226 6.74989 10.8902 6.74989 10.476C6.74989 10.0618 7.08567 9.72599 7.49989 9.72599C7.9141 9.72599 8.24989 10.0618 8.24989 10.476Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <p className="text-amber-800 font-medium">Unclaimed Business</p>
                    <Badge className="bg-amber-100 text-amber-800 border-amber-200">Unclaimed</Badge>
                  </div>
                  <p className="text-sm text-amber-700 mt-1">
                    Are you the owner of {messData.name}? Claim it to update menus, contact details, and respond to
                    reviews.
                  </p>
                  <Button
                    className="mt-3 bg-red-600 hover:bg-red-700 text-white"
                    size="sm"
                    onClick={() => setShowClaimDialog(true)}
                  >
                    Claim This Mess
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : null}

        {/* Description */}
        <div className="mb-6">
          <p className="text-gray-700">{messData.description}</p>
        </div>

        {/* Contact and location info */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm">
              {messData.address} • {messData.distance}
            </span>
          </div>
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm">{messData.phone}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm">{messData.timings}</span>
          </div>
        </div>

        {/* Quick action buttons */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Button
            variant="outline"
            className="h-auto py-3 px-2 flex flex-col items-center justify-center border-gray-200 hover:border-red-200 hover:bg-red-50 rounded-lg"
            onClick={openDirections}
          >
            <Navigation className="h-5 w-5 mb-1 text-red-500" />
            <span className="text-xs font-medium">Directions</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-3 px-2 flex flex-col items-center justify-center border-gray-200 hover:border-red-200 hover:bg-red-50 rounded-lg"
            onClick={shareMess}
          >
            <Share2 className="h-5 w-5 mb-1 text-red-500" />
            <span className="text-xs font-medium">Share</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-3 px-2 flex flex-col items-center justify-center border-gray-200 hover:border-red-200 hover:bg-red-50 rounded-lg"
            onClick={() => handleSelectPlan(messData.plans[0].id)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mb-1 text-red-500"
            >
              <path
                d="M3.5 2C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V2.5C12 2.22386 11.7761 2 11.5 2H3.5ZM2 2.5C2 1.67157 2.67157 1 3.5 1H11.5C12.3284 1 13 1.67157 13 2.5V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V2.5ZM4.5 4C4.22386 4 4 4.22386 4 4.5C4 4.77614 4.22386 5 4.5 5H10.5C10.7761 5 11 4.77614 11 4.5C11 4.22386 10.7761 4 10.5 4H4.5ZM4.5 7C4.22386 7 4 7.22386 4 7.5C4 7.77614 4.22386 8 4.5 8H10.5C10.7761 8 11 7.77614 11 7.5C11 7.22386 10.7761 7 10.5 7H4.5ZM4.5 10C4.22386 10 4 10.2239 4 10.5C4 10.7761 4.22386 11 4.5 11H10.5C10.7761 11 11 10.7761 11 10.5C11 10.2239 10.7761 10 10.5 10H4.5Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="text-xs font-medium">Subscribe</span>
          </Button>
        </div>

        {/* Today's Menu */}
        <Card className="mb-6 border">
          <CardContent className="p-0">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold flex items-center">
                <svg
                  width="20"
                  height="20"
                  className="mr-2 text-red-500"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.67494 1.14876C5.77104 1.00204 5.73856 0.808408 5.59184 0.712311C5.44512 0.616213 5.25149 0.648688 5.15539 0.795407L2.9688 4.16896H2C1.44772 4.16896 1 4.61667 1 5.16896V6.16896C1 6.67126 1.35421 7.08833 1.82343 7.19522C1.94999 7.72337 2.0025 8.21938 2 8.61035C2 9.74111 2.24191 10.607 2.65964 11.2352C3.08466 11.8751 3.66294 12.2691 4.25 12.4829C4.81025 12.6863 5.29628 12.987 5.6621 13.4338C5.99286 13.8397 6.11271 14.2655 6.12492 14.608C6.12777 14.7251 6.22657 14.8212 6.34367 14.8212H8.65613C8.77324 14.8212 8.87204 14.7251 8.87489 14.608C8.8871 14.2655 9.00694 13.8397 9.3377 13.4338C9.70352 12.987 10.1896 12.6863 10.7498 12.4829C11.3369 12.2691 11.9152 11.8751 12.3402 11.2352C12.7579 10.607 12.9998 9.74111 12.9998 8.61035C12.9973 8.21938 13.0498 7.72337 13.1764 7.19522C13.6456 7.08833 13.9998 6.67126 13.9998 6.16896V5.16896C13.9998 4.61667 13.5521 4.16896 12.9998 4.16896H12.031L9.84441 0.795407C9.74831 0.648688 9.55468 0.616213 9.40796 0.712311C9.26124 0.808408 9.22877 1.00204 9.32487 1.14876L11.372 4.16896H3.62778L5.67494 1.14876ZM2.5 7.1363C2.5 7.32586 2.41424 7.68858 2.31352 8.30286C2.23752 8.75721 2.12752 9.27583 2 9.83074V8.61035L2.00018 8.60668C2.00031 8.12526 1.99371 7.62236 1.91911 7.16896H2.08089C2.00629 7.62236 1.99969 8.12526 1.99982 8.60668L2 8.61035V9.83074C1.87248 9.27583 1.76248 8.75721 1.68648 8.30286C1.58576 7.68858 1.5 7.32586 1.5 7.1363V6.16896C1.5 6.16896 1.5 6.16896 1.5 6.16896H2.08089C2.08089 6.16896 2.08088 6.16896 2.08088 6.16896H12.9191C12.9191 6.16896 12.9191 6.16896 12.9191 6.16896H13.4998C13.4998 6.16896 13.4998 6.16896 13.4998 6.16896V7.1363C13.4998 7.32586 13.414 7.68858 13.3133 8.30286C13.2373 8.75721 13.1273 9.27583 12.9998 9.83074V8.61035L13 8.60668C13.0001 8.12526 12.9935 7.62236 12.9189 7.16896H13.0807C13.0061 7.62236 12.9995 8.12526 12.9996 8.60668L13 8.61035V9.83074C12.8724 9.27583 12.7624 8.75721 12.6864 8.30286C12.5857 7.68858 12.5 7.32586 12.5 7.1363V6.16896C12.5 6.16896 12.5 6.16896 12.5 6.16896H12.9191C12.9191 6.16896 12.9191 6.16896 12.9191 6.16896H2.08088C2.08088 6.16896 2.08089 6.16896 2.08089 6.16896H2.5C2.5 6.16896 2.5 6.16896 2.5 6.16896V7.1363ZM12.9998 5.16896H12.9191H2.08089H2V5.1687C2 4.99983 2 4.99983 2 4.99983L2.00001 4.99983H12.9998L13 4.99983C13 4.99983 13 4.99983 13 5.1687V5.16896H12.9998ZM8.34367 13.8212C8.26979 13.6184 8.15606 13.4178 8.0061 13.2308C7.54312 12.6715 6.91036 12.3058 6.24998 12.0677C6.24992 12.0677 6.24986 12.0676 6.2498 12.0676C5.58957 12.3058 4.95697 12.6714 4.49411 13.2305C4.34418 13.4175 4.23048 13.6181 4.15662 13.8212H8.34367Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Today's Menu
              </h2>
            </div>
            {loading ? (
              <MenuSkeleton />
            ) : (
              <div className="space-y-4">
                <div className="flex border-b">
                  <button
                    className={`flex-1 py-2 text-center font-medium ${activeMenu === "lunch" ? "text-red-600 border-b-2 border-red-600" : "text-gray-500"}`}
                    onClick={() => setActiveMenu("lunch")}
                  >
                    Lunch
                  </button>
                  <button
                    className={`flex-1 py-2 text-center font-medium ${activeMenu === "dinner" ? "text-red-600 border-b-2 border-red-600" : "text-gray-500"}`}
                    onClick={() => setActiveMenu("dinner")}
                  >
                    Dinner
                  </button>
                </div>

                <div className="p-4">
                  <ul className="space-y-2">
                    {messData.menu[activeMenu].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-red-500">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Open Days */}
        <Card className="mb-6 border">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold flex items-center mb-4">
              <Clock className="h-5 w-5 mr-2 text-red-500" />
              Open Days & Timings
            </h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                <Badge
                  key={day}
                  variant="outline"
                  className={
                    messData.openDays.includes(day.toLowerCase())
                      ? "bg-red-50 text-red-700 border-red-200"
                      : "bg-gray-100 text-gray-400 border-gray-200"
                  }
                >
                  {day}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ratings & Reviews */}
        <Card className="mb-6 border">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold flex items-center mb-4">
              <Star className="h-5 w-5 mr-2 text-red-500" />
              Ratings & Reviews
            </h2>
            {loading ? (
              <RatingsSkeleton />
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 flex items-center justify-center">
                      <span role="img" aria-label="taste" className="text-lg">
                        🍽️
                      </span>
                    </span>
                    <span className="text-sm">Taste</span>
                    <div className="flex items-center gap-2 flex-1">
                      {renderRatingBar(messData.ratings.taste)}
                      <span className="text-sm font-medium">{messData.ratings.taste}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 flex items-center justify-center">
                      <span role="img" aria-label="hygiene" className="text-lg">
                        🧼
                      </span>
                    </span>
                    <span className="text-sm">Hygiene</span>
                    <div className="flex items-center gap-2 flex-1">
                      {renderRatingBar(messData.ratings.hygiene)}
                      <span className="text-sm font-medium">{messData.ratings.hygiene}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 flex items-center justify-center">
                      <span role="img" aria-label="punctuality" className="text-lg">
                        ⏱️
                      </span>
                    </span>
                    <span className="text-sm">Punctuality</span>
                    <div className="flex items-center gap-2 flex-1">
                      {renderRatingBar(messData.ratings.punctuality)}
                      <span className="text-sm font-medium">{messData.ratings.punctuality}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 flex items-center justify-center">
                      <span role="img" aria-label="quantity" className="text-lg">
                        🍛
                      </span>
                    </span>
                    <span className="text-sm">Quantity</span>
                    <div className="flex items-center gap-2 flex-1">
                      {renderRatingBar(messData.ratings.quantity)}
                      <span className="text-sm font-medium">{messData.ratings.quantity}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Customer Reviews</h3>
                    <Link href={`/mess/${slug}/review`}>
                      <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50">
                        Add Review
                      </Button>
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {messData.reviews.length > 0 ? (
                      messData.reviews.map((review) => (
                        <Card key={review.id} className="border shadow-sm">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center">
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarFallback className="bg-red-100 text-red-600">
                                    {review.user
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{review.user}</div>
                                  <div className="text-xs text-gray-500">{review.date}</div>
                                </div>
                              </div>
                              <div className="flex items-center text-amber-500">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < review.rating ? "fill-amber-500" : "text-gray-300"}`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="mt-3 text-sm">{review.comment}</p>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {review.recommended && (
                                <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                                  Recommended
                                </Badge>
                              )}
                              {review.tags &&
                                review.tags.map((tag, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="bg-gray-100 text-gray-700 border-gray-200"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-6 bg-gray-50 rounded-lg border">
                        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Subscription Plans */}
        <Card className="mb-6 border">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold flex items-center mb-4">
              <svg
                width="20"
                height="20"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 text-red-500"
              >
                <path
                  d="M3.5 2C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V2.5C12 2.22386 11.7761 2 11.5 2H3.5ZM2 2.5C2 1.67157 2.67157 1 3.5 1H11.5C12.3284 1 13 1.67157 13 2.5V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V2.5ZM4.5 4C4.22386 4 4 4.22386 4 4.5C4 4.77614 4.22386 5 4.5 5H10.5C10.7761 5 11 4.77614 11 4.5C11 4.22386 10.7761 4 10.5 4H4.5ZM4.5 7C4.22386 7 4 7.22386 4 7.5C4 7.77614 4.22386 8 4.5 8H10.5C10.7761 8 11 7.77614 11 7.5C11 7.22386 10.7761 7 10.5 7H4.5ZM4.5 10C4.22386 10 4 10.2239 4 10.5C4 10.7761 4.22386 11 4.5 11H10.5C10.7761 11 11 10.7761 11 10.5C11 10.2239 10.7761 10 10.5 10H4.5Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
              Subscription Plans
            </h2>
            <div className="grid gap-3">
              {messData.plans.map((plan) => (
                <div key={plan.id} className="border rounded-lg p-3 hover:border-red-200 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{plan.name}</h3>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-red-600">{plan.price}</div>
                      <Button
                        size="sm"
                        className="mt-1 bg-red-600 hover:bg-red-700"
                        onClick={() => handleSelectPlan(plan.id)}
                      >
                        Subscribe
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Subscribe to {messData.name}</DialogTitle>
            <DialogDescription>
              {selectedPlanDetails && (
                <>
                  You're subscribing to the <strong>{selectedPlanDetails.name}</strong> plan for{" "}
                  <strong>{selectedPlanDetails.price}</strong>.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-600">
              By subscribing, you'll get access to fresh, hygienic meals delivered on time.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">Pay Now</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Claim Dialog */}
      <Dialog open={showClaimDialog} onOpenChange={setShowClaimDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Claim Your Business</DialogTitle>
            <DialogDescription>
              Are you the owner of {messData.name}? Claim it to manage your listing, respond to reviews, and update
              your information.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-600">
              To claim this business, you'll need to verify your ownership through a verification process.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowClaimDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">Start Claim Process</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share {messData.name}</DialogTitle>
            <DialogDescription>Choose how you'd like to share this mess with others.</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => window.open(getWhatsAppShareLink(), "_blank")}
            >
              <MessageSquare className="mr-2 h-4 w-4 text-green-600" />
              Share on WhatsApp
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => window.open(getSMSShareLink(), "_blank")}
            >
              <Phone className="mr-2 h-4 w-4 text-blue-600" />
              Share via SMS
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={copyShareText}>
              {copied ? (
                <Check className="mr-2 h-4 w-4 text-green-600" />
              ) : (
                <Copy className="mr-2 h-4 w-4 text-gray-600" />
              )}
              {copied ? "Copied!" : "Copy Link"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
