"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Image as ImageIcon, Link, Type } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createPost } from "@/actions/post";
import { toast } from "sonner";

export default function CreatePost({
  communityId,
  communityName,
}: {
  communityId: number;
  communityName: string;
}) {
  const [state, createAction] = useActionState(createPost, undefined);

  useEffect(() => {
    if (state?.message) {
      toast.message(state.message);
      //set state.message to ""
      state.message = "";
    }
  }, [state]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={createAction}>
          <input type="hidden" name="communityId" value={communityId} />
          <input type="hidden" name="communityName" value={communityName} />

          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                defaultValue={(state?.formData?.title as string) || ""}
                name="title"
                placeholder="Enter your post title"
              />
              {state?.errors?.title && (
                <p className="text-sm text-red-500 mt-1">
                  {state.errors.title}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="content">Post Body</Label>
              <Textarea
                id="content"
                name="content"
                defaultValue={(state?.formData?.content as string) || ""}
                placeholder="Enter your post content"
                rows={6}
              />
              {state?.errors?.content && (
                <p className="text-sm text-red-500 mt-1">
                  {state.errors.content}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="media">Upload Image</Label>
              <Input
                id="media"
                type="file"
                name="media"
                accept="image/*"
              />
              {state?.errors?.media && (
                <p className="text-sm text-red-500 mt-1">
                  {state.errors.media}
                </p>
              )}
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                Make sure your post follows the community guidelines.
              </AlertDescription>
            </Alert>

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
    <Button disabled={pending} className="w-full" type="submit">
      Create Post
    </Button>
  );
}
