"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, X, MapPin, Users, Utensils } from "lucide-react"
import { toast } from "sonner"

interface MessProfile {
  id: string
  mess_name: string
  mess_type: string
  cuisine_tags: string[]
  address: string
  city: string
  state: string
  pincode: string
  nearby_tags: string[]
  is_verified: boolean
  is_claimed: boolean
  rating: number | null
  created_at: string
}

export default function MessVerification() {
  const [messes, setMesses] = useState<MessProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    fetchUnverifiedMesses()
  }, [])

  const fetchUnverifiedMesses = async () => {
    try {
      const { data, error } = await supabase
        .from("mess_profiles")
        .select("*")
        .eq("is_verified", false)
        .order("created_at", { ascending: false })

      if (error) throw error
      setMesses(data || [])
    } catch (error) {
      console.error("Error fetching unverified messes:", error)
      toast.error("Failed to fetch unverified messes")
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyMess = async (messId: string, approve: boolean) => {
    setActionLoading(messId)
    try {
      const { error } = await supabase.from("mess_profiles").update({ is_verified: approve }).eq("id", messId)

      if (error) throw error

      // Remove from list if approved, keep if rejected for re-review
      if (approve) {
        setMesses(messes.filter((mess) => mess.id !== messId))
        toast.success("Mess verified successfully")
      } else {
        toast.success("Mess verification rejected")
      }

      // Log admin activity
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        await supabase.from("admin_activity_logs").insert({
          admin_id: user.id,
          action: approve ? "MESS_VERIFIED" : "MESS_REJECTED",
          target_table: "mess_profiles",
          target_id: messId,
          details: {
            mess_name: messes.find((m) => m.id === messId)?.mess_name,
            action: approve ? "Verified mess profile" : "Rejected mess verification",
          },
        })
      }
    } catch (error) {
      console.error("Error updating mess verification:", error)
      toast.error("Failed to update mess verification")
    } finally {
      setActionLoading(null)
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-48 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mess Verification</h1>
        <p className="text-gray-600">Review and verify mess profiles</p>
      </div>

      {messes.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
            <p className="text-gray-600 text-center">No unverified mess profiles at the moment.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {messes.map((mess) => (
            <Card key={mess.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{mess.mess_name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <MapPin className="h-4 w-4" />
                      {mess.address}, {mess.city}, {mess.state} - {mess.pincode}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline">{mess.mess_type}</Badge>
                    <Badge variant={mess.is_claimed ? "default" : "secondary"}>
                      {mess.is_claimed ? "Claimed" : "Unclaimed"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium flex items-center gap-2 mb-2">
                      <Utensils className="h-4 w-4" />
                      Cuisine Types
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {mess.cuisine_tags.map((cuisine, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {cuisine}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4" />
                      Nearby Institutions
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {mess.nearby_tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-gray-500">
                    Created: {new Date(mess.created_at).toLocaleDateString()}
                    {mess.rating && <span className="ml-4">Rating: {mess.rating}/5</span>}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleVerifyMess(mess.id, false)}
                      disabled={actionLoading === mess.id}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleVerifyMess(mess.id, true)}
                      disabled={actionLoading === mess.id}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      {actionLoading === mess.id ? "Processing..." : "Verify"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
