"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Clock, Download, FileText, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SubscriptionHistoryProps {
  onClose: () => void
}

export function SubscriptionHistory({ onClose }: SubscriptionHistoryProps) {
  const [expandedItems, setExpandedItems] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterYear, setFilterYear] = useState("all")

  // Mock data - in a real app, this would come from an API or context
  const subscriptionHistory = [
    {
      id: 1,
      messName: "Sharma's Tiffin Service",
      planName: "Monthly Thali Plan",
      status: "Completed",
      startDate: "April 1, 2025",
      endDate: "April 30, 2025",
      cost: "₹3,000",
      paymentMethod: "UPI - user@okbank",
      paymentDate: "March 28, 2025",
      mealsIncluded: ["Lunch", "Dinner"],
      invoiceId: "INV-2025-04-001",
      renewedTo: 2,
    },
    {
      id: 2,
      messName: "Sharma's Tiffin Service",
      planName: "Monthly Thali Plan",
      status: "Active",
      startDate: "May 1, 2025",
      endDate: "May 30, 2025",
      cost: "₹3,000",
      paymentMethod: "UPI - user@okbank",
      paymentDate: "April 28, 2025",
      mealsIncluded: ["Lunch", "Dinner"],
      invoiceId: "INV-2025-05-001",
      renewedFrom: 1,
    },
    {
      id: 3,
      messName: "Gupta's Home Food",
      planName: "Weekly Lunch Plan",
      status: "Completed",
      startDate: "March 15, 2025",
      endDate: "March 22, 2025",
      cost: "₹800",
      paymentMethod: "Cash",
      paymentDate: "March 14, 2025",
      mealsIncluded: ["Lunch"],
      invoiceId: "INV-2025-03-045",
    },
    {
      id: 4,
      messName: "Annapurna Meals",
      planName: "Monthly Full Board",
      status: "Cancelled",
      startDate: "February 1, 2025",
      endDate: "February 15, 2025 (Cancelled)",
      cost: "₹4,500 (Partial Refund: ₹2,250)",
      paymentMethod: "Credit Card",
      paymentDate: "January 29, 2025",
      mealsIncluded: ["Breakfast", "Lunch", "Dinner"],
      invoiceId: "INV-2025-02-078",
      cancellationReason: "Relocated to different area",
    },
    {
      id: 5,
      messName: "Homely Bites",
      planName: "Fortnight Special",
      status: "Completed",
      startDate: "January 10, 2025",
      endDate: "January 24, 2025",
      cost: "₹2,200",
      paymentMethod: "UPI - user@okbank",
      paymentDate: "January 9, 2025",
      mealsIncluded: ["Lunch", "Dinner"],
      invoiceId: "INV-2025-01-123",
    },
  ]

  const toggleExpand = (id: number) => {
    if (expandedItems.includes(id)) {
      setExpandedItems(expandedItems.filter((item) => item !== id))
    } else {
      setExpandedItems([...expandedItems, id])
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>
      case "Completed":
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Completed</Badge>
      case "Cancelled":
        return <Badge className="bg-red-100 text-red-700 border-red-200">Cancelled</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200">{status}</Badge>
    }
  }

  const filteredHistory = subscriptionHistory.filter((sub) => {
    const matchesSearch =
      sub.messName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.planName.toLowerCase().includes(searchQuery.toLowerCase())

    const year = new Date(sub.startDate).getFullYear().toString()
    const matchesYear = filterYear === "all" || year === filterYear

    return matchesSearch && matchesYear
  })

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto pb-16">
      <div className="container max-w-md mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Subscription History</h1>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>

        <div className="mb-4 space-y-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by mess or plan name"
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={filterYear} onValueChange={setFilterYear}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Filter by year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredHistory.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No subscription history found.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredHistory.map((subscription) => (
              <Card key={subscription.id} className="overflow-hidden">
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base font-semibold">{subscription.messName}</CardTitle>
                      <p className="text-sm text-muted-foreground">{subscription.planName}</p>
                    </div>
                    {getStatusBadge(subscription.status)}
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Period: </span>
                      <span>
                        {subscription.startDate} - {subscription.endDate}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2"
                      onClick={() => toggleExpand(subscription.id)}
                    >
                      {expandedItems.includes(subscription.id) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  {expandedItems.includes(subscription.id) && (
                    <div className="mt-3 pt-3 border-t border-gray-100 space-y-4">
                      <div className="grid grid-cols-2 gap-y-2 text-sm">
                        <p className="text-muted-foreground">Cost:</p>
                        <p className="font-medium">{subscription.cost}</p>
                        <p className="text-muted-foreground">Payment Method:</p>
                        <p className="font-medium">{subscription.paymentMethod}</p>
                        <p className="text-muted-foreground">Payment Date:</p>
                        <p className="font-medium">{subscription.paymentDate}</p>
                        <p className="text-muted-foreground">Meals Included:</p>
                        <p className="font-medium">{subscription.mealsIncluded.join(", ")}</p>
                        <p className="text-muted-foreground">Invoice ID:</p>
                        <p className="font-medium">{subscription.invoiceId}</p>
                      </div>

                      {subscription.cancellationReason && (
                        <div className="mt-2 pt-2 border-t border-gray-100">
                          <p className="text-sm text-muted-foreground">Cancellation Reason:</p>
                          <p className="text-sm">{subscription.cancellationReason}</p>
                        </div>
                      )}

                      {(subscription.renewedFrom || subscription.renewedTo) && (
                        <div className="mt-2 pt-2 border-t border-gray-100">
                          {subscription.renewedFrom && (
                            <div className="flex items-center text-sm text-blue-600">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>Renewed from previous subscription</span>
                            </div>
                          )}
                          {subscription.renewedTo && (
                            <div className="flex items-center text-sm text-blue-600">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>Renewed to current subscription</span>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm" className="text-xs h-8 flex-1">
                          <FileText className="h-3 w-3 mr-1" />
                          View Invoice
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs h-8 flex-1">
                          <Download className="h-3 w-3 mr-1" />
                          Receipt
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
