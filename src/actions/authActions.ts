"use server";
import { redirect } from "next/navigation";

export type FormState = {
  success: boolean;
  message: string;
};

export async function loginUserAction(formState: FormState, formData: FormData): Promise<{ success: boolean; message: string }> { 
  console.log("Form Data:", formData);
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  // if something wrong return error message
  if (email === "" || password === "") {
    return { success: false, message: "Email and password are required." };
  }
  // TODO: this is where you add your authentication logic
  redirect("/notes");
}

export async function signUpUserAction(formState: FormState, formData: FormData): Promise<{ success: boolean; message: string }> {
  console.log("Form Data:", formData);
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (email === "" || password === "" || confirmPassword === "") {
    return { success: false, message: "All fields are required." };
  } else if (password !== confirmPassword) {
    return { success: false, message: "Passwords do not match." };
  }
  // TODO: this is where you add your sign-up logic
  redirect("/notes");
  //return { success: false, message: "Sign up not implemented yet." };
}