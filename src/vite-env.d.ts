
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SENTRY_DSN?: string
  readonly VITE_SUPABASE_URL?: string
  readonly VITE_SUPABASE_ANON_KEY?: string
  readonly MODE: string
  // add more env variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
