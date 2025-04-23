"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { FormState } from "@/types/types";
import { createClient } from "@/utils/supabase/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut({ scope: "local" });

  if (error) {
    console.log("Error signing out", error);
    redirect("/error");
  }
  redirect("/login");
}

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

    const data = response.data;

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
      maxAge: 60 * 60 * 24 * 365 * 100, // 100 years
    });

    const cookie = cookieStore.get("user_id");
    if (!cookie) {
      console.error("Error setting cookie");
      return {
        success: false,
        error: "Error setting cookie",
      };
    }
    // cookie is set successfully
    console.log("Cookie set successfully", cookie.value);
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
  redirect("/private");
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

    const response = await axios.post(
      `${process.env.SITE_URL}/api/users/user`,
      {
        username: (formData.get("username") as string).trim(),
        ...credentials,
      }
    );
    const data = response.data;
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
  redirect("/private");
}
