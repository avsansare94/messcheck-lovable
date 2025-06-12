
import React from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTestAuth } from "@/lib/test-auth-context"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Star, 
  Heart, 
  Calendar,
  Settings,
  LogOut,
  Edit
} from "lucide-react"

export function ProfileScreen() {
  const navigate = useNavigate()
  const { user, logout } = useTestAuth()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const userStats = {
    totalOrders: 45,
    favoriteMessCount: 12,
    reviewsCount: 8,
    memberSince: "Jan 2024"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zomato-gray-100 to-white">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-display font-bold text-zomato-gray-900">Profile</h1>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/settings")}
            className="text-zomato-gray-600 hover:text-zomato-red"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        {/* Profile Card */}
        <Card className="zomato-card mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="bg-zomato-red text-white text-lg">
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-display font-semibold text-zomato-gray-900">
                  {user?.email?.split('@')[0] || 'User'}
                </h2>
                <p className="text-zomato-gray-500">{user?.email}</p>
                <Badge 
                  variant="outline" 
                  className="mt-1 bg-zomato-red/10 text-zomato-red border-zomato-red/20"
                >
                  {user?.role === 'mess-user' ? 'Mess User' : user?.role}
                </Badge>
              </div>
              <Button variant="ghost" size="sm" className="text-zomato-gray-600">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-sm text-zomato-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center text-sm text-zomato-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center text-sm text-zomato-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Mumbai, Maharashtra</span>
              </div>
              <div className="flex items-center text-sm text-zomato-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Member since {userStats.memberSince}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="zomato-card text-center">
            <CardContent className="p-4">
              <div className="w-10 h-10 bg-zomato-red/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Star className="h-5 w-5 text-zomato-red" />
              </div>
              <p className="text-2xl font-bold text-zomato-gray-900">{userStats.totalOrders}</p>
              <p className="text-xs text-zomato-gray-500">Total Orders</p>
            </CardContent>
          </Card>
          
          <Card className="zomato-card text-center">
            <CardContent className="p-4">
              <div className="w-10 h-10 bg-zomato-orange/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Heart className="h-5 w-5 text-zomato-orange" />
              </div>
              <p className="text-2xl font-bold text-zomato-gray-900">{userStats.favoriteMessCount}</p>
              <p className="text-xs text-zomato-gray-500">Favorites</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="zomato-card mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-display">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-left"
              onClick={() => navigate("/settings")}
            >
              <Settings className="h-5 w-5 mr-3 text-zomato-gray-600" />
              <span>Account Settings</span>
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-left"
              onClick={() => navigate("/my-mess")}
            >
              <Heart className="h-5 w-5 mr-3 text-zomato-gray-600" />
              <span>My Favorite Messes</span>
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start text-left text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span>Logout</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
