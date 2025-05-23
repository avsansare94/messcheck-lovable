"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getCurrentUserProfile() {
  const supabase = getSupabaseServerClient()

  // Get the current user
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return null
  }

  // Get the user's profile
  const { data, error } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

  if (error) {
    console.error("Error fetching user profile:", error)
    throw new Error("Failed to fetch user profile")
  }

  return data
}

export async function updateUserProfile(profileData: any) {
  const supabase = getSupabaseServerClient()

  // Get the current user
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    throw new Error("You must be logged in to update your profile")
  }

  // Update the user's profile
  const { data, error } = await supabase
    .from("profiles")
    .update({
      full_name: profileData.fullName,
      phone_number: profileData.phoneNumber,
      age: profileData.age,
      gender: profileData.gender,
      address: profileData.address,
      city: profileData.city,
      state: profileData.state,
      pincode: profileData.pincode,
      institution: profileData.institution,
      institution_type: profileData.institutionType,
      food_preference: profileData.foodPreference,
      updated_at: new Date().toISOString(),
    })
    .eq("id", session.user.id)
    .select()

  if (error) {
    console.error("Error updating user profile:", error)
    throw new Error("Failed to update user profile")
  }

  const path = profileData.role === "provider" ? "/provider/settings/profile" : "/settings/profile"
  revalidatePath(path)
  return data[0]
}
