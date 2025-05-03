import { UserResponse } from "@/types/types";
import { createServerClient } from "@supabase/ssr";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

export async function checkUserLoggedIn() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || user === null) {
    console.log("Error getting user", error);
    return false
  }
  return true
}

export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    console.log("No user authenticated yet");
    return null
  }
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;
  if (!userId) {
    console.log("No user id found in cookies")
    return null
  }
  try {
    const response = await axios.get(`${process.env.SITE_URL}/api/users/user`, {
      params: {
        userId: userId,
      },
    })
    const data = response.data as UserResponse;
    if (data.success === false) {
      console.error("Error fetching user", data.error);
      return null
    }
    return data.user
  } catch (err) { 
    console.error("Error fetching user", err);
    return null
  }
}

