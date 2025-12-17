import { DomainError } from "../shared/DomainError.js";

export class CommentNotFoundError extends DomainError {
  constructor(commentId: string) {
    super(`Comment with ID ${commentId} not found.`);
  }
}
