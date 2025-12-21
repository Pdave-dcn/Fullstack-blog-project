import {
  getArticleById,
  getArticles,
  getLatestArticles,
} from "@/api/article.api";
import { useQuery } from "@tanstack/react-query";

export const useArticlesQuery = () => {
  return useQuery({
    queryKey: ["article"],
    queryFn: getArticles,
  });
};

export const useLatestArticlesQuery = () => {
  return useQuery({
    queryKey: ["article", "latest"],
    queryFn: getLatestArticles,
  });
};

export const useSingleArticleQuery = (articleId: string) => {
  return useQuery({
    queryKey: ["article", articleId],
    queryFn: () => {
      getArticleById(articleId);
    },
  });
};
