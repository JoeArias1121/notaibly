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
  return (
    <div className="flex flex-col gap-8  items-center h-screen">
      <div className="flex justify-center items-center m-8">
        <h1 className="text-3xl font-medium">Log In</h1>
      </div>
      <h3>{state.error && `Error logging in: ${state.error}`}</h3>
      <div className="flex justify-center">
        <form className="flex flex-col gap-3 min-w-1/6" action={formAction}>
          <InputWithLabel
            id="username"
            name={"username"}
            placeholder={"Username"}
            type={"text"}
            required={true}
          />
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
