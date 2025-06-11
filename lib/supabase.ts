import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "@/types/database"
import { createClient, supabase, clearAuthState } from "./supabase/client"

// Singleton pattern for Supabase client
let supabaseClient: ReturnType<typeof createBrowserClient<Database>> | null = null

export function getSupabaseClient() {
  // Only create the client once
  if (!supabaseClient) {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://placeholder.supabase.co"
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder-key"
    
    supabaseClient = createBrowserClient<Database>(
      supabaseUrl,
      supabaseAnonKey,
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

// Re-export the singleton client for backward compatibility
export { createClient, clearAuthState }

// Keep backward compatibility
export const getSupabaseClientCompat = () => {
  return createClient()
}

export default supabase
