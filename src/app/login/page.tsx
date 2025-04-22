"use client";
import { useActionState } from "react";
import { login } from "@/actions/actions";
import { FormState } from "@/types/types";

const initialState: FormState = {
  success: false,
}
export default function LoginPage() {
  const [state, formAction] = useActionState(login, initialState)
  return (
    <>
      <h1>Log In</h1>
      <h3>{state.error && `Error logging in: ${state.error}`}</h3>
      <form action={formAction}>
        <label>Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <button type="submit">Log in</button>
      </form>
    </>
  );
}
