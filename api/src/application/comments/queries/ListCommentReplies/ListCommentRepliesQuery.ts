export interface ListCommentRepliesQuery {
  parentCommentId: string;
  limit: number;
  cursor?: string;
}
