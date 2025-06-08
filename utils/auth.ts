"use client"

import { useRouter } from "next/navigation"
import { clearAuthState } from "@/lib/supabase"

export function useLogout() {
  const router = useRouter()

  const logout = async () => {
    // Use the centralized auth state clearing function
    await clearAuthState()

    // Redirect to login
    router.push("/login")
  }

  return { logout }
}
