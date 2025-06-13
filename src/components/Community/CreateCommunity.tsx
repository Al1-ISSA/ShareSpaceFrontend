"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { toast } from "sonner";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createCommunity } from "@/actions/community";

export default function CreateCommunity() {
  const [state, createAction] = useActionState(createCommunity, undefined);

  useEffect(() => {
    if (state?.message) {
      toast.message(state.message); // Use the appropriate toast method
    }
  }, [state]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Create a New Community</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={createAction}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Community Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter community name"
                defaultValue={(state?.formData?.name as string) || ""}
              />
              {state?.errors?.name && (
                <p className="text-sm text-red-500">{state.errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Community Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your community"
                defaultValue={(state?.formData?.description as string) || ""}
                rows={4}
              />
              {state?.errors?.description && (
                <p className="text-sm text-red-500">
                  {state.errors.description}
                </p>
              )}
            </div>

            {/* <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isPrivate"
                {...register("isPrivate")}
                className="mr-2"
              />
              <Label htmlFor="isPrivate">Is Private</Label>
              {state?.errors?.isPrivate && (
                <p className="text-sm text-red-500">
                  {state.errors.isPrivate}
                </p>
              )}
            </div> */}

            {/* <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                Private communities can only be viewed by approved members.
              </AlertDescription>
            </Alert> */}

            <SubmitButton />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      Create
    </Button>
  );
}
