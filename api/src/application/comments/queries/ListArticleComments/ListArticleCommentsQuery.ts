export interface ListArticleCommentsQuery {
  articleId: string;
  limit: number;
  cursor?: string;
}
