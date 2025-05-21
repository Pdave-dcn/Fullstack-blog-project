import { useDataFetching } from "./use-dataFetching";

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

export const useDashboardStats = () => {
  const {
    data: stats,
    error: errorStats,
    loading: loadingStats,
  } = useDataFetching<DashboardStats>(API_BASE_URL, "/stats");
  return { stats, errorStats, loadingStats };
};

export const useRecentArticles = () => {
  const {
    data: articles,
    error: errorArticles,
    loading: loadingArticles,
  } = useDataFetching<RecentArticle[]>(API_BASE_URL, "/recent-articles");
  return { articles, errorArticles, loadingArticles };
};

export const useRecentComments = () => {
  const {
    data: comments,
    error: errorComments,
    loading: loadingComments,
  } = useDataFetching<RecentComments[]>(API_BASE_URL, "/recent-comments");
  return { comments, errorComments, loadingComments };
};
