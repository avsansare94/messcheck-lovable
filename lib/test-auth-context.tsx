"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export type TestRole = "mess-user" | "mess-provider" | "admin"

interface TestUser {
  id: string
  email: string
  role: TestRole
  full_name: string
}

interface TestAuthContextType {
  user: TestUser | null
  loading: boolean
  setRole: (role: TestRole) => void
  logout: () => void
  signOut: () => void
}

const TestAuthContext = createContext<TestAuthContextType | undefined>(undefined)

const TEST_USERS: Record<TestRole, TestUser> = {
  "mess-user": {
    id: "test-user-1",
    email: "user@test.com",
    role: "mess-user",
    full_name: "Test User"
  },
  "mess-provider": {
    id: "test-provider-1", 
    email: "provider@test.com",
    role: "mess-provider",
    full_name: "Test Provider"
  },
  "admin": {
    id: "test-admin-1",
    email: "admin@test.com", 
    role: "admin",
    full_name: "Test Admin"
  }
}

export function TestAuthProvider({ children }: { children: React.ReactNode }) {
  const [currentRole, setCurrentRole] = useState<TestRole>("mess-user")
  const [loading, setLoading] = useState(false)

  const user = TEST_USERS[currentRole]

  const setRole = (role: TestRole) => {
    setCurrentRole(role)
    localStorage.setItem("test-role", role)
  }

  const logout = () => {
    // Keep user logged in for test mode
  }

  const signOut = logout

  // Load saved role from localStorage
  useEffect(() => {
    const savedRole = localStorage.getItem("test-role") as TestRole
    if (savedRole && TEST_USERS[savedRole]) {
      setCurrentRole(savedRole)
    }
  }, [])

  return (
    <TestAuthContext.Provider value={{ user, loading, setRole, logout, signOut }}>
      {children}
    </TestAuthContext.Provider>
  )
}

export function useTestAuth() {
  const context = useContext(TestAuthContext)
  if (context === undefined) {
    throw new Error("useTestAuth must be used within a TestAuthProvider")
  }
  return context
}

// Backward compatibility hooks
export const useUser = useTestAuth
export const useSupabase = () => ({
  user: useTestAuth().user,
  loading: useTestAuth().loading,
  supabase: null // Mock supabase client
})
