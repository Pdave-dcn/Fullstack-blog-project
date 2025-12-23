export interface DeleteCommentCommand {
  commentId: string;
  requesterId: string;
  requesterRole: "AUTHOR" | "READER";
}
