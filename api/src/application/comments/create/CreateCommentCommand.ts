export interface CreateCommentCommand {
  authorId: string;
  articleId: string;
  content: string;
  parentId?: string;
}
