import axios, { AxiosError } from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 400) {
      toast.error("Request Failed", {
        description:
          "Something went wrong with this request. Please try again.",
      });

      return Promise.reject(error);
    }

    if (status === 429) {
      const errorData = error.response?.data as {
        code?: string;
        message?: string;
      };

      const message =
        errorData?.message ?? "Too many requests. Please try again later.";

      toast.error("Rate Limit Exceeded", {
        description: message,
        duration: 6000,
      });

      return Promise.reject(error);
    }

    if (!error.response) {
      toast.error("Network Error", {
        description:
          "Unable to connect. Please check your internet and try again.",
      });
    } else if (status && status >= 500) {
      toast.error("Server Error", {
        description: "Something went wrong on our end. Please try again later.",
      });
    }

    return Promise.reject(error);
  }
);

export default api;
