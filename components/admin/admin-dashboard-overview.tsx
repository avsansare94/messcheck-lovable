
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Building2, CheckCircle, Clock, AlertTriangle, Calendar, Star } from "lucide-react"

interface DashboardStats {
  totalUsers: number
  totalProviders: number
  totalMesses: number
  unverifiedMesses: number
  unclaimedMesses: number
  activeSubscriptions: number
  todayCheckins: number
  pendingClaims: number
  flaggedReviews: number
}

export default function AdminDashboardOverview() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 1248,
    totalProviders: 87,
    totalMesses: 156,
    unverifiedMesses: 12,
    unclaimedMesses: 23,
    activeSubscriptions: 892,
    todayCheckins: 324,
    pendingClaims: 5,
    flaggedReviews: 3,
  })
  const [recentMesses, setRecentMesses] = useState<any[]>([
    {
      id: "1",
      mess_name: "Annapurna Mess",
      city: "Pune",
      state: "Maharashtra",
      is_verified: true,
      is_claimed: true,
      mess_type: "vegetarian",
      rating: 4.5,
      created_at: new Date().toISOString(),
    },
    {
      id: "2", 
      mess_name: "Royal Kitchen",
      city: "Mumbai",
      state: "Maharashtra",
      is_verified: false,
      is_claimed: true,
      mess_type: "mixed",
      rating: 4.2,
      created_at: new Date().toISOString(),
    }
  ])
  const [loading, setLoading] = useState(false)

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Overview of MessCheck platform</p>
        </div>
        <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-gray-600">Active mess users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Providers</CardTitle>
            <Building2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProviders}</div>
            <p className="text-xs text-gray-600">Mess providers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messes</CardTitle>
            <Building2 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMesses}</div>
            <p className="text-xs text-gray-600">
              {stats.unverifiedMesses} unverified, {stats.unclaimedMesses} unclaimed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeSubscriptions}</div>
            <p className="text-xs text-gray-600">Current subscriptions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Check-ins</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayCheckins}</div>
            <p className="text-xs text-gray-600">Meals checked in today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Claims</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingClaims}</div>
            <p className="text-xs text-gray-600">
              <Link to="/admin/claims" className="text-blue-600 hover:underline">
                Review claims →
              </Link>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged Reviews</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.flaggedReviews}</div>
            <p className="text-xs text-gray-600">
              <Link to="/admin/reviews" className="text-blue-600 hover:underline">
                Moderate reviews →
              </Link>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unverified Messes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.unverifiedMesses}</div>
            <p className="text-xs text-gray-600">
              <Link to="/admin/mess-verification" className="text-blue-600 hover:underline">
                Verify messes →
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Messes */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Mess Profiles</CardTitle>
          <CardDescription>Latest mess profiles added to the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentMesses.map((mess) => (
              <div key={mess.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium">{mess.mess_name}</h3>
                  <p className="text-sm text-gray-600">
                    {mess.city}, {mess.state}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={mess.is_verified ? "default" : "secondary"}>
                      {mess.is_verified ? "Verified" : "Unverified"}
                    </Badge>
                    <Badge variant={mess.is_claimed ? "default" : "outline"}>
                      {mess.is_claimed ? "Claimed" : "Unclaimed"}
                    </Badge>
                    <Badge variant="outline">{mess.mess_type}</Badge>
                  </div>
                </div>
                <div className="text-right">
                  {mess.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{mess.rating}</span>
                    </div>
                  )}
                  <p className="text-xs text-gray-500">{new Date(mess.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild variant="outline" className="h-auto p-4">
              <Link to="/admin/mess-verification" className="flex flex-col items-center gap-2">
                <CheckCircle className="h-6 w-6" />
                <span>Verify Messes</span>
                <span className="text-xs text-gray-500">{stats.unverifiedMesses} pending</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto p-4">
              <Link to="/admin/claims" className="flex flex-col items-center gap-2">
                <Clock className="h-6 w-6" />
                <span>Review Claims</span>
                <span className="text-xs text-gray-500">{stats.pendingClaims} pending</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto p-4">
              <Link to="/admin/reviews" className="flex flex-col items-center gap-2">
                <AlertTriangle className="h-6 w-6" />
                <span>Moderate Reviews</span>
                <span className="text-xs text-gray-500">{stats.flaggedReviews} flagged</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
