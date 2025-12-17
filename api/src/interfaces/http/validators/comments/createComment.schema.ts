import { z } from "zod";

export const CreateCommentSchema = z.object({
  authorId: z.uuid(),
  articleId: z.uuid(),
  content: z.string().trim().min(1).max(780),
  parentId: z.uuid().optional(),
});
