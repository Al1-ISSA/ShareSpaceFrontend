"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { toast } from "sonner";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { deleteCommunity } from "@/actions/community";

export default function DeleteCommunity({
  name,
  id,
}: {
  name: string;
  id: number;
}) {
  const [state, deleteAction] = useActionState(deleteCommunity, undefined);

  useEffect(() => {
    if (state?.message) {
      toast.message(state.message); // Use the appropriate toast method
    }
  }, [state]);

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-lg">
          Are you sure you want to delete the community {name}?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form action={deleteAction} className="flex justify-center">
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="name" value={name} />
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit" className="hover:bg-red-500">
      Delete
    </Button>
  );
}
