import { z } from "zod";

export const DeleteArticleSchema = z.object({
  articleId: z.uuid(),
  authorId: z.uuid(),
  authorRole: z.enum(["AUTHOR", "READER"]),
});
