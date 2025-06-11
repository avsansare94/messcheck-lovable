
import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "@/types/database"
import { createClient, supabase, clearAuthState } from "./supabase/client"

// Singleton pattern for Supabase client
let supabaseClient: ReturnType<typeof createBrowserClient<Database>> | null = null

export function getSupabaseClient() {
  // Only create the client once
  if (!supabaseClient) {
    supabaseClient = createBrowserClient<Database>(
      import.meta.env.VITE_SUPABASE_URL!,
      import.meta.env.VITE_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      },
    )
  }

  return supabaseClient
}

// Export the singleton instance
export { supabase }

// Utility function to clear all auth state on logout
// This function is now re-exported from './supabase/client'

// This file now simply re-exports from the main client to avoid duplication
// Re-export the singleton client for backward compatibility
export { createClient, clearAuthState }

// Keep backward compatibility
export const getSupabaseClientCompat = () => {
  const { createClient } = require("./supabase/client")
  return createClient()
}

export default supabase
