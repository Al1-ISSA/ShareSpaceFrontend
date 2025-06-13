"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createComment } from "@/actions/comment";
import { useEffect } from "react";
import { toast } from "sonner";

const AddComment = ({ id }: { id: number }) => {
  const [state, createAction] = useActionState(createComment, undefined);

  useEffect(() => {
    if (state?.message) {
      toast.message(state.message);
      //set state.message to ""
      state.message = "";
    }
  }, [state]);

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Add a Comment</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={createAction}>
          <input type="hidden" name="postId" value={id} />
          <Textarea
            id="content"
            name="content"
            defaultValue={(state?.formData?.content as string) || ""}
            placeholder="What are your thoughts?"
            rows={4}
          />
          {state?.errors?.content && (
            <p className="text-sm text-red-500">{state.errors.content}</p>
          )}
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className="w-full mt-4" type="submit">
      Add
    </Button>
  );
}

export default AddComment;
