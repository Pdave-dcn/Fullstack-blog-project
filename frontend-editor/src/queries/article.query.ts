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
      await queryClient.cancelQueries({ queryKey: ["articles"] });

      const previousArticles = queryClient.getQueriesData({
        queryKey: ["articles"],
      });

      queryClient.setQueriesData<{ data: ArticleForTable[] }>(
        { queryKey: ["articles"] },
        (old) => {
          if (!old) return old;

          return {
            ...old,
            data: old.data.map((article) =>
              article.id === articleId
                ? { ...article, status: data.status }
                : article
            ),
          };
        }
      );

      return { previousArticles };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousArticles) {
        context.previousArticles.forEach(([queryKey, queryData]) => {
          queryClient.setQueryData(queryKey, queryData);
        });
      }
    },

    onSettled: () => {
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
