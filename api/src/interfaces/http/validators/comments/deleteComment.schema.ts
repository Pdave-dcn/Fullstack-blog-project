import { UserRole } from "@/domains/users/UserRole.js";
import { z } from "zod";

export const DeleteCommentSchema = z.object({
  articleId: z.uuid().optional(),
  commentId: z.uuid(),
  requesterId: z.uuid(),
  requesterRole: z.enum(UserRole),
});
