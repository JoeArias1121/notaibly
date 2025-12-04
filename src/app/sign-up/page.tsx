"use client";

import { FormState, signUpUserAction } from '@/src/actions/authActions';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import {useActionState} from 'react'
import { useFormStatus } from 'react-dom';

const initialState: FormState = {
  success: false,
  message: "",
};


export default function Page() {
  const [state, signUpAction] = useActionState(signUpUserAction, initialState);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Sign up and create your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form id="signup-form" action={signUpAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Confirm Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <SubmitButton />
        </CardFooter>
      </Card>
    </div>
  );
}

function SubmitButton() {
  const status = useFormStatus();
  return <Button form="signup-form" disabled={status.pending} type="submit" className="w-full">Submit</Button>
}
