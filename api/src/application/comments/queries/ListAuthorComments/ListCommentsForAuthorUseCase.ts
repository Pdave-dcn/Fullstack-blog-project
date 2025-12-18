import { CommentQueryRepository } from "@/domains/comments/CommentQueryRepository.js";
import { ListCommentsForAuthorQuery } from "./ListCommentsForAuthorQuery.js";

export class ListCommentsForAuthorUseCase {
  constructor(private readonly repo: CommentQueryRepository) {}

  async execute(query: ListCommentsForAuthorQuery) {
    return this.repo.listAuthorComments(query.page, query.pageSize);
  }
}
