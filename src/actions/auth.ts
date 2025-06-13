"use server";

import { z } from "zod";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/dal";
import api from "@/lib/api";

const SigninSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export async function login(prevState: any, formData: FormData) {
  const result = SigninSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      formData: Object.fromEntries(formData), // Return current form data
    };
  }

  const { email, password } = result.data;

  let success = false;
  try {
    const url = "/user/auth/login";

    const response = await api.post(url, {
      email: email,
      password: password,
    });

    if (response.status !== 200) {
      return { message: "Invalid username or password" };
    }
    const { token, userId, username } = response.data;

    
    // Create a session
    console.log("creating session");
    await createSession(token, username, userId);
    success = true;
   
  } catch (error: any) {
    const errorMsg = error?.response?.data || "Invalid username or password";
    return { message: errorMsg };
  }

  if (success) {
    redirect("/");
  }
}

export async function logout() {
  await deleteSession();
  redirect("/auth/signin");
}
