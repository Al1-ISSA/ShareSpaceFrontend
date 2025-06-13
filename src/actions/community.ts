"use server";
import { z } from "zod";
import { redirect } from "next/navigation";
import api from "@/lib/api";
import { verifySession } from "@/lib/dal";
import { use } from "react";

const CreateSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Community name is required" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message:
        "Community name can only contain letters, numbers, and underscores",
    }),
  description: z
    .string()
    .min(1, { message: "Community description is required" }),
});

export async function createCommunity(prevState: any, formData: FormData) {
  const result = CreateSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      formData: Object.fromEntries(formData), // Return current form data
    };
  }

  const session = await verifySession();

  if (!session.isAuth) {
    return { message: "You need to be logged in to create a community" };
  }

  const { name, description } = result.data;

  let success = false;
  try {
    const url = "/Community/create";

    const response = await api.post(
      url,
      {
        name: name,
        description: description,
        isPrivate: false,
        creatorId: session.userId,
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
    redirect("/community/" + name);
  }
}

const UpdateSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Community name is required" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message:
        "Community name can only contain letters, numbers, and underscores",
    }),

  description: z
    .string()
    .min(1, { message: "Community description is required" }),
  id: z.string(),
});

export async function updateCommunity(prevState: any, formData: FormData) {
  const result = UpdateSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      formData: Object.fromEntries(formData), // Return current form data
    };
  }

  const session = await verifySession();

  if (!session.isAuth) {
    return { message: "You need to be logged in to update a community" };
  }

  const { name, description, id } = result.data;

  let success = false;
  try {
    const url = "/Community/update";

    const response = await api.post(
      url,
      {
        id: id,
        name: name,
        description: description,
        creatorId: session.userId,
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
    redirect("/community/" + name);
  }
}

const DeleteSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export async function deleteCommunity(prevState: any, formData: FormData) {
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

  const { id, name } = result.data;

  let success = false;
  try {
    const url = "/Community/delete";

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
    redirect("/community/" + name);
  }
}

const joinSchema = z.object({
  name: z.string(),
});

export async function joinCommunity(prevState: any, formData: FormData) {
  const result = joinSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      formData: Object.fromEntries(formData),
    };
  }

  const session = await verifySession();

  if (!session.isAuth) {
    return { message: "You need to sign in to join." };
  }

  const { name } = result.data;
  let success = false;

  try {
    const url = "/Community/join";

    const response = await api.post(
      url,
      {
        name: name,
        userId: session.userId,
      },
      {
        headers: {
          Authorization: `Bearer ${session.jwtToken}`,
        },
      }
    );

    // toast.success("Community created successfully");
    success = true;
  } catch (error: any) {
    const errorMsg = error?.response?.data || "Something went wrong";
    return { message: errorMsg };
    // toast.error(errorMsg);
  }

  if (success) {
    redirect("/community/" + name);
  }
}

export async function leaveCommunity(prevState: any, formData: FormData) {
  const result = joinSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      formData: Object.fromEntries(formData), // Return current form data
    };
  }

  const session = await verifySession();

  if (!session.isAuth) {
    return { message: "You need to be logged in to leave" };
  }

  const { name } = result.data;
  let success = false;

  try {
    const url = "/Community/leave";

    const response = await api.post(
      url,
      {
        name: name,
        userId: session.userId,
      },
      {
        headers: {
          Authorization: `Bearer ${session.jwtToken}`,
        },
      }
    );

    // toast.success("Community created successfully");
    success = true;
  } catch (error: any) {
    console.log(error);
    const errorMsg = error?.response?.data || "Something went wrong";
    return { message: errorMsg };
    // toast.error(errorMsg);
  }

  if (success) {
    redirect("/community/" + name);
  }
}
