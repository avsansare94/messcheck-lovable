
"use client"

import type React from "react"
import { createContext, useContext } from "react"
import { useTestAuth } from "@/lib/test-auth-context"

interface UserContextType {
  user: any
  loading: boolean
  setUser: (user: any) => void
  logout: () => Promise<void>
  signOut: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserContextProvider({ children }: { children: React.ReactNode }) {
  const { user, loading, logout, signOut } = useTestAuth()

  const setUser = () => {
    // No-op in test mode
  }

  const asyncLogout = async () => {
    logout()
  }

  const asyncSignOut = async () => {
    signOut()
  }

  return (
    <UserContext.Provider value={{ user, loading, setUser, logout: asyncLogout, signOut: asyncSignOut }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserContextProvider")
  }
  return context
}
