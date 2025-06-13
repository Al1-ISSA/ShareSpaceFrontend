"use server";
import { z } from "zod";
import { redirect } from "next/navigation";
import api from "@/lib/api";
import { verifySession } from "@/lib/dal";


const CreateSchema = z.object({
  content: z.string().min(1, { message: "content is required" }),
  postId: z.string(),
});

export async function createComment(prevState: any, formData: FormData) {
  const result = CreateSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      formData: Object.fromEntries(formData), // Return current form data
    };
  }

  const session = await verifySession();

  if (!session.isAuth) {
    return { message: "You need to be logged in to create a comment" };
  }

  const { content, postId } = result.data;

  let success = false;
  try {
    const url = "/comment/create";

    const response = await api.post(
      url,
      {
        content: content,
        postId: postId,
        authorId: session.userId,
      },
      {
        headers: {
          Authorization: `Bearer ${session.jwtToken}`,
        },
      }
    );

    success = true;
  } catch (error: any) {
    console.log(error);
    const errorMsg = error?.response?.data || "Something went wrong";
    return { message: errorMsg };
    // toast.error(errorMsg);
  }

  if (success) {
    redirect("/post/" + postId);
  }
}

const DeleteSchema = z.object({
  id: z.string(),
  postId: z.string(),
});

export async function deleteComment(prevState: any, formData: FormData) {
  const result = DeleteSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      formData: Object.fromEntries(formData), // Return current form data
    };
  }

  const session = await verifySession();

  if (!session.isAuth) {
    return { message: "You need to be logged in to delete a community" };
  }

  const { id, postId } = result.data;

  let success = false;
  try {
    const url = "/Comment/delete";

    const response = await api.post(
      url,
      {
        id: id,
        userId: session.userId,
      },
      {
        headers: {
          Authorization: `Bearer ${session.jwtToken}`,
        },
      }
    );

    success = true;
  } catch (error: any) {
    const errorMsg = error?.response?.data || "Something went wrong";
    return { message: errorMsg };
    // toast.error(errorMsg);
  }

  if (success) {
    redirect("/post/" + postId);
  }
}
