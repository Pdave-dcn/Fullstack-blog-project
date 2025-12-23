import { UserRole } from "@/domains/users/UserRole.js";
import { z } from "zod";

export const DeleteCommentSchema = z.object({
  commentId: z.uuid(),
  requesterId: z.uuid(),
  requesterRole: z.enum(UserRole),
});
