import {
  useDashboardRecentArticlesQuery,
  useDashboardRecentCommentsQuery,
  useDashboardStatsQuery,
} from "@/queries/dashboard.query";

export const useDashboard = () => {
  const {
    data: stats,
    isLoading: statsLoading,
    isError: statsError,
    refetch: refetchStats,
  } = useDashboardStatsQuery();

  const {
    data: articles,
    isLoading: articlesLoading,
    isError: articlesError,
    refetch: refetchArticles,
  } = useDashboardRecentArticlesQuery();

  const {
    data: comments,
    isLoading: commentsLoading,
    isError: commentsError,
    refetch: refetchComments,
  } = useDashboardRecentCommentsQuery();

  const isLoading = statsLoading || articlesLoading || commentsLoading;
  const isError = statsError || articlesError || commentsError;

  const refetch = async () => {
    await Promise.all([refetchStats(), refetchArticles(), refetchComments()]);
  };

  return {
    stats,
    recentArticles: articles,
    recentComments: comments,
    isLoading,
    isError,
    refetch,
  };
};
