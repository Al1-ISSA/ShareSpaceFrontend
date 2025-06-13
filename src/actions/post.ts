"use server";
import { z } from "zod";
import { redirect } from "next/navigation";
import api from "@/lib/api";
import { verifySession } from "@/lib/dal";

const CreateSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  content: z.string().min(1, { message: "Post body is required" }),
  communityId: z.string(),
  communityName: z.string(),
  media: z
    .instanceof(File)
    .optional() // Media is optional
    .refine((file) => file === undefined || file.size <= 5 * 1024 * 1024, {
      // Check if file is undefined or size is valid
      message: "File size must be less than 5MB",
    }),
});

export async function createPost(prevState: any, formData: FormData) {
  const result = CreateSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      formData: Object.fromEntries(formData), // Return current form data
    };
  }

  const session = await verifySession();

  if (!session.isAuth) {
    return { message: "You need to be logged in to create a post" };
  }

  const { title, content, media, communityId, communityName } = result.data;
  let success = false;
  try {
    const url = "/post/create";

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("communityId", communityId.toString()); // Convert to string if necessary

    if (session.userId) {
      formData.append("authorId", session.userId.toString()); // Convert to string if necessary
    }

    // Append the media file if it exists
    if (media) {
      console.log(media);
      formData.append("mediaFile", media);
    }
    const response = await api.post(url, formData, {
      headers: {
        Authorization: `Bearer ${session.jwtToken}`,
        "Content-Type": "multipart/form-data",
      },
    });

    success = true;
  } catch (error: any) {
    console.log(error);
    const errorMsg = error?.response?.data || "Something went wrong";
    return { message: errorMsg };
    // toast.error(errorMsg);
  }

  if (success) {
    redirect("/community/" + communityName);
  }
}

const UpdateSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  content: z.string().min(1, { message: "Post body is required" }),
  media: z
    .instanceof(File)
    .optional() // Media is optional
    .refine((file) => file === undefined || file.size <= 5 * 1024 * 1024, {
      // Check if file is undefined or size is valid
      message: "File size must be less than 5MB",
    }),
  postId: z.string(),
  removeMedia: z.string().optional(),
});

export async function updatePost(prevState: any, formData: FormData) {
  const result = UpdateSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      formData: Object.fromEntries(formData), // Return current form data
    };
  }

  const session = await verifySession();

  if (!session.isAuth) {
    return { message: "You need to be logged in to create a post" };
  }

  const { title, content, media, postId, removeMedia } = result.data;

  console.log("removeMedia", removeMedia);
  let success = false;

  try {
    const url = "/post/update";

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("postId", postId.toString());
    formData.append("removeMedia", removeMedia ? "true" : "false");

    if (session.userId) {
      formData.append("authorId", session.userId.toString());
    }

    // Append the media file if it exists
    if (media && media.size > 0 && !removeMedia) {
      // Check if media is a valid file with size > 0
      console.log(media);
      formData.append("mediaFile", media);
    }
    const response = await api.post(url, formData, {
      headers: {
        Authorization: `Bearer ${session.jwtToken}`,
        "Content-Type": "multipart/form-data",
      },
    });

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

const DeleteSchema = z.object({
  id: z.string(),
});

export async function deletePost(prevState: any, formData: FormData) {
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

  const { id } = result.data;

  let success = false;
  try {
    const url = "/Post/delete";

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
    redirect("/");
  }
}
