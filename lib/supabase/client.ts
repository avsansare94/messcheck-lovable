
import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Missing Supabase environment variables. Some features may not work.")
}

// Singleton pattern to prevent multiple client instances
let supabaseClient: ReturnType<typeof createSupabaseClient<Database>> | null = null

export function createClient() {
  // Return existing client if already created
  if (supabaseClient) {
    return supabaseClient
  }

  // Only create client if we have the required environment variables
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL and Anon Key are required")
  }

  // Create new client with proper configuration
  supabaseClient = createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: "pkce",
    },
    global: {
      headers: {
        "X-Client-Info": "messcheck-web",
      },
    },
  })

  // Log client creation in development
  if (import.meta.env.MODE === "development") {
    console.log("✅ Supabase client created (singleton)")
  }

  return supabaseClient
}

// Export the singleton client only if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey ? createClient() : null

// Clear auth state function
export async function clearAuthState() {
  if (!supabase) {
    console.warn("Supabase client not available")
    return
  }

  try {
    // Sign out from Supabase
    await supabase.auth.signOut()

    // Clear local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
      localStorage.removeItem("supabase.auth.token")
    }

    // Clear cookies
    if (typeof document !== "undefined") {
      document.cookie = "userData=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
      document.cookie = "supabase-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
    }

    console.log("✅ Auth state cleared")
  } catch (error) {
    console.error("❌ Error clearing auth state:", error)
  }
}

export default supabase
