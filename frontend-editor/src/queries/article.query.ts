import {
  createArticle,
  deleteArticleById,
  getArticleById,
  getArticlesForTable,
  updateArticle,
  updateArticleStatus,
  type ArticlesQueryParams,
  type ArticleUpdateData,
  type CreateArticleData,
} from "@/api/article.api";
import type { ArticleForTable, ArticleStatus } from "@/zodSchemas/article.zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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

export const useCreateArticleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateArticleData) => createArticle(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });
    },
  });
};

export const useUpdateArticleStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      articleId,
      data,
    }: {
      articleId: string;
      data: { status: ArticleStatus };
    }) => updateArticleStatus(articleId, data),

    onMutate: async ({ articleId, data }) => {
      // Cancel outgoing queries
      await queryClient.cancelQueries({ queryKey: ["articles"] });

      // Get all article queries (they have different keys based on filter/search)
      const previousQueries = queryClient.getQueriesData<ArticleForTable[]>({
        queryKey: ["articles"],
      });

      // Update each query individually
      previousQueries.forEach(([queryKey]) => {
        queryClient.setQueryData<ArticleForTable[]>(queryKey, (old) => {
          if (!old || !Array.isArray(old)) return old;

          return old.map((article) =>
            article.id === articleId
              ? { ...article, status: data.status }
              : article
          );
        });
      });

      // Return snapshot for rollback
      return { previousQueries };
    },

    onError: (err, variables, context) => {
      // Rollback all queries to their previous state
      if (context?.previousQueries) {
        context.previousQueries.forEach(([queryKey, queryData]) => {
          queryClient.setQueryData(queryKey, queryData);
        });
      }

      toast.error(
        `Failed to ${
          variables.data.status === "PUBLISHED" ? "publish" : "unpublish"
        } article`,
        {
          description: err instanceof Error ? err.message : "Unknown error",
        }
      );
    },

    onSettled: () => {
      // Refetch to ensure sync with server
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });
    },
  });
};

export const useUpdateArticleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      articleId,
      data,
    }: {
      articleId: string;
      data: ArticleUpdateData;
    }) => updateArticle(articleId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });
    },
  });
};

export const useDeleteArticleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (articleId: string) => deleteArticleById(articleId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });
    },
  });
};
