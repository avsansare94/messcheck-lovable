
import { createServerClient } from '@supabase/ssr'
import type { Database } from '@/types/database'

export function createClient() {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get() {
          return undefined
        },
        set() {
          // No-op for client-side
        },
        remove() {
          // No-op for client-side
        },
      },
    }
  )
}

// Alias for compatibility
export const createServerClient = createClient
