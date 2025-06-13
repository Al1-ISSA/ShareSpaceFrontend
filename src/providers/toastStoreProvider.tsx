
"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type ToastStore, createToastStore } from "@/stores/toastStore";

export type ToastStoreApi = ReturnType<typeof createToastStore>;

export const ToastStoreContext = createContext<ToastStoreApi | undefined>(
  undefined
);

export interface ToastStoreProviderProps {
  children: ReactNode;
}

export const ToastStoreProvider = ({
  children,
}: ToastStoreProviderProps) => {
  const storeRef = useRef<ToastStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createToastStore();
  }

  return (
    <ToastStoreContext.Provider value={storeRef.current}>
      {children}
    </ToastStoreContext.Provider>
  );
};

export const useToastStore = <T,>(
  selector: (store: ToastStore) => T
): T => {
  const toastStoreContext = useContext(ToastStoreContext);

  if (!toastStoreContext) {
    throw new Error(`useToastStore must be used within ToastStoreProvider`);
  }

  return useStore(toastStoreContext, selector);
};
