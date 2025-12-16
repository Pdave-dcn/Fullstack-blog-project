import { z } from "zod";
import { ArticleStatus } from "@/domains/articles/ArticleStatus.js";

export const createArticleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  status: z.enum(ArticleStatus),
});
