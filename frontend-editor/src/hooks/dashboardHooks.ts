import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";

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

const useDataFetching = <T>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { token, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !token) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.status === 401) {
          logout();
          return;
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch ${endpoint}`);
        }

        const result = await response.json();
        setData(result);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, token, isAuthenticated, logout]);

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
