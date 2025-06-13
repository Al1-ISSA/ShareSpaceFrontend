"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

const EditSchema = z
  .object({
    currentPassword: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
    newPassword: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
    confirmNewPassword: z.string().min(6, {
      message: "Password must be at least 6 characters long",
    }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type EditInputs = z.infer<typeof EditSchema>;

export default function EditPassword() {
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
          <Label htmlFor="currentPassword">Current Password</Label>
          <Input id="currentPassword" {...register("currentPassword")} />
          {errors?.currentPassword && (
            <p className="text-sm text-red-500">
              {errors.currentPassword.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            {...register("newPassword")}
            type="password"
          />
          {errors?.newPassword && (
            <p className="text-sm text-red-500">{errors.newPassword.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
          <Input
            id="confirmNewPassword"
            {...register("confirmNewPassword")}
            type="password"
          />
          {errors?.confirmNewPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmNewPassword.message}
            </p>
          )}
        </div>
        <Button type="submit">Change Password</Button>
      </div>
    </form>
  );
}
