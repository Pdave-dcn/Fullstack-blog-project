import {
  getDashboardStats,
  getRecentArticles,
  getRecentComments,
} from "@/api/dashboard.api";
import { useQuery } from "@tanstack/react-query";

export const useDashboardStatsQuery = () => {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: getDashboardStats,
  });
};

export const useDashboardRecentArticlesQuery = () => {
  return useQuery({
    queryKey: ["dashboard", "recent", "articles"],
    queryFn: getRecentArticles,
  });
};

export const useDashboardRecentCommentsQuery = () => {
  return useQuery({
    queryKey: ["dashboard", "recent", "comments"],
    queryFn: getRecentComments,
  });
};
