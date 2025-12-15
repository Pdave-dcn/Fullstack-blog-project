import { z } from "zod";
import { ArticleStatus } from "@/domains/articles/ArticleStatus.js";

export const editArticleSchema = z.object({
  articleId: z.uuid(),
  authorId: z.uuid(),
  authorRole: z.enum(["AUTHOR", "READER"]),
  title: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  status: z.enum(ArticleStatus).optional(),
});
