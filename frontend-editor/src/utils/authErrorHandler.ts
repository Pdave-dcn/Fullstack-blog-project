import type { FieldError, UseFormSetError } from "react-hook-form";
import { toast } from "sonner";
import type { LoginFormData } from "@/zodSchemas/auth.zod";
import type { AxiosError } from "axios";

interface DomainError {
  code: string;
  message: string;
}

interface ValidationErrors {
  errors: Record<string, string>;
}

export type AuthError = DomainError | ValidationErrors;

/**
 * Handles authentication errors from API responses.
 * Sets form field errors for invalid credentials and shows toast for general errors.
 *
 * @param error - Axios error object containing auth error data
 * @param setError - React Hook Form setError function to set field-specific errors
 */
export const handleAuthError = (
  error: AxiosError<AuthError>,
  setError: UseFormSetError<LoginFormData>
): void => {
  const errorData = error.response?.data;
  const status = error.response?.status;

  // Early returns for cases already handled elsewhere
  if (!errorData || status === 429) return;

  // Handle validation errors (multiple field errors)
  if ("errors" in errorData) {
    Object.entries(errorData.errors).forEach(([field, message]) => {
      if (field === "username" || field === "password") {
        setError(field, { message } as FieldError);
      }
    });
    return;
  }

  // Handle domain errors with error codes
  if ("code" in errorData) {
    switch (errorData.code) {
      case "INVALID_CREDENTIALS": {
        const message = errorData.message.toLowerCase();
        if (message.includes("password")) {
          setError("password", {
            message: errorData.message,
          } as FieldError);
        } else if (message.includes("username")) {
          setError("username", {
            message: errorData.message,
          } as FieldError);
        } else {
          setError("password", {
            message: errorData.message,
          } as FieldError);
        }
        break;
      }

      case "USER_NOT_FOUND":
        setError("username", {
          message: errorData.message,
        } as FieldError);
        break;

      default:
        toast.error("Authentication Error", {
          description: errorData.message,
        });
    }
    return;
  }

  // Fallback for unexpected error formats
  toast.error("Authentication Error", {
    description: "Something went wrong. Please try again later.",
  });
};
