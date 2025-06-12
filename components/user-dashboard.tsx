
import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Utensils, MapPin, Star, Clock, Heart, Search } from "lucide-react"

export function UserDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zomato-gray-100 to-white">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Header Section - Zomato Style */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-zomato-red to-zomato-red-dark rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-zomato">
            <Utensils className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold text-zomato-gray-900 mb-2">MessCheck</h1>
          <p className="text-zomato-gray-500 font-medium">Discover amazing food around you</p>
        </div>

        {/* Quick Actions - Enhanced Cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="zomato-card mess-card group cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-zomato-red to-zomato-red-dark rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200">
                <Search className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-display font-semibold text-zomato-gray-900">Find Mess</h3>
              <p className="text-sm text-zomato-gray-500 mt-1">Near you</p>
            </CardContent>
          </Card>
          
          <Card className="zomato-card mess-card group cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-zomato-orange to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-display font-semibold text-zomato-gray-900">Reviews</h3>
              <p className="text-sm text-zomato-gray-500 mt-1">Read & write</p>
            </CardContent>
          </Card>
        </div>

        {/* Featured Section */}
        <div className="mb-8">
          <h2 className="text-xl font-display font-bold text-zomato-gray-900 mb-4">Popular Near You</h2>
          <Card className="zomato-card">
            <CardContent className="p-0">
              <div className="h-32 bg-gradient-to-r from-zomato-red to-zomato-orange rounded-t-lg"></div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display font-semibold text-zomato-gray-900">Sharma's Tiffin</h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-zomato-gray-700">4.5</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-zomato-gray-500 mb-3">
                  <MapPin className="h-4 w-4" />
                  <span>IIT Bombay Area • 0.2 km</span>
                </div>
                <Button className="zomato-button-primary w-full text-sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <Card className="zomato-card text-center">
            <CardContent className="p-4">
              <Heart className="h-5 w-5 text-zomato-red mx-auto mb-2" />
              <p className="text-xs text-zomato-gray-500">Favorites</p>
              <p className="font-bold text-zomato-gray-900">12</p>
            </CardContent>
          </Card>
          
          <Card className="zomato-card text-center">
            <CardContent className="p-4">
              <Clock className="h-5 w-5 text-zomato-orange mx-auto mb-2" />
              <p className="text-xs text-zomato-gray-500">Orders</p>
              <p className="font-bold text-zomato-gray-900">45</p>
            </CardContent>
          </Card>
          
          <Card className="zomato-card text-center">
            <CardContent className="p-4">
              <Star className="h-5 w-5 text-yellow-500 mx-auto mb-2" />
              <p className="text-xs text-zomato-gray-500">Reviews</p>
              <p className="font-bold text-zomato-gray-900">8</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="zomato-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-display">Recent Activity</CardTitle>
            <CardDescription className="text-zomato-gray-500">Your mess interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-zomato-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Utensils className="h-6 w-6 text-zomato-gray-400" />
              </div>
              <p className="text-zomato-gray-500 text-sm">No recent activity</p>
              <p className="text-xs text-zomato-gray-400 mt-1">Start exploring messes near you!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
