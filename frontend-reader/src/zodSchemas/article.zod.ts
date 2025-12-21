import { z } from "zod";

const ArticleSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.string(),
  commentCount: z.number().nonnegative().optional(),
});

const LatestArticlesResponse = z.object({
  data: z.array(ArticleSchema),
});

const ArticlesResponseSchema = z.object({
  data: z.array(ArticleSchema).max(3),
});

export type Article = z.infer<typeof ArticleSchema>;

export { ArticleSchema, LatestArticlesResponse, ArticlesResponseSchema };
