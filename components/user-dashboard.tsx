
import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PromotionalCard } from "@/components/promotional-card"
import { QrCode, Star, Clock, MapPin, Coffee, Users, TrendingUp, ChefHat } from "lucide-react"

export function UserDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zomato-gray-50 to-white">
      <div className="container max-w-md mx-auto px-4 py-6 pb-20">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-zomato-gray-900 font-display">Good Evening!</h1>
              <p className="text-zomato-gray-600">Ready for dinner?</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-zomato-red to-zomato-red-dark rounded-xl flex items-center justify-center shadow-zomato">
              <Coffee className="h-6 w-6 text-white" />
            </div>
          </div>
        </header>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="border-zomato-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-105 bg-white">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-zomato-red to-zomato-red-dark rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                <QrCode className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-zomato-gray-900 font-display">Scan QR</h3>
              <p className="text-sm text-zomato-gray-600 mt-1">Quick check-in</p>
            </CardContent>
          </Card>

          <Card className="border-zomato-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-105 bg-white">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-zomato-orange to-zomato-orange-light rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-zomato-gray-900 font-display">Explore</h3>
              <p className="text-sm text-zomato-gray-600 mt-1">Find nearby mess</p>
            </CardContent>
          </Card>
        </div>

        {/* Current Subscription */}
        <Card className="mb-6 border-zomato-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-display text-zomato-gray-900">Your Mess</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg text-zomato-gray-900 font-display">Sharma's Tiffin Service</h3>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 font-medium">
                    <Star className="h-3 w-3 mr-1 fill-current" /> 4.2
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 font-medium">
                    Veg
                  </Badge>
                </div>
                <p className="text-sm text-zomato-gray-600 mt-2">Monthly Plan • 12 days left</p>
              </div>
              <Button variant="outline" size="sm" className="border-zomato-gray-200 text-zomato-gray-700 hover:bg-zomato-gray-50">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Today's Menu */}
        <Card className="mb-6 border-zomato-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-display text-zomato-gray-900 flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-zomato-orange" />
              Today's Menu
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-zomato-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-zomato-gray-900">Lunch</p>
                <p className="text-sm text-zomato-gray-600">Dal Rice, Aloo Sabji, Roti</p>
              </div>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <Clock className="h-3 w-3 mr-1" /> 12:00 PM
              </Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-zomato-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-zomato-gray-900">Dinner</p>
                <p className="text-sm text-zomato-gray-600">Rajma Rice, Mix Veg, Chapati</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                <Clock className="h-3 w-3 mr-1" /> 7:30 PM
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="border-zomato-gray-100 shadow-card bg-white">
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-zomato-red font-display">28</div>
              <div className="text-xs text-zomato-gray-600">Meals Left</div>
            </CardContent>
          </Card>
          <Card className="border-zomato-gray-100 shadow-card bg-white">
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-green-600 font-display">85%</div>
              <div className="text-xs text-zomato-gray-600">Attendance</div>
            </CardContent>
          </Card>
          <Card className="border-zomato-gray-100 shadow-card bg-white">
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-blue-600 font-display">₹45</div>
              <div className="text-xs text-zomato-gray-600">Per Meal</div>
            </CardContent>
          </Card>
        </div>

        {/* Promotional Cards */}
        <div className="space-y-4">
          <PromotionalCard
            title="Invite Friends & Earn"
            description="Get ₹50 for every friend who joins MessCheck through your referral link!"
            ctaText="Start Referring"
            ctaTarget="/referral"
            icon="🎉"
            colorScheme="accent"
            buttonStyle="primary"
            shadow="soft"
          />

          <PromotionalCard
            title="Rate Your Experience"
            description="Help others discover great mess options by sharing your honest review."
            ctaText="Write Review"
            ctaTarget="/review"
            icon="⭐"
            colorScheme="soft"
            buttonStyle="outline"
          />
        </div>
      </div>
    </div>
  )
}
