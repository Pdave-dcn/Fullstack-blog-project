import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  loginSchema,
  signupSchema,
  type FormData,
} from "@/zodSchemas/auth.zod";
import { useAuthMutation } from "@/queries/auth.query";
import { AuthFormFields } from "./AuthFormFields";
import { RotateCcw } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: "login" | "signup";
}

const AuthModal = ({
  isOpen,
  onClose,
  defaultMode = "login",
}: AuthModalProps) => {
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

  const onSubmit = async (data: FormData) => {
    authMutation.mutate(data, {
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

  // Reset form when modal closes or mode changes
  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  useEffect(() => {
    reset();
  }, [mode, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "login" ? "Welcome Back" : "Join TextNode"}
          </DialogTitle>
          <DialogDescription>
            {mode === "login"
              ? "Sign in to your account to continue"
              : "Create an account to start commenting and engaging"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <AuthFormFields mode={mode} register={register} errors={errors} />

          <Button
            type="button"
            className="w-full"
            disabled={authMutation.isPending}
            onClick={handleSubmit(onSubmit)}
          >
            {authMutation.isPending ? (
              <RotateCcw className="animate-spin" />
            ) : mode === "login" ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </Button>
        </div>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
          </span>
          <Button
            type="button"
            variant="link"
            className="ml-1 p-0 h-auto font-normal"
            onClick={handleModeSwitch}
            disabled={authMutation.isPending}
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
