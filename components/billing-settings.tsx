"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, Wallet, IndianRupee, Download, Clock, AlertCircle } from "lucide-react"

export default function BillingSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [billingInfo, setBillingInfo] = useState({
    name: "Sharma's Tiffin Service",
    email: "sharmas@example.com",
    phone: "+91 98765 43210",
    address: "123 Food Street, Powai, Mumbai",
    gstin: "27AADCS0472N1Z1",
    upiId: "sharmas@okbank",
    accountNumber: "1234567890",
    ifsc: "SBIN0001234",
    accountName: "Sharma's Tiffin Service",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBillingInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Billing information updated",
        description: "Your billing information has been saved.",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <IndianRupee className="mr-2 h-5 w-5 text-red-600" />
            Billing Information
          </CardTitle>
          <CardDescription>Manage your billing details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Business Name</Label>
              <Input id="name" name="name" value={billingInfo.name} onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={billingInfo.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" value={billingInfo.phone} onChange={handleChange} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" value={billingInfo.address} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gstin">GSTIN (Optional)</Label>
              <Input id="gstin" name="gstin" value={billingInfo.gstin} onChange={handleChange} />
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <Label>Payment Method</Label>
              <RadioGroup value={paymentMethod} onValueChange={handlePaymentMethodChange} className="space-y-4">
                <div className="flex items-center space-x-2 rounded-md border p-4">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi" className="flex items-center cursor-pointer">
                    <Wallet className="h-5 w-5 mr-2 text-blue-500" />
                    <div>
                      <span className="font-medium">UPI</span>
                      <p className="text-sm text-muted-foreground">Receive payments directly to your UPI ID</p>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 rounded-md border p-4">
                  <RadioGroupItem value="bank" id="bank" />
                  <Label htmlFor="bank" className="flex items-center cursor-pointer">
                    <CreditCard className="h-5 w-5 mr-2 text-green-500" />
                    <div>
                      <span className="font-medium">Bank Account</span>
                      <p className="text-sm text-muted-foreground">Receive payments to your bank account</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {paymentMethod === "upi" && (
              <div className="space-y-2">
                <Label htmlFor="upiId">UPI ID</Label>
                <Input id="upiId" name="upiId" value={billingInfo.upiId} onChange={handleChange} required />
              </div>
            )}

            {paymentMethod === "bank" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="accountName">Account Holder Name</Label>
                  <Input
                    id="accountName"
                    name="accountName"
                    value={billingInfo.accountName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    name="accountNumber"
                    value={billingInfo.accountNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ifsc">IFSC Code</Label>
                  <Input id="ifsc" name="ifsc" value={billingInfo.ifsc} onChange={handleChange} required />
                </div>
              </div>
            )}

            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Billing Information"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="mr-2 h-5 w-5 text-red-600" />
            Payment History
          </CardTitle>
          <CardDescription>View your recent payment transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md border p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">Platform Fee</h4>
                  <p className="text-sm text-muted-foreground">May 2025</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹499</p>
                  <p className="text-xs text-muted-foreground">Paid on May 1, 2025</p>
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <Button variant="outline" size="sm" className="h-8">
                  <Download className="h-3 w-3 mr-1" />
                  Invoice
                </Button>
              </div>
            </div>

            <div className="rounded-md border p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">Platform Fee</h4>
                  <p className="text-sm text-muted-foreground">April 2025</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹499</p>
                  <p className="text-xs text-muted-foreground">Paid on April 1, 2025</p>
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <Button variant="outline" size="sm" className="h-8">
                  <Download className="h-3 w-3 mr-1" />
                  Invoice
                </Button>
              </div>
            </div>

            <div className="rounded-md border p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">Platform Fee</h4>
                  <p className="text-sm text-muted-foreground">March 2025</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹499</p>
                  <p className="text-xs text-muted-foreground">Paid on March 1, 2025</p>
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <Button variant="outline" size="sm" className="h-8">
                  <Download className="h-3 w-3 mr-1" />
                  Invoice
                </Button>
              </div>
            </div>

            <Button variant="link" className="w-full">
              View All Transactions
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 text-amber-800 text-sm flex items-start">
        <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold">Important Information</p>
          <p className="mt-1">
            MessCheck charges a platform fee of ₹499 per month. This fee is automatically deducted on the 1st of each
            month. Please ensure your payment method is up to date to avoid any service interruptions.
          </p>
        </div>
      </div>
    </div>
  )
}
