import { toast } from "sonner";

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
