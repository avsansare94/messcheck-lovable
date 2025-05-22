import type React from "react"
import Link from "next/link"
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
  // Define color schemes
  const colorSchemes = {
    accent: "bg-gradient-to-br from-red-50 to-red-100 border-red-200",
    soft: "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200",
    default: "bg-white border-gray-200",
  }

  // Define button styles
  const buttonStyles = {
    primary: "bg-red-600 hover:bg-red-700 text-white",
    outline: "border-red-200 text-red-600 hover:bg-red-50",
    default: "",
  }

  // Define shadow styles
  const shadowStyles = {
    soft: "shadow-md",
    none: "",
  }

  return (
    <Card className={`overflow-hidden ${colorSchemes[colorScheme]} ${shadowStyles[shadow]} border rounded-lg`}>
      <CardHeader className="pb-2 pt-4">
        <div className="flex items-start gap-3">
          {icon && <div className="text-2xl flex-shrink-0 mt-1">{icon}</div>}
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        {typeof description === "string" ? (
          <div className="text-sm text-gray-600 whitespace-pre-line">{description}</div>
        ) : (
          description
        )}
      </CardContent>
      <CardFooter className="pt-2 pb-4">
        <Button asChild className={buttonStyles[buttonStyle]}>
          <Link href={ctaTarget}>{ctaText}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
