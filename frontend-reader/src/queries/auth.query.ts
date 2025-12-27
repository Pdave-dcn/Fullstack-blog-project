import type { UseFormSetError } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";

import { login, logout, signup } from "@/api/auth.api";
import { handleAuthError, type AuthError } from "@/utils/authErrorHandler";
import { useAuthStore } from "@/store/auth.store";
import type { FormData } from "@/zodSchemas/auth.zod";

import type { AxiosError } from "axios";

export const useAuthMutation = (
  currentForm: "login" | "signup",
  setError: UseFormSetError<FormData>
) => {
  return useMutation({
    mutationFn: currentForm === "login" ? login : signup,
    onSuccess: (data) => {
      useAuthStore.getState().login(data.user);
    },
    onError: (error: AxiosError<AuthError>) => {
      handleAuthError(error, setError);
    },
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      useAuthStore.getState().logout();
    },
  });
};
