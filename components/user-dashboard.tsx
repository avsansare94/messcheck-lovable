
"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Utensils, MapPin, Star } from "lucide-react"

export function UserDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Utensils className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-red-600">MessCheck</h1>
          <p className="text-gray-600">Find your perfect mess</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <MapPin className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <h3 className="font-semibold">Find Mess</h3>
              <p className="text-sm text-gray-600">Near you</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="h-8 w-8 text-red-600 mx-auto mb-2" />
              <h3 className="font-semibold">Reviews</h3>
              <p className="text-sm text-gray-600">Read & write</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your mess interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-center py-4">No recent activity</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
