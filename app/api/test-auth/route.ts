import { type NextRequest, NextResponse } from "next/server"
import { createClient, createServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    // Test both export names to ensure they work
    const supabaseClient = createClient()
    const supabaseServerClient = createServerClient()

    // Test session retrieval
    const { data: sessionData, error: sessionError } = await supabaseClient.auth.getSession()

    if (sessionError) {
      return NextResponse.json(
        {
          error: "Session error",
          details: sessionError.message,
          exports: {
            createClient: typeof createClient,
            createServerClient: typeof createServerClient,
          },
        },
        { status: 500 },
      )
    }

    // Test user retrieval
    const { data: userData, error: userError } = await supabaseClient.auth.getUser()

    if (userError) {
      return NextResponse.json(
        {
          error: "User error",
          details: userError.message,
          session: !!sessionData.session,
        },
        { status: 500 },
      )
    }

    // Test profile fetch if user exists
    let profileData = null
    if (userData.user) {
      const { data: profile, error: profileError } = await supabaseClient
        .from("profiles")
        .select("role, email, full_name")
        .eq("id", userData.user.id)
        .single()

      if (profileError && profileError.code !== "PGRST116") {
        return NextResponse.json(
          {
            error: "Profile error",
            details: profileError.message,
            user: !!userData.user,
          },
          { status: 500 },
        )
      }

      profileData = profile
    }

    return NextResponse.json({
      success: true,
      message: "Server authentication working correctly",
      data: {
        hasSession: !!sessionData.session,
        hasUser: !!userData.user,
        hasProfile: !!profileData,
        userEmail: userData.user?.email,
        userRole: profileData?.role,
        exports: {
          createClient: typeof createClient,
          createServerClient: typeof createServerClient,
          bothExportsWork: createClient === createServerClient,
        },
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Server test failed",
        details: error.message,
        stack: error.stack,
      },
      { status: 500 },
    )
  }
}
