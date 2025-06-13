"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { logout } from "@/actions/auth";
import { Button } from "../ui/button";

export function LogoutForm() {
  const [state, logoutAction] = useActionState(logout, undefined);

  return (
    <form action={logoutAction} className="">
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      Logout
    </Button>
  );
}
