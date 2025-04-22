"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { FormState } from "@/types/types";
import { createClient } from "@/utils/supabase/server";
import axios from "axios";

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
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return {
      success: false,
      error: error.message,
    };
    //redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/private");
}

export async function signup(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const credentials = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
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
    const response = await axios.post(`${process.env.SITE_URL}/api/users/user`, {
      username: formData.get("username"),
      ...credentials,
    });
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
