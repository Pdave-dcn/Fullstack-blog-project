import {
  getArticleById,
  getArticles,
  getLatestArticles,
} from "@/api/article.api";
import { useQuery } from "@tanstack/react-query";

export const useArticlesQuery = () => {
  return useQuery({
    queryKey: ["articles", "all"],
    queryFn: getArticles,
  });
};

export const useLatestArticlesQuery = () => {
  return useQuery({
    queryKey: ["articles", "latest"],
    queryFn: getLatestArticles,
  });
};

export const useSingleArticleQuery = (articleId: string) => {
  return useQuery({
    queryKey: ["articles", articleId],
    queryFn: () => getArticleById(articleId),
  });
};
