"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";



const EditSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),
  bio: z.string(),
});

type EditInputs = z.infer<typeof EditSchema>;
export default function EditProfile() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditInputs>({
    resolver: zodResolver(EditSchema),
  });

  const onSubmit = async (data: EditInputs) => {
    try {
      const response = await axios.post("YOUR_API_ENDPOINT/signin", data);
      const { token } = response.data;

      // Save the JWT token
      localStorage.setItem("token", token);

      toast.success("Signed in successfully");
      router.push("/hehe");
      // Redirect to dashboard or home page
      // You can use Next.js router here
    } catch (error) {
      console.error("Sign-in error:", error);
      toast.error("Failed to sign in. Please try again.");
    } finally {
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" {...register("username")} />
          {errors?.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" {...register("bio")} rows={4} />
          {errors?.bio && (
            <p className="text-sm text-red-500">{errors.bio.message}</p>
          )}
        </div>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}
