
"use client"

import { useNavigate } from "react-router-dom"
import { clearAuthState } from "@/lib/supabase"

export function useLogout() {
  const navigate = useNavigate()

  const logout = async () => {
    // Use the centralized auth state clearing function
    await clearAuthState()

    // Redirect to login
    navigate("/login")
  }

  return { logout }
}
