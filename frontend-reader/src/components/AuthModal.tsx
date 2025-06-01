import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, User, SquareUser, Lock, AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: "login" | "signup";
}

interface FormData {
  name?: string;
  username: string;
  password: string;
}

interface FormErrors {
  name?: string;
  username?: string;
  password?: string;
  general?: string;
}

const AuthModal = ({
  isOpen,
  onClose,
  defaultMode = "login",
}: AuthModalProps) => {
  const [mode, setMode] = useState<"login" | "signup">(defaultMode);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    name: "",
    username: "",
    password: "",
  });
  const { login } = useAuth();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (mode === "signup") {
      if (!formData.name?.trim()) {
        newErrors.name = "Full name is required";
      } else if (formData.name.trim().length < 2) {
        newErrors.name = "Name must be at least 2 characters long";
      }
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username =
        "Username can only contain letters, numbers, and underscores";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearErrors = () => {
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const endpoint = `${import.meta.env.VITE_API_BASE_URL}/users/${
        mode === "signup" ? "signup" : "login"
      }`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          mode === "signup"
            ? {
                name: formData.name?.trim(),
                username: formData.username.trim(),
                password: formData.password,
              }
            : {
                username: formData.username.trim(),
                password: formData.password,
              }
        ),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setErrors({ username: "Username is already taken" });
        } else if (response.status === 401) {
          setErrors({ general: "Invalid username or password" });
        } else if (response.status === 400) {
          setErrors({ general: data.message || "Invalid input data" });
        } else {
          setErrors({ general: "Authentication failed. Please try again." });
        }
        return;
      }

      login(data.token, data.user);

      toast.success(
        `Welcome ${mode === "login" ? "back" : ""}, ${data.user.username}`
      );
      onClose();

      setFormData({
        name: "",
        username: "",
        password: "",
      });
      clearErrors();
    } catch (error) {
      console.error("Auth error:", error);
      setErrors({
        general:
          error instanceof Error
            ? error.message
            : "Network error. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }

    if (errors.general) {
      setErrors((prev) => ({
        ...prev,
        general: undefined,
      }));
    }
  };

  const handleModeSwitch = () => {
    setMode(mode === "login" ? "signup" : "login");
    clearErrors();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {mode === "login" ? "Welcome Back" : "Join BlogReader"}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {mode === "login"
              ? "Sign in to your account to continue"
              : "Create an account to start commenting and engaging"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.general && (
            <div className="flex items-center space-x-2 p-3 text-red-600 bg-red-50 border border-red-200 rounded-md">
              <AlertCircle size={16} />
              <span className="text-sm">{errors.general}</span>
            </div>
          )}

          {mode === "signup" && (
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Full Name
              </Label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`pl-10 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
                    errors.name
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                      : ""
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs mt-1 flex items-center space-x-1">
                  <AlertCircle size={12} />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              Username
            </Label>
            <div className="relative">
              <SquareUser
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className={`pl-10 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
                  errors.username
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : ""
                }`}
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-xs mt-1 flex items-center space-x-1">
                <AlertCircle size={12} />
                <span>{errors.username}</span>
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </Label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={`pl-10 pr-10 bg-white/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
                  errors.password
                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                    : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 flex items-center space-x-1">
                <AlertCircle size={12} />
                <span>{errors.password}</span>
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2.5 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            disabled={isLoading}
          >
            {isLoading
              ? "Loading..."
              : mode === "login"
              ? "Sign In"
              : "Create Account"}
          </Button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <button
              type="button"
              onClick={handleModeSwitch}
              className="ml-1 text-blue-600 hover:text-blue-700 font-medium hover:underline"
              disabled={isLoading}
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
