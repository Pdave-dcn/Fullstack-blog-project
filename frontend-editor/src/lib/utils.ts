import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
