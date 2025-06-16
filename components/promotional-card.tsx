
import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface PromotionalCardProps {
  title: string
  description: string
  ctaText: string
  ctaTarget: string
  icon: string
  colorScheme: "accent" | "soft"
  buttonStyle: "primary" | "outline"
  shadow?: "soft"
}

export function PromotionalCard({
  title,
  description,
  ctaText,
  ctaTarget,
  icon,
  colorScheme,
  buttonStyle,
  shadow = "soft"
}: PromotionalCardProps) {
  return (
    <Card className={`
      border-zomato-gray-100 
      ${shadow === "soft" ? "shadow-card hover:shadow-card-hover" : "shadow-lg"} 
      transition-all duration-300 
      ${colorScheme === "accent" ? "bg-gradient-to-br from-zomato-red/5 to-zomato-orange/5" : "bg-white"}
      hover:scale-105
    `}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="text-2xl">{icon}</div>
          <div className="flex-1">
            <h3 className="font-semibold text-zomato-gray-900 font-display mb-2">{title}</h3>
            <p className="text-sm text-zomato-gray-600 mb-4 leading-relaxed">{description}</p>
            <Button
              className={
                buttonStyle === "primary"
                  ? "bg-zomato-red hover:bg-zomato-red-dark text-white shadow-zomato"
                  : "border-zomato-gray-200 text-zomato-gray-700 hover:bg-zomato-gray-50"
              }
              variant={buttonStyle === "primary" ? "default" : "outline"}
              size="sm"
            >
              {ctaText}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
