"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";
import { toast } from "sonner";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { deletePost } from "@/actions/post";

export default function DeletePost({ id }: { id: number }) {
  const [state, deleteAction] = useActionState(deletePost, undefined);

  useEffect(() => {
    if (state?.message) {
      toast.message(state.message);
    }
  }, [state]);

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-lg">
          Are you sure you want to delete the Post?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form action={deleteAction} className="flex justify-center">
          <input type="hidden" name="id" value={id} />
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
