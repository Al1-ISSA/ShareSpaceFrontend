"use client";

import { create } from "zustand";

type ToastState = {
  message: string | null;
  setMessage: (message: string | null) => void;
};

export const useToastStore = create<ToastState>((set) => ({
  message: null,
  setMessage: (message) => set({ message }),
}));
