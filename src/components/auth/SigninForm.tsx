"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "@/actions/auth";
import { useEffect } from "react";

export default function SigninForm() {
  const [state, loginAction] = useActionState(login, undefined);

  useEffect(() => {
    if (state?.message) {
      toast.message(state.message);
      //set state.message to ""
      state.message = "";
    }
  }, [state]);

  return (
    <form action={loginAction}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            defaultValue={(state?.formData?.email as string) || ""}
            placeholder="john.doe@example.com"
          />
          {state?.errors?.email && (
            <p className="text-sm text-red-500">{state.errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            defaultValue={(state?.formData?.password as string) || ""}
          />
          {state?.errors?.password && (
            <p className="text-sm text-red-500">{state.errors.password}</p>
          )}
        </div>

        {/* remember me button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <Label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900">
              Remember me
            </Label>
          </div>

          <Link
            href="/auth/forgot-password"
            className="font-medium text-indigo-600 hover:text-indigo-500">
            Forgot your password?
          </Link>
        </div>

        <SubmitButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className="w-full" type="submit">
      Login
    </Button>
  );
}
