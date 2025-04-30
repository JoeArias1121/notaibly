"use client";
import { useActionState } from "react";
import { login } from "@/actions/actions";
import { FormState } from "@/types/types";
import { InputWithLabel } from "@/components/ui/input-with-label";
import { Button } from "@/components/ui/button";

const initialState: FormState = {
  success: false,
};
export default function LoginPage() {
  const [state, formAction] = useActionState(login, initialState);
  // TODO: check up on the width styling for the form
  return (
    <div className="flex flex-col gap-8  items-center h-screen">
      <h1 className="text-3xl font-medium m-16">Log In</h1>
      <h3>{state.error && `Error logging in: ${state.error}`}</h3>
      <div className="flex justify-center">
        <form className="flex flex-col gap-3 min-w-1/6" action={formAction}>
          <InputWithLabel
            id="email"
            name={"email"}
            placeholder={"Email"}
            type={"email"}
            required={true}
          />
          <InputWithLabel
            id="password"
            name={"password"}
            placeholder={"Password"}
            type={"password"}
            required={true}
          />
          <Button type="submit">Log In</Button>
        </form>
      </div>
    </div>
  );
}
