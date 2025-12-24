import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { login } from "@/api/auth.api";
import { useAuthStore } from "@/stores/auth.store";

export const useAuthMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.user.role !== "AUTHOR") {
        toast.warning("Access Denied", {
          description: "You do not have permission to access the editor.",
        });
        return;
      }

      useAuthStore.getState().login(data.user);

      toast.success("Login successful", {
        description: `Welcome back, ${data.user.username}.`,
      });

      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error("Login failed", {
        description:
          error instanceof Error ? error.message : "Something went wrong",
      });
    },
  });
};
