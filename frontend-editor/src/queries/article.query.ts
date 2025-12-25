import {
  deleteArticleById,
  getArticleById,
  getArticlesForTable,
  updateArticle,
  updateArticleStatus,
  type ArticlesQueryParams,
  type ArticleUpdateData,
} from "@/api/article.api";
import type { ArticleStatus } from "@/zodSchemas/article.zod";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

export const useArticlesQuery = (params?: ArticlesQueryParams) => {
  return useQuery({
    queryKey: ["articles", params?.status || "all", params?.search || ""],
    queryFn: () => getArticlesForTable(params),
  });
};

export const useSingleArticleQuery = (articleId: string) => {
  return useQuery({
    queryKey: ["articles", articleId],
    queryFn: () => getArticleById(articleId),
  });
};

export const useUpdateArticleStatusMutation = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: ({
      articleId,
      data,
    }: {
      articleId: string;
      data: { status: ArticleStatus };
    }) => updateArticleStatus(articleId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["articles"],
      });
    },
  });
};

export const useUpdateArticleMutation = () => {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: ({
      articleId,
      data,
    }: {
      articleId: string;
      data: ArticleUpdateData;
    }) => updateArticle(articleId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["articles"],
      });
    },
  });
};

export const useDeleteArticleMutation = () => {
  return useMutation({
    mutationFn: (articleId: string) => deleteArticleById(articleId),
  });
};
