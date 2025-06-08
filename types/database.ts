// Database type definitions for better TypeScript support
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          role: "user" | "provider" | "admin" | "zeus"
          gender?: string
          age?: number
          institution?: string
          institution_type?: string
          food_preference?: string
          phone_number?: string
          address?: string
          city?: string
          state?: string
          pincode?: string
          geo_location?: any
          created_at?: string
          updated_at?: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          role?: "user" | "provider" | "admin" | "zeus"
          gender?: string
          age?: number
          institution?: string
          institution_type?: string
          food_preference?: string
          phone_number?: string
          address?: string
          city?: string
          state?: string
          pincode?: string
          geo_location?: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          role?: "user" | "provider" | "admin" | "zeus"
          gender?: string
          age?: number
          institution?: string
          institution_type?: string
          food_preference?: string
          phone_number?: string
          address?: string
          city?: string
          state?: string
          pincode?: string
          geo_location?: any
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
