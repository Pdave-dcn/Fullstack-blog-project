import handleZodValidationError from "@/utils/zodErrorHandler";
import {
  ArticleSchema,
  ArticlesResponseSchema,
  LatestArticlesResponse,
} from "@/zodSchemas/article.zod";
import api from "./axios";

export const getArticles = async () => {
  try {
    const res = await api.get("/articles");
    const parsed = ArticlesResponseSchema.parse(res.data);
    return parsed.data;
  } catch (error) {
    handleZodValidationError(error, "getArticles");
    throw error;
  }
};

export const getArticleById = async (articleId: string) => {
  try {
    const res = await api.get(`/articles/${articleId}`);
    const parsed = ArticleSchema.parse(res.data);

    return parsed;
  } catch (error) {
    handleZodValidationError(error, "getArticleById");
    throw error;
  }
};

export const getLatestArticles = async () => {
  try {
    const res = await api.get("/articles/latest");
    const parsed = LatestArticlesResponse.parse(res.data);

    return parsed.data;
  } catch (error) {
    handleZodValidationError(error, "getLatestArticles");
    throw error;
  }
};
