import { useEffect, useState } from "react";

interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalComments: number;
}

interface RecentArticle {
  id: number;
  title: string;
  status: "published" | "draft";
  updatedAt: string;
}

interface RecentComments {
  id: number;
  content: string;
  post: {
    title: string;
  };
  user: {
    name: string;
    username: string;
  };
  createdAt: string;
}

const API_BASE_URL = "http://localhost:3000/api/dashboard";
const AUTH_TOKEN = "";

const fetchData = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
      "Content-Type": "application/json",
    },
    mode: "cors",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  return response.json();
};

const useDataFetching = <T>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await fetchData<T>(endpoint);
        setData(result);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDataFromApi();
  }, [endpoint]);

  return { data, error, loading };
};

export const useDashboardStats = () => {
  const {
    data: stats,
    error: errorStats,
    loading: loadingStats,
  } = useDataFetching<DashboardStats>("/stats");
  return { stats, errorStats, loadingStats };
};

export const useRecentArticles = () => {
  const {
    data: articles,
    error: errorArticles,
    loading: loadingArticles,
  } = useDataFetching<RecentArticle[]>("/recent-articles");
  return { articles, errorArticles, loadingArticles };
};

export const useRecentComments = () => {
  const {
    data: comments,
    error: errorComments,
    loading: loadingComments,
  } = useDataFetching<RecentComments[]>("/recent-comments");
  return { comments, errorComments, loadingComments };
};
