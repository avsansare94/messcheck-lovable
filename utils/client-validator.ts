
// Utility to validate that we're using the correct client instance
import { supabase } from "@/lib/supabase/client"

export function validateSupabaseClient() {
  if (typeof window === "undefined") {
    console.warn("Supabase client validation should only run in browser context")
    return false
  }

  // Check if the client is properly initialized
  if (!supabase) {
    console.error("Supabase client is not initialized")
    return false
  }

  // Verify auth client exists
  if (!supabase.auth) {
    console.error("Supabase auth client is not available")
    return false
  }

  // Check if we have valid environment variables
  if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    console.warn("Supabase environment variables are missing - client may not work properly")
    return false
  }

  console.log("Supabase client validation passed")
  return true
}

// Run validation in development
if (import.meta.env.MODE === "development" && typeof window !== "undefined") {
  // Delay validation to ensure client is initialized
  setTimeout(() => {
    validateSupabaseClient()
  }, 1000)
}
