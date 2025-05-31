import { handleApiResponseError } from "@/lib/utils";
import { useState, useEffect, useCallback } from "react";

export const useDataFetching = <T>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}${endpoint}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        handleApiResponseError(response, "Failed to fetch data");
      }

      const result = await response.json();
      setData(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
      console.log("Encountered error:", error);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    error,
    loading,
    refetch: fetchData,
  };
};
