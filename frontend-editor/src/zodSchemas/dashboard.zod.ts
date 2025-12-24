import { z } from "zod";
import { ArticleStatusEnum } from "./article.zod";

export const DashboardStatsSchema = z.object({
  totalArticles: z.number().int().nonnegative(),
  publishedArticles: z.number().int().nonnegative(),
  draftArticles: z.number().int().nonnegative(),
  totalComments: z.number().int().nonnegative(),
});

export const DashboardCommentsSchema = z.object({
  id: z.uuid(),
  content: z.string(),
  articleTitle: z.string(),
  author: z.object({
    name: z.string(),
    username: z.string(),
  }),
  createdAt: z.string(),
});

export const DashboardRecentArticlesSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  status: ArticleStatusEnum,
  updatedAt: z.string(),
});

export const DashboardCommentsResponseSchema = z.object({
  data: z.array(DashboardCommentsSchema),
});

export const DashboardArticlesResponseSchema = z.object({
  data: z.array(DashboardRecentArticlesSchema),
});
