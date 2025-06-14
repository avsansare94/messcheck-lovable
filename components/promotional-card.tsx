
import type React from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface PromotionalCardProps {
  title: string
  subtitle?: string
  description: string | React.ReactNode
  ctaText: string
  ctaTarget: string
  icon?: string
  colorScheme?: "accent" | "soft" | "default"
  buttonStyle?: "primary" | "outline" | "default"
  shadow?: "soft" | "none"
}

export function PromotionalCard({
  title,
  subtitle,
  description,
  ctaText,
  ctaTarget,
  icon,
  colorScheme = "default",
  buttonStyle = "default",
  shadow = "none",
}: PromotionalCardProps) {
  // Define color schemes with Zomato-inspired colors
  const colorSchemes = {
    accent: "bg-gradient-to-br from-zomato-red/10 to-zomato-red/20 border-zomato-red/30",
    soft: "bg-gradient-to-br from-zomato-gray-50 to-zomato-gray-100 border-zomato-gray-200",
    default: "bg-white border-zomato-gray-200",
  }

  // Define button styles with Zomato colors
  const buttonStyles = {
    primary: "bg-zomato-red hover:bg-zomato-red-dark text-white shadow-zomato",
    outline: "border-zomato-red/30 text-zomato-red hover:bg-zomato-red/5",
    default: "",
  }

  // Define shadow styles
  const shadowStyles = {
    soft: "shadow-card hover:shadow-card-hover",
    none: "",
  }

  return (
    <Card className={`overflow-hidden transition-all duration-300 ${colorSchemes[colorScheme]} ${shadowStyles[shadow]} border rounded-xl`}>
      <CardHeader className="pb-3 pt-6">
        <div className="flex items-start gap-4">
          {icon && <div className="text-3xl flex-shrink-0 mt-1">{icon}</div>}
          <div>
            <h3 className="text-lg font-semibold text-zomato-gray-800 font-display">{title}</h3>
            {subtitle && <p className="text-sm text-zomato-gray-600 mt-1">{subtitle}</p>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        {typeof description === "string" ? (
          <div className="text-sm text-zomato-gray-600 whitespace-pre-line leading-relaxed">{description}</div>
        ) : (
          description
        )}
      </CardContent>
      <CardFooter className="pt-2 pb-6">
        <Button asChild className={`transition-all duration-200 ${buttonStyles[buttonStyle]}`}>
          <Link to={ctaTarget}>{ctaText}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
