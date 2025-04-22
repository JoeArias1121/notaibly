"use client";
import { useActionState } from "react";
import { signup } from "@/actions/actions";
import { FormState } from "@/types/types";

const initialState: FormState = {
  success: false,
};
export default function SignUpPage() {
  const [state, formAction] = useActionState(signup, initialState);
  return (
    <>
      <h1>Sign Up</h1>
      <h3>{state.error && `Error signing up: ${state.error}`}</h3>
      <form action={formAction}>
        <label>
          Username:
          <input name="username" type="text" required />
        </label>
        <label>
          Email:
          <input name="email" type="email" required />
        </label>
        <label>
          Password:
          <input name="password" type="password" required />
        </label>
        <button type="submit">Sign up</button>
      </form>
    </>
  );
}