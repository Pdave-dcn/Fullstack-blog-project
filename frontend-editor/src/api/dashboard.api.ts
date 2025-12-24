import handleZodValidationError from "@/utils/zodErrorHandler";
import api from "./axios";
import {
  DashboardArticlesResponseSchema,
  DashboardCommentsResponseSchema,
  DashboardStatsSchema,
} from "@/zodSchemas/dashboard.zod";

export const getDashboardStats = async () => {
  try {
    const res = await api.get("/dashboard/stats");
    const parsed = DashboardStatsSchema.parse(res.data);

    return parsed;
  } catch (error) {
    handleZodValidationError(error, "getDashboardStats");
    throw error;
  }
};

export const getRecentArticles = async () => {
  try {
    const res = await api.get("/dashboard/recent/articles");
    const parsed = DashboardArticlesResponseSchema.parse(res.data);

    return parsed.data;
  } catch (error) {
    handleZodValidationError(error, "getRecentArticles");
    throw error;
  }
};

export const getRecentComments = async () => {
  try {
    const res = await api.get("/dashboard/recent/comments");
    const parsed = DashboardCommentsResponseSchema.parse(res.data);

    return parsed.data;
  } catch (error) {
    handleZodValidationError(error, "getRecentComments");
    throw error;
  }
};
