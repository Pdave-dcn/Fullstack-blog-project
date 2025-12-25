import { z } from "zod";

const ArticleStatusEnum = z.enum(["PUBLISHED", "DRAFT"]);

const ArticleSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  content: z.string(),
  createdAt: z.string(),
});

const ArticleDetailsSchema = ArticleSchema.extend({
  status: ArticleStatusEnum,
  commentsCount: z.number().nonnegative(),
});

const ArticleForTableSchema = ArticleDetailsSchema.omit({
  content: true,
}).extend({ status: ArticleStatusEnum });

const RecentArticlesResponse = z.object({
  data: z.array(ArticleSchema).max(3),
});

const ArticlesResponseSchema = z.object({
  data: z.array(ArticleSchema),
});

const ArticleResponseSchema = z.object({
  data: ArticleDetailsSchema,
});

const ArticleForTableResponseSchema = z.object({
  data: z.array(ArticleForTableSchema),
});

export type Article = z.infer<typeof ArticleSchema>;
export type ArticleStatus = z.infer<typeof ArticleStatusEnum>;
export type ArticleDetails = z.infer<typeof ArticleDetailsSchema>;
export type ArticleForTable = z.infer<typeof ArticleForTableSchema>;

export {
  ArticleStatusEnum,
  ArticleSchema,
  ArticleDetailsSchema,
  ArticleForTableResponseSchema,
  RecentArticlesResponse,
  ArticlesResponseSchema,
  ArticleResponseSchema,
};
