export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string
          email: string
          phone_number: string | null
          role: "user" | "provider" | "admin"
          age: number | null
          gender: string | null
          address: string | null
          city: string | null
          state: string | null
          pincode: string | null
          institution: string | null
          institution_type: string | null
          food_preference: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name: string
          email: string
          phone_number?: string | null
          role?: "user" | "provider" | "admin"
          age?: number | null
          gender?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          pincode?: string | null
          institution?: string | null
          institution_type?: string | null
          food_preference?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          phone_number?: string | null
          role?: "user" | "provider" | "admin"
          age?: number | null
          gender?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          pincode?: string | null
          institution?: string | null
          institution_type?: string | null
          food_preference?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      mess_profiles: {
        Row: {
          id: string
          mess_name: string
          owner_id: string | null
          mess_type: "veg" | "non_veg" | "jain" | "mixed"
          cuisine_tags: string[]
          address: string
          city: string
          state: string | null
          pincode: string
          geo_location: unknown | null
          nearby_tags: string[]
          is_claimed: boolean
          is_verified: boolean
          rating: number | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          mess_name: string
          owner_id?: string | null
          mess_type?: "veg" | "non_veg" | "jain" | "mixed"
          cuisine_tags?: string[]
          address: string
          city: string
          state?: string | null
          pincode: string
          geo_location?: unknown | null
          nearby_tags?: string[]
          is_claimed?: boolean
          is_verified?: boolean
          rating?: number | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          mess_name?: string
          owner_id?: string | null
          mess_type?: "veg" | "non_veg" | "jain" | "mixed"
          cuisine_tags?: string[]
          address?: string
          city?: string
          state?: string | null
          pincode?: string
          geo_location?: unknown | null
          nearby_tags?: string[]
          is_claimed?: boolean
          is_verified?: boolean
          rating?: number | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          mess_id: string
          meal_plan_id: string
          start_date: string
          end_date: string
          is_active: boolean
          off_days_used: number
          renewal_due: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          mess_id: string
          meal_plan_id: string
          start_date: string
          end_date: string
          is_active?: boolean
          off_days_used?: number
          renewal_due?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          mess_id?: string
          meal_plan_id?: string
          start_date?: string
          end_date?: string
          is_active?: boolean
          off_days_used?: number
          renewal_due?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
