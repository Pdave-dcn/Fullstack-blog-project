import { UserRole } from "../../../domains/users/UserRole.js";

export interface DeleteCommentCommand {
  commentId: string;
  requesterId: string;
  requesterRole: UserRole;
}
