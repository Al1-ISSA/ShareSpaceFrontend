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
import { toast } from "sonner";
import { Post } from "@/interfaces/Post";
import { Checkbox } from "@/components/ui/checkbox";
import { updatePost } from "@/actions/post";
import { useRef } from "react";

export default function EditPost({ post }: { post: Post }) {
  const [state, createAction] = useActionState(updatePost, undefined);
  const [removeMedia, setRemoveMedia] = useState(false); // Added state for checkbox
  const fileInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (state?.message) {
      toast.message(state.message);
      //set state.message to ""
      state.message = "";
    }
  }, [state]);

  useEffect(() => {
    if (removeMedia && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [removeMedia]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={createAction}>
          <input type="hidden" name="postId" value={post.id} />
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                defaultValue={
                  (state?.formData?.title as string) || post.title || ""
                }
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
                defaultValue={
                  (state?.formData?.content as string) || post.content || ""
                }
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
                accept="image/*,video/*"
                disabled={removeMedia}
                ref={fileInputRef}
              />
              {state?.errors?.media && (
                <p className="text-sm text-red-500 mt-1">
                  {state.errors.media}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="removeMedia"
                onClick={() => setRemoveMedia((prev) => !prev)}
                name="removeMedia"
              />
              <label
                htmlFor="removeMedia"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Remove current Media
              </label>
              {state?.errors?.removeMedia && (
                <p className="text-sm text-red-500 mt-1">
                  {state.errors.removeMedia}
                </p>
              )}
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                If you upload a new image, it will replace the existing one.
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
      Update Post
    </Button>
  );
}
