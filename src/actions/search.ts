"use server";
import { z } from "zod";
import { redirect } from "next/navigation";
import api from "@/lib/api";
import { verifySession } from "@/lib/dal";

const searchSchema = z.object({
  query: z.string().min(1, { message: "Search query is required" }),
});

export async function searchPost(prevState: any, formData: FormData) {
  const result = searchSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      formData: Object.fromEntries(formData),
    };
  }

  const { query } = result.data;

  redirect(`/search?q=${query}`);
}
