import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleApiResponseError = async (
  res: Response,
  errorMsg: string
) => {
  const errorData = await res.json();
  console.error("Server error:", errorData.message);
  toast.error(errorMsg, {
    description: errorData.message,
  });
  return;
};

export const isTokenValid = (token: string) => {
  const [, payload] = token.split(".");
  const decoded = JSON.parse(atob(payload));
  return decoded.exp * 1000 > Date.now();
};
