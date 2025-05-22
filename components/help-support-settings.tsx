"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useToast } from "@/hooks/use-toast"
import { HelpCircle, MessageSquare, Phone, Mail, ExternalLink } from "lucide-react"

export default function HelpSupportSettings() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContactForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Message sent",
        description: "We've received your message and will respond shortly.",
      })
      setContactForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <HelpCircle className="mr-2 h-5 w-5 text-red-600" />
            Frequently Asked Questions
          </CardTitle>
          <CardDescription>Find answers to common questions</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I subscribe to a mess?</AccordionTrigger>
              <AccordionContent>
                To subscribe to a mess, navigate to the mess details page and click on the "Subscribe" button. You'll be
                presented with available subscription plans. Select a plan that suits your needs and follow the payment
                instructions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How do I check in for meals?</AccordionTrigger>
              <AccordionContent>
                Once you've subscribed to a mess, you can check in for meals by visiting the "My Mess" section and
                selecting "Check In". You'll be provided with a QR code that the mess provider can scan to verify your
                subscription.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I cancel my subscription?</AccordionTrigger>
              <AccordionContent>
                Yes, you can cancel your subscription at any time. Go to "My Mess" section, select your active
                subscription, and click on "Cancel Subscription". Please note that refund policies vary by mess
                provider.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>How do I report an issue with a mess?</AccordionTrigger>
              <AccordionContent>
                If you encounter any issues with a mess, you can report it by leaving a review on the mess page or by
                contacting our support team using the contact form below. Please provide as much detail as possible to
                help us address the issue effectively.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>How do I update my profile information?</AccordionTrigger>
              <AccordionContent>
                You can update your profile information by going to the "Settings" section and selecting "Profile". From
                there, you can edit your personal details, food preferences, and other information.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5 text-red-600" />
            Contact Support
          </CardTitle>
          <CardDescription>Get in touch with our support team</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={contactForm.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={contactForm.email}
                onChange={handleChange}
                placeholder="Your email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                value={contactForm.subject}
                onChange={handleChange}
                placeholder="What's this about?"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={contactForm.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                className="min-h-[120px]"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Phone className="mr-2 h-5 w-5 text-red-600" />
            Other Ways to Reach Us
          </CardTitle>
          <CardDescription>Alternative contact methods</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <h4 className="font-medium">Email Support</h4>
              <p className="text-sm text-muted-foreground">support@messcheck.com</p>
              <p className="text-sm text-muted-foreground">Response time: 24-48 hours</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <h4 className="font-medium">Phone Support</h4>
              <p className="text-sm text-muted-foreground">+91 1234 567 890</p>
              <p className="text-sm text-muted-foreground">Available Mon-Fri, 9 AM - 6 PM IST</p>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-2">
            <ExternalLink className="mr-2 h-4 w-4" />
            Visit Help Center
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
