"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getMessProfiles(city?: string, pincode?: string) {
  const supabase = getSupabaseServerClient()

  let query = supabase
    .from("mess_profiles")
    .select(`
      id,
      mess_name,
      mess_type,
      cuisine_tags,
      address,
      city,
      pincode,
      rating,
      is_verified,
      profiles(full_name)
    `)
    .order("rating", { ascending: false })

  if (city) {
    query = query.eq("city", city)
  }

  if (pincode) {
    query = query.eq("pincode", pincode)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching mess profiles:", error)
    throw new Error("Failed to fetch mess profiles")
  }

  return data
}

export async function getMessProfileById(id: string) {
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase
    .from("mess_profiles")
    .select(`
      id,
      mess_name,
      mess_type,
      cuisine_tags,
      address,
      city,
      state,
      pincode,
      nearby_tags,
      rating,
      is_verified,
      profiles(full_name, phone_number),
      meal_plans(id, name, type, duration_days, price, description)
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching mess profile:", error)
    throw new Error("Failed to fetch mess profile")
  }

  return data
}

export async function createMessProfile(messData: any) {
  const supabase = getSupabaseServerClient()

  // Get the current user
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    throw new Error("You must be logged in to create a mess profile")
  }

  // Create the mess profile
  const { data, error } = await supabase
    .from("mess_profiles")
    .insert({
      mess_name: messData.messName,
      owner_id: session.user.id,
      mess_type: messData.messType,
      cuisine_tags: messData.cuisineTags,
      address: messData.address,
      city: messData.city,
      state: messData.state,
      pincode: messData.pincode,
      nearby_tags: messData.nearbyTags,
      created_by: session.user.id,
      is_claimed: true,
      is_verified: false,
    })
    .select()

  if (error) {
    console.error("Error creating mess profile:", error)
    throw new Error("Failed to create mess profile")
  }

  revalidatePath("/provider/manage")
  return data[0]
}
