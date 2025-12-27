import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  signupSchema,
  type FormData,
} from "@/zodSchemas/auth.zod";
import { useAuthMutation, useGuestAuthMutation } from "@/queries/auth.query";

interface UseAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: "login" | "signup";
}

export const useAuthModal = ({
  isOpen,
  onClose,
  defaultMode = "login",
}: UseAuthModalProps) => {
  const [mode, setMode] = useState<"login" | "signup">(defaultMode);

  const schema = mode === "signup" ? signupSchema : loginSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
    },
  });

  const authMutation = useAuthMutation(mode, setError);
  const guestMutation = useGuestAuthMutation();

  const onSubmit = async (data: FormData) => {
    authMutation.mutate(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  const handleGuestLogin = () => {
    guestMutation.mutate(undefined, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  const handleModeSwitch = () => {
    setMode(mode === "login" ? "signup" : "login");
    reset();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      reset();
      onClose();
    }
  };

  const isLoading = authMutation.isPending || guestMutation.isPending;

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  // Reset form when mode changes
  useEffect(() => {
    reset();
  }, [mode, reset]);

  return {
    mode,
    register,
    handleSubmit,
    errors,
    authMutation,
    guestMutation,
    isLoading,
    onSubmit,
    handleGuestLogin,
    handleModeSwitch,
    handleOpenChange,
  };
};
