import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AuthFormFields } from "./AuthFormFields";
import { RotateCcw, UserCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/animation-variants";
import { useAuthModal } from "@/hooks/useAuthModal";

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
  const {
    mode,
    register,
    handleSubmit,
    errors,
    isLoading,
    onSubmit,
    handleGuestLogin,
    handleModeSwitch,
    handleOpenChange,
  } = useAuthModal({ isOpen, onClose, defaultMode });

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div variants={fadeUp}>
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
            </motion.div>

            <motion.div className="space-y-4 py-4" variants={fadeUp}>
              <AuthFormFields mode={mode} register={register} errors={errors} />

              <Button
                type="button"
                className="w-full"
                disabled={isLoading}
                onClick={handleSubmit(onSubmit)}
              >
                {isLoading ? (
                  <RotateCcw className="animate-spin" />
                ) : mode === "login" ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGuestLogin}
                disabled={isLoading}
              >
                <UserCircle className="mr-2 h-4 w-4" />
                Continue as Guest
              </Button>
            </motion.div>

            <motion.div className="text-center text-sm" variants={fadeUp}>
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
                disabled={isLoading}
              >
                {mode === "login" ? "Sign up" : "Sign in"}
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
