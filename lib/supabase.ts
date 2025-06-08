import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "@/types/database"

// Singleton pattern for Supabase client
let supabaseClient: ReturnType<typeof createBrowserClient<Database>> | null = null

export function getSupabaseClient() {
  // Only create the client once
  if (!supabaseClient) {
    supabaseClient = createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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
export const supabase = getSupabaseClient()

// Utility function to clear all auth state on logout
export async function clearAuthState() {
  const client = getSupabaseClient()

  try {
    // Sign out from Supabase
    await client.auth.signOut()

    // Clear localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem(
        "sb-" + process.env.NEXT_PUBLIC_SUPABASE_URL?.split("//")[1]?.split(".")[0] + "-auth-token",
      )
      localStorage.removeItem("user")
      localStorage.removeItem("userRole")
      localStorage.removeItem("userData")
    }

    // Clear cookies
    if (typeof document !== "undefined") {
      document.cookie = "userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      document.cookie = "userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    }
  } catch (error) {
    console.error("Error during auth state cleanup:", error)
  }
}

// Re-export for backward compatibility
export const createClient = getSupabaseClient
export default supabase
