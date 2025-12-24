import { z } from "zod";

const ArticleSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  content: z.string(),
  createdAt: z.string(),
});

const ArticleDetailsSchema = ArticleSchema.extend({
  commentsCount: z.number().nonnegative(),
});

const LatestArticlesResponse = z.object({
  data: z.array(ArticleSchema).max(3),
});

const ArticlesResponseSchema = z.object({
  data: z.array(ArticleSchema),
});

const ArticleResponseSchema = z.object({
  data: ArticleDetailsSchema,
});

export type Article = z.infer<typeof ArticleSchema>;
export type ArticleDetails = z.infer<typeof ArticleDetailsSchema>;

export {
  ArticleSchema,
  ArticleDetailsSchema,
  LatestArticlesResponse,
  ArticlesResponseSchema,
  ArticleResponseSchema,
};
