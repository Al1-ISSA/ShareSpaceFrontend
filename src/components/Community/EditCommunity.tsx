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
import { updateCommunity } from "@/actions/community";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Settings } from "lucide-react";
export default function EditCommunity({
  name,
  description,
  id,
}: {
  name: string;
  description: string;
  id: number;
}) {
  const [state, updateAction] = useActionState(updateCommunity, undefined);

  useEffect(() => {
    if (state?.message) {
      toast.message(state.message); // Use the appropriate toast method
    }
  }, [state]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Edit Community</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={updateAction}>
          <input type="hidden" name="id" value={id} />
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Community Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter community name"
                defaultValue={(state?.formData?.name as string) || name || ""}
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
                defaultValue={
                  (state?.formData?.description as string) || description || ""
                }
                rows={4}
              />
              {state?.errors?.description && (
                <p className="text-sm text-red-500">
                  {state.errors.description}
                </p>
              )}
            </div>

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
