import { ArticleCommentView } from "@/application/comments/queries/ListArticleComments/ArticleCommentView.js";
import { CommentForAuthorView } from "@/application/comments/queries/ListAuthorComments/CommentForAuthorView.js";
import { CommentReplyView } from "@/application/comments/queries/ListCommentReplies/CommentReplyView.js";

export interface CommentQueryRepository {
  listAuthorComments(
    page: number,
    pageSize: number
  ): Promise<{ items: CommentForAuthorView[]; total: number }>;

  listArticleComments(
    articleId: string,
    limit: number,
    cursor?: string
  ): Promise<{
    items: ArticleCommentView[];
    nextCursor: string | null;
    hasMore: boolean;
  }>;

  listCommentReplies(
    parentCommentId: string,
    limit: number,
    cursor?: string
  ): Promise<{
    items: CommentReplyView[];
    nextCursor: string | null;
    hasMore: boolean;
  }>;
}
