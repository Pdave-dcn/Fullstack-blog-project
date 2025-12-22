import { z } from "zod";

const ArticleSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  content: z.string(),
  createdAt: z.string(),
  commentsCount: z.number().nonnegative(),
});

const LatestArticlesResponse = z.object({
  data: z.array(ArticleSchema).max(3),
});

const ArticlesResponseSchema = z.object({
  data: z.array(ArticleSchema),
});

const ArticleResponseSchema = z.object({
  data: ArticleSchema,
});

export type Article = z.infer<typeof ArticleSchema>;

export {
  ArticleSchema,
  LatestArticlesResponse,
  ArticlesResponseSchema,
  ArticleResponseSchema,
};
