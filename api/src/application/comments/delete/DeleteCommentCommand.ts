export interface DeleteCommentCommand {
  commentId: string;
  articleId?: string;
  requesterId: string;
  requesterRole: "AUTHOR" | "READER";
}
