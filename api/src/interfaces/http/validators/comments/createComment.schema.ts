import { z } from "zod";

export const CreateCommentSchema = z.object({
  authorId: z.uuid(),
  articleId: z.uuid(),
  content: z.string().min(3).max(780),
  parentId: z.uuid().optional(),
});
