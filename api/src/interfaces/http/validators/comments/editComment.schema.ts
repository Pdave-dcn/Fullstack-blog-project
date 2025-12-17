import z from "zod";

export const EditCommentSchema = z.object({
  commentId: z.uuid(),
  articleId: z.uuid(),
  editorId: z.uuid(),
  content: z.string().trim().min(1).max(780),
});
