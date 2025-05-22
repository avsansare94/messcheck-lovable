"use client"

import { useRouter } from "next/navigation"

export function useLogout() {
  const router = useRouter()

  const logout = () => {
    // Clear local storage
    localStorage.removeItem("userRole")
    localStorage.removeItem("userData")

    // Clear any cookies
    document.cookie = "userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    document.cookie = "userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

    // Redirect to login
    router.push("/login")
  }

  return { logout }
}
