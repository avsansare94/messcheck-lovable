"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { setUserInfo, clearUserInfo } from "@/lib/sentry"
import { useRouter, usePathname } from "next/navigation"

// Define the user type
type User = {
  id: string
  email?: string
  username?: string
  role?: string
} | null

// Create context
const UserContext = createContext<{
  user: User
  setUser: (user: User) => void
  logout: () => void
  isProvider: () => boolean
}>({
  user: null,
  setUser: () => {},
  logout: () => {},
  isProvider: () => false,
})

// Hook to use the user context
export const useUser = () => useContext(UserContext)

// Provider component
export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User>(null)
  const router = useRouter()
  const pathname = usePathname()

  // Debug logging
  useEffect(() => {
    console.log("UserContext initialized, current user:", user)
  }, [])

  // Update Sentry user info when user changes
  const setUser = (newUser: User) => {
    console.log("Setting user:", newUser)
    setUserState(newUser)

    if (newUser) {
      // Update Sentry user context
      setUserInfo({
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role,
      })

      try {
        // Set cookie for middleware
        document.cookie = `userData=${JSON.stringify(newUser)}; path=/; max-age=86400`
        // Also store in localStorage as backup
        localStorage.setItem("user", JSON.stringify(newUser))
      } catch (error) {
        console.error("Error storing user data:", error)
      }
    }
  }

  const logout = () => {
    console.log("Logging out user")
    setUserState(null)
    clearUserInfo()

    try {
      // Clear user data cookie
      document.cookie = "userData=; path=/; max-age=0"
      // Clear localStorage
      localStorage.removeItem("user")
    } catch (error) {
      console.error("Error clearing user data:", error)
    }
  }

  // On mount, try to get user from local storage and cookies
  useEffect(() => {
    try {
      // Try to get user from localStorage first
      const storedUser = localStorage.getItem("user")
      console.log("Retrieved user from localStorage:", storedUser)

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser)
          setUser(parsedUser)
        } catch (e) {
          console.error("Failed to parse stored user:", e)
          localStorage.removeItem("user")
        }
      } else {
        // Try to get from cookie as fallback
        const cookies = document.cookie.split(";")
        const userDataCookie = cookies.find((cookie) => cookie.trim().startsWith("userData="))
        console.log("Retrieved user from cookie:", userDataCookie)

        if (userDataCookie) {
          try {
            const userData = JSON.parse(userDataCookie.split("=")[1])
            setUser(userData)
          } catch (e) {
            console.error("Failed to parse user data from cookie:", e)
          }
        }
      }
    } catch (error) {
      console.error("Error in user initialization:", error)
    }
  }, [])

  // When user changes, update local storage
  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem("user", JSON.stringify(user))
      } catch (error) {
        console.error("Error updating user in localStorage:", error)
      }
    } else {
      try {
        localStorage.removeItem("user")
      } catch (error) {
        console.error("Error removing user from localStorage:", error)
      }
    }
  }, [user])

  // Add a function to check if user is a provider
  const isProvider = () => {
    return user?.role === "provider"
  }

  // Redirect based on role and current path
  useEffect(() => {
    // Skip if no user or during initial load
    if (!user || !pathname) return

    const isProviderRoute = pathname.startsWith("/provider")
    const isUserRoute = ["/home", "/my-mess", "/explore", "/profile"].includes(pathname)

    // If provider is on user routes, redirect to provider home
    if (user.role === "provider" && isUserRoute) {
      router.push("/provider/home")
    }

    // If regular user is on provider routes, redirect to user home
    if (user.role !== "provider" && isProviderRoute) {
      router.push("/home")
    }
  }, [user, pathname, router])

  // Update the context value to include isProvider
  return <UserContext.Provider value={{ user, setUser, logout, isProvider }}>{children}</UserContext.Provider>
}
