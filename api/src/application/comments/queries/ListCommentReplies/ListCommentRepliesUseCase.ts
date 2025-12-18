import { CommentQueryRepository } from "@/domains/comments/CommentQueryRepository.js";
import { ListCommentRepliesQuery } from "./ListCommentRepliesQuery.js";

export class ListCommentRepliesUseCase {
  constructor(private readonly repo: CommentQueryRepository) {}

  async execute(query: ListCommentRepliesQuery) {
    return this.repo.listCommentReplies(
      query.parentCommentId,
      query.limit,
      query.cursor
    );
  }
}
