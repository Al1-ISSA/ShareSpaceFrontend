"use client";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { leaveCommunity } from "@/actions/community";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useEffect } from "react";

const LeaveCommunityForm = ({ name }: { name: string }) => {
  const [state, joinAction] = useActionState(leaveCommunity, undefined);

  useEffect(() => {
    if (state?.message) {
      toast.message(state.message);
      //set state.message to ""
      state.message = "";
    }
  }, [state]);
  return (
    <form action={joinAction}>
      <input type="hidden" name="name" value={name} />
      <SubmitButton />
    </form>
  );
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" variant="secondary">
      Leave
    </Button>
  );
}

export default LeaveCommunityForm;
