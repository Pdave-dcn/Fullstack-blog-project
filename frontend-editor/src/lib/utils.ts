import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleDate = (date: string): string => {
  const iso = date.replace(" ", "T");
  const dateISO = new Date(iso);

  const readable = dateISO.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return readable;
};

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

export const handleNetworkError = (error: unknown) => {
  console.error("Network error:", error);
  toast.error("Network error", {
    description: "Could not connect to the server.",
  });
};
