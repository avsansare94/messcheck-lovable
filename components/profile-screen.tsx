
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Skeleton } from "@/components/ui/skeleton"
import { Award, LogOut, ChevronRight } from "lucide-react"

export function ProfileScreen() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState({
    name: "Avinash Sansare",
    email: "avinash.s@example.com",
    institution: "ABC Engineering College",
    accommodation: "PG Hostel Block C",
    foodPreference: "Veg",
  })

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("userRole")
    localStorage.removeItem("userData")

    // Redirect to role selection
    navigate("/")
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-orange-600">Profile</h1>
        <p className="text-sm text-gray-500">Manage your account</p>
      </header>

      {loading ? (
        <ProfileSkeleton />
      ) : (
        <>
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-xl font-medium mr-4">
                  AS
                </div>
                <div>
                  <CardTitle>{userData.name}</CardTitle>
                  <CardDescription>{userData.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="flex gap-2">
                  <Input id="name" value={userData.name} readOnly className="bg-gray-50" />
                  <Button variant="outline" size="icon" className="shrink-0">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="flex gap-2">
                  <Input id="email" value={userData.email} readOnly className="bg-gray-50" />
                  <Button variant="outline" size="icon" className="shrink-0">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="institution">College/Company</Label>
                <div className="flex gap-2">
                  <Input id="institution" value={userData.institution} readOnly className="bg-gray-50" />
                  <Button variant="outline" size="icon" className="shrink-0">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accommodation">Hostel/PG</Label>
                <div className="flex gap-2">
                  <Input id="accommodation" value={userData.accommodation} readOnly className="bg-gray-50" />
                  <Button variant="outline" size="icon" className="shrink-0">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="food-preference">Food Preference</Label>
                <div className="flex gap-2">
                  <Input id="food-preference" value={userData.foodPreference} readOnly className="bg-gray-50" />
                  <Button variant="outline" size="icon" className="shrink-0">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="meal-reminder">Meal Reminders</Label>
                  <p className="text-sm text-muted-foreground">Get notified before meal times</p>
                </div>
                <Switch id="meal-reminder" defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="new-mess">New Mess Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified when new messes are added near you</p>
                </div>
                <Switch id="new-mess" defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">Receive emails about new features and offers</p>
                </div>
                <Switch id="marketing" />
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Become an Ambassador</CardTitle>
              <CardDescription>Help us grow MessCheck in your college and earn rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                As a Campus Ambassador, you'll help spread the word about MessCheck, onboard new mess providers, and
                help fellow students find the best mess options.
              </p>
              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                <Award className="mr-2 h-4 w-4" /> Apply Now
              </Button>
            </CardContent>
          </Card>

          <Button
            variant="outline"
            className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </>
      )}
    </div>
  )
}

function ProfileSkeleton() {
  return (
    <>
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex items-center">
            <Skeleton className="w-16 h-16 rounded-full mr-4" />
            <div>
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-full rounded-md" />
                <Skeleton className="h-10 w-10 rounded-md" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <Skeleton className="h-6 w-32 mb-2" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-0.5">
                  <Skeleton className="h-4 w-32 mb-1" />
                  <Skeleton className="h-3 w-48" />
                </div>
                <Skeleton className="h-6 w-12 rounded-full" />
              </div>
              {i < 3 && <Skeleton className="h-px w-full" />}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-10 w-full rounded-md" />
        </CardContent>
      </Card>

      <Skeleton className="h-10 w-full rounded-md" />
    </>
  )
}
