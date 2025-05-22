"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Coffee, Moon, Calendar, Percent, QrCode, Download, Share2, Copy, Check, X } from "lucide-react"

export function CheckInManagementScreen() {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("today")
  const [requireQrCode, setRequireQrCode] = useState(true)
  const [checkInData, setCheckInData] = useState({
    stats: {
      lunchCheckins: 18,
      dinnerCheckins: 0,
      checkinRate: 42.9, // percentage
      offDays: 3,
    },
    messId: "sharma-tiffin-123",
    checkIns: [
      {
        id: 1,
        name: "Avinash Sansare",
        plan: "Trial Plan",
        lunch: true,
        dinner: false,
        offDay: false,
      },
      {
        id: 2,
        name: "Rahul Kumar",
        plan: "Full Month",
        lunch: true,
        dinner: false,
        offDay: false,
      },
      {
        id: 3,
        name: "Sneha Patel",
        plan: "Lunch Only",
        lunch: true,
        dinner: null, // null means not applicable
        offDay: false,
      },
      {
        id: 4,
        name: "Priya Sharma",
        plan: "Full Month",
        lunch: false,
        dinner: false,
        offDay: true,
      },
      {
        id: 5,
        name: "Amit Verma",
        plan: "Dinner Only",
        lunch: null,
        dinner: false,
        offDay: false,
      },
    ],
    absentUsers: [
      {
        id: 4,
        name: "Priya Sharma",
        date: "May 21, 2025",
        reason: "Out of town",
      },
      {
        id: 6,
        name: "Vikram Singh",
        date: "May 21, 2025",
        reason: "Sick",
      },
      {
        id: 7,
        name: "Neha Gupta",
        date: "May 21, 2025",
        reason: "Personal",
      },
    ],
  })

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const copyMessUrl = () => {
    const url = `messcheck.in/mess/${checkInData.messId}`
    navigator.clipboard.writeText(url)
    // You would typically show a toast notification here
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-6 pb-20">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-red-600">Check-in Management</h1>
        <p className="text-sm text-gray-500">Track and manage daily check-ins</p>
      </header>

      {loading ? (
        <KPISkeletons />
      ) : (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <KPICard
            title="Lunch Check-ins"
            value={checkInData.stats.lunchCheckins}
            icon={<Coffee className="h-5 w-5 text-amber-600" />}
            bgColor="bg-amber-50"
          />
          <KPICard
            title="Dinner Check-ins"
            value={checkInData.stats.dinnerCheckins}
            icon={<Moon className="h-5 w-5 text-indigo-600" />}
            bgColor="bg-indigo-50"
          />
          <KPICard
            title="Check-in Rate"
            value={checkInData.stats.checkinRate}
            icon={<Percent className="h-5 w-5 text-green-600" />}
            bgColor="bg-green-50"
            suffix="%"
          />
          <KPICard
            title="Off Days Today"
            value={checkInData.stats.offDays}
            icon={<Calendar className="h-5 w-5 text-red-600" />}
            bgColor="bg-red-50"
          />
        </div>
      )}

      <Tabs defaultValue="today" className="mb-4" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 h-auto p-1 bg-gray-100">
          <TabsTrigger
            value="today"
            className="text-xs py-1.5 data-[state=active]:bg-red-600 data-[state=active]:text-white"
          >
            Today's Check-ins
          </TabsTrigger>
          <TabsTrigger
            value="absent"
            className="text-xs py-1.5 data-[state=active]:bg-red-600 data-[state=active]:text-white"
          >
            Absent Tracker
          </TabsTrigger>
          <TabsTrigger
            value="qr"
            className="text-xs py-1.5 data-[state=active]:bg-red-600 data-[state=active]:text-white"
          >
            QR Management
          </TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4 pt-4">
          {loading ? (
            <CheckInsSkeleton />
          ) : (
            <Card className="border-red-100 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Check-in Tracker</CardTitle>
                <CardDescription>Today's meal attendance</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 text-xs font-medium text-gray-500">User</th>
                        <th className="text-center p-3 text-xs font-medium text-gray-500">Lunch</th>
                        <th className="text-center p-3 text-xs font-medium text-gray-500">Dinner</th>
                        <th className="text-center p-3 text-xs font-medium text-gray-500">Off Day</th>
                      </tr>
                    </thead>
                    <tbody>
                      {checkInData.checkIns.map((checkIn) => (
                        <tr key={checkIn.id} className="border-b last:border-b-0">
                          <td className="p-3">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarFallback className="bg-red-100 text-red-600">
                                  {checkIn.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-sm">{checkIn.name}</p>
                                <p className="text-xs text-gray-500">{checkIn.plan}</p>
                              </div>
                            </div>
                          </td>
                          <td className="text-center p-3">
                            {checkIn.lunch === null ? (
                              <Badge variant="outline" className="bg-gray-100 text-gray-500 border-gray-200">
                                N/A
                              </Badge>
                            ) : checkIn.lunch ? (
                              <Check className="h-5 w-5 text-green-600 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-red-600 mx-auto" />
                            )}
                          </td>
                          <td className="text-center p-3">
                            {checkIn.dinner === null ? (
                              <Badge variant="outline" className="bg-gray-100 text-gray-500 border-gray-200">
                                N/A
                              </Badge>
                            ) : checkIn.dinner ? (
                              <Check className="h-5 w-5 text-green-600 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-red-600 mx-auto" />
                            )}
                          </td>
                          <td className="text-center p-3">
                            {checkIn.offDay ? (
                              <Check className="h-5 w-5 text-amber-600 mx-auto" />
                            ) : (
                              <X className="h-5 w-5 text-gray-400 mx-auto" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="absent" className="space-y-4 pt-4">
          {loading ? (
            <AbsentTrackerSkeleton />
          ) : (
            <Card className="border-red-100 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Absent Tracker</CardTitle>
                <CardDescription>Users who marked off days</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {checkInData.absentUsers.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-gray-500">No absent users today</p>
                  </div>
                ) : (
                  checkInData.absentUsers.map((user) => (
                    <div key={user.id} className="flex justify-between items-center p-3 rounded-md bg-gray-50">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarFallback className="bg-red-100 text-red-600">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-gray-500">Date: {user.date}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        {user.reason}
                      </Badge>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="qr" className="space-y-4 pt-4">
          {loading ? (
            <QRManagementSkeleton />
          ) : (
            <>
              <Card className="border-red-100 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">QR Settings</CardTitle>
                  <CardDescription>Configure check-in requirements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="require-qr">Require QR Code for Check-in</Label>
                      <p className="text-sm text-muted-foreground">
                        When enabled, users must scan the QR code to check in
                      </p>
                    </div>
                    <Switch id="require-qr" checked={requireQrCode} onCheckedChange={setRequireQrCode} />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-100 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Mess QR Code</CardTitle>
                  <CardDescription>For user check-ins</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4 w-48 h-48 flex items-center justify-center">
                    <QrCode className="h-32 w-32 text-gray-800" />
                  </div>

                  <p className="text-sm text-center mb-2">messcheck.in/mess/{checkInData.messId}</p>
                  <p className="text-xs text-gray-500 text-center mb-4">Scan to check-in for meals</p>

                  <div className="flex flex-wrap gap-2 w-full">
                    <Button variant="outline" size="sm" className="flex-1 border-red-100">
                      <Download className="h-4 w-4 mr-1" /> Download
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 border-red-100">
                      <Share2 className="h-4 w-4 mr-1" /> Share
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 border-red-100" onClick={copyMessUrl}>
                      <Copy className="h-4 w-4 mr-1" /> Copy URL
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function KPICard({
  title,
  value,
  icon,
  bgColor,
  prefix = "",
  suffix = "",
}: {
  title: string
  value: number
  icon: React.ReactNode
  bgColor: string
  prefix?: string
  suffix?: string
}) {
  return (
    <Card className="border-gray-100 shadow-sm">
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center">
          <div className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center mb-2`}>{icon}</div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-xl font-bold">
            {prefix}
            {value}
            {suffix}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function KPISkeletons() {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="border-gray-100 shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <Skeleton className="w-10 h-10 rounded-full mb-2" />
              <Skeleton className="h-4 w-16 mb-1" />
              <Skeleton className="h-6 w-12" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function CheckInsSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-40 mb-1" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">
                  <Skeleton className="h-4 w-16" />
                </th>
                <th className="text-center p-3">
                  <Skeleton className="h-4 w-16 mx-auto" />
                </th>
                <th className="text-center p-3">
                  <Skeleton className="h-4 w-16 mx-auto" />
                </th>
                <th className="text-center p-3">
                  <Skeleton className="h-4 w-16 mx-auto" />
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="border-b last:border-b-0">
                  <td className="p-3">
                    <div className="flex items-center">
                      <Skeleton className="h-8 w-8 rounded-full mr-2" />
                      <div>
                        <Skeleton className="h-4 w-24 mb-1" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                  </td>
                  <td className="text-center p-3">
                    <Skeleton className="h-5 w-5 rounded-full mx-auto" />
                  </td>
                  <td className="text-center p-3">
                    <Skeleton className="h-5 w-5 rounded-full mx-auto" />
                  </td>
                  <td className="text-center p-3">
                    <Skeleton className="h-5 w-5 rounded-full mx-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

function AbsentTrackerSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-40 mb-1" />
        <Skeleton className="h-4 w-64" />
      </CardHeader>
      <CardContent className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex justify-between items-center p-3 rounded-md bg-gray-50">
            <div className="flex items-center">
              <Skeleton className="h-8 w-8 rounded-full mr-2" />
              <div>
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function QRManagementSkeleton() {
  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-6 w-32 mb-1" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Skeleton className="h-4 w-48 mb-1" />
              <Skeleton className="h-3 w-64" />
            </div>
            <Skeleton className="h-6 w-12 rounded-full" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-6 w-32 mb-1" />
          <Skeleton className="h-4 w-40" />
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Skeleton className="w-48 h-48 rounded-md mb-4" />
          <Skeleton className="h-4 w-48 mb-2" />
          <Skeleton className="h-3 w-32 mb-4" />
          <div className="flex flex-wrap gap-2 w-full">
            <Skeleton className="h-9 flex-1 rounded-md" />
            <Skeleton className="h-9 flex-1 rounded-md" />
            <Skeleton className="h-9 flex-1 rounded-md" />
          </div>
        </CardContent>
      </Card>
    </>
  )
}
