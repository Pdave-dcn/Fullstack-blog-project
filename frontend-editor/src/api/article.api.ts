import handleZodValidationError from "@/utils/zodErrorHandler";
import {
  ArticleForTableResponseSchema,
  ArticleResponseSchema,
  type ArticleStatus,
} from "@/zodSchemas/article.zod";
import api from "./axios";

export interface ArticlesQueryParams {
  status?: ArticleStatus | "all";
  search?: string;
}

export interface ArticleUpdateData {
  content: string;
  title: string;
}

export const getArticlesForTable = async (params?: ArticlesQueryParams) => {
  try {
    const queryParams = new URLSearchParams();

    if (params?.status && params.status !== "all") {
      queryParams.append("status", params.status);
    }

    if (params?.search && params.search.trim()) {
      queryParams.append("search", params.search.trim());
    }

    const url = `/articles${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;

    const res = await api.get(url);
    const parsed = ArticleForTableResponseSchema.parse(res.data);
    return parsed.data;
  } catch (error) {
    handleZodValidationError(error, "getArticles");
    throw error;
  }
};

export const getArticleById = async (articleId: string) => {
  try {
    const res = await api.get(`/articles/${articleId}`);
    const parsed = ArticleResponseSchema.parse(res.data);

    return parsed.data;
  } catch (error) {
    handleZodValidationError(error, "getArticleById");
    throw error;
  }
};

export const updateArticleStatus = async (
  articleId: string,
  data: { status: ArticleStatus }
) => {
  await api.patch(`/articles/${articleId}`, data);
};

export const updateArticle = async (
  articleId: string,
  data: ArticleUpdateData
) => {
  await api.put(`/articles/${articleId}`, data);
};

export const deleteArticleById = async (articleId: string) => {
  await api.delete(`/articles/${articleId}`);
};
