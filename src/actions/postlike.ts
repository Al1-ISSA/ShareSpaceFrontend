"use server";
import { z } from "zod";
import { redirect } from "next/navigation";
import api from "@/lib/api";
import { verifySession } from "@/lib/dal";

const likeSchema = z.object({
  postId: z.string().min(1, { message: "Post ID is required" }),
});

export async function likePost(prevState: any, formData: FormData) {
  const result = likeSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      formData: Object.fromEntries(formData),
    };
  }

  const session = await verifySession();

  if (!session.isAuth) {
    return { message: "You need to be logged in to like a post" };
  }

  const { postId } = result.data;
  let likes = null;
  try {
    const url = "/Like/likepost";

    const response = await api.post(
      url,
      {
        postId: postId,
        userId: session.userId,
      },
      {
        headers: {
          Authorization: `Bearer ${session.jwtToken}`,
        },
      }
    );

    // toast.success("Community created successfully");
    const { data } = response;
    likes = data;
  } catch (error: any) {
    const errorMsg = error?.response?.data || "Something went wrong";
    return { message: errorMsg };
    // toast.error(errorMsg);
  }
  console.log(likes);
  return { likes: likes };
}
