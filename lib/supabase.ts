import { createClient, supabase, clearAuthState } from "./supabase/client"

// Re-export everything from the main client
export { supabase, createClient, clearAuthState }

// Keep backward compatibility
export const getSupabaseClient = () => {
  return createClient()
}

export default supabase
