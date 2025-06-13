"use client";

import { useToastStore } from "@/stores/toastStore";
import { toast } from "sonner";
import { useEffect } from "react";

export function ToastDisplay() {
  const { message, setMessage } = useToastStore();

  useEffect(() => {
    if (message) {
      // Show the toast
      toast.message(message);

      // Clear the message from the Zustand store
      setMessage(null);
    }
  }, [message, setMessage]);

  return null;
}
