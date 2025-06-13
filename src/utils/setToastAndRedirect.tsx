"use client";

import { useToastStore } from "@/stores/toastStore";
import { redirect } from "next/navigation";

export function setToastAndRedirect(message: string, target: string) {
  // Set the toast message in the Zustand store
  useToastStore.getState().setMessage(message);

  // Perform the redirection
  redirect(target);
}
