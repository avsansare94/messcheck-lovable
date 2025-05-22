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

  // Update Sentry user info when user changes
  const setUser = (newUser: User) => {
    setUserState(newUser)

    if (newUser) {
      // Update Sentry user context
      setUserInfo({
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role,
      })

      // Set cookie for middleware
      document.cookie = `userData=${JSON.stringify(newUser)}; path=/; max-age=86400`
    }
  }

  const logout = () => {
    setUserState(null)
    clearUserInfo()

    // Clear user data cookie
    document.cookie = "userData=; path=/; max-age=0"

    // Redirect to root
    router.push("/")
  }

  // On mount, try to get user from local storage and cookies
  useEffect(() => {
    // Try to get user from localStorage first
    const storedUser = localStorage.getItem("user")
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

      if (userDataCookie) {
        try {
          const userData = JSON.parse(userDataCookie.split("=")[1])
          setUser(userData)
        } catch (e) {
          console.error("Failed to parse user data from cookie:", e)
        }
      }
    }
  }, [])

  // When user changes, update local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
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
