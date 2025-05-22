"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RefreshCcw, Clock, PauseCircle, ChevronRight, Info } from "lucide-react"
import { SubscriptionDetails } from "./subscription-details"
import { PromotionalCard } from "./promotional-card"

export function MyMessScreen() {
  const [activeTab, setActiveTab] = useState("subscription")
  const [showDetails, setShowDetails] = useState(false)

  // Mock data - in a real app, this would come from an API or context
  const messData = {
    name: "Sharma's Tiffin Service",
    isVerified: true,
    status: "Active Subscription",
    remainingDays: 15,
    totalDays: 30,
    todaysMenu: [
      { name: "Aloo Paratha", description: "Potato stuffed flatbread" },
      { name: "Curd", description: "Fresh homemade" },
      { name: "Tea/Coffee", description: "Choice of beverage" },
    ],
    day: "Wednesday",
  }

  const handleRefresh = () => {
    // In a real app, this would fetch the latest data
    console.log("Refreshing data...")
  }

  const handleMarkAbsent = () => {
    // In a real app, this would mark the user as absent
    console.log("Marking absent...")
  }

  const handlePause = () => {
    // In a real app, this would pause the subscription
    console.log("Pausing subscription...")
  }

  const handleSwitchMess = () => {
    // In a real app, this would navigate to a mess selection page
    console.log("Switching mess...")
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-6">
      {showDetails ? (
        <SubscriptionDetails onClose={() => setShowDetails(false)} />
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">My Mess</h1>
            <Button variant="ghost" size="icon" onClick={handleRefresh} className="text-rose-500">
              <RefreshCcw className="h-5 w-5" />
              <span className="sr-only">Refresh</span>
            </Button>
          </div>
          <Tabs defaultValue="subscription" className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="subscription"
                className="data-[state=active]:bg-rose-500 data-[state=active]:text-white"
              >
                Subscription
              </TabsTrigger>
              <TabsTrigger value="absence">Absence History</TabsTrigger>
            </TabsList>
            <TabsContent value="subscription" className="mt-4">
              <Card className="mb-4">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      {/* Placeholder for mess logo */}
                      <span className="text-gray-500 text-xs">Logo</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{messData.name}</h3>
                        {messData.isVerified && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 text-xs">
                            ✓ Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{messData.status}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Remaining Meal Days</p>
                    <div className="space-y-1">
                      <Progress
                        value={(messData.remainingDays / messData.totalDays) * 100}
                        className="h-2 bg-gray-200"
                        indicatorClassName="bg-rose-500"
                      />
                      <p className="text-xs text-muted-foreground">
                        {messData.remainingDays} of {messData.totalDays} days
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    onClick={() => setShowDetails(true)}
                    className="w-full justify-between mt-3 text-sm h-10 border border-dashed border-gray-200"
                  >
                    <span className="flex items-center">
                      <Info className="mr-2 h-4 w-4 text-rose-500" />
                      View Subscription Details
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>

                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <Button variant="outline" onClick={handleMarkAbsent} className="text-sm h-10">
                      <Clock className="mr-2 h-4 w-4" />
                      Mark Absent
                    </Button>
                    <Button variant="outline" onClick={handlePause} className="text-sm h-10">
                      <PauseCircle className="mr-2 h-4 w-4" />
                      Pause
                    </Button>
                  </div>

                  <Button variant="ghost" onClick={handleSwitchMess} className="w-full mt-3 text-sm h-10">
                    Switch Mess
                  </Button>
                </CardContent>
              </Card>

              <Card className="mb-4">
                <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-base font-semibold">Today's Menu</CardTitle>
                  <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                    {messData.day}
                  </Badge>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <ul className="space-y-3">
                    {messData.todaysMenu.map((item, index) => (
                      <li key={index}>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-start gap-3">
                  <div className="mt-0.5 text-amber-500">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Meal Reminder</p>
                    <p className="text-sm text-muted-foreground">
                      Mark yourself absent before 8 PM if you won't be having tomorrow's breakfast.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="absence">
              <Card>
                <CardContent className="p-4">
                  <p className="text-center py-6 text-muted-foreground">No absence history to display.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <div className="h-16"></div> {/* Space for bottom navigation */}
        </>
      )}
      {!showDetails && (
        <div className="mb-16">
          <PromotionalCard
            title="Can't Find Your Mess?"
            subtitle="List the mess where you currently eat so others can discover it too!"
            description={
              'If your mess isn\'t listed on MessCheck, you can help the community by adding it.\nOnce listed, it will appear as "Unclaimed" and the provider can claim it later for verification.\n\n🔒 No contact info is required.\n🧑‍🎓 Help fellow students find trusted meals nearby.\n✅ Unclaimed messes are shown publicly right away.'
            }
            ctaText="Add Your Mess"
            ctaTarget="/add-mess"
            icon="🏠"
            colorScheme="accent"
            buttonStyle="primary"
            shadow="soft"
          />
        </div>
      )}
    </div>
  )
}
