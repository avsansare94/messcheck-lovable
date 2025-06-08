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

  console.log("Supabase client validation passed")
  return true
}

// Run validation in development
if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
  // Delay validation to ensure client is initialized
  setTimeout(() => {
    validateSupabaseClient()
  }, 1000)
}
