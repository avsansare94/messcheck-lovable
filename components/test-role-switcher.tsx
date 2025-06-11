
"use client"

import { useState } from "react"
import { useTestAuth, TestRole } from "@/lib/test-auth-context"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { User, Building2, Shield, ChevronUp } from "lucide-react"

const ROLE_CONFIG = {
  "mess-user": {
    label: "Mess User",
    icon: User,
    color: "bg-blue-600 hover:bg-blue-700"
  },
  "mess-provider": {
    label: "Mess Provider", 
    icon: Building2,
    color: "bg-green-600 hover:bg-green-700"
  },
  "admin": {
    label: "Admin",
    icon: Shield,
    color: "bg-red-600 hover:bg-red-700"
  }
}

export function TestRoleSwitcher() {
  const { user, setRole } = useTestAuth()
  const [isOpen, setIsOpen] = useState(false)

  if (!user) return null

  const currentConfig = ROLE_CONFIG[user.role]
  const CurrentIcon = currentConfig.icon

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            size="sm" 
            className={`${currentConfig.color} text-white shadow-lg transition-all duration-200 hover:shadow-xl`}
          >
            <CurrentIcon className="h-4 w-4 mr-2" />
            {currentConfig.label}
            <ChevronUp className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {(Object.keys(ROLE_CONFIG) as TestRole[]).map((role) => {
            const config = ROLE_CONFIG[role]
            const Icon = config.icon
            const isActive = user.role === role
            
            return (
              <DropdownMenuItem
                key={role}
                onClick={() => setRole(role)}
                className={`flex items-center gap-2 cursor-pointer ${
                  isActive ? "bg-gray-100" : ""
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{config.label}</span>
                {isActive && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    Active
                  </Badge>
                )}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
