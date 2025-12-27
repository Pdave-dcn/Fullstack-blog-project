import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { login, loginGuest, logout } from "@/api/auth.api";
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
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Logout successful");
    },
  });
};

export const useGuestAuthMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginGuest,
    onSuccess: (data) => {
      if (data.user.role !== "GUEST") {
        toast.warning("Access Denied", {
          description: "You do not have permission to access the editor.",
        });
        return;
      }
      useAuthStore.getState().login(data.user);

      toast.success("Login successful", {
        description: `Welcome to The Editorium`,
      });

      navigate("/dashboard");
    },
  });
};
