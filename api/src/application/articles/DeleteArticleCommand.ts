export interface DeleteArticleCommand {
  articleId: string;
  authorId: string;
  authorRole: "AUTHOR" | "READER";
}
