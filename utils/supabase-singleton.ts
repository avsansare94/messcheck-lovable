// Utility to ensure only one Supabase client instance exists
let clientInitialized = false

export function markClientInitialized() {
  if (clientInitialized) {
    console.warn("Supabase client already initialized. Using existing instance.")
    return false
  }
  clientInitialized = true
  return true
}

export function isClientInitialized() {
  return clientInitialized
}

// Reset for testing purposes only
export function resetClientState() {
  if (process.env.NODE_ENV === "test") {
    clientInitialized = false
  }
}
