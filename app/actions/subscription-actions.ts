"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getUserSubscriptions() {
  const supabase = getSupabaseServerClient()

  // Get the current user
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return []
  }

  // Get the user's subscriptions
  const { data, error } = await supabase
    .from("subscriptions")
    .select(`
      id,
      start_date,
      end_date,
      is_active,
      off_days_used,
      renewal_due,
      mess_profiles(id, mess_name, mess_type, address, city),
      meal_plans(id, name, type, duration_days, price)
    `)
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching user subscriptions:", error)
    throw new Error("Failed to fetch user subscriptions")
  }

  return data
}

export async function getMessSubscriptions(messId: string) {
  const supabase = getSupabaseServerClient()

  // Get the current user
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return []
  }

  // Get the mess subscriptions
  const { data, error } = await supabase
    .from("subscriptions")
    .select(`
      id,
      start_date,
      end_date,
      is_active,
      off_days_used,
      renewal_due,
      profiles(id, full_name, phone_number),
      meal_plans(id, name, type, duration_days, price)
    `)
    .eq("mess_id", messId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching mess subscriptions:", error)
    throw new Error("Failed to fetch mess subscriptions")
  }

  return data
}

export async function createSubscription(subscriptionData: any) {
  const supabase = getSupabaseServerClient()

  // Get the current user
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    throw new Error("You must be logged in to create a subscription")
  }

  // Create the subscription
  const { data, error } = await supabase
    .from("subscriptions")
    .insert({
      user_id: session.user.id,
      mess_id: subscriptionData.messId,
      meal_plan_id: subscriptionData.mealPlanId,
      start_date: subscriptionData.startDate,
      end_date: subscriptionData.endDate,
      is_active: true,
      off_days_used: 0,
      renewal_due: subscriptionData.endDate,
    })
    .select()

  if (error) {
    console.error("Error creating subscription:", error)
    throw new Error("Failed to create subscription")
  }

  // Create payment record
  if (subscriptionData.paymentMode) {
    const { error: paymentError } = await supabase.from("payment_records").insert({
      user_id: session.user.id,
      mess_id: subscriptionData.messId,
      subscription_id: data[0].id,
      meal_plan_id: subscriptionData.mealPlanId,
      amount: subscriptionData.amount,
      payment_mode: subscriptionData.paymentMode,
      screenshot_url: subscriptionData.screenshotUrl,
      is_verified: false,
    })

    if (paymentError) {
      console.error("Error creating payment record:", paymentError)
    }
  }

  revalidatePath("/my-mess")
  return data[0]
}
