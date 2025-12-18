import { CommentQueryRepository } from "@/domains/comments/CommentQueryRepository.js";
import { ListArticleCommentsQuery } from "./ListArticleCommentsQuery.js";

export class ListArticleCommentsUseCase {
  constructor(private readonly repo: CommentQueryRepository) {}

  async execute(query: ListArticleCommentsQuery) {
    return this.repo.listArticleComments(
      query.articleId,
      query.limit,
      query.cursor
    );
  }
}
