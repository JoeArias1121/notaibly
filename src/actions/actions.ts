"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { FormState, User, UserResponse, APIResponse} from "@/types/types";
import { createClient } from "@/utils/supabase/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log("Error signing out", error);
    redirect("/error");
  }
  const cookieStore = await cookies();
  cookieStore.delete("user_id")
  console.log("User logged out successfully");
  console.log("Redirecting to login page");
  redirect("/login");
}
// TODO: add supabase.auth.signOut if custom user lookup fails, could put cookie creation in a method
export async function login(
  prev: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const credentials = {
    email: (formData.get("email") as string).trim(),
    password: (formData.get("password") as string).trim(),
  };

  const { error } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    console.log("Failed supabase login", error);
    return {
      success: false,
      error: error.message,
    };
    //redirect("/error");
  }

  try {
    if (!process.env.SITE_URL) {
      throw new Error("SITE_URL is not defined in environment variables.");
    }

    const response = await axios.get(`${process.env.SITE_URL}/api/users/user`, {
      params: {
        email: credentials.email,
      },
    });

    const data = response.data as UserResponse;

    if (data.success === false) {
      console.error("Error fetching user", data.error);
      return {
        success: false,
        error: data.error,
      };
    }
    // setting user_id in cookies for use in the app until user logs out
    const user = data.user;
    const cookieStore = await cookies();
    cookieStore.set("user_id", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    const cookie = cookieStore.get("user_id");
    // cookie is set successfully
    console.log("Cookie set successfully", cookie?.value);
    console.log("User logged in successfully", credentials.email);
  } catch (error) {
    console.error("Error fetching user", error);
    return {
      success: false,
      error: "Error fetching user",
    };
  }
  // if successful, redirect to private page

  revalidatePath("/", "layout");
  redirect("/notes");
}

// TODO:  simplify this server action by creating a service for creating a user and calling the function here
export async function signup(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const credentials = {
    email: (formData.get("email") as string).trim(),
    password: (formData.get("password") as string).trim(),
  };

  try {
    const { error } = await supabase.auth.signUp(credentials);
    if (error) {
      console.log("error", error);
      return {
        success: false,
        error: error.message,
      };
      //redirect("/error");
    }
    if (!process.env.SITE_URL) {
      throw new Error("SITE_URL is not defined in environment variables.");
    }
    // TODO: add cookie for user_id here
    const response = await axios.post(
      `${process.env.SITE_URL}/api/users/user`,
      {
        username: (formData.get("username") as string).trim(),
        ...credentials,
      }
    );
    const data = response.data as APIResponse;
    if (data.success === false) {
      return {
        success: false,
        error: data.error,
      };
    }
  } catch (error) {
    console.error("Error signing up", error);
    return {
      success: false,
      error: "Error signing up",
    };
  }
  console.log("user signed up", credentials.email);
  // if successful, redirect to private page
  revalidatePath("/", "layout");
  redirect("/notes");
}
