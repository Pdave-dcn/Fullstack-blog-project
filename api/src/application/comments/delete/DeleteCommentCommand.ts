import { UserRole } from "@/domains/users/UserRole";

export interface DeleteCommentCommand {
  commentId: string;
  requesterId: string;
  requesterRole: UserRole;
}
