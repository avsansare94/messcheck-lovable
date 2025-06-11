
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
  const { user, loading, logout: testLogout, signOut: testSignOut } = useTestAuth()

  const setUser = () => {
    // No-op in test mode
  }

  const logout = async () => {
    await Promise.resolve(testLogout())
  }

  const signOut = async () => {
    await Promise.resolve(testSignOut())
  }

  return (
    <UserContext.Provider value={{ user, loading, setUser, logout, signOut }}>
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
